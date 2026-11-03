'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { experience } from '@/lib/experience';
import Magnetic from '@/components/ui/Magnetic';
import { SITE } from '@/lib/site';
import { Arrow } from '@/components/ui/Logo';

// White uppercase headline; GODFATHER. carries the ember accent
const LINES = [
  <>AI has a</>,
  <em key="e">godfather.</em>,
  <>It&rsquo;s us.</>,
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>('.js-line');
      const fades = gsap.utils.toArray<HTMLElement>('.js-fade');
      gsap.set(lines, { yPercent: 118, rotate: 3 });
      gsap.set(fades, { opacity: 0, y: 24 });

      const intro = gsap
        .timeline({ paused: true, delay: 0.1 })
        .to(lines, { yPercent: 0, rotate: 0, duration: 1.5, ease: 'expo.out', stagger: 0.11 })
        .to(fades, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08 }, 0.55);
      const off = experience.onIntro(() => intro.play());

      // Scroll-out: headline drifts up and dissolves as the orb explodes into chaos
      gsap.to('.js-title', {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.js-bottom', {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: '20% top', end: '80% top', scrub: true },
      });

      return () => off();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" data-chapter="0" data-canvas="1" className="relative flex min-h-svh flex-col justify-between px-gutter pt-28 pb-10">
      <div className="js-fade js-meta flex justify-between text-mono-xs text-bone-4">
        <span>№ 00 · The godfathers of applied AI</span>
        <span className="hidden items-center gap-2.5 lg:flex">
          <i className="pulse-dot" /> Now accepting pilot projects
        </span>
      </div>

      {/* Phones and portrait tablets: reserved space the 3D eye is fitted into */}
      <div className="js-eye-slot pointer-events-none h-[26svh] min-h-[150px] shrink-0 lg:landscape:hidden" aria-hidden="true" />

      <h1 className="js-title hero-title text-[clamp(2.3rem,10.2vw,11.6rem)] leading-[0.88]">
        {LINES.map((l, i) => (
          <span key={i} className="block overflow-hidden pb-[0.07em]">
            <span className="js-line block origin-left">{l}</span>
          </span>
        ))}
      </h1>

      <div className="js-bottom grid items-end gap-8 md:grid-cols-[minmax(0,34rem)_1fr]">
        <div className="space-y-7">
          <p className="js-fade lead">
            {SITE.name} is an applied AI studio. We fine-tune language models on your data, build the datasets behind them, and
            deploy AI agents that are evaluated before they ship. You own the model. We prove it works.
          </p>
          <div className="js-fade flex flex-wrap items-center gap-6">
            <Magnetic href="#contact" className="btn">
              <span>Talk to our team</span>
              <Arrow />
            </Magnetic>
            <a href="#story" className="link text-sm text-bone-2">
              See how we train a model ↓
            </a>
          </div>
        </div>
        <div className="js-fade hidden flex-col items-end gap-3 text-mono-xs text-bone-4 md:flex">
          <span>Scroll to begin training</span>
          <span className="relative block h-14 w-px overflow-hidden bg-bone/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-expo)_infinite] bg-signal" />
          </span>
        </div>
      </div>
    </section>
  );
}
