'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const SPRING_FIRM = { type: 'spring' as const, stiffness: 220, damping: 28 };

export type LedgerSource = 'IG DM' | 'Web form' | 'Missed call' | 'Voicemail';

export interface LedgerRow {
  id: string;
  source: LedgerSource;
  amount: number;
  time: string;
  verified?: boolean;
}

const SOURCE_LABEL: Record<LedgerSource, string> = {
  'IG DM': 'Instagram DM',
  'Web form': 'Web form',
  'Missed call': 'Missed call',
  'Voicemail': 'Voicemail',
};

const SOURCE_DOT: Record<LedgerSource, string> = {
  'IG DM': 'bg-sage',
  'Web form': 'bg-sage-deep',
  'Missed call': 'bg-gold',
  'Voicemail': 'bg-gold-deep',
};

/**
 * NarrativeLedgerRow — a single row in the recovery ledger.
 * Animates in with a 320ms spring + stamps a gold VERIFIED mark.
 *
 * This is the atomic unit of the signature visual metaphor.
 * The same row component appears in:
 *   - Hero (single demo row)
 *   - Ledger Moment (streaming rows)
 *   - How It Works (staff-approved row)
 *   - ROI Calculator (live rows driven by slider)
 */
export function LedgerRowItem({
  row,
  index = 0,
  showVerified = true,
  compact = false,
}: {
  row: LedgerRow;
  index?: number;
  showVerified?: boolean;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  // If reduced-motion is on, render the verified mark immediately (no animation).
  const [stamped, setStamped] = useState(() => Boolean(reduced));

  useEffect(() => {
    if (reduced) return; // already stamped via initial state
    const t = setTimeout(() => setStamped(true), 380);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={reduced ? { duration: 0 } : { ...SPRING_FIRM, delay: index * 0.04 }}
      className={cn(
        'group flex items-center gap-3 md:gap-4 border-b border-sand-deep/40',
        compact ? 'py-2.5 px-3' : 'py-3.5 px-4 md:py-4 md:px-5'
      )}
    >
      {/* source dot + label */}
      <div className="flex items-center gap-2.5 min-w-[110px] md:min-w-[140px]">
        <span className={cn('h-1.5 w-1.5 rounded-full', SOURCE_DOT[row.source])} />
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-mist">
          {SOURCE_LABEL[row.source]}
        </span>
      </div>

      {/* time */}
      <span className="hidden md:block font-mono text-[10px] text-mist/70 tabular-nums min-w-[80px]">
        {row.time}
      </span>

      {/* amount */}
      <span
        className={cn(
          'flex-1 font-display tabular-nums text-right',
          compact ? 'text-base md:text-lg' : 'text-lg md:text-xl',
          'text-ink'
        )}
      >
        ${row.amount.toLocaleString()}
      </span>

      {/* verified mark */}
      {showVerified && (
        <div className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
          <AnimatePresence>
            {stamped && (
              <motion.div
                initial={reduced ? false : { scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={reduced ? { duration: 0 } : { ...SPRING_FIRM, duration: 0.24 }}
                className="flex items-center gap-1.5"
              >
                <span className="verified-mark" aria-hidden>
                  ✓
                </span>
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-gold-deep font-semibold">
                  Verified
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

/**
 * NarrativeLedger — the signature visual metaphor.
 *
 * A persistent ledger object that appears across multiple sections
 * in different states, making the entire homepage feel like one
 * continuous story:
 *
 *   inquiry arrives → value escapes → Scrutexity captures it →
 *   staff rules govern it → booking + deposit verified
 *
 * Variants:
 *   - 'hero'      : single demo row, premium glass card
 *   - 'stream'    : pinned scroll scene, rows stream in over 1 viewport
 *   - 'static'    : static list of rows (for ROI calculator output)
 *   - 'staff-approved' : one row with a pause + staff-approve stamp
 */
export default function NarrativeLedger({
  rows,
  variant = 'static',
  total,
  className,
  title = 'Recovered deposits',
  subtitle,
  trustBadge = 'PMS-verified · receipt-grade',
}: {
  rows: LedgerRow[];
  variant?: 'hero' | 'stream' | 'static' | 'staff-approved';
  total?: number;
  className?: string;
  title?: string;
  subtitle?: string;
  trustBadge?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        'paper-glass rounded-2xl overflow-hidden',
        variant === 'hero' && 'shadow-float',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-b border-sand-deep/40 bg-cream/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" aria-hidden />
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-sage-deep font-semibold">
              {title}
            </span>
          </div>
          {subtitle && (
            <p className="mt-0.5 text-[11px] text-mist/80">{subtitle}</p>
          )}
        </div>
        {total !== undefined && (
          <div className="text-right">
            <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-mist">
              Last 24h
            </div>
            <div className="font-display text-xl md:text-2xl text-sage-deep tabular-nums">
              ${total.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Rows */}
      <div className="max-h-[400px] overflow-y-auto">
        {rows.length === 0 ? (
          <div className="py-12 px-5 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist/60">
              Awaiting recovery…
            </p>
          </div>
        ) : (
          rows.map((row, i) => (
            <LedgerRowItem
              key={row.id}
              row={row}
              index={i}
              compact={variant === 'static'}
              showVerified={row.verified !== false}
            />
          ))
        )}
      </div>

      {/* Footer trust badge */}
      <div className="flex items-center justify-between px-4 md:px-5 py-2.5 border-t border-sand-deep/40 bg-cream/40">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-mist/70">
          {trustBadge}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-sage" />
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-sage-deep">
            Read-only · BAA
          </span>
        </span>
      </div>
    </div>
  );
}
