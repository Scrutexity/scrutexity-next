"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Lock, FileText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ClaimCard } from './claim-card';
import type { ClaimAudit } from '@/data/claim-audits';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const STATUS_COLOR: Record<string, string> = {
  Verified: '#2F5D4A',
  'Weakly Supported': '#8A6A1E',
  Unsupported: '#8A533B',
  Overstated: '#8A533B',
  'Insufficient Public Evidence': '#6B6259',
  Expired: '#6B6259',
  Changed: '#3D6B7B',
  Revoked: '#A03A2F',
};

const BADGE_TONE: Record<string, { color: string; bg: string; border: string }> = {
  'Claim Audit Completed':       { color: '#2F5D4A', bg: 'rgba(94,122,90,0.10)',  border: 'rgba(94,122,90,0.35)' },
  'Claim Library Active':        { color: '#2F5D4A', bg: 'rgba(94,122,90,0.10)',  border: 'rgba(94,122,90,0.35)' },
  'Monitored by Scrutexity':     { color: '#3D6B7B', bg: 'rgba(61,107,123,0.08)', border: 'rgba(61,107,123,0.30)' },
  'Audited by Scrutexity':       { color: '#9C7A1E', bg: 'rgba(212,175,55,0.10)', border: 'rgba(212,175,55,0.45)' },
  'Expired — Rescan Required':   { color: '#8A533B', bg: 'rgba(183,137,107,0.10)',border: 'rgba(183,137,107,0.40)' },
};

function countByStatus(audit: ClaimAudit) {
  const counts: Record<string, number> = {};
  audit.claims.forEach((c) => {
    counts[c.status] = (counts[c.status] ?? 0) + 1;
  });
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
}

