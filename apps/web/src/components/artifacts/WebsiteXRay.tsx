'use client';

/**
 * WebsiteXRay — the signature artifact.
 * A browser mockup with claim overlays (supported / weak / unsupported).
 * Clicking a claim opens a side drawer with status, evidence, and a suggested
 * rewrite. Consumes the canonical ClaimRecord model. Warm clinical luxury.
 */

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, FileSearch, ShieldCheck, AlertTriangle, ScanLine, ArrowRight } from 'lucide-react';
import { ArtifactHeading, Reveal, STATUS_META, MONO_STACK, EASE } from './_shared';
import { SAMPLE_CLAIMS, type ClaimRecord, type Status } from '@/lib/claim-intelligence';

const ICON: Record<Status, typeof ShieldCheck> = {
  supported: ShieldCheck,
  weak: AlertTriangle,
  unsupported: AlertTriangle,
};

export interface WebsiteXRayProps {
  /** Claims to overlay. Only claims with an `overlay` position are drawn. */
  claims?: ClaimRecord[];
  /** Optional screenshot URL; a styled mock is used when omitted. */
  screenshot?: string;
  url?: string;
}

export default function WebsiteXRay({ claims = SAMPLE_CLAIMS, screenshot, url }: WebsiteXRayProps) {
  const [active, setActive] = useState<ClaimRecord | null>(null);
  const reduce = useReducedMotion();
  const overlays = claims.filter((c) => c.overlay);
  const pageUrl = url ?? 'yourclinic.com/weight-loss';

  return (
    <section className="relative overflow-hidden border-t border-sand-deep/15 bg-cream px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ArtifactHeading
            kicker="Claim Intelligence · Website X-Ray"
            title="See every public claim"
            italic="through a review-risk lens."
            body="We scan your live page and overlay each claim with its evidence status. Click any claim to see what supports it — and a safer rewrite when it doesn't."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* ── Browser mockup ── */}
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[1.4rem] border border-sand-deep/40 bg-beige/60 shadow-[0_35px_90px_-50px_rgba(28,24,20,0.55)]">
              {/* chrome */}
              <div className="flex items-center gap-3 border-b border-sand-deep/30 bg-cream px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-clay" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sand-deep" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sage-deep" />
                </div>
                <div
                  className="flex flex-1 items-center gap-2 rounded-lg border border-sand-deep/30 bg-beige/70 px-3 py-1.5 text-[11px] text-mist"
                  style={{ fontFamily: MONO_STACK }}
                >
                  <ScanLine size={12} className="text-sage-deep" />
                  {pageUrl}
                </div>
                <span
                  className="hidden items-center gap-1.5 rounded-full border border-sage/30 bg-sage/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-sage-deep sm:inline-flex"
                  style={{ fontFamily: MONO_STACK }}
                >
                  <FileSearch size={10} /> Scanning
                </span>
              </div>

              {/* mock page body with overlays */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream p-6 sm:p-8">
                {screenshot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={screenshot} alt="Audited page" className="absolute inset-0 h-full w-full object-cover object-top" />
                ) : (
                  <div className="space-y-3 opacity-90">
                    <div className="h-3 w-24 rounded bg-sand-deep/40" />
                    <div className="h-7 w-3/4 rounded bg-sand-deep/30" />
                    <div className="h-4 w-1/2 rounded bg-sand-deep/25" />
                    <div className="mt-6 h-4 w-2/3 rounded bg-sand-deep/20" />
                    <div className="h-4 w-3/5 rounded bg-sand-deep/20" />
                    <div className="mt-6 h-4 w-1/2 rounded bg-sand-deep/20" />
                    <div className="mt-8 h-9 w-40 rounded-full bg-clay/40" />
                  </div>
                )}

                {/* soft diffused warm sweep — reads the page contextually, not a laser line */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 z-20 h-40 bg-gradient-to-b from-transparent via-clay/[0.08] to-clay/15 blur-2xl"
                    initial={{ top: '-30%' }}
                    animate={{ top: '120%' }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                  />
                )}

                {/* claim overlay boxes */}
                {overlays.map((claim, i) => {
                  const meta = STATUS_META[claim.status];
                  const Icon = ICON[claim.status];
                  const isActive = active?.id === claim.id;
                  // Tactile depth — anomalies (unsupported) get physical presence; safe claims recede.
                  const depth =
                    claim.status === 'unsupported'
                      ? 'shadow-[0_6px_18px_-6px_rgba(183,137,107,0.55)] hover:shadow-[0_12px_30px_-6px_rgba(183,137,107,0.75)]'
                      : claim.status === 'weak'
                        ? 'shadow-[0_4px_12px_-6px_rgba(183,137,107,0.4)] hover:shadow-[0_8px_20px_-6px_rgba(183,137,107,0.5)]'
                        : 'opacity-75 hover:opacity-100';
                  return (
                    <motion.button
                      key={claim.id}
                      type="button"
                      onClick={() => setActive(claim)}
                      initial={reduce ? false : { opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                      whileInView={reduce ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.15 }}
                      className={`group absolute flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left backdrop-blur-[1px] transition-all duration-300 ${meta.bg} ${meta.border} ${depth} ${
                        isActive ? 'ring-2 ring-offset-1 ring-offset-cream' : ''
                      }`}
                      style={{
                        top: claim.overlay!.top,
                        left: claim.overlay!.left,
                        width: claim.overlay!.width,
                        ...(isActive ? { ['--tw-ring-color' as string]: meta.hex } : {}),
                      }}
                      aria-label={`${meta.label}: ${claim.text}`}
                    >
                      <span className={`truncate text-[11px] font-semibold ${meta.text}`}>
                        {claim.text}
                      </span>
                      <Icon size={12} className={`shrink-0 ${meta.text}`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* ── Side drawer / legend ── */}
          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-[1.4rem] border border-sand-deep/40 bg-espresso p-6 text-cream">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.14em]"
                        style={{
                          fontFamily: MONO_STACK,
                          color: active.status === 'supported' ? '#C7D4C2' : '#fff',
                          background:
                            active.status === 'supported'
                              ? 'rgba(143,169,138,0.22)'
                              : active.status === 'weak'
                                ? 'rgba(183,137,107,0.25)'
                                : 'rgba(107,29,47,0.35)',
                        }}
                      >
                        {STATUS_META[active.status].label}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActive(null)}
                        className="rounded-full p-1 text-cream/50 transition-colors hover:text-cream"
                        aria-label="Close claim detail"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <p
                      className={`mt-4 font-display text-xl leading-snug ${
                        active.status === 'supported'
                          ? 'text-cream'
                          : 'text-cream/55 line-through decoration-clay/60 decoration-2'
                      }`}
                    >
                      “{active.text}”
                    </p>

                    <div className="mt-5 space-y-4 text-sm">
                      <div>
                        <p
                          className="mb-1 text-[10px] uppercase tracking-[0.14em] text-cream/45"
                          style={{ fontFamily: MONO_STACK }}
                        >
                          Evidence
                        </p>
                        <p className="leading-relaxed text-cream/80">{active.evidenceNote}</p>
                      </div>
                      {active.rewritten && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
                          className="relative overflow-hidden rounded-xl border border-sage-soft/25 bg-sage-soft/10 p-3.5 pl-4"
                        >
                          <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-sage" />
                          <p
                            className="mb-1 text-[10px] uppercase tracking-[0.14em] text-sage-soft"
                            style={{ fontFamily: MONO_STACK }}
                          >
                            Safer rewrite
                          </p>
                          <p className="leading-relaxed text-cream/85">{active.rewritten}</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col"
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.14em] text-cream/45"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      Claim inspector
                    </p>
                    <p className="mt-3 font-display text-2xl leading-snug text-cream">
                      Select a highlighted claim.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-cream/65">
                      Each box is a claim we found on the page. Color shows its evidence status.
                    </p>

                    <div className="mt-auto space-y-2.5 pt-6">
                      {(['supported', 'weak', 'unsupported'] as Status[]).map((s) => (
                        <div key={s} className="flex items-center gap-2.5">
                          <span className={`h-2.5 w-2.5 rounded-full ${STATUS_META[s].dot}`} />
                          <span className="text-xs text-cream/70">{STATUS_META[s].label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://auditgpt.ai/snapshot?source=website-xray"
              className="group inline-flex items-center gap-2 rounded-xl bg-sage-deep px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso"
              style={{ boxShadow: '0 18px 40px -20px rgba(94,122,90,0.8)' }}
            >
              X-ray my page
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="text-xs text-mist">Illustrative scan. Estimates require manual verification.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
