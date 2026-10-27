'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import { fitLines, fitLongestWord } from '@/lib/fitText';

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** split granularity */
  type?: 'words' | 'chars';
  start?: string;
  end?: string;
  /** tie the reveal to scroll position (default) or play once on enter */
  scrub?: boolean;
  stagger?: number;
  /** explicit lines (separated by <br />) sized together so the widest fills the width */
  lines?: { max: number; min?: number };
};

/**
 * Masked 3D word/char reveal. By default it is scrubbed: words tilt up out of
 * their masks as you scroll, so the heading is literally written by the scroll.
 */
export default function SplitReveal({
  as: Tag = 'h2',
  className,
  children,
  type = 'words',
  start = 'top 92%',
  end = 'top 52%',
  scrub = true,
  stagger,
  lines,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const split = SplitText.create(el, {
        type: type === 'chars' ? 'words,chars' : 'words',
        mask: type,
        wordsClass: 'sw',
        charsClass: 'sc',
      });
      const targets = type === 'chars' ? split.chars : split.words;

      // Never let a word break mid-word: fit explicit lines, or guard the longest word
      const guard = () => (lines ? fitLines(el, lines) : fitLongestWord(el, split.words));
      guard();
      document.fonts?.ready.then(guard);
      ScrollTrigger.addEventListener('refreshInit', guard);

      gsap.set(el, { perspective: 800 });
      gsap.from(targets, {
        yPercent: 120,
        rotationX: -75,
        transformOrigin: '50% 100%',
        opacity: 0,
        ease: scrub ? 'power2.out' : 'expo.out',
        duration: scrub ? 1 : 1.25,
        stagger: stagger ?? (type === 'chars' ? 0.04 : 0.09),
        scrollTrigger: scrub ? { trigger: el, start, end, scrub: 0.9 } : { trigger: el, start: 'top 85%', once: true },
      });
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', guard);
        split.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
