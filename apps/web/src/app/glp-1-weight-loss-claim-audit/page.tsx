"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, ChevronDown, ShieldCheck } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const RISKY_PHRASES = [
  { phrase: '"Lose 20 pounds in 30 days"', issue: 'Numeric outcome without cohort data or qualification criteria' },
  { phrase: '"No side effects"', issue: 'All GLP-1 medications have documented side effect profiles. This is directly contradicted by prescribing information.' },
  { phrase: '"Safe for everyone"', issue: 'GLP-1 medications have contraindications, require prescriber evaluation, and are not appropriate for all patients.' },
  { phrase: '"FDA approved for weight loss"', issue: 'Applies only to specific medications and specific indications. Compound semaglutide does not carry the same approval.' },
  { phrase: '"Clinically proven results"', issue: 'Requires a named study, journal, or trial. Without citation, this is unsupported marketing language.' },
  { phrase: '"Doctor recommended"', issue: 'Recommendation claims require attribution — which doctor, for which patients, in what context.' },
  { phrase: '"Compounded semaglutide"', issue: 'FDA has made compounding status of GLP-1 medications an active enforcement area. Advertising compound medications carries specific risk.' },
  { phrase: '"Before/after" transformation framing', issue: 'FTC requires clear disclosure of typical vs. atypical results. Celebrity-style transformation framing triggers scrutiny.' },
  { phrase: '"Anti-aging weight loss"', issue: 'Combines two high-risk claim categories without evidence for either.' },
  { phrase: '"100% natural / no drugs"', issue: 'If semaglutide or tirzepatide is prescribed, the "no drugs" framing is directly false.' },
];

const REVIEW_ITEMS = [
  { label: 'Medication language', detail: 'Whether semaglutide, tirzepatide, or compound medication names are used accurately and with appropriate prescribing context.' },
  { label: 'Outcome claims', detail: 'Numeric weight loss promises, timelines, and average result claims checked against visible cohort data.' },
  { label: 'Testimonial framing', detail: 'Before/after photos, transformation language, and patient story framing reviewed for FTC-aligned disclosure.' },
  { label: 'FDA approval wording', detail: '"FDA approved" vs. "FDA authorized" vs. compound medication status — each is distinct and must be stated accurately.' },
  { label: 'Side effect disclosure', detail: 'Whether contraindications, side effect profiles, and prescriber-required evaluation are visible near the offer.' },
  { label: 'AI answer surfaces', detail: 'How ChatGPT, Perplexity, and Google AI Overviews describe your weight loss program — including whether they repeat inaccurate claims.' },
  { label: 'Competitor claim comparison', detail: 'How your claims compare to peer clinic language in AI-generated answers.' },
];

const OFFER_STEPS = [
  {
    step: 1,
    name: 'Claim Support Review',
    price: '$99',
    highlight: 'Start here',
    detail: 'Focused review of one public page. Returns the claim wording, visible support, remaining gap, and safer framing drafts for every flagged phrase.',
    cta: 'Start a Claim Review',
    href: '/contact?intent=claim-support-review&source=glp1-landing',
  },
];