export default function ClaimAuditPublicContent({
  audit,
  unlocked,
}: {
  audit: ClaimAudit;
  unlocked: boolean;
}) {
  const badgeTone = BADGE_TONE[audit.badge];
  const breakdown = countByStatus(audit);

  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            <FileText size={12} />
            AuditGPT Claim Audit Report · {audit.publicId}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.75rem] text-ink tracking-[-0.03em] leading-[1.04] max-w-3xl"
          >
            {audit.companyType}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.16em] font-semibold"
              style={{
                background: badgeTone.bg,
                borderColor: badgeTone.border,
                color: badgeTone.color,
                fontFamily: MONO_STACK,
              }}
            >
              <ShieldCheck size={12} />
              {audit.badge}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.14em] text-mist/65 tabular-nums"
              style={{ fontFamily: MONO_STACK }}
            >
              Sealed {audit.auditDate} · expires {audit.auditExpires}
            </span>
          </motion.div>
        </div>
      </section>

      {/* REPORT HEADER + SCORE */}
      <section className="px-6 py-10 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl bg-bone border border-sand-deep/30 overflow-hidden"
            style={{
              boxShadow:
                '0 18px 44px -18px rgba(28,24,20,0.10), inset 0 1px 1px rgba(255,255,255,0.6)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-7 md:p-9">
                <span
                  className="text-[10px] uppercase tracking-[0.18em] text-mist/65 block mb-5"
                  style={{ fontFamily: MONO_STACK }}
                >
                  Report header
                </span>
                <dl className="divide-y divide-sand-deep/20">
                  <Row label="Audit type" value="Public Claim Audit" />
                  <Row label="Domain" value={audit.domain} mono />
                  <Row label="Audit date" value={audit.auditDate} mono />
                  <Row label="Pages reviewed" value={audit.pagesReviewed} />
                  <Row label="Claims reviewed" value={String(audit.claimsReviewed)} mono />
                  <Row label="Primary risk theme" value={audit.primaryRiskTheme} />
                </dl>
              </div>
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-sand-deep/25 p-7 md:p-9 flex flex-col items-center justify-center bg-cream">
                <span
                  className="text-[10px] uppercase tracking-[0.18em] text-mist/65 block text-center mb-2"
                  style={{ fontFamily: MONO_STACK }}
                >
                  Claim Risk Score
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-7xl text-ink tabular-nums tracking-[-0.03em] leading-none">
                    {audit.riskScore}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.16em] text-mist/60"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    / 100
                  </span>
                </div>
                <div className="mt-3 h-px w-12" style={{ background: '#D4AF37' }} />
                <span
                  className="mt-3 text-[10px] uppercase tracking-[0.14em] text-center text-clay-deep"
                  style={{ fontFamily: MONO_STACK }}
                >
                  {audit.riskScore >= 75
                    ? 'Requires qualified review'
                    : audit.riskScore >= 50
                    ? 'Mixed evidence record'
                    : 'Mostly well-supported'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BREAKDOWN */}
      <section className="px-6 py-20 md:py-24 border-t border-sand-deep/15">
        <div className="max-w-4xl mx-auto">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
            style={{ fontFamily: MONO_STACK }}
          >
            Claim breakdown
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.1]">
            {audit.claimsReviewed} claims, by state.
          </h2>

          <div
            className="mt-8 rounded-2xl bg-bone border border-sand-deep/30 overflow-hidden"
            style={{ boxShadow: '0 12px 32px -14px rgba(28,24,20,0.08), inset 0 1px 1px rgba(255,255,255,0.6)' }}
          >
            <div className="divide-y divide-sand-deep/20">
              {breakdown.map(({ status, count }) => (
                <div key={status} className="grid grid-cols-12 items-center gap-3 px-5 py-4">
                  <div className="col-span-7 flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: STATUS_COLOR[status] ?? '#1C1814' }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-[0.16em] font-semibold"
                      style={{ fontFamily: MONO_STACK, color: STATUS_COLOR[status] ?? '#1C1814' }}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(217,204,176,0.45)' }}>
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${(count / audit.claimsReviewed) * 100}%`,
                          background: STATUS_COLOR[status] ?? '#1C1814',
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="col-span-2 text-right text-sm text-ink/85 tabular-nums"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP PUBLIC-SAFE FINDINGS */}
      <section className="px-6 py-20 md:py-24 border-t border-sand-deep/15">
        <div className="max-w-4xl mx-auto">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
            style={{ fontFamily: MONO_STACK }}
          >
            Top public-safe findings
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.1]">
            What we&rsquo;re comfortable saying{' '}
            <span className="italic text-sage-deep">in public.</span>
          </h2>
          <ul className="mt-8 space-y-4">
            {audit.publicSafeFindings.map((f, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="text-[10px] uppercase tracking-[0.18em] text-sage-deep tabular-nums shrink-0 mt-1"
                  style={{ fontFamily: MONO_STACK }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base text-ink/85 leading-[1.65]">{f}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLAIM CARDS — gated by unlocked */}
      <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl mb-12"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              {unlocked ? 'Full claim inventory' : 'Sample claim records'}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              {unlocked ? 'Every claim,' : 'Three of the claims we reviewed,'}{' '}
              <span className="italic text-sage-deep">held to the same review.</span>
            </h2>
          </motion.div>
 
          <div className="space-y-6">
            {(unlocked ? audit.claims : audit.claims.slice(0, 3)).map((c, i) => (
              <ClaimCard key={i} claim={c} index={i} />
            ))}
          </div>
 
          {!unlocked && audit.claims.length > 3 && (() => {
            // Use the first claim from the report as the featured preview
            const featured = audit.claims[0];
            return (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="mt-8 space-y-5"
              >
                {/* Featured claim preview card */}
                <div
                  className="rounded-2xl border-2 border-clay/30 bg-bone overflow-hidden"
                  style={{ boxShadow: '0 14px 36px -14px rgba(183,137,107,0.18), inset 0 1px 1px rgba(255,255,255,0.6)' }}
                >
                  {/* Header bar */}
                  <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-sand-deep/20 bg-cream/60">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-clay" />
                      <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-clay" style={{ fontFamily: MONO_STACK }}>
                        Priority finding
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-[0.14em] font-bold border"
                        style={{
                          color: featured.riskLevel === 'High' ? '#8A533B' : '#8A6A1E',
                          background: featured.riskLevel === 'High' ? 'rgba(183,137,107,0.12)' : 'rgba(212,175,55,0.10)',
                          borderColor: featured.riskLevel === 'High' ? 'rgba(183,137,107,0.30)' : 'rgba(212,175,55,0.30)',
                        }}
                      >
                        {featured.riskLevel} Risk
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-[0.14em] font-bold border"
                        style={{
                          color: STATUS_COLOR[featured.status] ?? '#8A533B',
                          background: 'rgba(183,137,107,0.08)',
                          borderColor: 'rgba(183,137,107,0.25)',
                        }}
                      >
                        {featured.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    {/* Claim text */}
                    <div className="mb-6">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-mist mb-2" style={{ fontFamily: MONO_STACK }}>
                        Claim flagged · {featured.type} · Source: {featured.sourceType}
                      </p>
                      <p className="font-display text-xl md:text-2xl text-espresso italic leading-snug">
                        {featured.claim}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                      {/* Why it matters */}
                      <div className="p-4 rounded-xl bg-cream/70 border border-sand-deep/20">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-clay mb-2 font-semibold" style={{ fontFamily: MONO_STACK }}>
                          Why it matters
                        </p>
                        <p className="text-sm text-mist leading-relaxed">{featured.whyItMatters}</p>
                      </div>

                      {/* Support found/missing */}
                      <div className="p-4 rounded-xl bg-cream/70 border border-sand-deep/20 space-y-3">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.18em] text-sage-deep mb-1 font-semibold" style={{ fontFamily: MONO_STACK }}>
                            Support found
                          </p>
                          <p className="text-xs text-espresso/80 leading-relaxed">{featured.evidenceFound}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.18em] text-clay mb-1 font-semibold" style={{ fontFamily: MONO_STACK }}>
                            Support missing
                          </p>
                          <p className="text-xs text-mist leading-relaxed">{featured.evidenceGap}</p>
                        </div>
                      </div>
                    </div>

                    {/* Safer rewrite preview */}
                    <div className="p-4 rounded-xl border border-sage-deep/25 bg-sage/5 mb-6">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-sage-deep mb-2 font-semibold" style={{ fontFamily: MONO_STACK }}>
                        Safer rewrite preview
                      </p>
                      <p className="font-display text-base md:text-lg text-espresso italic leading-snug">
                        {featured.saferFraming}
                      </p>
                    </div>

                    {/* Gate message */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pt-6 border-t border-sand-deep/20">
                      <div className="flex items-start gap-3">
                        <Lock size={16} strokeWidth={1.8} className="text-sage-deep shrink-0 mt-0.5" />
                        <p className="text-sm text-mist leading-snug">
                          <span className="font-semibold text-espresso">{audit.claims.length - 3} more claims</span> are behind the unlock — including proof-gap table, AI Answer Reality Receipt, required proof list, and Claim Cleanup Record recommendation.
                        </p>
                      </div>
                      <Link
                        href="https://auditgpt.ai/snapshot?intent=paid&source=claim-report-gate"
                        className="shrink-0 group px-6 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 whitespace-nowrap"
                        style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
                      >
                        Unlock full Claim Exposure Audit — $497
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

        </div>
      </section>

      {/* FIX PLAN — unlocked only */}
      {unlocked && (
        <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15">
          <div className="max-w-5xl mx-auto">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Recommended fix plan
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Six edits before the next{' '}
              <span className="italic text-sage-deep">claim ships.</span>
            </h2>
            <ol className="mt-10 divide-y divide-sand-deep/20 border-t border-sand-deep/20">
              {audit.fixPlan.map((item) => (
                <li key={item.num} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                  <div className="md:col-span-2">
                    <span
                      className="text-[10px] uppercase tracking-[0.18em] text-sage-deep tabular-nums"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      {item.num}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="font-display text-xl text-ink tracking-[-0.01em] leading-snug">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm text-mist leading-[1.65]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* METHODOLOGY */}
      <section className="px-6 py-20 md:py-24 border-t border-sand-deep/15">
        <div className="max-w-4xl mx-auto">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
            style={{ fontFamily: MONO_STACK }}
          >
            Methodology
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.1]">
            How this audit was{' '}
            <span className="italic text-sage-deep">conducted.</span>
          </h2>
          <ul className="mt-8 space-y-3">
            {audit.methodology.map((m, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-sage-deep shrink-0" />
                <span className="text-sm text-ink/85 leading-[1.65]">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AUDIT SEAL */}
      {audit.auditSeal && (
        <section className="px-6 py-20 md:py-24 border-t border-sand-deep/15">
          <div className="max-w-4xl mx-auto">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Cryptographic Seal
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.1] mb-8">
              Website state <span className="italic text-sage-deep">sealed for audit integrity.</span>
            </h2>

            <div
              className="rounded-2xl bg-bone border border-sand-deep/30 p-6 md:p-8 space-y-6"
              style={{
                boxShadow:
                  '0 12px 32px -14px rgba(28,24,20,0.08), inset 0 1px 1px rgba(255,255,255,0.6)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1.5"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Captured at
                  </h3>
                  <p className="text-sm font-medium text-ink/85 tabular-nums" style={{ fontFamily: MONO_STACK }}>
                    {audit.auditSeal.capturedAt}
                  </p>
                </div>
                <div>
                  <h3
                    className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1.5"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Reviewed URL
                  </h3>
                  <p className="text-sm font-medium text-ink/85 break-all" style={{ fontFamily: MONO_STACK }}>
                    {audit.auditSeal.url}
                  </p>
                </div>
              </div>

              <div className="h-px bg-sand-deep/15" />

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1.5"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Algorithm
                  </h3>
                  <p className="text-xs font-semibold text-sage-deep tracking-wider" style={{ fontFamily: MONO_STACK }}>
                    {audit.auditSeal.algorithm.toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1.5"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Captured content hash (raw)
                  </h3>
                  <p className="text-xs text-ink/75 bg-cream/55 p-3 rounded-lg border border-sand-deep/20 select-all font-mono break-all leading-normal">
                    {audit.auditSeal.sha256}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-1.5"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Normalized hash
                  </h3>
                  <p className="text-xs text-ink/75 bg-cream/55 p-3 rounded-lg border border-sand-deep/20 select-all font-mono break-all leading-normal">
                    {audit.auditSeal.normalizedSha256}
                  </p>
                </div>
              </div>

              <div className="h-px bg-sand-deep/15" />

              <p className="text-[11px] text-mist/65 leading-[1.65]">
                {audit.auditSeal.disclaimer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* DISCLAIMER */}
      <section className="px-6 py-12 border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.14em] text-mist/55 leading-[1.7]"
            style={{ fontFamily: MONO_STACK }}
          >
            This report describes a composite archetype. It does not refer to
            any specific company. Scrutexity Claim Audits review public
            claim-support and marketing-risk; they are not legal, clinical, or
            regulatory advice.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 md:py-32 border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-ink tracking-[-0.02em] leading-[1.05]">
            Want this for{' '}
            <span className="italic text-sage-deep">your site?</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
            <Link
              href="/claim-audit"
              className="group px-7 py-4 bg-sage-deep hover:bg-ink text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
              style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
            >
              Run a Claim Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="group text-sm font-sans font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              See pricing
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="py-3 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
      <dt
        className="md:col-span-4 text-[10px] uppercase tracking-[0.16em] text-mist/65"
        style={{ fontFamily: MONO_STACK }}
      >
        {label}
      </dt>
      <dd
        className="md:col-span-8 text-sm text-ink/85 leading-[1.55]"
        style={mono ? { fontFamily: MONO_STACK } : undefined}
      >
        {value}
      </dd>
    </div>
  );
}
