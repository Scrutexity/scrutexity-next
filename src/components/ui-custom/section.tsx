'use client';

import { forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Section tier primitives — Anchor / Pillar / Bridge.
 *
 * The user explicitly asked for this design-system concept.
 * Every section declares its tier via the component name so engineers
 * cannot accidentally promote a Bridge to a Pillar during iteration.
 *
 * - Anchor:  full viewport (min-h-screen), cinematic, 1-2 per page
 * - Pillar:  ~60vh, content-rich, 3-4 per page
 * - Bridge:  ~30vh, transitional, 2-3 per page (stat band, quote, CTA strip)
 */

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Background variant */
  tone?: 'cream' | 'cream-deep' | 'ivory' | 'sand' | 'sage-tint' | 'ink';
  /** Vertical padding override */
  py?: 'none' | 'tight' | 'normal' | 'loose';
}

const toneClasses: Record<NonNullable<SectionProps['tone']>, string> = {
  cream: 'bg-cream',
  'cream-deep': 'bg-cream-deep',
  ivory: 'bg-cream',
  sand: 'bg-sand',
  'sage-tint': 'bg-sage/8',
  ink: 'bg-ink text-cream',
};

const pyClasses = {
  none: '',
  tight: 'py-12 md:py-16',
  normal: 'py-20 md:py-28',
  loose: 'py-28 md:py-40',
};

/** Anchor — full viewport, cinematic. */
export const Anchor = forwardRef<HTMLElement, SectionProps>(function Anchor(
  { children, className, id, tone = 'cream', py = 'loose' },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'section-anchor relative w-full min-h-screen flex flex-col justify-center',
        toneClasses[tone],
        pyClasses[py],
        className
      )}
    >
      {children}
    </section>
  );
});

/** Pillar — ~60vh, content-rich. */
export const Pillar = forwardRef<HTMLElement, SectionProps>(function Pillar(
  { children, className, id, tone = 'cream', py = 'normal' },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'section-anchor relative w-full min-h-[60vh] flex flex-col justify-center',
        toneClasses[tone],
        pyClasses[py],
        className
      )}
    >
      {children}
    </section>
  );
});

/** Bridge — ~30vh, transitional. */
export const Bridge = forwardRef<HTMLElement, SectionProps>(function Bridge(
  { children, className, id, tone = 'cream', py = 'tight' },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'section-anchor relative w-full flex flex-col justify-center',
        toneClasses[tone],
        pyClasses[py],
        className
      )}
    >
      {children}
    </section>
  );
});

/** Container — consistent max-width + horizontal padding. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14', className)}>
      {children}
    </div>
  );
}

/** Eyebrow — small mono label above section headings. */
export function Eyebrow({
  children,
  tone = 'sage',
  className,
}: {
  children: ReactNode;
  tone?: 'sage' | 'gold' | 'ink';
  className?: string;
}) {
  const toneClass =
    tone === 'gold' ? 'text-gold-deep' : tone === 'ink' ? 'text-mist' : 'text-sage-deep';
  return (
    <span
      className={cn(
        'font-mono-label inline-flex items-center gap-2',
        toneClass,
        className
      )}
    >
      {children}
    </span>
  );
}

/** Section heading — Instrument Serif at editorial scale. */
export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink',
        className
      )}
    >
      {children}
    </h2>
  );
}

/** Body lead — slightly larger body text for sub-headlines. */
export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-sans text-lg md:text-xl leading-[1.55] text-mist max-w-2xl',
        className
      )}
    >
      {children}
    </p>
  );
}

/** Backward-compatible Section — wraps content with padding + container. */
export default function Section({
  id,
  children,
  className = '',
  containerClass = 'mx-auto max-w-6xl px-5 sm:px-8',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClass?: string;
}) {
  return (
    <section id={id} className={`px-5 py-24 sm:px-8 lg:py-28 ${className}`}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}
