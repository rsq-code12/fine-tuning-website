'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { experience } from '@/lib/experience';
import SplitReveal from '@/components/ui/SplitReveal';

const TARGET = 'Your model now thinks exactly like your business.';
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789#%&*+=?!<>/';
const W = 400;
const H = 110;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Learning order: spaces first, common short words early, the final period last.
const THRESHOLDS = (() => {
  const r = seeded(7);
  return TARGET.split('').map((ch, i) => {
    if (ch === ' ') return 0;
    if (ch === '.') return 0.97;
    return 0.06 + r() * 0.82 + (i / TARGET.length) * 0.06;
  });
})();

const LOSS = (() => {
  const r = seeded(42);
  return Array.from({ length: 121 }, (_, i) => {
    const t = i / 120;
    const noise = (r() - 0.5) * 0.5 * (1 - t * 0.7);
    return Math.max(0.12, 0.16 + 4.0 * Math.exp(-t * 4.4) + noise * 0.6);
  });
})();
const yOf = (loss: number) => 10 + (1 - loss / 4.5) * (H - 22);
const LINE = LOSS.map((l, i) => `${i ? 'L' : 'M'}${((i / 120) * W).toFixed(1)} ${yOf(l).toFixed(1)}`).join(' ');
const AREA = `${LINE} L${W} ${H} L0 ${H} Z`;

// Plain-English narration of what the network is doing, keyed to training progress
const PHASES = [
  { at: 0, word: 'Reading', line: 'It reads millions of your real examples.' },
  { at: 0.28, word: 'Guessing', line: 'It predicts the next word. Mostly wrong, at first.' },
  { at: 0.55, word: 'Correcting', line: 'Every mistake nudges billions of tiny weights.' },
  { at: 0.84, word: 'Learned', line: 'Now it answers in your formats, with your judgment.' },
];

const escape = (c: string) => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c);

