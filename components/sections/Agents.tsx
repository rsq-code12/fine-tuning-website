'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import SplitReveal from '@/components/ui/SplitReveal';
import Reveal from '@/components/ui/Reveal';
import { feedEvents } from '@/data/demo';

type Item = { id: number; agent: string; text: string; at: number };

function Feed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' });
  const [items, setItems] = useState<Item[]>([]);
  const [count, setCount] = useState(3);
  const [now, setNow] = useState(0);
  const cursor = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const push = () => {
      const [agent, text] = feedEvents[cursor.current++ % feedEvents.length];
      const at = Date.now();
      setItems((prev) => [{ id: at + Math.random(), agent, text, at }, ...prev].slice(0, 5));
      setCount((c) => c + 1 + Math.floor(Math.random() * 4));
      setNow(at);
    };
    // Arrive to a crew that is already busy: seed three recent events, then keep streaming
    if (cursor.current === 0) {
      const now = Date.now();
      const seed = [2, 1, 0].map((k) => {
        const [agent, text] = feedEvents[k];
        return { id: now - k * 1000 + Math.random(), agent, text, at: now - (k + 1) * 4000 };
      });
      cursor.current = 3;
      setItems(seed.reverse());
      setNow(now);
    }
    const id = window.setInterval(push, 1900);
    const clock = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.clearInterval(id);
      window.clearInterval(clock);
    };
  }, [inView]);

  return (
    <div ref={ref} className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-bone/10 px-4 py-3 text-mono-xs text-bone-4">
        <span className="flex items-center gap-2.5">
          <i className="pulse-dot" /> Example agent run
        </span>
        <span>
          <b className="font-normal text-bone tabular-nums">{count.toLocaleString('en-US')}</b> tasks in this demo
        </span>
      </div>
      <ul className="relative h-[15.5rem] overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <motion.li
              key={it.id}
              layout
              initial={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
              animate={{ opacity: 1 - i * 0.17, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline justify-between gap-4 border-b border-bone/[0.06] px-4 py-3"
            >
              <span className="text-[0.92rem]">
                <b className="mr-3 font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-bone">{it.agent}</b>
                {it.text}
              </span>
              <span className="flex-none text-mono-xs text-bone-5">{Math.max(0, Math.round((now - it.at) / 1000)) || 'now'}{now - it.at >= 1000 ? 's ago' : ''}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default function Agents() {
  return (
    <section id="agents" data-chapter="5" data-canvas="1" className="relative min-h-[130svh] px-gutter py-24 max-md:pt-[46svh]">
      <div className="flex max-w-[560px] flex-col gap-7 md:w-[42%] md:pt-[8vh]">
        <Reveal as="p" className="eyebrow">
          № 05 · Agents
        </Reveal>
        <SplitReveal className="display">
          Then we give it <em>hands.</em>
        </SplitReveal>
        <Reveal as="p" className="lead" delay={0.1}>
          Agents connect a trained model to the tools your team already uses: inbox, CRM, browser, spreadsheets. They research,
          draft, update records and resolve routine requests around the clock, logging every step and asking for human approval
          where the stakes are high.
        </Reveal>
        <Reveal delay={0.15}>
          <Feed />
        </Reveal>
      </div>
    </section>
  );
}
