'use client';

import { useRef, useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import SplitReveal from '@/components/ui/SplitReveal';
import Reveal from '@/components/ui/Reveal';

const ROWS: { text: string; verdict: 'keep' | 'drop'; reason: string }[] = [
  { text: 'BUY CHEAP R0LEX!!! click here', verdict: 'drop', reason: 'spam' },
  { text: 'Refund approved: item returned within 30 days…', verdict: 'keep', reason: 'domain' },
  { text: 'lol lmaooo first!!1 ok', verdict: 'drop', reason: 'noise' },
  { text: 'Q: Late fee on invoice? A: 2% after day 15…', verdict: 'keep', reason: 'expert' },
  { text: 'Refund approved: item returned within 30 days…', verdict: 'drop', reason: 'duplicate' },
  { text: 'def calc_tax(income, brackets): …', verdict: 'keep', reason: 'code' },
  { text: 'Call me at 555-0199, card ending 4421', verdict: 'drop', reason: 'pii' },
  { text: '“Happy to help, Sam! Here’s what I found…”', verdict: 'keep', reason: 'tone' },
];

export default function DataChapter() {
  const root = useRef<HTMLElement>(null);
  const [judged, setJudged] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: '.js-filter',
        start: 'top 80%',
        end: 'bottom 45%',
        onUpdate: (self) => setJudged(Math.min(ROWS.length, Math.floor(self.progress * (ROWS.length + 1)))),
      });
    },
    { scope: root }
  );

  const kept = ROWS.slice(0, judged).filter((r) => r.verdict === 'keep').length;

  return (
    <section ref={root} id="data" data-morph data-chapter="2" data-canvas="1" className="relative min-h-[140svh] px-gutter py-40 max-md:pt-[46svh]">
      <div className="flex max-w-[600px] flex-col gap-7 md:w-[46%] md:pt-[12vh]">
        <Reveal as="p" className="eyebrow">
          № 02 · Curation
        </Reveal>
        <SplitReveal className="display">
          We don&rsquo;t collect data. We <em>interrogate</em> it.
        </SplitReveal>
        <Reveal as="p" className="lead" delay={0.1}>
          Every example is filtered, de-duplicated, labelled, balanced and cleared of personal data, then checked against written
          acceptance criteria. Only examples that measurably improve the model reach training. That is the difference between an AI
          demo and a system you can run a business on.
        </Reveal>
        <Reveal as="ul" className="tags" delay={0.2}>
          <li>Dataset curation</li>
          <li>Synthetic data</li>
          <li>Labeling pipelines</li>
          <li>PII scrubbing</li>
        </Reveal>

        <Reveal className="js-filter panel mt-6 overflow-hidden" aria-label="Example of data filtering">
          <div className="flex items-center justify-between px-4 py-3 text-mono-xs text-bone-4">
            <span className="flex items-center gap-2.5">
              <i className="pulse-dot" /> curate_dataset.py
            </span>
            <span>
              kept <b className="text-signal tabular-nums">{kept}</b> / {ROWS.length}
            </span>
          </div>
          <ul>
            {ROWS.map((r, i) => (
              <li key={i} className={`filter-row ${i < judged ? 'is-judged' : ''}`} data-verdict={r.verdict}>
                <span>{r.text}</span>
                <b>{r.verdict === 'keep' ? `keep · ${r.reason}` : `drop · ${r.reason}`}</b>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
