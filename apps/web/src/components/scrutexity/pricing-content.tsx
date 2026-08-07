"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Kicker, MONO } from "@/components/scrutexity/intel-kit";
import { MouseSpotlight } from "@/components/scrutexity/motion/mouse-spotlight";

const SNAPSHOT_URL = "/snapshot";

function TierChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-amber-badge/25 bg-amber-bg px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-amber-badge uppercase"
      style={{ fontFamily: MONO }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-badge" aria-hidden />
      {label}
    </span>
  );
}

export default function PricingContent() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      <section className="border-b border-hairline/30 bg-paper-light px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Kicker>Pricing</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-[2.5rem] leading-[1.07] text-ink sm:text-5xl lg:text-6xl">
            The intelligence funnel.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink/80">
            Five tiers, one escalation: from a free point-in-time preview to ongoing,
            hash-chained monitoring. Automated tiers below the line; bespoke forensic
            infrastructure above it.
          </p>
        </div>
      </section>

      {/* ── Automated tiers: Triage + Verification ── */}
      <section className="bg-paper px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <Kicker>Automated intelligence</Kicker>
            <span className="text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
              Self-serve · Immediate
            </span>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Triage — Free Snapshot */}
            <article className="relative flex flex-col rounded-[2rem] border border-hairline/50 bg-paper-light p-8">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-ink">Free Snapshot</h3>
                  <TierChip label="3 flags" />
                </div>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
                  Tier 1 — Triage
                </p>
                <p className="mt-3 text-3xl font-medium text-ink">$0</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Automated point-in-time exposure preview. The low-friction entry.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  <li className="flex gap-2"><span className="text-accent">•</span> 3 high-level flags</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> Identify key claims</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> No sources linked</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> Delivered by email</li>
                </ul>
              </div>
              <Link
                href={SNAPSHOT_URL}
                className="mt-8 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-bright"
              >
                Run Your Free Snapshot <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>

            {/* Verification — Claim Support Review */}
            <MouseSpotlight className="rounded-[2rem]">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-accent/40 bg-paper-light p-8 shadow-md">
              <div className="absolute right-0 top-0 rounded-bl-[2rem] bg-accent px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper" style={{ fontFamily: MONO }}>
                First paid record
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 pt-4">
                  <h3 className="font-display text-2xl text-ink">Claim Support Review</h3>
                  <TierChip label="1 exhibit" />
                </div>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
                  Tier 2 — Verification
                </p>
                <p className="mt-3 text-3xl font-medium text-ink">$99</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  The first paid receipt. Establishes a formal, dated review trail.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted font-medium">
                  <li className="flex gap-2"><span className="text-accent">✓</span> 1 deep-dive Exhibit A</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Exact claim captured</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Visible evidence found</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Evidence gap mapped</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Safer rewrite provided</li>
                  <li className="flex gap-2"><span className="text-accent">✓</span> Dated review record</li>
                </ul>
              </div>
              <Link
                href="/snapshot"
                className="mt-8 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-bright"
              >
                Get the Detailed Review <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            </MouseSpotlight>
          </div>
        </div>
      </section>

      {/* ── The threshold ── */}
      <section className="border-y border-hairline/30 bg-paper-light px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-4">
            <span className="text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
              Automated
            </span>
            <span className="h-px w-16 bg-hairline" aria-hidden />
            <ArrowDown size={14} className="text-accent" aria-hidden="true" />
            <span className="h-px w-16 bg-hairline" aria-hidden />
            <span className="text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
              Bespoke
            </span>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-muted">
            Below the line: self-serve software. Above it: scoped forensic infrastructure,
            priced by the size of the public footprint and the depth of the review.
          </p>
        </div>
      </section>

      {/* ── Consultative tiers: Diagnostic + Diligence + Watch ── */}
      <section className="bg-paper-light px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <Kicker>Bespoke forensic infrastructure</Kicker>
            <span className="text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
              Scoped · Counsel &amp; diligence teams
            </span>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Assessment — Exposure Diagnostic */}
            <article className="flex flex-col rounded-[2rem] border border-hairline/50 bg-paper p-8">
              <div className="flex-1">
                <h3 className="font-display text-2xl text-ink">Exposure Diagnostic</h3>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
                  Tier 3 — Assessment
                </p>
                <p className="mt-3 text-3xl font-medium text-ink">Custom quote</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Bespoke forensic assessment for specific operational risks.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  <li className="flex gap-2"><span className="text-accent">•</span> Targeted public-footprint review</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> FTC / FDA pattern map</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> Exposure brief</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> Counsel-ready output</li>
                </ul>
              </div>
              <Link
                href="/claim-exposure-diagnostic"
                className="mt-8 flex min-h-11 w-full items-center justify-center rounded-full border border-hairline bg-paper-light px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent"
              >
                Request a Diagnostic
              </Link>
            </article>

            {/* Deep Diligence — PE/M&A */}
            <article className="flex flex-col rounded-[2rem] border border-hairline/50 bg-paper p-8">
              <div className="flex-1">
                <h3 className="font-display text-2xl text-ink">PE / M&amp;A Diligence</h3>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
                  Tier 4 — Deep Diligence
                </p>
                <p className="mt-3 text-3xl font-medium text-ink">Custom quote</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Complete regulatory risk analysis for acquisitions and board reviews.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  <li className="flex gap-2"><span className="text-accent">•</span> Claims + AI narrative inventory</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> Diligence report</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> Risk quantification for valuation</li>
                  <li className="flex gap-2"><span className="text-accent">•</span> Board-ready brief</li>
                </ul>
              </div>
              <Link
                href="/diligence"
                className="mt-8 flex min-h-11 w-full items-center justify-center rounded-full border border-hairline bg-paper-light px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent"
              >
                Request Diligence
              </Link>
            </article>

            {/* Continuous — Watch */}
            <MouseSpotlight className="rounded-[2rem]">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-accent/40 bg-paper p-8 shadow-md">
              <div className="absolute right-0 top-0 rounded-bl-[2rem] bg-accent px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper" style={{ fontFamily: MONO }}>
                Ongoing
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl text-ink">Scrutexity Watch</h3>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase" style={{ fontFamily: MONO }}>
                  Tier 5 — Continuous
                </p>
                <p className="mt-3 text-3xl font-medium text-ink">$1,500 <span className="text-sm font-normal text-muted">/ month</span></p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Ongoing monitoring, hash-chained records, and dedicated intelligence.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm leading-6 text-muted">
                  {[
                    'Claim drift — new or changed public claims vs. your last dated record',
                    'AI narrative drift — what answer systems say about you, unprompted',
                    'Evidence changes — sources added, removed, or weakened',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Each month you receive one dated update with a diff vs. the prior record — a renew-or-reassess decision on paper, not a dashboard.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-8 flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-bright"
              >
                Request Watch Access
              </Link>
            </article>
            </MouseSpotlight>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-24 sm:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>Next step</Kicker>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
            See what&apos;s missing.
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={SNAPSHOT_URL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-bright"
            >
              Run Your Free Snapshot
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
