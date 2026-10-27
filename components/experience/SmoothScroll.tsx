'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { experience } from '@/lib/experience';

/** Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger and WebGL share one clock. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const lenis = new Lenis({ lerp: reduced ? 1 : 0.085, smoothWheel: !reduced, autoRaf: false });
    experience.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);


    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = a?.getAttribute('href');
      if (!a || !hash || hash.length < 2) return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.start();
      lenis.scrollTo(target, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
    };
    document.addEventListener('click', onClick);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      experience.lenis = null;
    };
  }, []);

  return null;
}
