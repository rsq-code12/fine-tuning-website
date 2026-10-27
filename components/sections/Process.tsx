'use client';

import { useRef, useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import SplitReveal from '@/components/ui/SplitReveal';
import Reveal from '@/components/ui/Reveal';
import { STEPS } from '@/data/home';


/** One animated diagram per step, drawn when its step becomes active. */
function Viz({ i, on }: { i: number; on: boolean }) {
  const cls = `pviz ${on ? 'is-on' : ''}`;
  if (i === 0)
    return (
      <div className={cls}>
        <svg viewBox="0 0 200 200">
          {[80, 56, 32].map((r, k) => (
            <circle key={r} className="d faint" pathLength={1} cx="100" cy="100" r={r} style={{ ['--dl' as string]: `${k * 0.15}s` }} />
          ))}
          <path className="faint" d="M100 12v20M100 168v20M12 100h20M168 100h20" />
          <g className="sweep">
            <path className="acc" d="M100 100 L100 20" />
            <path d="M100 100 L100 20 A80 80 0 0 1 156.6 43.4 Z" className="accf" opacity=".12" />
          </g>
          {[
            [138, 70],
            [64, 128],
            [122, 142],
          ].map(([x, y], k) => (
            <circle key={k} className="accf blip" cx={x} cy={y} r="4.5" style={{ ['--dl' as string]: `${k * 0.6}s` }} />
          ))}
        </svg>
      </div>
    );
  if (i === 1)
    return (
      <div className={cls}>
        <svg viewBox="0 0 200 200">
          {Array.from({ length: 16 }, (_, k) => {
            const x = 28 + (k % 4) * 38;
            const y = 28 + Math.floor(k / 4) * 38;
            const lit = [1, 6, 8, 11, 14].includes(k);
            const cut = [3, 9, 12].includes(k);
            return (
              <g key={k}>
                <rect x={x} y={y} width="30" height="30" rx="3" className={lit ? 'cell cell-on' : 'cell'} style={{ ['--dl' as string]: `${k * 0.15}s` }} />
                {cut && <path className="faint" d={`M${x + 8} ${y + 8} l14 14 M${x + 22} ${y + 8} l-14 14`} />}
              </g>
            );
          })}
        </svg>
      </div>
    );
  if (i === 2)
    return (
      <div className={cls}>
        <svg viewBox="0 0 200 200">
          <path className="faint" d="M24 176 H184 M24 176 V20" />
          <path className="faint" d="M24 60 H184 M24 100 H184 M24 140 H184" strokeDasharray="2 6" />
          <path
            className="d acc"
            pathLength={1}
            strokeWidth="2.2"
            d="M24 30 C 40 110, 52 96, 64 128 S 90 140, 104 150 S 140 158, 184 162"
            style={{ ['--dl' as string]: '0.2s' }}
          />
          <circle className="accf blip" cx="184" cy="162" r="5" />
        </svg>
      </div>
    );
  if (i === 3)
    return (
      <div className={cls}>
        <svg viewBox="0 0 200 200">
          <path className="faint" d="M24 176 H184" />
          {[
            [36, 64],
            [70, 96],
            [104, 120],
            [138, 150],
          ].map(([x, h], k) => (
            <rect key={k} className={`grow ${k === 3 ? 'accf' : ''}`} x={x} y={176 - h} width="24" height={h} rx="3" style={{ ['--dl' as string]: `${0.1 + k * 0.12}s` }} />
          ))}
          <path className="d acc" pathLength={1} strokeWidth="3" d="M132 30 l12 12 l24 -24" style={{ ['--dl' as string]: '0.7s' }} />
        </svg>
      </div>
    );
  return (
    <div className={cls}>
      <svg viewBox="0 0 200 200">
        <path
          className="d"
          pathLength={1}
          d="M100 100 C 140 40, 190 60, 170 100 C 150 140, 120 150, 100 100 C 80 50, 50 60, 30 100 C 10 140, 60 160, 100 100"
        />
        <circle className="accf orbit" r="6" />
        <circle cx="100" cy="100" r="3" className="accf" />
      </svg>
    </div>
  );
}

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const steps = Array.from(root.current!.querySelectorAll<HTMLElement>('.pstep'));
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 58%',
          end: 'bottom 58%',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      const fill = root.current!.querySelector<HTMLElement>('.js-fill')!;
      ScrollTrigger.create({
        trigger: root.current!.querySelector('.js-steps'),
        start: 'top 58%',
        end: 'bottom 58%',
        onUpdate: (self) => (fill.style.transform = `scaleY(${self.progress})`),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process" data-chapter="7" data-canvas="0" className="relative px-gutter pt-[18vh] pb-[14vh]">
      <div className="process-bg pointer-events-none absolute inset-0" aria-hidden="true" />

      <header className="relative mx-auto mb-[10vh] flex max-w-6xl flex-col gap-6">
        <Reveal as="p" className="eyebrow">
          The method
        </Reveal>
        <SplitReveal className="display max-w-5xl">
          Others need quarters. We need <em>weeks.</em>
        </SplitReveal>
      </header>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Sticky spec panel: rolling steel number, progress ring, live diagram, spec cells */}
        <div className="hidden lg:sticky lg:top-[11vh] lg:block lg:self-start">
          <div className="scanner">
            <div className="flex items-center justify-between text-mono-xs">
              <span className="text-bone-3">
                Protocol <span className="text-bone">{String(active + 1).padStart(2, '0')}</span> / 05
              </span>
              <span className="flex items-center gap-2 text-bone-3">
                <i className="pulse-dot" /> running
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between gap-6">
              <div className="scanner__num" aria-hidden="true">
                <span className="steel">0</span>
                <span className="digit-roll">
                  <span style={{ transform: `translateY(-${active * 20}%)` }}>
                    {STEPS.map((_, k) => (
                      <span key={k} className="steel">
                        {k + 1}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
              <svg viewBox="0 0 120 120" className="h-24 w-24 flex-none -rotate-90" aria-hidden="true">
                <circle className="ring-track" cx="60" cy="60" r="50" strokeWidth="6" />
                <circle
                  className="ring-fill"
                  cx="60"
                  cy="60"
                  r="50"
                  strokeWidth="6"
                  strokeDasharray={314.16}
                  strokeDashoffset={314.16 * (1 - (active + 1) / STEPS.length)}
                />
                <text x="60" y="66" textAnchor="middle" className="fill-bone font-mono text-[18px]" transform="rotate(90 60 60)">
                  {Math.round(((active + 1) / STEPS.length) * 100)}%
                </text>
              </svg>
            </div>

            <h4 className="mt-3 font-display font-semibold text-[clamp(1.8rem,2.6vw,2.6rem)] leading-none tracking-[0.005em] uppercase">
              {STEPS[active].title}
            </h4>

            <div className="scanner__screen relative mx-auto mt-4 aspect-[16/7] w-full">
              <div className="absolute inset-x-[30%] inset-y-[6%]">
                {STEPS.map((_, k) => (
                  <Viz key={k} i={k} on={k === active} />
                ))}
              </div>
              <span className="absolute top-3 left-4 text-mono-xs text-bone-4">feed · {STEPS[active].title.toLowerCase()}</span>
              <span className="absolute right-4 bottom-3 text-mono-xs text-bone-4">rec ●</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['Duration', STEPS[active].when],
                ['Output', STEPS[active].gets[0]],
                ['Status', 'In motion'],
              ].map(([k, v]) => (
                <div key={k} className="scanner__tile">
                  <p className="text-mono-xs text-bone-4">{k}</p>
                  <p className="mt-1 font-display font-semibold text-[0.95rem] leading-tight tracking-[0.005em] break-words text-bone uppercase">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-5 gap-1.5">
              {STEPS.map((s, k) => (
                <div key={s.title} className="flex flex-col gap-2">
                  <span className="h-[3px] overflow-hidden rounded-full bg-bone/10">
                    <span
                      className="block h-full rounded-full transition-transform duration-700"
                      style={{ background: '#fff', transform: `scaleX(${k <= active ? 1 : 0})`, transformOrigin: 'left' }}
                    />
                  </span>
                  <span className={`font-mono text-[0.58rem] tracking-[0.1em] uppercase transition-colors ${k === active ? 'text-bone' : 'text-bone-5'}`}>
                    {s.title.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps along a progress line */}
        <ol className="js-steps relative border-l border-bone/10 lg:my-[8vh]">
          <span
            className="js-fill absolute top-0 -left-px h-full w-px origin-top scale-y-0"
            style={{ background: 'var(--color-ember)' }}
            aria-hidden="true"
          />
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={`pstep relative py-[6vh] pl-8 md:pl-12 lg:min-h-[52vh] ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
            >
              <span className="pstep__node" aria-hidden="true" />
              <p className="text-mono-xs text-signal">
                {String(i + 1).padStart(2, '0')} · {s.when}
              </p>
              <h3 className="pstep__title mt-3 text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95]">
                {s.title}
              </h3>
              <p className="pstep__body mt-5 max-w-md text-[clamp(1rem,1.2vw,1.12rem)] leading-relaxed">{s.body}</p>
              <ul className="pstep__chips mt-6 flex flex-wrap gap-2">
                {s.gets.map((g) => (
                  <li key={g} className="rounded-full border px-3 py-1.5 text-mono-xs">
                    {g}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
