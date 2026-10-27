'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import { fitText } from '@/lib/fitText';

type Props = {
  word: string;
  /**
   * scatter – letters assemble from 3D space, fire like a signal, then fly past the camera.
   * split   – the word splits along its middle like a curtain to reveal the scene.
   */
  variant: 'scatter' | 'split';
  id?: string;
  chapter: number;
  /** advance the particle formation while this moment is on screen */
  morph?: boolean;
  caption: [string, string];
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function WordWarp({ word, variant, id, chapter, morph, caption }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = <T extends Element = HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
      const words = q('.js-word');

      // Always fit the word inside the viewport: ~88% of the width, capped by height
      const fit = () =>
        words.forEach((w) =>
          fitText(w, {
            width: window.innerWidth * (window.innerWidth < 768 ? 0.9 : 0.86),
            height: window.innerHeight * (variant === 'split' ? 0.62 : 0.56),
          })
        );
      fit();
      document.fonts?.ready.then(fit);
      ScrollTrigger.addEventListener('refreshInit', fit);

      const splits = words.map((w) => SplitText.create(w, { type: 'chars', charsClass: 'sc' }));
      const caps = q('.js-cap');
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom bottom', scrub: 1 },
      });

      if (variant === 'scatter') {
        const chars = splits[0].chars as HTMLElement[];
        gsap.set(chars, {
          x: () => rand(-0.45, 0.45) * window.innerWidth,
          y: () => rand(-0.4, 0.4) * window.innerHeight,
          z: () => rand(-1400, -500),
          rotationX: () => rand(-160, 160),
          rotationY: () => rand(-160, 160),
          opacity: 0,
        });
        tl.to(chars, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, opacity: 1, duration: 1.2, stagger: 0.07, ease: 'power3.out' }, 0)
          .from(caps, { opacity: 0, y: 16, duration: 0.4 }, 0.5)
          // a signal passes through the letters, like a forward pass through layers
          .to(chars, { filter: 'brightness(1.6) drop-shadow(0 0 26px #ffffff)', duration: 0.18, stagger: 0.12 }, '+=0.15')
          .to(chars, { filter: 'brightness(1) drop-shadow(0 0 0px #ffffff)', duration: 0.18, stagger: 0.12 }, '<0.22')
          .to({}, { duration: 0.3 })
          .to(chars, {
            z: 900,
            opacity: 0,
            rotationY: () => rand(-40, 40),
            x: (i: number) => (i - (chars.length - 1) / 2) * window.innerWidth * 0.12,
            duration: 1.1,
            stagger: 0.06,
            ease: 'power2.in',
          })
          .to(caps, { opacity: 0, duration: 0.3 }, '<');
      }

      if (variant === 'split') {
        splits.forEach((s) =>
          tl.from(s.chars, { yPercent: 35, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, 0)
        );
        tl.from(caps, { opacity: 0, duration: 0.4 }, 0.3)
          .from('.js-seam', { scaleX: 0, duration: 0.6, ease: 'power2.inOut' }, '+=0.1')
          .to({}, { duration: 0.2 })
          .addLabel('open')
          .to('.js-top', { yPercent: -100, duration: 1.3, ease: 'power3.inOut' }, 'open')
          .to('.js-bot', { yPercent: 100, duration: 1.3, ease: 'power3.inOut' }, 'open')
          .to('.js-seam', { opacity: 0, duration: 0.3 }, 'open')
          .to(words, { scale: 1.18, duration: 1.3, ease: 'power3.inOut' }, 'open');
      }

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', fit);
        splits.forEach((s) => s.revert());
      };
    },
    { scope: root }
  );

  const morphAttr = morph ? { 'data-morph': '' } : {};

  const captions = (
    <>
      <span className="js-cap warp-cap absolute top-[92px] left-[clamp(20px,3.2vw,44px)]">{caption[0]}</span>
      <span className="js-cap warp-cap absolute right-[clamp(20px,3.2vw,44px)] bottom-8">{caption[1]}</span>
    </>
  );

  if (variant === 'scatter') {
    return (
      <section ref={root} id={id} data-chapter={chapter} data-canvas="1" {...morphAttr} className="relative h-[240svh]" aria-label={word}>
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center [perspective:1100px]">
            <div className="js-word warp-word relative [transform-style:preserve-3d]">
              {word}
            </div>
          </div>
          {captions}
        </div>
      </section>
    );
  }

  return (
    <section ref={root} id={id} data-chapter={chapter} data-canvas="1" {...morphAttr} className="relative h-[230svh]" aria-label={word}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="js-top absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-ink">
          <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center">
            <div className="js-word warp-word">{word}</div>
          </div>
          <span className="js-cap warp-cap absolute top-[92px] left-[clamp(20px,3.2vw,44px)]">{caption[0]}</span>
        </div>
        <div className="js-bot absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-ink">
          <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-center">
            <div className="js-word warp-word" aria-hidden="true">
              {word}
            </div>
          </div>
          <span className="js-cap warp-cap absolute right-[clamp(20px,3.2vw,44px)] bottom-8">{caption[1]}</span>
        </div>
        <div className="js-seam absolute inset-x-0 top-1/2 h-px origin-center bg-signal" />
      </div>
    </section>
  );
}
