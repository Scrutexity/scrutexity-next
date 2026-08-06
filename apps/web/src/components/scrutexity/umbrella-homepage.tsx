"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { LivingClaimReceipt } from "@/components/scrutexity/motion/living-claim-receipt";
import { WebsiteXRayInteractive } from "@/components/scrutexity/motion/website-xray-interactive";
import { ClaimDriftTimeline } from "@/components/scrutexity/motion/claim-drift-timeline";
import { ProofArtifactShelf } from "@/components/scrutexity/motion/proof-artifact-shelf";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const SNAPSHOT_URL = "/snapshot";

function IndexLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.14em] uppercase text-muted" style={{ fontFamily: MONO }}>
      <span className="text-bureau-sage">{num}</span>
      <span className="h-px w-6 bg-sand-deep" aria-hidden />
      <span>{text}</span>
    </div>
  );
}

export default function UmbrellaHomepage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      
      {/* ── 1. Hero + Living Claim Receipt ── */}
      <section className="border-b border-sand-deep bg-paper-light px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <IndexLabel num="01" text="Claim Intelligence Standard" />
            
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-[1.08] tracking-tight">
              Timestamped evidence infrastructure for public marketing claims.
            </h1>
            
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink/80 max-w-2xl font-normal">
              Scrutexity monitors public web copy, flags FTC/FDA pattern mismatches and AI claim distortions, and generates a dated, hash-chained audit record.
            </p>
            
            <p className="mt-4 text-xs leading-relaxed text-muted font-mono" style={{ fontFamily: MONO }}>
              Designed for high-risk sectors (wellness/med-spa, GLP-1, aesthetic devices), deal teams, General Counsel, and growth leaders.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={SNAPSHOT_URL}
                onClick={() => trackEvent("cta_click", { cta_label: "Run Free Claim Snapshot", section: "hero" })}
                className="inline-flex min-h-11 items-center gap-2 bg-ink px-7 py-3 text-xs font-semibold tracking-wider uppercase text-paper-light hover:bg-clay-deep transition-colors"
                style={{ fontFamily: MONO }}
              >
                Run Free Claim Snapshot <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/sample-report"
                className="inline-flex items-center gap-1 text-xs font-mono text-ink underline decoration-sand-deep underline-offset-4 hover:decoration-bureau-sage"
                style={{ fontFamily: MONO }}
              >
                Inspect Sample Report <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 pt-4 border-t border-sand-deep/60 flex items-center gap-3 text-[10px] font-mono text-muted" style={{ fontFamily: MONO }}>
              <span className="h-1.5 w-1.5 rounded-full bg-bureau-sage" aria-hidden />
              <span>PUBLIC PAGES ONLY &middot; SOURCE-LINKED &middot; NOT LEGAL ADVICE</span>
            </div>
          </div>

          {/* Hero Living Claim Receipt */}
          <div className="lg:col-span-5">
            <LivingClaimReceipt />
          </div>
        </div>
      </section>

      {/* ── 2. Website X-Ray (Main Conversion Artifact) ── */}
      <section className="border-b border-sand-deep bg-paper py-16 sm:py-24">
        <WebsiteXRayInteractive />
      </section>

      {/* ── 3. Three Outcomes (Find Exposure / Correct Language / Keep Record Current) ── */}
      <section className="border-b border-sand-deep bg-paper-light px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <IndexLabel num="03" text="Core Outcomes" />
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-ink font-normal">
              Three institutional outcomes.
            </h2>
            <p className="mt-3 text-sm text-muted">
              Scrutexity converts public claim exposure into documented evidentiary clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Outcome 1 */}
            <div className="bg-paper border border-sand-deep p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
                  OUTCOME 01
                </span>
                <h3 className="mt-3 font-display text-xl text-ink font-normal">Find Exposure First</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Identify unsubstantiated biological mechanism claims, absolute safety promises, or guaranteed ROI statements before regulators or buyers do.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand-deep/60 text-[10px] font-mono text-bureau-sage" style={{ fontFamily: MONO }}>
                VECTOR MATCHING // FTC + FDA
              </div>
            </div>

            {/* Outcome 2 */}
            <div className="bg-paper border border-sand-deep p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
                  OUTCOME 02
                </span>
                <h3 className="mt-3 font-display text-xl text-ink font-normal">Correct Language</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Replace weak or overstated claims with evidence-anchored phrasing that preserves commercial power while eliminating legal risk.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand-deep/60 text-[10px] font-mono text-bureau-sage" style={{ fontFamily: MONO }}>
                SAFER REWRITE EXHIBITS
              </div>
            </div>

            {/* Outcome 3 */}
            <div className="bg-paper border border-sand-deep p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-[0.14em]" style={{ fontFamily: MONO }}>
                  OUTCOME 03
                </span>
                <h3 className="mt-3 font-display text-xl text-ink font-normal">Keep Record Current</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Maintain a dated, hash-chained record of public copy changes and evidentiary updates over time with automated S-Mark verification.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand-deep/60 text-[10px] font-mono text-bureau-sage" style={{ fontFamily: MONO }}>
                SHA-256 DIGEST LEDGER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Claim Drift Timeline ── */}
      <section className="border-b border-sand-deep bg-paper py-16 sm:py-24">
        <ClaimDriftTimeline />
      </section>

      {/* ── 5. Proof Artifact Shelf ── */}
      <section className="border-b border-sand-deep bg-paper-light py-16 sm:py-24">
        <ProofArtifactShelf />
      </section>

      {/* ── 6. Final Scan CTA ── */}
      <section id="snapshot" className="bg-paper px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-4xl border border-sand-deep bg-paper-light p-8 sm:p-12 text-center shadow-xs">
          <IndexLabel num="06" text="Intake Diagnostic" />
          <h2 className="mt-4 font-display text-3xl sm:text-5xl text-ink font-normal leading-tight">
            Know what your public site is actually claiming.
          </h2>
          <p className="mt-4 text-sm text-muted max-w-xl mx-auto">
            Paste any public marketing URL. Scrutexity generates a free point-in-time claim snapshot delivered to your inbox.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href={SNAPSHOT_URL}
              onClick={() => trackEvent("cta_click", { cta_label: "Run Free Snapshot", section: "final-cta" })}
              className="inline-flex min-h-12 items-center gap-2 bg-ink px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-paper-light hover:bg-clay-deep transition-colors"
              style={{ fontFamily: MONO }}
            >
              Run Free Snapshot <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 text-[10px] font-mono text-muted" style={{ fontFamily: MONO }}>
            PUBLIC PAGES ONLY &middot; NO LOGIN REQUIRED &middot; CONFIDENTIAL DEFAULT
          </div>
        </div>
      </section>

    </div>
  );
}
