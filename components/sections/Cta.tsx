'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import SplitReveal from '@/components/ui/SplitReveal';
import Reveal from '@/components/ui/Reveal';
import Magnetic from '@/components/ui/Magnetic';
import { Arrow } from '@/components/ui/Logo';
import { SITE } from '@/lib/site';

/** Alias of SITE.email. The address itself lives only in lib/site.ts. */
export const CONTACT_EMAIL = SITE.email;

const TOPICS = [
  ['Fine-tune a model', 'Fine-tune a model'],
  ['Build agents', 'Build AI agents'],
  ['Curate data', 'Curate a dataset'],
  ['Find where AI fits', 'Find where AI fits in my business'],
];

export default function Cta() {
  const [topic, setTopic] = useState(0);
  const subject = encodeURIComponent(`Project: ${TOPICS[topic][1]}`);

  return (
    <section id="contact" data-morph data-chapter="8" data-canvas="1" className="relative flex min-h-[130svh] items-center justify-center px-gutter py-[20vh]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 text-center">
        <Reveal as="p" className="eyebrow">
          Your move
        </Reveal>
        <SplitReveal
          type="chars"
          end="top 40%"
          lines={{ max: 176, min: 30 }}
          className="cta-title w-full font-display font-semibold uppercase leading-[0.92] tracking-[0.005em]"
        >
          Let&rsquo;s build an AI
          <br />
          <em>you own.</em>
        </SplitReveal>
        <Reveal as="p" className="lead mx-auto" delay={0.1}>
          Tell us what you want your AI to know. Within 24 hours you get a plan, a price and an honest verdict. If you don&rsquo;t need
          us, we&rsquo;ll say so.
        </Reveal>

        <Reveal delay={0.15} className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="What do you want to build?">
          <span className="mr-2 text-mono-xs text-bone-4">I want to</span>
          {TOPICS.map(([label], i) => (
            <button
              key={label}
              aria-pressed={topic === i}
              onClick={() => setTopic(i)}
              className={`relative isolate rounded-full border px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${topic === i ? 'border-transparent text-ink' : 'border-line-2 text-bone-3 hover:border-bone'}`}
            >
              {topic === i && (
                <motion.span layoutId="cta-chip" className="absolute inset-0 -z-10 rounded-full bg-bone" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              {label}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-2 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <Magnetic href={`mailto:${CONTACT_EMAIL}?subject=${subject}`} className="btn btn--lg">
            <span>Talk to our team</span>
            <Arrow />
          </Magnetic>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link text-mono-xs text-bone-3">
            {CONTACT_EMAIL}
          </a>
        </Reveal>
        <Reveal as="p" delay={0.22} className="text-mono-xs text-bone-4">
          Reply within 24 hours · Scoping call · Written proposal
        </Reveal>
        <Reveal as="p" delay={0.25} className="text-mono-xs text-bone-4">
          Not sure what you need?{' '}
          <a href="/audit" className="link text-bone-2">
            Take the 2-minute AI audit →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
