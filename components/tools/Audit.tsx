'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { recommend, QUESTIONS, readiness, type Answers } from '@/lib/audit';
import LeadForm from './LeadForm';

/**
 * The AI audit: value first (an instant, specific recommendation), then the ask.
 * Answers double as lead-qualification data (budget, timeline, authority, size).
 */
export default function Audit() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  // the outgoing question stays clickable while it animates out; the ref tells us which question is live
  const live = useRef(0);
  const go = (n: number) => {
    live.current = n;
    setStep(n);
  };
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];

  const pick = (qid: string, value: string) => {
    if (QUESTIONS[live.current]?.id !== qid) return;
    setAnswers((a) => ({ ...a, [qid]: value }));
    go(live.current + 1);
  };

  const rec = useMemo(() => (done ? recommend(answers) : null), [done, answers]);
  const score = useMemo(() => (done ? readiness(answers) : 0), [done, answers]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <div className="meter flex-1" aria-hidden="true">
          <span style={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} />
        </div>
        <span className="text-mono-xs text-bone-4">
          {done ? 'Done' : `${step + 1} / ${QUESTIONS.length}`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.fieldset
            key={q.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <legend className="doc-h2 mb-6 max-w-3xl">{q.label}</legend>
            <div className="grid gap-3 md:grid-cols-2">
              {q.options.map(([value, label], i) => (
                <button key={value} type="button" className="choice" aria-pressed={answers[q.id] === value} onClick={() => pick(q.id, value)}>
                  <span className="choice__key">{String.fromCharCode(65 + i)}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button type="button" className="link self-start text-mono-xs text-bone-4" onClick={() => go(live.current - 1)}>
                ← Back
              </button>
            )}
          </motion.fieldset>
        ) : (
          rec && (
            <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-10">
              <section className="grid gap-8 lg:grid-cols-[1fr_280px]">
                <div className="flex flex-col gap-5">
                  <p className="eyebrow">Your verdict</p>
                  <h2 className="doc-title">{rec.headline}</h2>
                  <p className="lead max-w-2xl">{rec.why}</p>
                </div>
                <div className="panel flex flex-col justify-between gap-6 p-6">
                  <p className="eyebrow">AI readiness</p>
                  <p className="big-num">
                    {score}
                    <span className="text-bone-5">/100</span>
                  </p>
                  <div className="meter" aria-hidden="true">
                    <span style={{ width: `${score}%` }} />
                  </div>
                  <p className="text-[0.98rem] text-bone-3">{score >= 70 ? 'Ready to build now.' : score >= 45 ? 'Close. One or two gaps to close first.' : 'Foundations first. Still a fast win.'}</p>
                </div>
              </section>

              <section aria-label="Build plan">
                <p className="eyebrow mb-5">What to build first</p>
                <ol className="facts">
                  {rec.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </section>

              <section aria-label="Read next" className="grid gap-4 md:grid-cols-2">
                {rec.links.map(([href, label]) => (
                  <Link key={href} href={href} className="hub-card">
                    <span className="text-mono-xs text-bone-4">{href.startsWith('/services') ? 'Service' : 'Guide'}</span>
                    <span className="hub-card__title">{label}</span>
                    <span className="mt-auto text-mono-xs text-bone-3">Read →</span>
                  </Link>
                ))}
              </section>

              <LeadForm
                source="audit"
                answers={{ ...answers, recommendation: rec.key, readiness: String(score) }}
                heading="Get the full build plan and a price"
                sub="We read your answers, then send a one-page plan, a fixed price and an honest verdict within 24 hours. If you don't need us, we'll say so."
                cta="Send my plan"
              />

              <button
                type="button"
                className="link self-start text-mono-xs text-bone-4"
                onClick={() => {
                  setAnswers({});
                  go(0);
                }}
              >
                Start over
              </button>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
