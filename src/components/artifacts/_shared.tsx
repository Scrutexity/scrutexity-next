'use client';

/**
 * Shared primitives for the Claim Intelligence artifact system.
 * Warm clinical luxury — never dark mode, never SaaS-tech.
 * Only confirmed @theme tokens are used; burgundy (#6b1d2f) is the
 * documented "rare deep accent" for true high-risk red, applied as an
 * arbitrary hex so it never silently renders as an undefined token.
 */

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Domain status/risk semantics live in the canonical lib so every artifact
 * (and any report) consumes one model. Re-exported here for ergonomic imports
 * inside the artifact components.
 */
export { STATUS_META, RISK_TO_STATUS } from '@/lib/claim-intelligence';
export type { Status, Risk } from '@/lib/claim-intelligence';

export const EASE = [0.16, 1, 0.3, 1] as const;
export const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Section kicker + heading ────────────────────────────────── */

export function ArtifactHeading({
  kicker,
  title,
  italic,
  body,
  tone = 'light',
  className = '',
}: {
  kicker: string;
  title: string;
  italic?: string;
  body?: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div className={`max-w-3xl ${className}`}>
      <span
        className={`mb-5 block text-[11px] uppercase tracking-[0.18em] ${
          dark ? 'text-sage-soft' : 'text-sage-deep'
        }`}
        style={{ fontFamily: MONO_STACK }}
      >
        {kicker}
      </span>
      <h2
        className={`font-display text-3xl tracking-[-0.02em] leading-[1.1] md:text-[2.7rem] ${
          dark ? 'text-cream' : 'text-espresso'
        }`}
      >
        {title}{' '}
        {italic && (
          <span className={`italic ${dark ? 'text-sage-soft' : 'text-sage-deep'}`}>{italic}</span>
        )}
      </h2>
      {body && (
        <p
          className={`mt-4 max-w-2xl text-base leading-[1.6] ${
            dark ? 'text-cream/70' : 'text-mist'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/* ── Scroll reveal wrapper (respects reduced motion) ─────────── */

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Tiny inline sparkline (deterministic sample data) ───────── */

export function Sparkline({
  points,
  stroke = '#5E7A5A',
  className = '',
}: {
  points: number[];
  stroke?: string;
  className?: string;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 64;
  const h = 20;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const yy = h - ((p - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${yy.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <path d={d} fill="none" stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ── Progress ring (SVG donut) ───────────────────────────────── */

export function ProgressRing({
  value,
  size = 64,
  stroke = 6,
  color = '#5E7A5A',
  track = 'rgba(217,204,176,0.45)',
  children,
}: {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, ease: EASE }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{children}</span>
    </div>
  );
}

/* ── Decorative warm blueprint grid (for dark-brown sections) ── */

export function BlueprintGrid({ dark = false }: { dark?: boolean }) {
  const line = dark ? 'rgba(248,243,234,0.08)' : 'rgba(92,70,51,0.07)';
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${line} 1px,transparent 1px),linear-gradient(90deg,${line} 1px,transparent 1px)`,
        backgroundSize: '42px 42px',
      }}
    />
  );
}
