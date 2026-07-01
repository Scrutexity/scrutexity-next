'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { ChevronDown, ChevronRight, Terminal } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;
const SNAP = [0.34, 1.56, 0.64, 1] as const;

// Status-stage color: sage gradient (capture → approval) escalates into champagne (sealed).
// One-time visual cue per row — earns the gold at the end of the chain.
const STATUS_DOT: Record<'CAPTURED' | 'FILTERED' | 'APPROVED' | 'SEALED', string> = {
  CAPTURED: 'rgba(94, 122, 90, 0.40)',
  FILTERED: 'rgba(94, 122, 90, 0.65)',
  APPROVED: 'rgba(94, 122, 90, 1.00)',
  SEALED:   '#D4AF37',
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

type Entry = {
  ts: string;
  relative: string;
  label: string;
  detail: string;
  status: 'CAPTURED' | 'FILTERED' | 'APPROVED' | 'SEALED';
  hash: string;
  prevHash: string;
  payload: any;
};

const entries: Entry[] = [
  {
    ts: '06.18 · 11:16:32',
    relative: '14 mins ago',
    label: 'Inquiry captured',
    detail: 'Inbound appointment payload mirrored into the read-only layer.',
    status: 'CAPTURED',
    hash: '8ab4f92c...e12d',
    prevHash: '72ea09fb...d4b1',
    payload: {
      event: "inquiry_captured",
      source: "boulevard_webhook",
      inquiry_id: "inq_78f1a",
      raw_payload_size_bytes: 1428,
      status: "queued"
    }
  },
  {
    ts: '06.18 · 11:16:33',
    relative: '14 mins ago',
    label: 'BAA filter applied',
    detail: 'Privacy boundary checks complete.',
    status: 'FILTERED',
    hash: '4e9b28a1...39cf',
    prevHash: '8ab4f92c...e12d',
    payload: {
      event: "baa_filtering",
      filter_rules_applied: ["strip_ssn", "strip_dob", "strip_patient_name", "hash_patient_id"],
      sanitized: true,
      patient_id_hash: "sha256:d82f...91bc",
      payload: {
        inquiry_id: "inq_78f1a",
        appointment_type: "Laser Resurfacing",
        requested_time: "2026-06-23T14:00:00Z"
      }
    }
  },
  {
    ts: '06.18 · 11:19:47',
    relative: '11 mins ago',
    label: 'Staff review passed',
    detail: 'Message approved by licensed staff. 4-min median response.',
    status: 'APPROVED',
    hash: '9d2c1840...776f',
    prevHash: '4e9b28a1...39cf',
    payload: {
      event: "staff_review",
      reviewed_by: "agent_licensed_lpn_04",
      verdict: "APPROVED",
      approved_at: "2026-06-18T15:19:47Z",
      response_draft_length: 124
    }
  },
  {
    ts: '06.18 · 11:26:01',
    relative: '5 mins ago',
    label: 'Ledger sealed',
    detail: 'Tamper-evident record pushed to the governed vault.',
    status: 'SEALED',
    hash: '12ab984d...9d01',
    prevHash: '9d2c1840...776f',
    payload: {
      event: "ledger_seal",
      block_number: 89424,
      previous_block_hash: "sha256:9d2c1840...776f",
      block_hash: "sha256:12ab984d...9d01",
      signatures: ["scrutexity_governor_v1", "ledger_validator_02"]
    }
  },
];

export default function EvidenceChain() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion() ?? false;
  const [activeCount, setActiveCount] = useState(reduced ? entries.length : 0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const blockNumber = useStore((s) => s.blockNumber);
  const timeLeft = useStore((s) => s.timeLeft);

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
          className="max-w-2xl mb-16"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-deep block mb-5">
            Proof of Governance
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-ink">
            Every recovery,{' '}
            <span className="italic text-sage-deep">sealed.</span>
          </h2>
          <p className="mt-5 font-sans text-mist text-base leading-[1.55] max-w-xl">
            A tamper-evident ledger. Each entry carries the cryptographic fingerprint
            of the one before it. The vault knows if a single byte changes.
          </p>
        </motion.div>

        {/* Ledger header row */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-sand-deep/30">
          <div className="col-span-3 text-[10px] font-mono uppercase tracking-[0.18em] text-mist/60">
            Timestamp
          </div>
          <div className="col-span-6 text-[10px] font-mono uppercase tracking-[0.18em] text-mist/60">
            Entry
          </div>
          <div className="col-span-3 text-[10px] font-mono uppercase tracking-[0.18em] text-mist/60 text-right">
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
              <div key={entry.ts} className="relative">
                {/* Hairline previous hash connectors */}
                {i > 0 && isActive && (
                  <div className="grid grid-cols-12 gap-4 py-1.5 pl-4 sm:pl-0">
                    <div className="col-span-12 sm:col-span-9 sm:col-start-4 flex items-center gap-2 text-[9px] font-mono text-mist/40 border-l border-sand-deep/20 ml-[3px] pl-3">
                      <span className="w-1 h-1 rounded-full bg-sand-deep/40" />
                      <span>PREV_HASH: {entry.prevHash}</span>
                    </div>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 }}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-sand-deep/20 relative items-center"
                >
                  {/* Timestamp with hover relative time */}
                  <div className="col-span-12 sm:col-span-3 font-mono text-xs text-mist tabular-nums relative group">
                    <span className="cursor-help underline decoration-dotted decoration-mist/30 underline-offset-4">
                      {entry.ts}
                    </span>
                    <span className="absolute left-0 bottom-6 bg-ink text-cream text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow z-20 font-sans tracking-normal">
                      {entry.relative}
                    </span>
                  </div>

                  {/* Entry label + detail */}
                  <div className="col-span-12 sm:col-span-6">
                    <p className="font-sans font-semibold text-ink text-base leading-snug">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-sm text-mist leading-[1.55]">
                      {entry.detail}
                    </p>

                    {/* Expandable raw payload toggle */}
                    {isActive && (
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        className="mt-2.5 text-[9px] font-mono text-sage-deep hover:text-sage-deep/80 flex items-center gap-1 focus:outline-none uppercase tracking-wider font-extrabold"
                      >
                        <Terminal size={10} />
                        {expandedIndex === i ? 'Hide Raw Payload' : 'Show Raw Payload'}
                        {expandedIndex === i ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                      </button>
                    )}

                    {/* Collapsible raw JSON panel */}
                    <AnimatePresence>
                      {isActive && expandedIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden mt-2 bg-ink/5 rounded border border-sand-deep/15"
                        >
                          <pre className="p-3 text-[10px] font-mono text-mist/95 whitespace-pre-wrap leading-relaxed">
                            {JSON.stringify(entry.payload, null, 2)}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                            isActive && entry.status === 'SEALED'
                              ? '0 0 6px rgba(212,175,55,0.55)'
                              : 'none',
                        }}
                      />
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                          isActive
                            ? entry.status === 'SEALED'
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

          {/* DYNAMIC TICKING PENDING BLOCK ENTRY */}
          {activeCount >= entries.length && (
            <div className="relative">
              {/* Previous Hash Link connecting previous sealed block */}
              <div className="grid grid-cols-12 gap-4 py-1.5 pl-4 sm:pl-0">
                <div className="col-span-12 sm:col-span-9 sm:col-start-4 flex items-center gap-2 text-[9px] font-mono text-mist/40 border-l border-sand-deep/20 ml-[3px] pl-3">
                  <span className="w-1 h-1 rounded-full bg-sand-deep/40" />
                  <span>PREV_HASH: 12ab984d...9d01</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="grid grid-cols-12 gap-4 py-6 border-b border-sand-deep/20 relative items-center bg-sand-light/10"
              >
                {/* Timestamp */}
                <div className="col-span-12 sm:col-span-3 font-mono text-xs text-mist tabular-nums relative group flex items-center gap-1.5 pl-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay animate-ping" />
                  <span className="cursor-help underline decoration-dotted decoration-mist/30 underline-offset-4 font-bold text-clay-deep">
                    Sealing...
                  </span>
                  <span className="absolute left-0 bottom-6 bg-ink text-cream text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow z-20 font-sans tracking-normal font-normal">
                    Pending proof seal
                  </span>
                </div>

                {/* Entry label + detail */}
                <div className="col-span-12 sm:col-span-6">
                  <p className="font-sans font-semibold text-ink text-base leading-snug">
                    Assembling Block #{blockNumber}
                  </p>
                  <p className="mt-1 text-sm text-mist leading-[1.55]">
                    Consolidating transaction roots. Sealing block in{' '}
                    <span className="font-mono text-clay-deep font-bold">
                      {timeLeft === 60 ? '01:00' : `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`}
                    </span>
                    .
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-12 sm:col-span-3 flex items-center justify-end gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay-deep animate-pulse font-bold">
                    PENDING
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Footer ledger receipt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-between items-center gap-3 text-[11px] font-mono uppercase tracking-[0.14em] text-mist/65"
        >
          <span>BLOCK {blockNumber - 3} · SEALED</span>
          <span className="tabular-nums">sha256 · e7d3…5a80</span>
        </motion.div>
      </div>
    </section>
  );
}
