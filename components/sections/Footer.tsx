'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import { fitText } from '@/lib/fitText';
import { SITE } from '@/lib/site';

const COLS: [string, [string, string][]][] = [
  ['Explore', [['#story', 'The story'], ['/services', 'Services'], ['/industries', 'Industries'], ['#process', 'Process'], ['#faq', 'FAQ']]],
  ['Resources', [['/audit', 'Free AI audit'], ['/tools/fine-tuning-cost-calculator', 'Cost calculator'], ['/guides', 'Guides'], ['/glossary', 'AI glossary']]],
  ['Elsewhere', [['#', 'X / Twitter'], ['#', 'LinkedIn'], ['#', 'GitHub'], ['#', 'Hugging Face']]],
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const word = root.current!.querySelector<HTMLElement>('.js-word')!;
      const fit = () => fitText(word, { width: (word.parentElement?.clientWidth ?? window.innerWidth) * 0.98 });
      fit();
      document.fonts?.ready.then(fit);
      ScrollTrigger.addEventListener('refreshInit', fit);
      const split = SplitText.create(word, { type: 'chars', mask: 'chars', charsClass: 'sc' });
      gsap.from(split.chars, {
        yPercent: 100,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: '.js-word', start: 'top 95%', once: true },
      });
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', fit);
        split.revert();
      };
    },
    { scope: root }
  );

  return (
    <footer ref={root} data-canvas="1" data-chapter="8" className="relative z-[2] overflow-hidden px-gutter pt-[12vh] pb-8">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-bone/12 pt-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">Studio</p>
          <p className="max-w-sm text-bone-3">
            The godfathers of applied AI. Model training, fine-tuning, datasets and agent systems for companies that refuse to be
            average.
          </p>
        </div>
        {COLS.map(([title, links]) => (
          <div key={title} className="flex flex-col items-start gap-2.5">
            <p className="eyebrow mb-2">{title}</p>
            {links.map(([href, label]) => (
              <a key={label} href={href} className="link text-bone-2">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-[8vh] overflow-hidden text-center select-none" aria-hidden="true">
        <span className="js-word footer-word inline-block">{SITE.name}</span>
      </div>
      <div className="mt-6 flex flex-wrap justify-between gap-4 text-mono-xs text-bone-5">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Often imitated. Never duplicated.</span>
        <a href="#top" className="link">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