const FAQS = [
  {
    q: 'Is this legal or regulatory advice?',
    a: 'No. AuditGPT reviews public-facing claim language against visible support. It does not provide legal, medical, clinical, regulatory, or prescribing advice, and does not certify compliance with FDA, FTC, or any state regulator.',
  },
  {
    q: 'Does AuditGPT review compound medication advertising?',
    a: 'We review the public-facing language used on your pages. If your page advertises compounded semaglutide or tirzepatide, we flag language that may overstate the FDA status of compound medications. We do not advise on FDA enforcement of compounding pharmacies.',
  },
  {
    q: 'Can you tell me if my ads will be approved by Google or Meta?',
    a: 'No. AuditGPT does not interact with ad platforms and cannot predict platform ad review outcomes. We review your website claim language, not your ad creatives.',
  },
  {
    q: 'Will running AuditGPT change my rankings or AI answers?',
    a: 'No. AuditGPT surfaces how AI answer engines currently describe your practice. Changes to your public pages may over time affect AI answers, but we make no guarantee about rankings, citations, or answer inclusion.',
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sand-deep/20">
      <button className="w-full flex items-start justify-between gap-4 py-5 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="font-display text-lg text-espresso leading-snug">{q}</span>
        <ChevronDown size={18} className={`shrink-0 mt-1 text-mist transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
            <p className="pb-5 text-sm text-mist leading-[1.7] max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GLP1ClaimAuditPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <title>GLP-1 & Medical Weight Loss Claim Audit | AuditGPT by Scrutexity</title>
      <meta name="description" content="AuditGPT reviews public-facing GLP-1 and medical weight loss claims — medication language, outcome promises, testimonial framing, FDA wording, and AI answer surfaces — so clinics can see what is supported, what is overstated, and what should be rewritten." />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-44 md:pb-28 bg-cream-deep border-b border-sand-deep/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-10%,rgba(94,122,90,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:linear-gradient(rgba(92,70,51,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6" style={{ fontFamily: MONO }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sage-deep opacity-50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-deep" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">GLP-1 & Medical Weight Loss · Active Claim Risk Surface</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            GLP-1 & Medical Weight Loss{' '}
            <span className="italic text-sage-deep">Claim Audit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
            className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-2xl"
          >
            AuditGPT reviews public-facing weight-loss claims, medication language, outcome promises, testimonial framing, and AI answer surfaces so clinics can see what is supported, what is overstated, and what should be rewritten.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="https://auditgpt.ai/snapshot?source=glp1-hero" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
              Start a Claim Review
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="https://auditgpt.ai/snapshot?source=glp1-hero&intent=paid" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Get the $99 Claim Support Review
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/sample-report" className="group px-7 py-4 bg-transparent hover:bg-bone/70 border border-sand-deep/25 text-espresso/80 hover:text-espresso font-medium rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              View Sample GLP-1 Audit Report
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-5 text-xs text-mist/55" style={{ fontFamily: MONO }}>
            Not legal advice. Not medical advice. Not regulatory certification. Claim language review only.
          </motion.p>
        </div>
      </section>

      {/* DEMO SNAPSHOT CLAIM ── makes the product concrete before explaining why */}
      <section className="px-6 py-14 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold" style={{ fontFamily: MONO }}>Example — what a claim review surfaces</p>
            <span className="px-2 py-0.5 bg-clay/10 text-clay border border-clay/20 text-[9px] font-mono uppercase tracking-wider rounded">High risk</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-2xl border-2 border-clay/25 bg-cream overflow-hidden"
            style={{ boxShadow: '0 16px 40px -16px rgba(183,137,107,0.18)' }}
          >
            <div className="px-6 py-4 border-b border-sand-deep/20 bg-bone/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-clay" />
                <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-clay" style={{ fontFamily: MONO }}>Claim flagged</span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.14em] text-mist/50">Compounded GLP-1 equivalence claim</span>
            </div>

            <div className="p-6 md:p-8">
              <p className="font-display text-xl md:text-2xl text-espresso italic leading-snug mb-6">
                &ldquo;Compounded semaglutide works the same as Ozempic.&rdquo;
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="p-4 rounded-xl bg-bone border border-sand-deep/20">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-clay mb-2 font-semibold" style={{ fontFamily: MONO }}>Why it matters</p>
                  <p className="text-sm text-mist leading-relaxed">FDA has warned that compounded GLP-1 drugs are not FDA-approved and are not reviewed for safety, effectiveness, or quality. Claiming equivalence to an FDA-approved drug overstates what the public record supports.</p>
                </div>
                <div className="p-4 rounded-xl bg-bone border border-sand-deep/20">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-sage-deep mb-2 font-semibold" style={{ fontFamily: MONO }}>Visible support</p>
                  <p className="text-sm text-espresso/80 leading-relaxed mb-3">Compound contains semaglutide as active ingredient — public record supports this.</p>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-clay mb-1 font-semibold" style={{ fontFamily: MONO }}>Support missing</p>
                  <p className="text-sm text-mist leading-relaxed">No public device citation or FDA equivalence statement found. FDA guidance contradicts equivalence framing for compounded products.</p>
                </div>
                <div className="p-4 rounded-xl border border-sage-deep/25 bg-sage/5">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-sage-deep mb-2 font-semibold" style={{ fontFamily: MONO }}>Safer rewrite preview</p>
                  <p className="font-display text-base text-espresso italic leading-snug">
                    &ldquo;Medically supervised weight-management consultation. Treatment options, including medication-assisted approaches, reviewed by a licensed provider.&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-sand-deep/20">
                <p className="text-sm text-mist leading-snug">
                  <span className="font-semibold text-espresso">A claim review</span> surfaces findings like this: exact wording, visible support, proof gap, and safer framing for every flagged phrase.
                </p>
                <Link
                  href="https://auditgpt.ai/snapshot?source=glp1-demo-card&intent=paid"
                  className="shrink-0 group px-5 py-3 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all text-sm inline-flex items-center gap-2"
                >
                  Start with one public page.
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Why GLP-1 pages are high-risk</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              The fastest-growing claim surface in medical aesthetics.
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.65]">
              Every med-spa and wellness clinic adding GLP-1 or medical weight loss services is creating new website pages, landing pages, and ad copy this year — most of it written before anyone checked the claim language against visible support.
            </p>
            <p className="mt-4 text-sm text-mist leading-[1.6]">
              GLP-1 advertising sits at the intersection of FTC outcome-claim rules, FDA medication advertising standards, and compound pharmacy restrictions. That combination means a single poorly worded sentence — "lose up to 30 pounds guaranteed" — can create claims a careful buyer cannot verify.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'FTC active review', detail: 'Weight loss advertising is a priority enforcement category. The FTC specifically scrutinizes numeric outcome claims, before/after framing, and testimonial use.' },
              { label: 'FDA compound status', detail: 'Compounded semaglutide and tirzepatide have fluctuating FDA regulatory status. Advertising language needs to reflect current status accurately.' },
              { label: 'AI answer distortion', detail: 'AI engines synthesize your public pages. If your page says "FDA approved" incorrectly, that error is repeated in AI-generated answers to patient questions.' },
              { label: 'Platform ad policy', detail: 'Google and Meta have specific restrictions on advertising weight loss medications. Website claim language can affect ad account status.' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-xl border border-sand-deep/30 bg-bone hover:border-sage-deep/35 transition-colors">
                <AlertTriangle size={18} className="text-clay shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-espresso text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-mist leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RISKY PHRASES */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Common risky phrases</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Language AuditGPT flags on GLP-1 pages.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RISKY_PHRASES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
                className="rounded-xl border border-sand-deep/30 bg-cream p-5 hover:border-clay/35 transition-colors">
                <p className="font-mono text-sm text-clay font-semibold mb-2 italic">{item.phrase}</p>
                <p className="text-xs text-mist leading-relaxed">{item.issue}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT AUDITGPT REVIEWS */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>What a claim review includes</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Seven claim categories reviewed on every GLP-1 page.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEW_ITEMS.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
                className="rounded-2xl border border-sand-deep/30 bg-bone p-6 hover:border-sage-deep/40 transition-colors">
                <p className="font-semibold text-espresso text-sm mb-2">{item.label}</p>
                <p className="text-xs text-mist leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER STACK */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Offer stack</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Start with one public page.
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">
            {OFFER_STEPS.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                className="relative flex-1 flex flex-col rounded-2xl border border-sand-deep/35 bg-cream p-6 hover:border-sage-deep/40 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-7 h-7 rounded-full bg-bone border border-sand-deep/40 flex items-center justify-center font-mono text-[10px] font-bold text-mist group-hover:text-sage-deep group-hover:border-sage-deep transition-colors">{s.step}</div>
                  {s.highlight && <span className="px-2 py-1 bg-sage-soft/15 text-sage-deep border border-sage-deep/20 text-[9px] font-mono uppercase tracking-[0.14em] rounded-sm">{s.highlight}</span>}
                </div>
                <h3 className="font-display text-lg text-espresso mb-1">{s.name}</h3>
                <p className="font-display text-2xl text-espresso font-bold mb-3">{s.price} <span className="text-[10px] font-mono uppercase text-mist">one-time</span></p>
                <p className="text-xs text-mist leading-relaxed flex-1 mb-5">{s.detail}</p>
                <Link href={s.href} className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 group/btn ${s.step === 1 ? 'bg-sage-deep hover:bg-espresso text-cream' : s.step === 3 ? 'bg-clay hover:bg-clay-deep text-cream' : 'bg-bone hover:bg-cream border border-sand-deep/40 text-espresso'}`}>
                  {s.cta} <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-6" style={{ fontFamily: MONO }}>Questions</p>
          <h2 className="font-display text-3xl text-espresso tracking-[-0.02em] mb-10">What to know before you run a snapshot.</h2>
          {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* DISCLAIMER + FINAL CTA */}
      <section className="px-6 py-20 bg-bone text-center">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck size={28} className="text-sage-deep mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            Claim-reviewed weight loss marketing.{' '}
            <span className="italic text-sage-deep">Before your next launch.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="https://auditgpt.ai/snapshot?source=glp1-bottom" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Start a Claim Review <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/agency/claim-intelligence-receipt?source=glp1-bottom" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Agency Claim Intelligence Receipt <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-8 text-[10px] text-mist/50 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: MONO }}>
            AuditGPT does not provide medical, legal, regulatory, clinical, or prescribing advice. It does not certify compliance or guarantee ad approvals, rankings, AI answers, or revenue outcomes. It reviews public-facing claims against visible support and identifies proof gaps, risky language, and safer rewrite options.
          </p>
        </div>
      </section>
    </div>
  );
}
