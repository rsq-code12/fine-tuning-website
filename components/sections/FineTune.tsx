'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import SplitReveal from '@/components/ui/SplitReveal';
import Reveal from '@/components/ui/Reveal';
import { scenarios } from '@/data/demo';
import { SITE } from '@/lib/site';

type Mode = 'base' | 'tuned';
const CHECKS = ['Knows your policies', 'Talks like your brand', 'Gets things done'];

function useTypewriter(text: string, run: boolean, speed = 14) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!run) return;
    setOut('');
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += Math.random() < 0.15 ? 3 : 2;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, run, speed]);
  return { out, done };
}

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' });
  const [sid, setSid] = useState(scenarios[0].id);
  const [mode, setMode] = useState<Mode>('base');
  const [manual, setManual] = useState(false);
  const s = scenarios.find((x) => x.id === sid)!;
  const { out, done } = useTypewriter(mode === 'base' ? s.base : s.tuned, inView);

  // After the base answer finishes, flip to the fine-tuned model automatically.
  useEffect(() => {
    if (!done || mode !== 'base' || manual) return;
    const t = window.setTimeout(() => setMode('tuned'), 1500);
    return () => window.clearTimeout(t);
  }, [done, mode, manual]);

  return (
    <div ref={ref} className="panel overflow-hidden">
      <div className="flex flex-wrap gap-1 border-b border-line p-2" role="tablist" aria-label="Example business">
        {scenarios.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={x.id === sid}
            className="demo-tab"
            onClick={() => {
              setSid(x.id);
              setMode('base');
              setManual(false);
            }}
          >
            {x.id === sid && (
              <motion.span layoutId="demo-tab" className="absolute inset-0 -z-10 rounded-full bg-bone" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
            )}
            {x.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-5" aria-live="polite">
        <div className="ml-auto max-w-[85%] border border-line bg-ink-3 px-4 py-3">
          <span className="msg-who">{s.who}</span>
          <AnimatePresence mode="wait">
            <motion.p key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-[0.95rem]">
              {s.q}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="relative max-w-[92%] border border-line bg-ink px-4 py-3">
          <span className="msg-who flex items-center gap-2">
            <i className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${mode === 'tuned' ? 'bg-signal' : 'bg-bone/40'}`} />
            {mode === 'base' ? 'Somebody else’s AI' : `${SITE.name}-trained · ${s.model}`}
          </span>
          <p className={`mt-1 min-h-[6.2em] text-[0.95rem] leading-relaxed ${done ? '' : 'caret'} ${mode === 'tuned' ? 'text-bone' : 'text-bone-3'}`}>{out}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-3">
        <div className="relative grid grid-cols-2 rounded-full border border-line-2 p-1" role="group" aria-label="Model">
          {(['base', 'tuned'] as Mode[]).map((m) => (
            <button
              key={m}
              aria-pressed={mode === m}
              onClick={() => {
                setManual(true);
                setMode(m);
              }}
              className={`relative z-10 rounded-full px-4 py-2 text-mono-xs transition-colors ${mode === m ? 'text-ink' : 'text-bone-4'}`}
            >
              {mode === m && (
                <motion.span
                  layoutId="demo-switch"
                  className={`absolute inset-0 -z-10 rounded-full ${m === 'tuned' ? 'bg-ember' : 'bg-bone'}`}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              {m === 'base' ? 'Generic model' : 'Fine-tuned'}
            </button>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-mono-xs">
          {CHECKS.map((c, i) => (
            <motion.li
              key={c}
              animate={{ opacity: mode === 'tuned' ? 1 : 0.4 }}
              transition={{ delay: mode === 'tuned' ? i * 0.12 : 0 }}
              className="flex items-center gap-1.5"
            >
              <motion.span
                key={mode}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18, delay: i * 0.12 }}
                className={mode === 'tuned' ? 'text-signal' : ''}
              >
                {mode === 'tuned' ? '✓' : '✕'}
              </motion.span>
              {c}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function FineTune() {
  return (
    <section id="finetune" data-morph data-chapter="4" data-canvas="1" className="relative min-h-[150svh] px-gutter py-40 max-md:pt-[46svh]">
      <div className="ml-auto flex max-w-[640px] flex-col gap-7 md:w-[48%] md:pt-[20vh]">
        <Reveal as="p" className="eyebrow">
          № 04 · Fine-tuning
        </Reveal>
        <SplitReveal className="display display--md">
          A general model knows a little about everything. <em>Yours</em> will know your business.
        </SplitReveal>
        <Reveal as="p" className="lead" delay={0.1}>
          We start from a proven open or commercial model and fine-tune it on your documents, conversations and decisions, using
          supervised fine-tuning and preference training. It answers in your formats and voice, consistently, and is tested on your
          real cases before it ships.
        </Reveal>
        <Reveal delay={0.15}>
          <Demo />
          <p className="mt-3 text-mono-xs text-bone-4">Illustrative example · fictional businesses</p>
        </Reveal>
        <Reveal as="ul" className="tags" delay={0.2}>
          <li>LoRA / QLoRA</li>
          <li>Full fine-tune</li>
          <li>DPO</li>
          <li>RLHF</li>
          <li>Distillation</li>
          <li>Custom evals</li>
        </Reveal>
      </div>
    </section>
  );
}
