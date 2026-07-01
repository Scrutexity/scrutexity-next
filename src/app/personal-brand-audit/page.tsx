"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, ShieldCheck, AlertTriangle, Eye, 
  HelpCircle, UserCheck, CheckCircle, RefreshCw, Sparkles, Award
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

function SponsorReadinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full aspect-[4/3] lg:aspect-square xl:aspect-[4/3] [perspective:1200px] cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* Front (Before) */}
        <div 
          className="absolute inset-0 bg-bone border border-sand-deep/30 rounded-2xl p-6 md:p-8 flex flex-col shadow-[0_20px_40px_-15px_rgba(28,24,20,0.08)] [backface-visibility:hidden]"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-clay font-semibold">Before AuditGPT</span>
            <span className="px-2.5 py-1 bg-clay/10 text-clay border border-clay/20 text-[9px] font-mono uppercase tracking-wider rounded-md">Overstated Risk</span>
          </div>
          <p className="font-display text-2xl md:text-3xl text-espresso italic leading-snug">
            "We reach 1 million active tech operators every month and guarantee 2x ROI for sponsors."
          </p>
          <div className="mt-auto pt-6 border-t border-sand-deep/20">
            <p className="text-xs md:text-sm text-mist leading-relaxed font-sans">
              <span className="font-semibold text-espresso">Audit finding:</span> Only 845k verified in latest media kit. ROI guarantee creates legal liability without historical cohort base rates.
            </p>
          </div>
        </div>

        {/* Back (After) */}
        <div 
          className="absolute inset-0 bg-sage-deep text-cream border border-sage-deep/50 rounded-2xl p-6 md:p-8 flex flex-col shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sage-soft font-semibold">After Scrutexity</span>
            <span className="px-2.5 py-1 bg-sage-soft/20 text-cream border border-sage-soft/30 text-[9px] font-mono uppercase tracking-wider rounded-md flex items-center gap-1.5"><ShieldCheck size={12}/> Sponsor-Ready</span>
          </div>
          <p className="font-display text-2xl md:text-3xl text-cream leading-snug">
            "Our network connects 845k+ verified tech operators, historically driving top-decile conversion for SaaS sponsors."
          </p>
          <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-sage-soft/20 pt-6">
            {[
              ['Sponsor Confidence', 'High'],
              ['Media Kit', 'Ready'],
              ['AI Summary', 'Clean'],
              ['Credibility', 'Verified'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-sage-soft/80">{k}</span>
                <span className="text-xs font-semibold text-cream">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PersonalBrandAuditPage() {
  const reduced = false;
  const [activeTab, setActiveTab] = useState<number>(0);

  const steps = [
    { label: "01 · Snapshot", title: "Personal Brand Snapshot", desc: "Scan public surfaces for top 3 credibility exposures.", price: "$99" },
    { label: "02 · Audit", title: "Sponsor-Ready Audit", desc: "Full manual claim inventory, source mapping, and rewrite recommendations.", price: "$399" },
    { label: "03 · Cleanup", title: "Creator Claim Cleanup Record", desc: "Build evidence library, implement rewrites, and deliver a structured record of what changed and why.", price: "$1,999" },
    { label: "04 · Monitor", title: "Ongoing Governance", desc: "Continuous drift monitoring, automated alerts, and badge maintenance.", price: "$299/mo" }
  ];

  return (
    <div className="min-h-screen bg-cream text-ink font-sans selection:bg-clay/20 select-none pb-24">
      {/* Meta/SEO Schema placeholder inside page component context */}
      <title>Personal Brand Claim Audit for Creators & Founders | AuditGPT</title>
      <meta 
        name="description" 
        content="AuditGPT reviews creator, founder, and personal-brand claims for proof gaps, overstated language, sponsor-readiness, and AI answer distortion." 
      />

      {/* HERO SECTION */}
      <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-cream-deep border-b border-sand-deep/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-10%,rgba(184,111,79,0.06),transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            
            {/* Left Column: Headline + CTAs */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sage-deep font-semibold mb-5 animate-pulse"
                style={{ fontFamily: MONO_STACK }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
                Personal Brand Claim Intelligence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-espresso tracking-[-0.03em] leading-[1.05]"
              >
                Sponsor-Ready Claim Intelligence for{' '}
                <span className="italic text-sage-deep font-sans">creators, founders, and personal brands.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="mt-6 text-sm md:text-base text-mist leading-[1.65] max-w-xl font-sans"
              >
                AuditGPT reviews public-facing claims, bio language, offer pages, sponsor decks, and AI answer surfaces so creators can see what is supported, what is overstated, and what should be rewritten before sponsors, partners, or AI search repeat it.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/claim-audit?intent=personal-brand-snapshot"
                  className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-xs"
                >
                  Run Personal Brand Snapshot
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/sample-report"
                  className="group px-7 py-3.5 bg-bone border border-sand-deep/45 hover:bg-cream text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-1.5"
                >
                  View Creator Sample Report
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              <SponsorReadinessCard />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION A — WHAT GETS REVIEWED */}
      <section className="px-6 py-20 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-2" style={{ fontFamily: MONO_STACK }}>Scope of review</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight">What Gets Reviewed</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Bio & Credibility Claims",
                desc: "Credibility tags, authority assertions, client list counts, historical milestones, and advisor roles surfaced in bios."
              },
              {
                title: "Offer Page Claims",
                desc: "Outcome guarantees, transformation claims, performance guarantees, time-based results, and refund terms."
              },
              {
                title: "Sponsor & Media Kit Claims",
                desc: "Audience counts, download metrics, open rates, demographic statistics, traffic percentages, and growth claims."
              },
              {
                title: "AI Answer Surfaces",
                desc: "Synthesis analysis showing how ChatGPT, Claude, and Gemini crawl, parse, and cite your personal brand's core offerings."
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-bone border border-sand-deep/30 rounded-xl p-5 hover:border-sage-deep/40 transition-colors shadow-xs">
                <span className="h-8 w-8 rounded-full bg-sage/12 text-sage-deep flex items-center justify-center font-mono text-xs font-semibold mb-4">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-lg text-espresso font-semibold mb-2">{card.title}</h3>
                <p className="text-xs text-mist leading-relaxed font-sans">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B — WHAT THE REPORT SHOWS (Split Visual) */}
      <section className="px-6 py-20 bg-cream-deep border-t border-b border-sand-deep/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-2" style={{ fontFamily: MONO_STACK }}>Sample deliverable</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight">What the Report Shows</h2>
          </div>

          <div className="bg-bone border border-sand-deep/30 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-sand-deep/20">
            {/* Raw Claim (Before) */}
            <div className="p-8">
              <span className="font-mono text-[9px] uppercase tracking-widest text-clay block mb-3">Identified Exposure</span>
              <div className="bg-clay/5 border border-clay/10 rounded-lg p-5">
                <p className="text-sm font-semibold text-espresso font-display italic">
                  “Reaches over 1,000,000 active monthly readers and operators.”
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-clay font-bold uppercase">
                  <AlertTriangle size={14} /> Overstated claim status
                </div>
              </div>
              <div className="mt-6 space-y-4 text-xs font-sans text-mist leading-relaxed">
                <p>
                  <strong>Internal Support:</strong> Internal analytics dashboard screenshot from 6 months ago. No public, third-party verification rail connected.
                </p>
                <p>
                  <strong>Sponsor Review Gap:</strong> Sponsor diligence leads flag statements lacking updated public verification.
                </p>
              </div>
            </div>

            {/* Sanitized Claim (After) */}
            <div className="p-8">
              <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-3">Sponsor-Ready Clean copy</span>
              <div className="bg-sage/5 border border-sage-deep/10 rounded-lg p-5">
                <p className="text-sm font-semibold text-espresso font-display italic">
                  “Reaches over 850,000 monthly readers (Audited by Scrutexity Network, Q2 2026).”
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-sage-deep font-bold uppercase">
                  <ShieldCheck size={14} /> Confirmed trust status
                </div>
              </div>
              <div className="mt-6 space-y-4 text-xs font-sans text-mist leading-relaxed">
                <p>
                  <strong>Remediation:</strong> Replaced raw figure with dynamic audience registry link. Resolved metadata crawl path.
                </p>
                <p>
                  <strong>Sponsor Readiness:</strong> High. Safe for public media decks, venture platform review, and sponsor agency validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCORE & TIMELINE VISUALS */}
      <section className="px-6 py-20 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: AI Answer Reality Preview */}
            <div className="bg-bone border border-sand-deep/30 rounded-2xl p-6 shadow-xs relative">
              <div className="flex items-center gap-2 pb-4 border-b border-sand-deep/15 mb-4">
                <div className="w-3 h-3 rounded-full bg-sage-deep" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-mist">AI Search Engine Result</span>
              </div>
              <div className="space-y-4 text-left">
                <div className="bg-cream/40 border border-sand-deep/15 rounded-lg p-3 text-xs font-mono text-bark">
                  <span className="text-sage-deep font-bold">Query:</span> Who is the founder of [Personal Brand] and what is their track record?
                </div>
                <div className="text-xs text-mist leading-relaxed font-sans space-y-3">
                  <p>
                    🤖 According to documented sources, the founder has built a confirmed track record in tech investments.
                  </p>
                  <p className="border-l-2 border-sage-deep pl-2 italic">
                    “Credibility indicators: Documented 850,000 monthly readers (Scrutexity Reviewed, Q2 2026). Previously advised three listed platforms.”
                  </p>
                </div>
                <div className="text-[9px] font-mono text-sage-deep flex items-center gap-1">
                  <CheckCircle size={10} /> Confirmed references cited cleanly by LLMs
                </div>
              </div>
            </div>

            {/* Right side: Timeline */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-2" style={{ fontFamily: MONO_STACK }}>Growth path</span>
              <h2 className="font-display text-3xl text-espresso tracking-tight">The Governance Lifecycle</h2>
              <p className="mt-3 text-sm text-mist leading-relaxed font-sans mb-8">
                Move from ungrounded claims to clean, sponsor-ready authority. We package diagnostics into execution, then lock in weekly monitoring.
              </p>

              {/* Steps selection interface */}
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-300 ${
                      activeTab === idx 
                        ? 'border-sage-deep bg-bone shadow-xs' 
                        : 'border-sand-deep/20 bg-cream/40 hover:border-sand-deep/45'
                    }`}
                  >
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-sage-deep">{step.label}</span>
                      <h4 className="font-display text-lg text-espresso font-semibold mt-1">{step.title}</h4>
                      {activeTab === idx && (
                        <p className="mt-2 text-xs text-mist font-sans leading-relaxed transition-all">
                          {step.desc}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display text-xl text-espresso font-bold">{step.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION C — BUILT FOR */}
      <section className="px-6 py-20 bg-cream-deep border-t border-b border-sand-deep/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-2" style={{ fontFamily: MONO_STACK }}>Alignment</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight">Who We Work With</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Creators",
                desc: "YouTubers, podcasters, writers, and community builders needing clear, audit-backed media kits for premium sponsors."
              },
              {
                title: "Founders",
                desc: "Venture-backed founders, platform partners, and operators leveraging personal authority to anchor deals."
              },
              {
                title: "Coaches & Experts",
                desc: "Consultants, course creators, and educators seeking to establish real trust in noisy compliance environments."
              },
              {
                title: "Creator Agencies",
                desc: "Representation firms and talent managers looking to govern media risk across a portfolio of creators."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-bone border border-sand-deep/30 rounded-xl p-5 hover:border-sage-deep/40 transition-all shadow-xs text-center">
                <UserCheck size={24} className="text-sage-deep mx-auto mb-4" />
                <h3 className="font-display text-lg text-espresso font-semibold mb-2">{item.title}</h3>
                <p className="text-xs text-mist leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Module / CTA Box */}
      <section className="px-6 py-20 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="bg-bone border border-sand-deep/30 rounded-2xl p-8 md:p-10 shadow-xs text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-2 block" style={{ fontFamily: MONO_STACK }}>Getting Started</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso mb-4">Creator &amp; Personal Brand Claim Intelligence</h2>
            <p className="text-sm text-mist leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
              Get sponsor-ready claims, cleaner public positioning, and safer AI answer visibility. Run a snapshot to identify credibility exposures, or discuss a customized cleanup sprint.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/claim-audit?intent=personal-brand-snapshot"
                className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
              >
                Run Personal Brand Snapshot ($99)
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link 
                href="/contact?intent=creator-audit"
                className="group px-7 py-3.5 bg-bone border border-sand-deep/45 hover:bg-cream text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-1.5"
              >
                Discuss Custom Audit
              </Link>
            </div>

            {/* Boundary disclaimer */}
            <p className="mt-8 text-[10px] leading-relaxed text-mist/75 max-w-2xl mx-auto border-t border-sand-deep/15 pt-6 font-mono uppercase tracking-[0.08em]">
              AuditGPT does not provide legal, regulatory, platform, sponsor approval, reputation repair, or financial advice. It does not guarantee sponsor acceptance, search rankings, AI answer changes, revenue, or audience growth. It reviews public-facing claims against visible support and identifies proof gaps, risky language, and safer rewrite options.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

// Reusable Pricing Card Component inside this file, localized without conflict
function PricingCard({ tier }: { tier: { name: string; price: string; cadence: string; bestFor: string; includes: string[]; ctaLabel: string; ctaHref: string; badge?: string; accent?: string } }) {
  const accentBorder = tier.accent === 'pine' ? 'border-sage-deep/50' : tier.accent === 'clay' ? 'border-clay/50' : 'border-sand-deep/30';

  return (
    <div
      className={`relative rounded-2xl p-6 bg-bone border ${accentBorder} flex flex-col justify-between shadow-xs transition-colors`}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-6 px-2.5 py-0.5 bg-sage/20 border border-sage-deep/30 text-sage-deep font-mono text-[9px] uppercase tracking-wider rounded-full font-bold">
          {tier.badge}
        </span>
      )}

      <div>
        <h3 className="font-display text-lg text-espresso font-semibold leading-snug mb-1">{tier.name}</h3>
        <div className="flex items-baseline gap-1.5 my-3">
          <span className="font-display text-3xl text-espresso tracking-tight tabular-nums font-bold">{tier.price}</span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-mist">{tier.cadence}</span>
        </div>
        <p className="text-[11px] text-mist leading-relaxed border-t border-sand-deep/15 pt-3 mb-4 italic">
          Best for: {tier.bestFor}
        </p>
        <ul className="space-y-2 mt-4 text-xs text-bark font-mono">
          {tier.includes.map(inc => (
            <li key={inc} className="flex gap-2 items-start">
              <span className="text-sage-soft shrink-0 mt-0.5">•</span>
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={tier.ctaHref}
        className="group mt-6 w-full py-2.5 bg-sage-deep hover:bg-espresso text-cream text-[10px] font-bold font-mono tracking-widest uppercase text-center rounded-lg transition-colors inline-flex items-center justify-center gap-1 shadow-xs"
      >
        {tier.ctaLabel}
        <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