export default function Training() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = (s: string) => root.current!.querySelector<HTMLElement>(s)!;
      const decode = q('.js-decode');
      const step = q('.js-step');
      const tokens = q('.js-tokens');
      const acc = q('.js-acc');
      const lossVal = q('.js-loss');
      const epoch = q('.js-epoch');
      const clip = root.current!.querySelector<SVGRectElement>('.js-clip')!;
      const dot = root.current!.querySelector<SVGCircleElement>('.js-dot')!;
      const hint = q('.js-hint');
      const phaseWord = q('.js-phase');
      const phaseLine = q('.js-phase-line');
      const phaseNum = q('.js-phase-n');

      let progress = 0;
      let active = false;
      let phase = -1;

      const setPhase = (i: number) => {
        if (i === phase) return;
        const dir = i > phase ? 1 : -1;
        phase = i;
        phaseWord.textContent = PHASES[i].word;
        // The payoff phase is the one moment this section earns the ember accent
        const learned = i === PHASES.length - 1;
        phaseWord.classList.toggle('ember', learned);
        phaseWord.classList.toggle('steel', !learned);
        phaseLine.textContent = PHASES[i].line;
        phaseNum.textContent = String(i + 1).padStart(2, '0');
        gsap.fromTo(phaseWord, { yPercent: 40 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out', overwrite: true });
        gsap.fromTo(phaseLine, { y: 10 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.08, ease: 'expo.out', overwrite: true });
      };

      const render = () => {
        const p = progress;
        let html = '';
        for (let i = 0; i < TARGET.length; i++) {
          const ch = TARGET[i];
          if (THRESHOLDS[i] <= p) html += escape(ch);
          else html += `<span class="u">${escape(GLYPHS[(Math.random() * GLYPHS.length) | 0])}</span>`;
        }
        decode.innerHTML = html;

        const idx = Math.min(120, Math.round(p * 120));
        const l = LOSS[idx];
        step.textContent = Math.round(p * 12000).toLocaleString('en-US');
        tokens.textContent = `${(p * 2.4).toFixed(2)}B`;
        acc.textContent = `${Math.round(8 + 89 * Math.pow(p, 0.75))}%`;
        lossVal.textContent = l.toFixed(3);
        epoch.textContent = String(Math.min(3, 1 + Math.floor(p * 3)));
        clip.setAttribute('width', String(p * W + 1));
        dot.setAttribute('cx', String((idx / 120) * W));
        dot.setAttribute('cy', String(yOf(l)));
        dot.style.opacity = p > 0.005 ? '1' : '0';
        hint.style.opacity = p > 0.96 ? '0' : '1';
        let ph = 0;
        PHASES.forEach((x, k) => {
          if (p >= x.at) ph = k;
        });
        setPhase(ph);
        if (experience.scene) experience.scene.state.boost = active ? p * 0.6 : 0;
      };

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: '+=150%',
        pin: pin.current,
        onUpdate: (self) => {
          progress = self.progress;
          render();
        },
        onToggle: (self) => {
          active = self.isActive;
          experience.trainingActive = self.isActive;
          if (!active && experience.scene) experience.scene.state.boost = 0;
        },
      });

      // Undecoded glyphs keep shimmering while the section is on screen
      const shimmer = window.setInterval(() => {
        if (active && progress < 1) render();
      }, 85);
      render();
      return () => window.clearInterval(shimmer);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="training" data-chapter="3" data-canvas="1" className="relative">
      <div ref={pin} className="relative h-svh overflow-hidden">
        {/* Heading, kept small so the network gets the stage */}
        <div className="absolute top-24 left-[clamp(20px,3.2vw,44px)] z-10 flex max-w-xl flex-col gap-3">
          <p className="eyebrow">№ 03 · Training</p>
          <SplitReveal className="display text-[clamp(1.8rem,3vw,3.1rem)]" start="top 70%">
            It learns by correction. <em>We measure every step.</em>
          </SplitReveal>
        </div>

        <p className="js-hint pointer-events-none absolute top-24 right-[clamp(20px,3.2vw,44px)] hidden text-mono-xs text-bone-5 transition-opacity duration-500 md:block">
          ↓ keep scrolling. Watch it get smarter.
        </p>

        {/* One word on the graphic: what the network is doing right now */}
        <div className="pointer-events-none absolute inset-x-0 top-[60%] z-10 md:portrait:top-[63%] flex -translate-y-1/2 flex-col items-center px-6 text-center md:landscape:top-[42%]">
          <p className="text-mono-xs text-bone-4">
            Phase <span className="js-phase-n text-bone">01</span> / 04<span className="hidden sm:inline"> · what the model is doing</span>
          </p>
          <p className="js-phase steel mt-2 font-display font-semibold uppercase text-[clamp(2.3rem,8.4vw,8.6rem)] leading-[0.9]">Reading</p>
          <p className="js-phase-line mt-4 rounded-full border border-line-2 bg-ink px-5 py-2 text-[clamp(1rem,1.25vw,1.2rem)] text-bone">{PHASES[0].line}</p>
        </div>

        {/* Compact readouts, overlaid on the bottom of the graphic */}
        <div className="absolute inset-x-0 bottom-0 z-10 grid gap-3 px-[clamp(20px,3.2vw,44px)] pb-5 md:grid-cols-[1.4fr_0.6fr]">
          <div className="panel flex flex-col justify-between gap-3 px-5 py-4">
            <div className="flex justify-between text-mono-xs text-bone-4">
              <span>model.generate()</span>
              <span>
                step <b className="js-step font-normal text-bone tabular-nums">0</b>
              </span>
            </div>
            <p className="js-decode decode" aria-label={TARGET} />
            <div className="flex justify-between text-mono-xs text-bone-4">
              <span>
                tokens seen <b className="js-tokens font-normal text-bone tabular-nums">0.00B</b>
              </span>
              <span>
                accuracy <b className="js-acc font-normal text-bone tabular-nums">0%</b>
              </span>
            </div>
          </div>

          <div className="panel hidden flex-col justify-between gap-2 px-5 py-4 md:flex">
            <div className="flex justify-between text-mono-xs text-bone-4">
              <span>training loss</span>
              <b className="js-loss font-normal text-bone tabular-nums">4.200</b>
            </div>
            <svg className="loss" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
              <defs>
                <linearGradient id="lossFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".18" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <clipPath id="lossClip">
                  <rect className="js-clip" x="0" y="0" width="0" height={H} />
                </clipPath>
              </defs>
              <line x1="0" y1={H * 0.33} x2={W} y2={H * 0.33} />
              <line x1="0" y1={H * 0.66} x2={W} y2={H * 0.66} />
              <path d={AREA} fill="url(#lossFill)" clipPath="url(#lossClip)" />
              <path d={LINE} className="loss__line" clipPath="url(#lossClip)" />
              <circle className="js-dot loss__dot" r="4" cx="0" cy={yOf(LOSS[0])} />
            </svg>
            <div className="flex justify-between text-mono-xs text-bone-4">
              <span>
                epoch <b className="js-epoch font-normal text-bone">1</b>/3
              </span>
              <span>8×H100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
