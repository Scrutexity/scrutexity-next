'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';
import { Container } from '@/components/ui-custom/section';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * SubpageHero — consistent hero for all subpages.
 *
 * Compact (not full viewport), establishes context with:
 *   - Eyebrow with breadcrumb-style parent label
 *   - Large serif title
 *   - Optional lead paragraph
 *   - Optional CTA row
 */
export function SubpageHero({
  eyebrow,
  title,
  lead,
  children,
  tone = 'cream',
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  tone?: 'cream' | 'cream-deep' | 'sand';
}) {
  const reduced = useReducedMotion();
  const bg = tone === 'cream-deep' ? 'bg-cream-deep' : tone === 'sand' ? 'bg-sand' : 'bg-cream';

  return (
    <section className={cn('section-anchor relative w-full pt-32 pb-16 md:pt-40 md:pb-20', bg)}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(143,169,138,0.14), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(197,160,89,0.10), transparent 60%)',
        }}
      />
      <Container className="relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <span className="font-mono-label text-sage-deep">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.08 }}
          className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.025em] text-ink max-w-4xl"
        >
          {title}
        </motion.h1>

        {lead && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="mt-6 font-sans text-lg md:text-xl leading-[1.55] text-mist max-w-2xl"
          >
            {lead}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.32 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </Container>
    </section>
  );
}

/**
 * SubpageSection — a standard content section for subpages.
 * Uses Container internally for consistent max-width.
 */
export function SubpageSection({
  children,
  className,
  tone = 'cream',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'cream' | 'cream-deep' | 'sand' | 'ink';
}) {
  const bg =
    tone === 'cream-deep'
      ? 'bg-cream-deep'
      : tone === 'sand'
      ? 'bg-sand'
      : tone === 'ink'
      ? 'bg-ink text-cream'
      : 'bg-cream';

  return (
    <section className={cn('w-full py-16 md:py-24', bg, className)}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * BackLink — consistent "back to home" link for subpage footers.
 */
export function BackLink({ href = '/', label = 'Back to home' }: { href?: string; label?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-sage-deep hover:text-sage transition-colors"
    >
      <span aria-hidden>←</span>
      {label}
    </a>
  );
}
