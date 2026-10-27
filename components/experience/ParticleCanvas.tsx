'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { experience } from '@/lib/experience';
import { ParticleScene } from '@/lib/webgl/scene';

const AGENTS = [
  { name: 'Orchestrator', role: 'plans & delegates' },
  { name: 'Scout', role: 'finds leads' },
  { name: 'Writer', role: 'drafts outreach' },
  { name: 'Closer', role: 'books meetings' },
  { name: 'Support', role: 'answers 24/7' },
  { name: 'Analyst', role: 'reports KPIs' },
  { name: 'Ops', role: 'updates the CRM' },
];

const LAYERS = [
  { name: 'Input', role: 'your data goes in' },
  { name: 'Hidden layers', role: 'patterns form here' },
  { name: 'Output', role: 'answers come out' },
];

type Range = { top: number; bottom: number; value: number };
const clamp = (v: number) => Math.min(1, Math.max(0, v));

function ranges(selector: string, attr: string): Range[] {
  return Array.from(document.querySelectorAll<HTMLElement>(selector)).map((el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, value: parseFloat(el.dataset[attr] ?? '0') };
  });
}

function valueAt(list: Range[], y: number, fallback: number) {
  for (const r of list) if (y >= r.top && y < r.bottom) return r.value;
  return fallback;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 760;

    let scene: ParticleScene;
    try {
      scene = new ParticleScene(canvas, { count: small ? 9000 : 22000, reducedMotion: reduced });
    } catch (err) {
      console.warn('WebGL unavailable, running without particles.', err);
      return;
    }
    experience.scene = scene;

    // Section geometry, re-measured whenever ScrollTrigger lays out pins.
    let morphTops: number[] = [];
    let canvasRanges: Range[] = [];
    let chapterRanges: Range[] = [];
    // Free space for the hero eye: right of the headline on wide screens,
    // between the top label and the headline on phones / portrait tablets.
    const heroRect = () => {
      const hero = document.getElementById('top');
      const title = hero?.querySelector<HTMLElement>('.hero-title');
      const meta = hero?.querySelector<HTMLElement>('.js-meta');
      const slot = hero?.querySelector<HTMLElement>('.js-eye-slot');
      if (!hero || !title || !meta) return null;
      const W = window.innerWidth;
      const H = window.innerHeight;
      // right edge of the actual glyphs (the line wrappers are full-width blocks)
      const range = document.createRange();
      let textRight = 0;
      const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.nodeValue?.trim()) continue;
        range.selectNodeContents(n);
        textRight = Math.max(textRight, range.getBoundingClientRect().right);
      }
      const titleTop = title.offsetTop; // layout position, unaffected by scroll transforms
      const metaBottom = meta.offsetTop + meta.offsetHeight;
      if (W >= 1024 && W / H >= 1) {
        const left = Math.max(W * 0.5, textRight + W * 0.015);
        return { left, right: W * 0.97, top: H * 0.14, bottom: H * 0.82 };
      }
      const gutter = Math.max(24, W * 0.08);
      if (slot && slot.offsetHeight > 0) {
        return { left: gutter, right: W - gutter, top: slot.offsetTop, bottom: slot.offsetTop + slot.offsetHeight };
      }
      let top = metaBottom + 10;
      let bottom = titleTop - 10;
      const minH = H * 0.2;
      if (bottom - top < minH) {
        const mid = (top + bottom) / 2;
        top = mid - minH / 2;
        bottom = mid + minH / 2;
      }
      return { left: gutter, right: W - gutter, top, bottom };
    };

    const measure = () => {
      scene.setHeroRect(heroRect());
      morphTops = Array.from(document.querySelectorAll<HTMLElement>('[data-morph]')).map(
        (el) => el.getBoundingClientRect().top + window.scrollY
      );
      canvasRanges = ranges('[data-canvas]', 'canvas');
      chapterRanges = ranges('[data-chapter]', 'chapter');
    };
    measure();
    ScrollTrigger.addEventListener('refresh', measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    scene.onAgents = (pts, presence) => {
      const show = !!pts && presence > 0.01 && window.innerWidth >= 768;
      labelRefs.current.forEach((el, k) => {
        if (!el) return;
        if (!show) {
          if (el.style.opacity !== '0') el.style.opacity = '0';
          return;
        }
        const p = pts![k];
        // Agents swinging behind the core recede so labels never pile up
        const depth = k === 0 ? 1 : clamp((p.z + 1.4) / 2.4);
        el.style.opacity = (presence * (0.12 + 0.88 * depth * depth)).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 10));
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -100%) scale(${(0.82 + 0.18 * depth).toFixed(3)})`;
      });
    };

    scene.onNetwork = (pts, presence) => {
      const show = !!pts && presence > 0.01 && experience.trainingActive && window.innerWidth >= 768;
      layerRefs.current.forEach((el, k) => {
        if (!el) return;
        if (!show) {
          if (el.style.opacity !== '0') el.style.opacity = '0';
          return;
        }
        const p = pts![k];
        el.style.opacity = presence.toFixed(3);
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, 0)`;
      });
    };

    const offIntro = experience.onIntro(() => {
      gsap.to(scene.state, { intro: 0, duration: reduced ? 0.6 : 2.4, ease: 'power3.inOut' });
    });

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs / 1000, 0.05);
      const y = window.scrollY;
      const vh = window.innerHeight;

      // Each [data-morph] section contributes 0..1 as it enters → continuous story value
      let s = 0;
      for (const top of morphTops) s += clamp((y + vh * 0.9 - top) / (vh * 0.8));
      scene.state.target = s;

      const center = y + vh * 0.5;
      scene.state.targetOpacity = valueAt(canvasRanges, center, 1);
      experience.setChapter(valueAt(chapterRanges, center, 0));

      const max = document.documentElement.scrollHeight - vh;
      scene.state.scroll = max > 0 ? y / max : 0;

      scene.update(dt);
      experience.progress = scene.state.s;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      offIntro();
      ScrollTrigger.removeEventListener('refresh', measure);
      ro.disconnect();
      scene.dispose();
      experience.scene = null;
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="gl" aria-hidden="true" />
      {/* z-index 0 layer: labels sit with the canvas, underneath page content */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {AGENTS.map((a, i) => (
          <div
            key={a.name}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className={`agent-label ${i === 0 ? 'agent-label--core' : ''}`}
          >
            <b>{a.name}</b>
            <span>{a.role}</span>
          </div>
        ))}
        {LAYERS.map((l, i) => (
          <div
            key={l.name}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="net-label"
          >
            <b>{l.name}</b>
            <span>{l.role}</span>
          </div>
        ))}
      </div>
    </>
  );
}
