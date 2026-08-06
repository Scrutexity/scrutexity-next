'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;
const SNAP = [0.34, 1.56, 0.64, 1] as const;

// Status-stage color: sage gradient (capture → approval) escalates into gold (recorded).
// One-time visual cue per row.
const STATUS_DOT: Record<'CAPTURED' | 'FILTERED' | 'APPROVED' | 'RECORDED', string> = {
  CAPTURED: 'rgba(94, 122, 90, 0.40)',
  FILTERED: 'rgba(94, 122, 90, 0.65)',
  APPROVED: 'rgba(94, 122, 90, 1.00)',
  RECORDED: '#D4AF37',
};

function GoldSeal({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={56}
      height={56}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_8px_18px_rgba(212,175,55,0.35)]"
      initial={reduced ? {} : { scale: 0, rotate: -16 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: SNAP, delay }}
    >
      <defs>
        <linearGradient id={`seal-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D67A" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6A1E" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="#F8F6F3" stroke={`url(#seal-${delay})`} strokeWidth="3" />
      <circle cx="50" cy="50" r="37" stroke={`url(#seal-${delay})`} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <path d="M38 52 L46 60 L62 42" stroke={`url(#seal-${delay})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

// Fictional static sample. No block numbers, no digest fragments, no timestamps,
// no response-time metrics, no live records. Illustrates the review workflow only.
type Entry = {
  label: string;
  detail: string;
  status: 'CAPTURED' | 'FILTERED' | 'APPROVED' | 'RECORDED';
};

const entries: Entry[] = [
  {
    label: 'Public page captured',
    detail: 'The reviewed page and its exact wording are recorded for the review.',
    status: 'CAPTURED',
  },
  {
    label: 'Privacy boundary applied',
    detail: 'Identifiers and health-intent indicators are kept out of the review layer.',
    status: 'FILTERED',
  },
  {
    label: 'Staff review',
    detail: 'Findings and drafts are checked by the operator before anything is used.',
    status: 'APPROVED',
  },
  {
    label: 'Dated record created',
    detail: 'The review ends as a dated record: claim wording, visible support, gap, and next action.',
    status: 'RECORDED',
  },
];

export default function EvidenceChain() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion() ?? false;
  const [activeCount, setActiveCount] = useState(reduced ? entries.length : 0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduced) { setActiveCount(reduced ? entries.length : 0); return; }
    const timers = [200, 700, 1200, 1700].map((t, i) =>
      setTimeout(() => setActiveCount(i + 1), t)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  return (
    <section
      id="evidence"
      ref={ref}
      className="py-32 md:py-40 relative z-10 bg-cream border-t border-sand-deep/15"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl mb-8"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-deep block mb-5">
            Review Workflow
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-ink">
            A review that ends in a{' '}
            <span className="italic text-sage-deep">dated record.</span>
          </h2>
          <p className="mt-5 font-sans text-mist text-base leading-[1.55] max-w-xl">
            Every review keeps the exact wording, the visible support, the remaining gap,
            and the safer framing draft together in one dated report.
          </p>
        </motion.div>

        {/* Visible label beside the exhibit */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sand-deep/25 bg-bone px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
          <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink/75">
            Sample workflow illustration &middot; fictional data &middot; not a live client record
          </span>
        </div>

        {/* Ledger header row */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-sand-deep/30">
          <div className="col-span-12 sm:col-span-9 text-[10px] font-mono uppercase tracking-[0.18em] text-mist/60">
            Workflow stage
          </div>
          <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-[0.18em] text-mist/60 text-right">
            Status
          </div>
        </div>

        {/* Ledger entries */}
        <div className="relative">
          {/* Traveling sage pulse on left edge */}
          {!reduced && inView && (
            <motion.div
              aria-hidden
              className="absolute left-0 w-px bg-sage-deep"
              style={{
                top: 0,
                height: '0%',
                boxShadow: '0 0 6px rgba(94,122,90,0.6)',
              }}
              animate={{ height: ['0%', '100%'] }}
              transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
            />
          )}

          {entries.map((entry, i) => {
            const isActive = i < activeCount;
            const isFinal = i === entries.length - 1;
            return (
              <div key={entry.label} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 }}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-sand-deep/20 relative items-center"
                >
                  {/* Entry label + detail */}
                  <div className="col-span-12 sm:col-span-9">
                    <p className="font-sans font-semibold text-ink text-base leading-snug">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-sm text-mist leading-[1.55]">
                      {entry.detail}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="col-span-12 sm:col-span-3 flex items-center justify-end gap-3">
                    {isFinal && isActive && <GoldSeal delay={0.4} />}
                    <div className="inline-flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-colors"
                        style={{
                          background: isActive ? STATUS_DOT[entry.status] : 'rgba(168,159,140,0.35)',
                          boxShadow:
                            isActive && entry.status === 'RECORDED'
                              ? '0 0 6px rgba(212,175,55,0.55)'
                              : 'none',
                        }}
                      />
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                          isActive
                            ? entry.status === 'RECORDED'
                              ? 'text-[#9C7A1E]'
                              : 'text-sage-deep'
                            : 'text-mist/40'
                        }`}
                      >
                        {isActive ? entry.status : '—'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-between items-center gap-3 text-[11px] font-mono uppercase tracking-[0.14em] text-mist/65"
        >
          <span>Review record · dated · retains wording, support, gap, and next action</span>
          <span className="tabular-nums">Sample workflow illustration</span>
        </motion.div>
      </div>
    </section>
  );
}
