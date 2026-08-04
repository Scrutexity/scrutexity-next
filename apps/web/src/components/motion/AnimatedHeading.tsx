'use client';

import { motion, useReducedMotion } from 'framer-motion';

const enabled = process.env.NEXT_PUBLIC_ENABLE_2026_UI === 'true';

export default function AnimatedHeading({ text, className = '' }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          key={`${word}-${index}`}
          className="inline-block will-change-transform"
          initial={enabled && !reduced ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}{index < words.length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
