"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Kicker, MONO } from "@/components/scrutexity/intel-kit";

const SNAPSHOT_URL = "/snapshot";

export default function PricingContent() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Kicker>Pricing</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl lg:text-6xl">
            Start with what&apos;s visible.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-bark">
            A simple, evidence-first way to understand what your business is publicly claiming,
            what supports it, and what should be reviewed.
          </p>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Free */}
            <article className="flex flex-col rounded-xl border border-sand-deep/50 bg-bone p-8 relative">
              <div className="flex-1">
                <h3 className="font-display text-2xl text-espresso">Free Snapshot</h3>
                <p className="mt-2 text-3xl font-medium text-bark">$0</p>
                <ul className="mt-6 space-y-3 text-sm text-mist">
                  <li className="flex gap-2"><span className="text-clay">•</span> 3 high-level flags</li>
                  <li className="flex gap-2"><span className="text-clay">•</span> Identify key claims</li>
                  <li className="flex gap-2"><span className="text-clay">•</span> No sources linked</li>
                  <li className="flex gap-2"><span className="text-clay">•</span> Delivered by email</li>
                </ul>
              </div>
              <Link href={SNAPSHOT_URL} className="mt-8 flex min-h-11 w-full items-center justify-center rounded-md border border-sand-deep bg-cream px-6 py-2.5 text-sm font-semibold text-espresso transition-colors hover:border-clay">
                Run Your Free Snapshot
              </Link>
            </article>

            {/* $99 */}
            <article className="flex flex-col rounded-xl border-2 border-clay/50 bg-cream p-8 relative shadow-md z-10 overflow-hidden">
              <div className="absolute top-0 right-0 bg-clay text-cream text-[10px] font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-bl-lg" style={{ fontFamily: MONO }}>
                The Full Picture
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl text-espresso">Claim Support Review</h3>
                <p className="mt-2 text-3xl font-medium text-bark">$99</p>
                <ul className="mt-6 space-y-3 text-sm text-mist font-medium">
                  <li className="flex gap-2"><span className="text-clay">✓</span> 1 deep-dive Exhibit A</li>
                  <li className="flex gap-2"><span className="text-clay">✓</span> Exact claim captured</li>
                  <li className="flex gap-2"><span className="text-clay">✓</span> Visible evidence found</li>
                  <li className="flex gap-2"><span className="text-clay">✓</span> Evidence gap mapped</li>
                  <li className="flex gap-2"><span className="text-clay">✓</span> Safer rewrite provided</li>
                  <li className="flex gap-2"><span className="text-clay">✓</span> Dated review record</li>
                </ul>
              </div>
              <Link href="/checkout" className="mt-8 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-espresso px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep">
                Get the Detailed Review
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Watch Tier (Separated) */}
      <section className="border-t border-b border-sand-deep/30 bg-bone px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Kicker>Keep watching</Kicker>
          <div className="mt-8 flex flex-col md:flex-row gap-8 items-center bg-cream rounded-xl border border-sand-deep/40 p-8">
            <div className="flex-1">
              <h3 className="font-display text-3xl text-espresso">Scrutexity Watch</h3>
              <p className="mt-2 text-3xl font-medium text-bark">$1,500 <span className="text-sm font-normal text-mist">/ month</span></p>
              <p className="mt-4 text-base leading-7 text-mist max-w-md">
                For organizations that already know they need ongoing monitoring of claim drift, evidence changes, and AI narrative shifts.
              </p>
            </div>
            <div className="w-full md:w-auto shrink-0">
              <Link href="/contact" className="flex min-h-12 w-full md:w-auto items-center justify-center rounded-md border border-sand-deep bg-bone px-8 py-3 text-sm font-semibold text-espresso transition-colors hover:border-clay">
                Request Watch Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone px-5 py-24 sm:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>Next step</Kicker>
          <h2 className="mt-5 font-display text-4xl leading-tight text-espresso md:text-5xl">
            See what&apos;s missing.
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={SNAPSHOT_URL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
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
