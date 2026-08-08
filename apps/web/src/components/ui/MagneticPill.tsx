'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Tone = 'espresso' | 'accent';

/** Verified token classes from globals.css @theme (no dead tokens). */
const TONES: Record<Tone, string> = {
  espresso: 'bg-espresso text-cream hover:bg-bark',
  accent: 'bg-accent text-paper hover:bg-accent-bright',
};

/**
 * MagneticPill — signature pill CTA with a magnetic hover pull (MX brief).
 *
 * The pill subtly tracks the cursor (clamped ~25% of the offset from center)
 * and springs back on leave. Renders as a link when `href` is given,
 * otherwise as a button (e.g. for form submits).
 *
 * Tones:
 * - `espresso` (default) — near-black ink pill, locked primary
 * - `accent`             — lime (#D9FF5C), rationed to fills and badges
 *
 * Pure enhancement: without JS it still renders as a normal link/button.
 */
export default function MagneticPill({
  href,
  type = 'button',
  tone = 'espresso',
  children,
  className = '',
  onClick,
}: {
  href?: string;
  type?: 'button' | 'submit';
  tone?: Tone;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const base = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${TONES[tone]} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        style={{ x: sx, y: sy }}
        className={base}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={base}
    >
      {children}
    </motion.button>
  );
}
