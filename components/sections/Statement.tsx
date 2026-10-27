'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';

export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create('.js-statement', { type: 'words', wordsClass: 'sw' });
      // Words light up from near-black to full as you scroll; brightness keeps them opaque (text stays fully opaque)
      gsap.fromTo(
        split.words,
        { filter: 'brightness(0.18)' },
        {
          filter: 'brightness(1)',
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 75%', scrub: true },
        }
      );
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-chapter="5" data-canvas="0.28" className="relative px-gutter py-[22vh]">
      <p className="js-statement statement-text mx-auto max-w-6xl">
        Most companies rent the same AI as everyone else, then wonder why they all sound the same. <em>Our clients own theirs.</em>{' '}
        Trained on their data. Fluent in their voice. Loyal to nobody else.
      </p>
    </section>
  );
}
