import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, FileText, ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "AuditGPT — Claim Risk & AI Distortion Receipt | Scrutexity",
  description:
    "Submit a page. Get a dated claim-risk receipt showing which claims match enforcement patterns, evidence gaps, safer rewrites, and an AI Distortion Snapshot.",
  alternates: { canonical: "/auditgpt" },
};

export default function AuditGPTPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans pt-nav-offset">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Hero — Alarm Bell */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-clay/10 text-clay px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase mb-5 border border-clay/20">
            <AlertTriangle size={12} />
            AI Answer Monitoring — Recorded &amp; Dated
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.1] max-w-3xl">
            Find risky claims and AI distortions before customers, platforms, or regulators do.
          </h1>
          <p className="mt-5 font-sans text-lg text-mist max-w-2xl leading-relaxed">
            Submit one page. Get a dated claim-risk receipt with enforcement-pattern matches,
            evidence gaps, safer rewrites, and an AI Distortion Snapshot showing what ChatGPT,
            Gemini, and Perplexity actually say about your brand.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-auditgpt"
              className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-sm hover:-translate-y-px"
            >
              Get the $497 Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#sample"
              className="group px-7 py-3.5 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              See Sample Receipt
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Split Reality Receipt — Henry Meds example */}
        <div id="sample" className="mb-20 rounded-2xl border border-sand-deep/30 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-sand-deep/20 bg-bone/80 px-6 py-4 flex justify-between items-center">
            <span className="font-mono text-xs text-mist uppercase tracking-wider">Claim Risk + AI Distortion Receipt</span>
            <span className="font-mono text-xs text-clay bg-clay/10 px-3 py-1 rounded-full">Severity: High (Implied Approval)</span>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-sand-deep/20">
            <div className="p-6 md:p-8">
              <h3 className="text-sm font-semibold text-sage-deep uppercase tracking-wide mb-3">What the Site Says</h3>
              <blockquote className="border-l-2 border-sage-deep/30 pl-4 text-espresso italic text-sm">
                &ldquo;Compounded semaglutide is a once-weekly injectable GLP-1 medication&hellip;
                Compounded drugs are not FDA-approved.&rdquo;
              </blockquote>
              <p className="text-xs text-mist mt-3 font-mono">Source: a national GLP-1 telehealth provider &middot; Explicit disclaimer present</p>
            </div>
            <div className="p-6 md:p-8 bg-clay/[0.02]">
              <h3 className="text-sm font-semibold text-clay uppercase tracking-wide mb-3">What AI Is Telling Patients</h3>
              <blockquote className="border-l-2 border-clay/40 pl-4 text-espresso font-medium text-sm">
                &ldquo;Yes, [provider] offers Semaglutide, an <span className="bg-clay/10 text-clay px-0.5">FDA-approved</span> weight loss injection.&rdquo;
              </blockquote>
              <p className="text-xs text-mist mt-3 font-mono">
                Source: ChatGPT &middot; Query: &ldquo;Does [provider] offer FDA-approved weight loss injections?&rdquo; &middot; Recorded, dated observation
              </p>
            </div>
          </div>
        </div>

        {/* What you get */}
        <section className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.18em] text-sage-deep font-mono block mb-6">
            What a Claim Risk Receipt Includes
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: "Claim Extraction & Scoring",
                items: [
                  "Every claim extracted from your public pages",
                  "Risk level per claim: High / Medium / Low",
                  "Pattern match against enforcement library"
                ]
              },
              {
                icon: FileText,
                title: "Evidence Gap & AI Distortion",
                items: [
                  "What proof is visible vs. missing",
                  "AI Distortion Snapshot across 3+ LLMs",
                  "Source reference from enforcement action"
                ]
              },
              {
                icon: ShieldCheck,
                title: "Safer Rewrites & Dated Receipt",
                items: [
                  "Safer replacement language per claim",
                  "Dated PDF review receipt",
                  "Not legal, clinical, or regulatory advice"
                ]
              }
            ].map((section) => (
              <div key={section.title} className="bg-bone border border-sand-deep/30 rounded-2xl p-6">
                <section.icon size={20} className="text-sage-deep mb-3" />
                <h3 className="font-display text-lg text-espresso font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-mist">
                      <CheckCircle2 size={14} className="text-sage-soft mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Agency offer */}
        <section className="bg-espresso text-cream rounded-2xl p-8 md:p-12 mb-12">
          <span className="text-[10px] uppercase tracking-[0.18em] text-sage-soft font-mono block mb-3">For Agencies</span>
          <h2 className="font-display text-3xl md:text-4xl mb-2">White-label claim reviews for every client campaign.</h2>
          <p className="text-cream/80 max-w-xl mb-6">
            Give each client a documented review layer before high-claim campaigns go live.
            Each receipt shows enforcement-pattern matches, missing evidence, safer rewrites,
            and AI distortion signals. You keep the client relationship. We generate the review record.
          </p>
          <Link
            href="mailto:nick@scrutexity.com?subject=Agency%20Plan"
            className="group inline-flex items-center gap-2 rounded-full bg-sage-deep hover:bg-cream hover:text-espresso text-cream font-sans font-semibold px-6 py-3 text-sm transition-all shadow-sm"
          >
            Request Agency Details
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </section>

        {/* Pricing summary */}
        <section className="rounded-2xl border border-sand-deep/30 bg-bone p-8 md:p-10">
          <span className="text-[10px] uppercase tracking-[0.18em] text-sage-deep font-mono block mb-3">Pricing</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-display text-xl text-espresso">Claim Exposure Audit</h3>
              <p className="font-display text-3xl text-espresso font-bold mt-1">$497</p>
              <p className="text-xs text-mist mt-1">Full site. Dated review record. Credits toward Guardian.</p>
            </div>
            <div>
              <h3 className="font-display text-xl text-espresso">Guardian</h3>
              <p className="font-display text-3xl text-espresso font-bold mt-1">from $1,497/mo</p>
              <p className="text-xs text-mist mt-1">Monthly re-review, AI distortion alerts, record stays current.</p>
            </div>
            <div>
              <h3 className="font-display text-xl text-espresso">Enterprise</h3>
              <p className="font-display text-3xl text-espresso font-bold mt-1">from $4,997/mo</p>
              <p className="text-xs text-mist mt-1">Multi-location, API access, Claim Foundation setup.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-auditgpt"
              className="group px-6 py-3 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-sm"
            >
              Get Your Free Snapshot
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="group px-6 py-3 bg-white hover:bg-bone border border-sand-deep/40 text-espresso font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              View Full Pricing
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="mt-10 text-[10px] leading-relaxed text-mist/70 max-w-2xl font-mono uppercase tracking-[0.1em]">
          AuditGPT compares marketing language against public enforcement patterns and AI-generated claim distortions.
          It does not provide legal, clinical, regulatory, or medical advice.
        </p>
      </div>
    </div>
  );
}
