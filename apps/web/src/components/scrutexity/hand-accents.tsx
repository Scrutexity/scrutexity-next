'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hand-drawn SVG accents that draw themselves on.
 * Use these to highlight key words in headlines — mosey-style line craft.
 */

const GOLD = '#C5A059';
const SAGE = '#5E7A5A';

/** Hand-drawn underline beneath a word. Slightly wavy, organic. */
export function HandUnderline({
  color = GOLD,
  delay = 0.5,
  width = 2,
  className,
}: {
  color?: string;
  delay?: number;
  width?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 200 12"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M 2 7 Q 50 3, 100 6 T 198 5"
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </motion.svg>
  );
}

/** Hand-drawn circle around a word or phrase. */
export function HandCircle({
  color = GOLD,
  delay = 0.6,
  className,
}: {
  color?: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 220 80"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M 110 6 C 60 6, 12 18, 10 40 C 8 62, 55 74, 110 74 C 165 74, 212 62, 210 40 C 208 18, 160 6, 110 6 Z"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </motion.svg>
  );
}

/** Hand-drawn arrow — curves and points. */
export function HandArrow({
  color = SAGE,
  delay = 0.4,
  className,
  direction = 'right',
}: {
  color?: string;
  delay?: number;
  className?: string;
  direction?: 'right' | 'down' | 'left';
}) {
  const reduced = useReducedMotion();
  const paths = {
    right: 'M 4 20 Q 60 10, 110 18 M 100 12 L 112 18 L 102 26',
    down: 'M 20 4 Q 10 40, 18 80 M 12 70 L 18 82 L 26 72',
    left: 'M 116 20 Q 60 10, 10 18 M 20 12 L 8 18 L 18 26',
  };
  return (
    <motion.svg
      viewBox="0 0 120 90"
      fill="none"
      className={className}
      aria-hidden
    >
      <motion.path
        d={paths[direction]}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </motion.svg>
  );
}

/** Hand-drawn checkmark that stamps on with overshoot. */
export function HandCheck({
  color = GOLD,
  delay = 0.5,
  size = 24,
  className,
}: {
  color?: string;
  delay?: number;
  size?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <motion.path
        d="M 4 13 L 9 18 L 20 6"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </motion.svg>
  );
}

/** Hand-drawn squiggle — decorative separator. */
export function HandSquiggle({
  color = SAGE,
  delay = 0.3,
  className,
}: {
  color?: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 120 12"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M 2 6 Q 15 2, 28 6 T 54 6 T 80 6 T 118 6"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </motion.svg>
  );
}
