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
import { ArrowRight } from 'lucide-react';

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

/** Uppercase, letter-spaced kicker label. */
export function Kicker({
  children,
  className = '',
  isLight = true,
}: {
  children: ReactNode;
  className?: string;
  isLight?: boolean;
}) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.22em] ${
        isLight ? 'text-ink-soft' : 'text-muted'
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** Signature Makro Pill CTA with left circular arrow badge. */
export function CTAButton({
  href = '#',
  children,
  variant = 'lime',
  className = '',
}: {
  href?: string;
  children: ReactNode;
  variant?: 'lime' | 'ghost' | 'dark';
  className?: string;
}) {
  const isGhost = variant === 'ghost';
  
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-between rounded-full p-1.5 transition-all duration-300 ${
        isGhost
          ? 'bg-paper text-ink-soft hover:bg-hairline'
          : 'bg-ink-soft text-white hover:bg-ink-soft hover:shadow-[0_0_30px_rgba(217,255,92,0.2)]'
      } ${className}`}
    >
      {/* Left Circular Arrow Badge */}
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${
          isGhost
            ? 'bg-white text-ink-soft shadow-xs'
            : 'bg-accent text-ink shadow-sm'
        }`}
      >
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>

      {/* Button Text */}
      <span className="flex-1 px-5 text-center text-xs sm:text-sm font-semibold tracking-tight">
        {children}
      </span>
    </motion.a>
  );
}

/** Glass Card — Makro Framer Card recipe: clean white/translucent card with subtle border & hover shadow. */
export function GlassCard({
  children,
  className = '',
  hover = true,
  isLight = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  isLight?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.75rem] backdrop-blur-md transition-all duration-300 ${
        isLight
          ? 'border border-black/5 bg-white shadow-[0_10px_30px_-10px_rgba(20,20,45,0.05)] text-ink'
          : 'border border-white/10 bg-white/[0.07] text-ink'
      } ${
        hover
          ? isLight
            ? 'hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_25px_60px_-15px_rgba(20,20,45,0.12)]'
            : 'hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.10] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
