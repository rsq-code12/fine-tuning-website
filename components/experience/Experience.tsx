'use client';

import { useEffect } from 'react';
import SmoothScroll from './SmoothScroll';
import ParticleCanvas from './ParticleCanvas';
import Cursor from './Cursor';
import Rail from './Rail';
import { experience } from '@/lib/experience';

/** Everything fixed to the viewport that drives or decorates the scroll story. */
export default function Experience() {
  // No loading screen: the intro (particles condensing, headline rising) starts as soon as
  // fonts are ready, or after a short cap so slow font loads never hold the page back.
  useEffect(() => {
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      experience.startIntro();
    };
    const cap = window.setTimeout(start, 450);
    document.fonts?.ready.then(start);
    return () => window.clearTimeout(cap);
  }, []);

  return (
    <>
      <SmoothScroll />
      <ParticleCanvas />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Rail />
    </>
  );
}
