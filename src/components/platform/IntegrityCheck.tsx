'use client';

import { useState } from 'react';

/**
 * Tamper-evident integrity check — interactive, client-side illustration.
 *
 * Warm/light per DESIGN_SYSTEM.md (never dark). Non-clinical: this demonstrates
 * record integrity for administrative events, not clinical decisioning. The
 * hashes and record are illustrative; nothing here is a live deployment.
 */

const SEALED_HASH = '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f';
const RECOMPUTED_HASH = '0x3a9e44c1b0d27e6a1f55c0e9ab83d7104e6b2f9c';

export default function IntegrityCheck() {
  const [tampered, setTampered] = useState(false);

  return (
    <div className="rounded-[1.5rem] border border-sand-deep bg-cream p-6 shadow-card sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-clay-deep">
          Integrity check
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
            tampered
              ? 'border-[#6b1d2f]/25 bg-[#6b1d2f]/8 text-[#6b1d2f]'
              : 'border-[#7f8f78]/30 bg-[#7f8f78]/12 text-verified'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${tampered ? 'bg-[#6b1d2f]' : 'bg-sage-accent'}`}
          />
          {tampered ? 'Change rejected' : 'Sealed · verified'}
        </span>
      </div>

      {/* Record */}
      <dl className="mt-6 space-y-0 font-mono text-[0.82rem]">
        <Row k="event" v="missed_consult" />
        <Row k="source" v="boulevard" />
        <Row k="location" v="NYC · Flatiron" />
        <Row
          k="action"
          v={
            tampered ? (
              <span className="inline-flex items-center gap-2">
                <span className="text-espresso/40 line-through">escalated_to_np</span>
                <span className="text-[#6b1d2f]">bypassed</span>
              </span>
            ) : (
              'escalated_to_np'
            )
          }
        />
      </dl>

      {/* Hashes */}
      <div className="mt-5 space-y-2 border-t border-sand-deep pt-5">
        <HashRow label="Sealed hash" value={SEALED_HASH} tone="ink" />
        {tampered && (
          <HashRow label="Recomputed" value={RECOMPUTED_HASH} tone="alert" />
        )}
      </div>

      {/* Status banner */}
      <div
        aria-live="polite"
        className={`mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[0.82rem] leading-relaxed transition-colors duration-300 ${
          tampered
            ? 'border-[#6b1d2f]/20 bg-[#6b1d2f]/[0.05] text-[#6b1d2f]'
            : 'border-[#7f8f78]/25 bg-[#7f8f78]/[0.08] text-[#3b6d44]'
        }`}
      >
        <span aria-hidden className="mt-0.5 shrink-0">
          {tampered ? <AlertIcon /> : <CheckIcon />}
        </span>
        <span>
          {tampered
            ? 'Hash mismatch — the change was rejected and written to the audit trail as an exception.'
            : 'Recomputed hash matches the sealed record. No drift detected.'}
        </span>
      </div>

      {/* Control */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setTampered((t) => !t)}
          className="btn-ghost"
        >
          {tampered ? 'Re-seal record' : 'Simulate a tamper attempt'}
        </button>
        <span className="font-mono text-[0.68rem] text-[#857a6e]">
          Illustrative · client-side
        </span>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3 border-b border-sand-deep/50 py-2.5 last:border-b-0">
      <dt className="text-[0.7rem] uppercase tracking-[0.08em] text-[#857a6e]">{k}</dt>
      <dd className="text-espresso">{v}</dd>
    </div>
  );
}

function HashRow({ label, value, tone }: { label: string; value: string; tone: 'ink' | 'alert' }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[#857a6e]">
        {label}
      </span>
      <span
        className={`truncate font-mono text-[0.74rem] ${
          tone === 'alert' ? 'text-[#6b1d2f]' : 'text-clay-deep'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
