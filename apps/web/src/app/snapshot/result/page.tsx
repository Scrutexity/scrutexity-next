"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Kicker, MONO } from "@/components/scrutexity/intel-kit";
import { ExhibitA } from "@/components/scrutexity/motion/exhibit-a";

export default function SnapshotResultPage() {
  return (
    <div className="min-h-screen bg-cream text-bark pb-24">
      
      {/* Sticky Dated Record Banner */}
      <div className="sticky top-0 z-40 w-full bg-sage-deep text-cream px-5 py-3 shadow-sm flex items-center justify-center gap-2 text-sm font-semibold tracking-wide">
        <div className="w-2 h-2 rounded-full bg-cream animate-pulse" />
        <span style={{ fontFamily: MONO }}>FINDING RECORDED: AUGUST 5, 2026 &middot; 2:34 PM EST. RE-OBSERVATION IN 14 DAYS.</span>
      </div>

      {/* Header */}
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-12 pt-24 sm:px-8 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>Snapshot Complete</Kicker>
          <h1 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">
            Your Public Claim Snapshot
          </h1>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-b border-sand-deep/40 py-6">
            <div>
              <span className="block font-display text-4xl text-espresso">03</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist mt-1 block" style={{ fontFamily: MONO }}>Claims reviewed</span>
            </div>
            <div className="border-l border-sand-deep/40">
              <span className="block font-display text-4xl text-clay">01</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist mt-1 block" style={{ fontFamily: MONO }}>Evidence gap</span>
            </div>
            <div className="border-l border-sand-deep/40">
              <span className="block font-display text-4xl text-sage-deep">01</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist mt-1 block" style={{ fontFamily: MONO }}>Needs clarification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Findings */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <h2 className="font-display text-2xl text-espresso mb-6">One finding in detail</h2>
          
          <div className="flex flex-col gap-4">
            <ExhibitA />
          </div>

          {/* Upsell to $99 */}
          <div className="mt-12 rounded-xl border-2 border-clay/30 bg-bone p-8 text-center flex flex-col items-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-clay" />
            <h3 className="font-display text-3xl text-espresso">We found 1 evidence gap.</h3>
            <p className="mt-2 text-xl text-clay font-medium">There are 14 more on your site.</p>
            <p className="mt-4 text-mist max-w-md">
              Get the complete claim analysis, evidence gap mapping, source context, safer wording, and dated review record for $99.
            </p>
            <Link
              href="/checkout"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
            >
              See all 14 gaps — Upgrade to Full Claim Support Review ($99)
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Optional Post-Result Question */}
          <div className="mt-16 pt-16 border-t border-sand-deep/40">
            <div className="max-w-md mx-auto text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist block mb-4" style={{ fontFamily: MONO }}>Optional</span>
              <h4 className="font-display text-xl text-espresso mb-4">What are you most concerned about?</h4>
              <textarea 
                className="w-full rounded-md border border-sand-deep bg-cream px-4 py-3 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay min-h-[100px]"
                placeholder="Tell us what prompted you to run this snapshot..."
              />
              <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-md border border-sand-deep bg-bone px-6 py-2.5 text-sm font-semibold text-espresso transition-colors hover:border-clay">
                Submit Feedback
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
