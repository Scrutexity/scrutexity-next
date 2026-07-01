'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { PhoneMissed, MessageSquareDashed, MailX, CalendarCheck2, ArrowRight } from 'lucide-react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

interface LedgerRow {
  id: string;
  source: string;
  contact: string;
  missedAt: string;
  amount: string;
  // The missed-state icon
  Icon: typeof PhoneMissed;
  // Time it takes to re-engage (visualized as stagger)
  recoveredAfter: string;
}

const rows: LedgerRow[] = [
  {
    id: 'r1',
    source: 'After-hours call',
    contact: 'Inquiry #4821',
    missedAt: 'Fri 7:42 PM',
    amount: '$1,400',
    Icon: PhoneMissed,
    recoveredAfter: '11 min',
  },
  {
    id: 'r2',
    source: 'Instagram DM',
    contact: 'Inquiry #4839',
    missedAt: 'Sat 10:11 AM',
    amount: '$2,200',
    Icon: MessageSquareDashed,
    recoveredAfter: '6 min',
  },
  {
    id: 'r3',
    source: 'Web form',
    contact: 'Inquiry #4847',
    missedAt: 'Sun 6:28 PM',
    amount: '$850',
    Icon: MailX,
    recoveredAfter: '4 min',
  },
  {
    id: 'r4',
    source: 'Missed callback',
    contact: 'Inquiry #4852',
    missedAt: 'Mon 8:55 AM',
    amount: '$3,100',
    Icon: PhoneMissed,
    recoveredAfter: '9 min',
  },
];

export default function ConvertedLedgerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 lg:py-28"
    >
      {/* Soft warm wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(184,125,107,0.10),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(47,93,74,0.10),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mist">
            The recovery, line by line
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-espresso md:text-4xl">
            Watch missed inquiries become booked deposits.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-mist">
            Every recovery is recorded with its source, the time it was missed, the moment it was re-engaged, and the deposit that landed. Sample ledger &mdash; illustrative.
          </p>
        </motion.div>

        {/* Ledger card */}
        <div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-sand bg-cream shadow-[0_30px_80px_-30px_rgba(61,43,31,0.18)]"
        >
          {/* Header row */}
          <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 border-b border-sand bg-cream px-6 py-4 sm:grid-cols-[1.6fr_1.4fr_1.4fr_1fr] sm:gap-6 sm:px-8">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
              Source
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
              Status
            </span>
            <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist sm:block">
              Recovered in
            </span>
            <span className="text-right font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
              Deposit
            </span>
          </div>

          {/* Rows */}
          <div>
            {rows.map((row, i) => (
              <LedgerRowComponent
                key={row.id}
                row={row}
                index={i}
                isInView={isInView}
                reduced={!!reduced}
              />
            ))}
          </div>

          {/* Footer summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + rows.length * 0.35, ease: cinematicEase }}
            className="flex flex-col items-start justify-between gap-3 border-t border-sand bg-[#f4f8f4] px-6 py-5 sm:flex-row sm:items-center sm:px-8"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2F5D4A]/30 bg-sage/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-sage-deep">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F5D4A] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2F5D4A]" />
                </span>
                Verified recovery
              </span>
              <span className="text-sm text-mist">4 recoveries this window</span>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                Total deposits
              </p>
              <p className="mt-0.5 font-display text-2xl tracking-tight text-sage-deep">$7,550</p>
            </div>
          </motion.div>
        </div>

        {/* Caption below */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 + rows.length * 0.35, ease: cinematicEase }}
          className="mx-auto mt-6 max-w-xl text-center text-[12px] leading-6 text-mist"
        >
          Source logged · conversation transcript on file · completed booking deposit. The bar for a recovery to count.
        </motion.p>
      </div>
    </section>
  );
}

