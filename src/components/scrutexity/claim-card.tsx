"use client";

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export type ClaimStatus =
  | 'Verified'
  | 'Reviewed'
  | 'Remediated'
  | 'Updated'
  | 'Claim-adjusted'
  | 'Weakly Supported'
  | 'Unsupported'
  | 'Overstated'
  | 'Insufficient Public Evidence';

export type ClaimRisk = 'Low' | 'Medium' | 'High';

export type Claim = {
  claim: string;
  type: string;
  status: ClaimStatus;
  riskLevel: ClaimRisk;
  sourceType: string;
  whyItMatters: string;
  evidenceFound: string;
  evidenceGap: string;
  recommendedAction: string;
  saferFraming: string;
  requiredProof: string;
};

const STATUS_TONE: Record<ClaimStatus, { color: string; bg: string; border: string }> = {
  Verified:                       { color: '#2F5D4A', bg: 'rgba(94,122,90,0.10)',  border: 'rgba(94,122,90,0.35)' },
  Reviewed:                       { color: '#2F5D4A', bg: 'rgba(94,122,90,0.10)',  border: 'rgba(94,122,90,0.35)' },
  Remediated:                     { color: '#2F5D4A', bg: 'rgba(94,122,90,0.10)',  border: 'rgba(94,122,90,0.35)' },
  Updated:                        { color: '#2F5D4A', bg: 'rgba(94,122,90,0.10)',  border: 'rgba(94,122,90,0.35)' },
  'Claim-adjusted':               { color: '#2F5D4A', bg: 'rgba(94,122,90,0.10)',  border: 'rgba(94,122,90,0.35)' },
  'Weakly Supported':             { color: '#8A6A1E', bg: 'rgba(212,175,55,0.10)', border: 'rgba(212,175,55,0.35)' },
  Unsupported:                    { color: '#8A533B', bg: 'rgba(183,137,107,0.10)',border: 'rgba(183,137,107,0.40)' },
  Overstated:                     { color: '#8A533B', bg: 'rgba(183,137,107,0.10)',border: 'rgba(183,137,107,0.40)' },
  'Insufficient Public Evidence': { color: '#6B6259', bg: 'rgba(107,98,89,0.08)',   border: 'rgba(107,98,89,0.25)' },
};

const RISK_DOT: Record<ClaimRisk, string> = {
  Low:    'rgba(94,122,90,0.85)',
  Medium: '#D4AF37',
  High:   '#B7896B',
};

type Row = { label: string; body: string };

export function ClaimCard({
  claim,
  index = 0,
  compact = false,
}: {
  claim: Claim;
  index?: number;
  compact?: boolean;
}) {
  const tone = STATUS_TONE[claim.status];
  const rows: Row[] = [
    { label: 'Why it matters',    body: claim.whyItMatters },
    { label: 'Evidence found',    body: claim.evidenceFound },
    { label: 'Evidence gap',      body: claim.evidenceGap },
    { label: 'Recommended action',body: claim.recommendedAction },
    { label: 'Safer framing',     body: claim.saferFraming },
    { label: 'Required proof',    body: claim.requiredProof },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      className="rounded-2xl bg-bone border border-sand-deep/30 overflow-hidden"
      style={{
        boxShadow:
          '0 14px 32px -16px rgba(28,24,20,0.08), inset 0 1px 1px rgba(255,255,255,0.6)',
      }}
    >
      {/* Header: status pill + risk dot + source */}
      <div className="px-6 py-4 border-b border-sand-deep/25 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-[0.14em] font-semibold"
            style={{
              background: tone.bg,
              borderColor: tone.border,
              color: tone.color,
              fontFamily: MONO_STACK,
            }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: tone.color }}
            />
            {claim.status}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.14em] text-mist/70"
            style={{ fontFamily: MONO_STACK }}
          >
            {claim.type}
          </span>
        </div>
        <div className="inline-flex items-center gap-3">
          <span
            className="text-[10px] uppercase tracking-[0.14em] text-mist/65"
            style={{ fontFamily: MONO_STACK }}
          >
            Source · {claim.sourceType}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em]"
            style={{ fontFamily: MONO_STACK, color: tone.color }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: RISK_DOT[claim.riskLevel] }}
            />
            Risk · {claim.riskLevel}
          </span>
        </div>
      </div>

      {/* The claim itself — quoted serif */}
      <div className="px-6 pt-6 pb-5">
        <p
          className="font-display text-xl md:text-2xl text-ink tracking-[-0.01em] leading-[1.3] italic"
        >
          &ldquo;{claim.claim}&rdquo;
        </p>
      </div>

      {/* Diligence rows — mono label + body */}
      {!compact && (
        <div className="divide-y divide-sand-deep/20 border-t border-sand-deep/20">
          {rows.map((row) => (
            <div
              key={row.label}
              className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6"
            >
              <div className="md:col-span-3">
                <span
                  className="text-[10px] uppercase tracking-[0.16em] text-mist/65"
                  style={{ fontFamily: MONO_STACK }}
                >
                  {row.label}
                </span>
              </div>
              <div className="md:col-span-9">
                <p className="text-sm text-ink/85 leading-[1.65]">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}
