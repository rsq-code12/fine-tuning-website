'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { OWN, RENT } from '@/data/home';


export default function Versus() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 65%', end: 'bottom 70%', scrub: 0.6 },
      });
      gsap.utils.toArray<HTMLElement>('.vs-rent .vs-item').forEach((item, i) => {
        tl.to(item.querySelector('.strike'), { scaleX: 1, ease: 'none', duration: 1 }, i * 0.6);
        tl.to(item, { color: '#5e5b55', duration: 0.6 }, i * 0.6 + 0.4);
      });
      gsap.utils.toArray<HTMLElement>('.vs-own .vs-item').forEach((item, i) => {
        tl.from(item, { x: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, i * 0.6 + 0.2);
      });
      gsap.from('.js-vs', {
        scale: 0,
        rotate: -90,
        duration: 1.2,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-chapter="5" data-canvas="0.28" className="relative px-gutter pb-[20vh]">
      <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1fr_auto_1fr]">
        <div className="vs-rent">
          <p className="eyebrow">Rented AI</p>
          <h3 className="mt-5 mb-6 font-display font-semibold uppercase tracking-[0.005em] text-[clamp(2rem,3.4vw,3.2rem)] leading-none text-bone-4">Everybody&rsquo;s chatbot</h3>
          <ul>
            {RENT.map((t) => (
              <li key={t} className="vs-item">
                {t}
                <span className="strike" />
              </li>
            ))}
          </ul>
        </div>
        <div className="js-vs mx-auto grid h-14 w-14 place-items-center border border-line font-mono text-[11px] tracking-[0.2em] text-bone-4 uppercase md:mt-24">
          vs
        </div>
        <div className="vs-own">
          <p className="eyebrow">Owned AI</p>
          <h3 className="steel mt-5 mb-6 font-display font-semibold uppercase tracking-[0.005em] text-[clamp(2rem,3.4vw,3.2rem)] leading-none">Made by Weightcraft</h3>
          <ul>
            {OWN.map((t) => (
              <li key={t} className="vs-item">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