function LedgerRowComponent({
  row,
  index,
  isInView,
  reduced,
}: {
  row: LedgerRow;
  index: number;
  isInView: boolean;
  reduced: boolean;
}) {
  // Each row goes through 3 phases sequenced by index:
  // 0–0.4s: enter as missed (clay glow)
  // 0.4–0.8s: scan-line sweep
  // 0.8s+:    converted to booked (pine state)
  const baseDelay = 0.25 + index * 0.35;

  return (
    <div className="relative">
      {/* Scan line sweep */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-32"
          initial={{ x: '-30%', opacity: 0 }}
          animate={isInView ? { x: '130%', opacity: [0, 1, 1, 0] } : {}}
          transition={{
            duration: 0.9,
            delay: baseDelay + 0.25,
            ease: cinematicEase,
            times: [0, 0.15, 0.85, 1],
          }}
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(47,93,74,0.05) 20%, rgba(47,93,74,0.18) 50%, rgba(47,93,74,0.05) 80%, transparent 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 14, backgroundColor: 'rgba(184,125,107,0.12)' }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                backgroundColor: reduced
                  ? 'rgba(47,93,74,0.06)'
                  : ['rgba(184,125,107,0.12)', 'rgba(184,125,107,0.12)', 'rgba(47,93,74,0.06)'],
              }
            : {}
        }
        transition={{
          duration: 1.2,
          delay: baseDelay,
          ease: cinematicEase,
          times: reduced ? undefined : [0, 0.55, 1],
        }}
        className="relative grid grid-cols-[2fr_2fr_1fr] items-center gap-4 border-b border-sand px-6 py-5 last:border-b-0 sm:grid-cols-[1.6fr_1.4fr_1.4fr_1fr] sm:gap-6 sm:px-8"
      >
        {/* Source */}
        <div className="flex items-center gap-3">
          <SourceIcon Icon={row.Icon} isInView={isInView} delay={baseDelay} reduced={reduced} />
          <div>
            <p className="text-sm font-medium text-espresso">{row.source}</p>
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-mist">
              {row.contact} · {row.missedAt}
            </p>
          </div>
        </div>

        {/* Status transition: Missed → Booked */}
        <StatusCell isInView={isInView} delay={baseDelay} reduced={reduced} />

        {/* Recovered in */}
        <div className="hidden sm:block">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: baseDelay + 0.75, ease: cinematicEase }}
            className="font-mono text-xs font-semibold text-sage-deep"
          >
            {row.recoveredAfter}
          </motion.span>
        </div>

        {/* Deposit amount */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: baseDelay + 0.85, ease: cinematicEase }}
          className="text-right"
        >
          <span className="font-display text-lg text-sage-deep tabular-nums">{row.amount}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SourceIcon({
  Icon,
  isInView,
  delay,
  reduced,
}: {
  Icon: typeof PhoneMissed;
  isInView: boolean;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
      initial={{
        backgroundColor: 'rgba(184,125,107,0.18)',
        color: '#B87D6B',
        borderColor: 'rgba(184,125,107,0.35)',
      }}
      animate={
        isInView
          ? {
              backgroundColor: reduced ? 'rgba(47,93,74,0.10)' : ['rgba(184,125,107,0.18)', 'rgba(184,125,107,0.18)', 'rgba(47,93,74,0.10)'],
              color: reduced ? '#2F5D4A' : ['#B87D6B', '#B87D6B', '#2F5D4A'],
            }
          : {}
      }
      transition={{
        duration: 1.2,
        delay: delay + 0.3,
        ease: cinematicEase,
        times: reduced ? undefined : [0, 0.5, 1],
      }}
      style={{
        border: '1px solid rgba(184,125,107,0.35)',
      }}
    >
      <Icon size={16} strokeWidth={1.8} />
    </motion.div>
  );
}

function StatusCell({
  isInView,
  delay,
  reduced,
}: {
  isInView: boolean;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div className="relative h-6 overflow-hidden">
      {/* Missed (clay) */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: reduced ? 0 : [1, 1, 0], y: reduced ? -22 : [0, 0, -22] } : {}}
        transition={{
          duration: 1,
          delay,
          ease: cinematicEase,
          times: reduced ? undefined : [0, 0.55, 1],
        }}
        className="absolute inset-0 flex items-center gap-2 text-sm"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B87D6B]" />
        <span className="font-medium text-[#B87D6B]">Missed</span>
        <ArrowRight size={12} className="text-[#B87D6B]/60" />
      </motion.div>

      {/* Booked (pine) */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.7, ease: cinematicEase }}
        className="absolute inset-0 flex items-center gap-2 text-sm"
      >
        <CalendarCheck2 size={14} className="text-sage-deep" />
        <span className="font-semibold text-sage-deep">Booked + Deposit</span>
      </motion.div>
    </div>
  );
}
