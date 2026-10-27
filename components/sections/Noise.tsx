'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import SplitReveal from '@/components/ui/SplitReveal';
import Reveal from '@/components/ui/Reveal';

const WORDS: [string, number, number, number][] = [
  ['lol lmaooo', 6, 12, 1.4],
  ['BUY CHEAP R0LEX!!!', 70, 8, 0.8],
  ['def main():', 84, 34, 1.8],
  ['recipe: 2 cups flour', 10, 64, 1.1],
  ['<div class="ad">', 60, 80, 1.6],
  ['404 not found', 28, 90, 0.6],
  ['¿dónde está?', 86, 64, 1.3],
  ['SELECT * FROM users', 3, 38, 2],
  ['first!!1', 42, 5, 1.2],
  ['© 2009 all rights reserved', 64, 50, 0.9],
  ['Q3 revenue grew 12%', 20, 22, 1.7],
  ['unsubscribe', 78, 92, 1],
  ['MUST READ!!! (2014)', 46, 70, 1.5],
];

export default function Noise() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.noise-word').forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? '1');
        gsap.fromTo(
          el,
          { y: 140 * speed, rotate: (speed - 1.2) * 8 },
          {
            y: -220 * speed,
            rotate: -(speed - 1.2) * 8,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      const num = root.current!.querySelector<HTMLElement>('.js-count')!;
      const target = Number(num.dataset.count);
      const state = { v: 0 };
      gsap.to(state, {
        v: target,
        duration: 2.4,
        ease: 'power3.out',
        onUpdate: () => (num.textContent = Math.round(state.v).toLocaleString('en-US')),
        scrollTrigger: { trigger: num, start: 'top 85%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="story" data-morph data-chapter="1" data-canvas="1" className="relative flex min-h-[150svh] items-center overflow-hidden px-gutter py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {WORDS.map(([w, x, y, s]) => (
          <span key={w} className="noise-word" data-speed={s} style={{ ['--x' as string]: `${x}%`, ['--y' as string]: `${y}%` }}>
            {w}
          </span>
        ))}
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <Reveal as="p" className="eyebrow">
          № 01 · The raw internet
        </Reveal>
        <SplitReveal className="display">
          Every AI is born from <em>garbage.</em>
        </SplitReveal>
        <Reveal as="p" className="lead mx-auto" delay={0.1}>
          Trillions of words. Forum fights, spam, broken code, bad recipes. Most teams shovel this mess into their models and pray. We
          don&rsquo;t pray. We don&rsquo;t need to.
        </Reveal>
        <Reveal className="mt-6 flex flex-col items-center gap-3" delay={0.2}>
          <span className="js-count steel font-display font-semibold text-[clamp(1.5rem,6.2vw,6.4rem)] leading-none tracking-[0.005em] tabular-nums" data-count="15000000000000">
            0
          </span>
          <span className="text-mono-xs text-bone-4">tokens the internet throws at one model. We decide which ones live.</span>
        </Reveal>
      </div>
    </section>
  );
}
