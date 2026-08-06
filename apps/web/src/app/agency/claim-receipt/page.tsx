"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, ShieldCheck, CheckCircle2, ChevronDown, Lock } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Receipt field data ─────────────────────────────────── */

const RECEIPT_FIELDS = [
  { label: 'Client', example: 'Radiance Medical Spa (fictional demo)' },
  { label: 'Page reviewed', example: 'GLP-1 Weight Loss Landing Page — /weight-loss' },
  { label: 'Review date', example: 'June 2026' },
  { label: 'Prepared by', example: 'AuditGPT by Scrutexity · Partner Agency' },
  { label: 'Claims reviewed', example: '8 public-facing claims across the page' },
  { label: 'Support found', example: '3 of 8 claims have visible public support' },
  { label: 'Support missing', example: '5 of 8 claims have evidence gaps requiring rewrite or disclosure' },
  { label: 'Safer rewrite', example: 'Delivered per claim in attached Claim Audit Report' },
  { label: 'Client approval status', example: 'Pending client review and sign-off' },
  { label: 'Notice', example: 'Not legal advice. Not medical advice. Not regulatory certification. This receipt documents what was reviewed and what was found — not compliance with any regulatory requirement.' },
];

const DEMO_CLAIMS = [
  {
    claim: '"Compounded semaglutide works the same as Ozempic."',
    type: 'Compounded GLP-1 equivalence claim',
    risk: 'High',
    supportFound: 'Compounded semaglutide contains the same active ingredient (semaglutide) as Ozempic.',
    supportMissing: 'FDA has warned that compounded GLP-1 drugs are not FDA-approved and are not reviewed for safety, effectiveness, or quality. Claiming equivalence to an FDA-approved drug overstates what the public record supports.',
    saferRewrite: '"Medically supervised weight-management consultation. Treatment options, including medication-assisted approaches, reviewed by a licensed provider."',
    action: 'Remove equivalence claim. Add licensed provider language and individual-evaluation disclaimer.',
  },
  {
    claim: '"FDA-approved compounded semaglutide for weight loss."',
    type: 'FDA terminology — compounded drug status',
    risk: 'High',
    supportFound: 'The clinic offers compounded semaglutide. Semaglutide as a class has FDA approvals for specific indications.',
    supportMissing: 'Compounded semaglutide does not carry FDA approval, clearance, or authorization as a compounded product. The "FDA-approved" framing applied to a compound is directly contradicted by public FDA guidance.',
    saferRewrite: '"Medically supervised weight loss program. Medications prescribed and managed by a licensed provider. Treatment plans individualized by consultation."',
    action: 'Remove "FDA-approved" from any sentence that applies to compounded medication. Add compound status disclosure.',
  },
  {
    claim: '"Lose 20 pounds in 30 days guaranteed."',
    type: 'Outcome claim — numeric weight loss guarantee',
    risk: 'High',
    supportFound: 'Program is active and patients are treated. No cohort data visible on the page.',
    supportMissing: 'Numeric outcome + guaranteed timeline without cohort data, qualification criteria, or individual-results disclaimer. FTC requires atypical result disclosure for weight loss claims.',
    saferRewrite: '"Our program supports meaningful, clinician-supervised weight reduction. Individual results vary based on health history, adherence, and program design."',
    action: 'Remove numeric guarantee. Add cohort range, qualification criteria, and individual-results disclosure.',
  },
];

const USE_CASES = [
  {
    title: 'GLP-1 & weight loss pages',
    detail: 'Before launching a new semaglutide, tirzepatide, or medical weight loss page, the Receipt documents what was reviewed and what was adjusted — so the client has a record of the review.',
  },
  {
    title: 'Body contouring & device pages',
    detail: 'FDA-cleared vs. FDA-approved language, before/after framing, and permanent-result claims are common drift points. The Receipt attaches to the page launch approval.',
  },
  {
    title: 'Exosome, NAD+, and regenerative pages',
    detail: 'Emerging therapy claims lack FDA-cleared efficacy language. The Receipt shows which claims were adjusted and which remain at the client\'s discretion.',
  },
  {
    title: 'RF microneedling and device campaigns',
    detail: 'No-downtime, skin-tightening, and collagen-regeneration language are frequently overstated. The Receipt documents the review before the ad campaign launches.',
  },
  {
    title: 'IV therapy and hormone pages',
    detail: 'Detox, anti-aging, and hormone-balancing claims are high-risk category phrases. The Receipt documents what was flagged and what safer language was used.',
  },
  {
    title: 'Pre-launch campaign review',
    detail: 'Any high-claim page going live. The Receipt is your agency\'s record that the claim surface was reviewed before publishing.',
  },
];

