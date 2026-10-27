'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/** Dot + lagging ring. Grows over interactive elements, shows a label over [data-cursor-label]. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<'idle' | 'hover' | 'label'>('idle');
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>('[data-cursor-label]');
      if (labelled) {
        setLabel(labelled.dataset.cursorLabel ?? '');
        setState('label');
        return;
      }
      setState(t.closest('a, button, summary, [data-cursor]') ? 'hover' : 'idle');
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [x, y]);

  if (!enabled) return null;
  const scale = state === 'label' ? 2.3 : state === 'hover' ? 1.7 : 1;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: state === 'idle' ? 1 : 0 }} />
      <motion.div
        className="cursor-ring"
        data-state={state}
        style={{ x: rx, y: ry }}
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <span style={{ transform: `scale(${1 / scale})` }}>{label}</span>
      </motion.div>
    </>
  );
}
