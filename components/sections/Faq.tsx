'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SplitReveal from '@/components/ui/SplitReveal';
import Reveal from '@/components/ui/Reveal';
import { FAQ } from '@/data/home';


export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" data-chapter="7" data-canvas="0" className="relative px-gutter py-[16vh]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          <Reveal as="p" className="eyebrow">
            FAQ
          </Reveal>
          <SplitReveal className="display display--md">
            Straight questions. <em>Straight answers.</em>
          </SplitReveal>
        </div>
        <div>
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} delay={i * 0.05} className="border-t border-bone/12 last:border-b">
                <button
                  className="flex w-full items-center justify-between gap-6 py-6 text-left font-display font-semibold uppercase tracking-[0.005em] text-[clamp(1.3rem,2vw,1.9rem)] leading-tight"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="min-w-0 break-words">{q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`grid h-9 w-9 flex-none place-items-center rounded-full border text-xl transition-colors ${isOpen ? 'border-signal bg-signal text-ink' : 'border-bone/25'}`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[1.02rem] leading-relaxed text-bone-3">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