const FAQS = [
  {
    q: 'Does the Claim Audit Receipt certify compliance?',
    a: 'No. The Receipt documents what was reviewed, what support was found, what support was missing, and what language was adjusted. It does not certify compliance with any regulatory requirement, and it is not legal advice.',
  },
  {
    q: 'Who can use this as a client approval document?',
    a: 'Agencies use it as a record that the claim surface was reviewed before launching a client page. How any client, regulator, or legal counsel interprets the receipt is their determination — not ours.',
  },
  {
    q: 'Does this replace legal review?',
    a: 'No. AuditGPT reviews public-facing claim language against visible support. Legal, regulatory, clinical, and compliance review should be conducted by qualified counsel.',
  },
  {
    q: 'What happens after the receipt is generated?',
    a: 'The agency and client review the Receipt. If the client approves, the agency launches. If the Receipt surfaced claims requiring rewrite, the Claim Cleanup Record ($1,997) documents what was changed and why.',
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

/* ── Demo Receipt Component ─────────────────────────────── */

function DemoReceipt() {
  return (
    <div className="rounded-2xl border border-sand-deep/35 bg-bone overflow-hidden" style={{ boxShadow: '0 20px 48px -16px rgba(28,24,20,0.12), inset 0 1px 1px rgba(255,255,255,0.6)' }}>
      {/* Receipt header */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-sand-deep/25 bg-cream/70">
        <div className="flex items-center gap-3">
          <FileText size={16} className="text-sage-deep" />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sage-deep font-semibold">Claim Audit Receipt</p>
            <p className="text-[9px] font-mono text-mist/60 mt-0.5">AuditGPT by Scrutexity · Agency Demo</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-[var(--color-amber-badge)]/12 text-[var(--color-amber-badge)] border border-[var(--color-amber-badge)]/30 text-[9px] font-mono uppercase tracking-wider rounded-md">
          Pending Client Review
        </span>
      </div>

      {/* Receipt meta fields */}
      <div className="px-6 py-5 border-b border-sand-deep/20">
        <dl className="divide-y divide-sand-deep/15">
          {RECEIPT_FIELDS.slice(0, 9).map((field) => (
            <div key={field.label} className="py-2.5 grid grid-cols-12 gap-4">
              <dt className="col-span-4 text-[9px] uppercase tracking-[0.16em] text-mist/60 font-semibold pt-0.5" style={{ fontFamily: MONO }}>{field.label}</dt>
              <dd className={`col-span-8 text-xs leading-relaxed ${field.label === 'Client' ? 'text-espresso font-semibold' : 'text-espresso/80'}`}>{field.example}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 3 sample claim rows */}
      <div className="px-6 py-5 space-y-4">
        <p className="text-[9px] uppercase tracking-[0.18em] text-sage-deep font-semibold" style={{ fontFamily: MONO }}>Priority claims reviewed</p>
        {DEMO_CLAIMS.map((c, i) => (
          <div key={i} className="rounded-xl border border-sand-deep/25 bg-cream/60 p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="font-display text-base text-espresso italic leading-snug flex-1">{c.claim}</p>
              <span className="shrink-0 px-2 py-0.5 bg-clay/10 text-clay border border-clay/20 text-[8px] font-mono uppercase tracking-wider rounded">High risk</span>
            </div>
            <p className="text-[9px] uppercase tracking-[0.16em] text-mist/60 mb-2" style={{ fontFamily: MONO }}>{c.type}</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-[8px] uppercase tracking-[0.16em] text-sage-deep mb-1 font-semibold" style={{ fontFamily: MONO }}>Support found</p>
                <p className="text-[11px] text-mist leading-relaxed">{c.supportFound}</p>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.16em] text-clay mb-1 font-semibold" style={{ fontFamily: MONO }}>Support missing</p>
                <p className="text-[11px] text-mist leading-relaxed">{c.supportMissing}</p>
              </div>
            </div>
            <div className="rounded-lg border border-sage-deep/20 bg-sage/5 p-3">
              <p className="text-[8px] uppercase tracking-[0.16em] text-sage-deep mb-1 font-semibold" style={{ fontFamily: MONO }}>Safer rewrite</p>
              <p className="text-[11px] text-espresso italic leading-relaxed font-display">{c.saferRewrite}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Notice footer */}
      <div className="px-6 py-4 border-t border-sand-deep/20 bg-cream/40">
        <p className="text-[9px] font-mono uppercase tracking-[0.14em] text-mist/50 leading-[1.7]">
          Not legal advice. Not medical advice. Not regulatory certification. This receipt documents what was reviewed and what was found — not compliance with any regulatory requirement. Fictional demonstration. Radiance Medical Spa does not exist.
        </p>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export default function ClaimIntelligenceReceiptPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <title>Claim Audit Receipt for Agencies | AuditGPT by Scrutexity</title>
      <meta name="description" content="The Claim Audit Receipt is the agency CYA document: a structured record of what was reviewed, what proof was found, what language was adjusted, and what the client approved before a high-claim page launched." />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-44 md:pb-28 bg-cream-deep border-b border-sand-deep/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-10%,rgba(94,122,90,0.06),transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6" style={{ fontFamily: MONO }}>
            <FileText size={14} className="text-sage-deep" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">Agency Product · Claim Audit Receipt</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }} className="font-display text-4xl md:text-5xl lg:text-[3.8rem] text-espresso tracking-[-0.03em] leading-[1.05]">
                The agency CYA document for{' '}
                <span className="italic text-sage-deep">high-claim med-spa pages.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.18 }} className="mt-6 text-base md:text-lg text-mist leading-[1.65]">
                Before your agency launches GLP-1, body-contouring, IV therapy, exosome, or RF microneedling pages, give the client a Claim Audit Receipt — showing what was reviewed, what proof was found, what language was adjusted, and what the client approved.
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.25 }} className="mt-4 text-base text-espresso font-semibold leading-[1.6]">
                That is your CYA document. It is also a billable product.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.32 }} className="mt-8 flex flex-wrap gap-4">
                <Link href="/agency" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
                  Apply for Guardian Agency Plan
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/glp-1-weight-loss-claim-audit" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
                  GLP-1 Claim Audit
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/new-york-med-spa-claim-audit" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
                  NY/NJ Med-Spa Audit
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="https://auditgpt.ai/snapshot?source=claim-receipt-page" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
                  Run Free Claim Snapshot
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-5 text-xs text-mist/55" style={{ fontFamily: MONO }}>
                Not legal advice. Not regulatory certification. A documented review record for agency use.
              </motion.p>
            </div>

            {/* Demo receipt preview */}
            <motion.div initial={{ opacity: 0, scale: 0.98, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
              <DemoReceipt />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>What it is</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              A structured record. Not a compliance certification.
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.65]">
              The Claim Audit Receipt documents the claim-review process before a page launches. It is not legal advice, not regulatory certification, and not a compliance guarantee. It is a business record showing the agency reviewed the claim surface, found specific issues, and provided safer language options — before asking the client to approve.
            </p>
          </div>

          {/* Receipt fields */}
          <div className="rounded-2xl border border-sand-deep/30 bg-bone overflow-hidden">
            <div className="px-6 py-4 border-b border-sand-deep/20 bg-cream/60">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sage-deep font-semibold">Receipt fields</p>
            </div>
            <div className="divide-y divide-sand-deep/15">
              {RECEIPT_FIELDS.map((field, i) => (
                <motion.div key={field.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-cream/40 transition-colors">
                  <dt className="col-span-3 text-[10px] uppercase tracking-[0.16em] text-mist/65 font-semibold pt-0.5" style={{ fontFamily: MONO }}>{field.label}</dt>
                  <dd className={`col-span-9 text-sm leading-relaxed ${field.label === 'Notice' ? 'text-clay/80 text-xs italic' : 'text-espresso/80'}`}>{field.example}</dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>When to generate a receipt</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Six page types that need a Claim Audit Receipt before launch.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
                className="rounded-2xl border border-sand-deep/30 bg-cream p-6 hover:border-sage-deep/40 transition-colors">
                <p className="font-semibold text-espresso text-sm mb-2">{uc.title}</p>
                <p className="text-xs text-mist leading-relaxed">{uc.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT FLOW */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4" style={{ fontFamily: MONO }}>Agency product flow</p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              From client page to receipt to launch.
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {[
              { step: '01', label: 'Submit client URL', detail: 'Run AuditGPT on the client page before launch' },
              { step: '02', label: 'Review findings', detail: 'See which claims have support, which have gaps, which need rewrite' },
              { step: '03', label: 'Generate Receipt', detail: 'Claim Audit Receipt with support/missing/safer-rewrite per claim' },
              { step: '04', label: 'Client approves', detail: 'Client reviews and approves. Receipt is dated and retained.' },
              { step: '05', label: 'Launch or cleanup', detail: 'Client launches as-is or activates $1,997 Claim Cleanup Record' },
            ].map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
                className="flex-1 rounded-xl border border-sand-deep/30 bg-bone p-5 hover:border-sage-deep/35 transition-colors">
                <p className="text-[9px] font-mono uppercase tracking-widest text-sage-deep mb-3" style={{ fontFamily: MONO }}>{s.step}</p>
                <p className="font-semibold text-espresso text-sm mb-2">{s.label}</p>
                <p className="text-xs text-mist leading-relaxed">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-6" style={{ fontFamily: MONO }}>Questions</p>
          <h2 className="font-display text-3xl text-espresso tracking-[-0.02em] mb-10">What to know before you generate a receipt.</h2>
          {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-cream text-center">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck size={28} className="text-sage-deep mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            Give every high-claim launch{' '}
            <span className="italic text-sage-deep">a claim receipt first.</span>
          </h2>
          <p className="mt-4 text-sm text-mist leading-[1.65] max-w-xl mx-auto">
            Guardian Agency Plan includes 10 Claim Exposure Audits per month, white-labeled for your clients. Founding rate available for the first 5 agencies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/agency" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.45)]">
              Apply for Guardian Agency Plan
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="https://auditgpt.ai/snapshot?source=receipt-cta" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Run Free Snapshot First
            </Link>
          </div>
          <p className="mt-6 text-[10px] text-mist/50 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: MONO }}>
            Not legal advice. Not medical advice. Not regulatory certification. The Claim Audit Receipt documents a claim-review process, not compliance with any regulatory requirement.
          </p>
        </div>
      </section>
    </div>
  );
}
