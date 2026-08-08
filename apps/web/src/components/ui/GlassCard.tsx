import type { ReactNode } from 'react';

type GlassTone = 'paper' | 'sage';

/**
 * GlassCard — frosted-glass panel, token-compliant (MX "glass-card system").
 *
 * Uses the locked .paper-glass / .paper-glass-sage utilities from
 * globals.css: color-mix paper-light @72%, backdrop blur 16px, hairline
 * border, tinted shadow-card — with an automatic solid fallback under
 * `prefers-reduced-transparency`. No hardcoded hexes, no dead tokens.
 *
 * Usage:
 *   <GlassCard tone="sage" className="max-w-md">…</GlassCard>
 *
 * Notes:
 * - `paper` = neutral glass (paper-light base)
 * - `sage`  = brand-tinted glass (accent @10% base, accent border @25%)
 * - Rounded to the locked radius scale (rounded-2xl = 16px), full-bleed
 *   children inside; add your own padding.
 */
export default function GlassCard({
  children,
  className = '',
  tone = 'paper',
}: {
  children: ReactNode;
  className?: string;
  tone?: GlassTone;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl ${
        tone === 'sage' ? 'paper-glass-sage' : 'paper-glass'
      } ${className}`}
    >
      {children}
    </div>
  );
}
