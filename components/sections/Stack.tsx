'use client';

import { Fragment, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { experience } from '@/lib/experience';

const ROWS = [
  ['PyTorch', 'Hugging Face', 'Unsloth', 'Axolotl', 'vLLM', 'Llama', 'Mistral', 'Qwen', 'DeepSeek'],
  ['Claude', 'OpenAI', 'LangGraph', 'n8n', 'Weights & Biases', 'Modal', 'SageMaker', 'ElevenLabs', 'Pinecone'],
];

export default function Stack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>('.js-track');
      const pos = tracks.map(() => 0);
      const tick = (_t: number, delta: number) => {
        const velocity = Math.abs(experience.lenis?.velocity ?? 0);
        const speed = (0.045 + Math.min(velocity, 80) * 0.012) * delta;
        tracks.forEach((track, i) => {
          const half = track.scrollWidth / 2;
          const dir = i % 2 ? 1 : -1;
          pos[i] = (pos[i] + speed * dir) % half;
          if (dir === 1 && pos[i] > 0) pos[i] -= half;
          track.style.transform = `translate3d(${pos[i]}px,0,0)`;
        });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root }
  );

  return (
    <section ref={root} data-chapter="7" data-canvas="0" className="relative py-[12vh]" aria-label="Tools and models we work with">
      <p className="eyebrow mb-8 px-gutter">We speak every dialect of AI</p>
      {ROWS.map((row, r) => (
        <div key={r} className="marquee">
          <div className="js-track flex" aria-hidden={r > 0 ? true : undefined}>
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee__inner" aria-hidden={copy === 1 ? true : undefined}>
                {row.map((name, k) => (
                  <Fragment key={name}>
                    <span>{(k + r) % 2 ? <em>{name}</em> : name}</span>
                    <i>—</i>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
