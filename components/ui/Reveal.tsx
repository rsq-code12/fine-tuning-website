'use client';

import { motion, type HTMLMotionProps } from 'motion/react';

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number; as?: 'div' | 'p' | 'ul' | 'li' };

/** Fade-and-rise on first view. */
export default function Reveal({ delay = 0, y = 36, as = 'div', children, ...rest }: Props) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
