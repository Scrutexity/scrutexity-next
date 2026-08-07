'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade-up scroll reveal (Makro: opacity 0 → 1, translateY 24px, ~0.75s ease-out). */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** translateY delta (default: 24) */
  y?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

/** Count-up number that animates when scrolled into view. */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  className = '',
  duration = 1.4,
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (latest) => {
    const n =
      decimals > 0
        ? latest.toFixed(decimals)
        : Math.round(latest).toLocaleString('en-US');
    return `${prefix}${n}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration, ease: EASE });
    return controls.stop;
  }, [inView, value, duration, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

/** Uppercase, letter-spaced kicker label (Makro muted periwinkle). */
export function Kicker({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9391b8] ${className}`}
    >
      {children}
    </p>
  );
}

/** Signature lime pill CTA. */
export function CTAButton({
  href = '#',
  children,
  variant = 'lime',
  className = '',
}: {
  href?: string;
  children: ReactNode;
  variant?: 'lime' | 'ghost';
  className?: string;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300';
  const styles =
    variant === 'lime'
      ? 'bg-[#d9ff5c] text-[#14142d] hover:bg-[#e4ff85] hover:shadow-[0_0_36px_rgba(217,255,92,0.35)]'
      : 'border border-white/15 text-[#ebedfa] hover:border-white/30 hover:bg-white/5';
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}

/** Glass card (Makro recipe: translucent fill + white/10 border, no blur). */
export function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.06] ${
        hover
          ? 'transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.09] hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
