"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  FileSearch,
  CheckCircle2,
  ArrowRight,
  Ban,
  Package,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const FAQS = [
  {
    q: "Does DSCSA apply to my med-spa?",
    a: "The FDA's April 2026 Warning Letter to Pure Indulgence Aesthetics classified the med-spa as a 'dispenser' under DSCSA. If your practice purchases, administers, or dispenses prescription injectables (Botox, dermal fillers, GLP-1s), DSCSA transaction documentation requirements may apply. Scrutexity does not provide legal advice on DSCSA applicability — consult your compliance attorney for your specific supply chain.",
  },
  {
    q: "If I have a DSCSA violation, will this audit catch it?",
    a: "Scrutexity reviews your public-facing marketing claims — not your supply chain records. We flag where your website promises 'FDA-approved injectables from authorized manufacturers' but we cannot verify your actual sourcing. A marketing claim that says 'authentic Botox' without verifiable DSCSA transaction documentation in your records is a risk we surface. Your compliance officer must verify the records match.",
  },
  {
    q: "Does Scrutexity verify my actual supply chain records?",
    a: "No. Scrutexity does not access your purchasing records, wholesale licenses, or DSCSA transaction documentation. We audit the public-facing claim — whether what you say about your supply chain can be supported by documentation you should have on file. The documentation verification must be performed by your compliance team or attorney.",
  },
  {
    q: "What happens if my marketing claim says 'FDA-approved' but the product is only cleared?",
    a: "This is a common and high-risk claim error. AuditGPT flags the specific language and provides a safer rewrite. The DSCSA dimension adds supply chain risk: if your website claims 'FDA-approved injectables' and your sourcing records cannot prove the chain of custody from manufacturer to patient, you face both FDA misbranding liability and DSCSA record-keeping liability simultaneously.",
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

export default function DSCSACompliancePage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <title>DSCSA Compliance & Supply Chain Claim Audit | AuditGPT by Scrutexity</title>
      <meta name="description" content="The FDA cited a Texas med-spa for DSCSA violations using unauthorized Botox. Scrutexity audits whether your public claims of using 'FDA-approved injectables' match your verifiable supply-chain documentation." />

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
              <span className="absolute inline-flex h-full w-full rounded-full bg-clay-deep opacity-50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-clay-deep" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-clay-deep font-semibold">Supply Chain · DSCSA Enforcement · Active Risk Surface</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            Your website says &ldquo;FDA-approved injectables.&rdquo;{' '}
            <span className="italic text-sage-deep">Can your supply chain prove it?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
            className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-3xl"
          >
            On April 1, 2026, the FDA issued a Warning Letter to Pure Indulgence Aesthetics — a Texas med-spa cited as a &ldquo;dispenser&rdquo; under the Drug Supply Chain Security Act for purchasing unauthorized, untrackable Botox. The FDA noted a massive discrepancy between purchased authentic units and administered doses. Your public claims of using &ldquo;FDA-approved injectables&rdquo; must match your verifiable sourcing documentation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="https://auditgpt.ai/snapshot?source=dscsa-hero" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
              Run a Supply Chain Claim Audit — $497
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact?intent=dscsa-brief" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Download the DSCSA Risk Brief
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-5 text-xs text-mist/55" style={{ fontFamily: MONO }}>
            Not legal advice. Not FDA guidance. Not DSCSA compliance certification. Claim-to-supply-chain alignment review only.
          </motion.p>
        </div>
      </section>

      {/* THE WARNING LETTER */}
      <section className="px-6 py-20 md:py-28 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 mb-4" style={{ fontFamily: MONO }}>
              <ShieldAlert size={14} className="text-clay-deep" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-clay-deep font-semibold">Landmark Enforcement · April 2026</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              The FDA Warning Letter that changed{' '}
              <span className="italic text-sage-deep">everything for med-spas.</span>
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
              className="bg-white/80 backdrop-blur-sm border border-clay/30 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center">
                  <Ban size={18} className="text-clay-deep" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-clay-deep font-semibold" style={{ fontFamily: MONO }}>The Citation</span>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5 text-clay" />
                  <span>Med-spa classified as a &ldquo;dispenser&rdquo; under DSCSA — placing local operators under federal pharmaceutical supply chain law</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5 text-clay" />
                  <span>Administered Botox sourced from unauthorized trading partners with no traceable chain of custody</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5 text-clay" />
                  <span>Massive discrepancy between purchased authentic units and administered doses reported to the state</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5 text-clay" />
                  <span>Sets legal precedent: local aesthetic operators are now directly in FDA&rsquo;s DSCSA enforcement crosshairs</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-sand-deep/30 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                  <Package size={18} className="text-sage-deep" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold" style={{ fontFamily: MONO }}>The New Reality</span>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-sage" />
                  <span>Marketing claims must match verifiable DSCSA transaction documentation</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-sage" />
                  <span>Every injectable unit must be traceable from manufacturer to administration</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-sage" />
                  <span>Public claims of &ldquo;FDA-approved injectables&rdquo; create audit expectations your records must meet</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-mist leading-relaxed">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-sage" />
                  <span>State boards, PE diligence teams, and acquirers now check both marketing AND sourcing</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mt-6 text-xs text-mist/50" style={{ fontFamily: MONO }}
          >
            Source: FDA Warning Letter 723267, Pure Indulgence Aesthetics, Southlake TX, April 1 2026
          </motion.div>
        </div>
      </section>

      {/* THE GAP */}
      <section className="px-6 py-20 md:py-28 bg-cream-deep">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4" style={{ fontFamily: MONO }}>
              <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">The Marketing vs Supply Chain Gap</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              What your website promises vs.{' '}
              <span className="italic text-sage-deep">what your records must prove.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT — Marketing Claims */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
              className="bg-white/80 backdrop-blur-sm border border-sand-deep/30 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center">
                  <AlertTriangle size={18} className="text-clay-deep" />
                </div>
                <h3 className="font-display text-xl text-espresso">Your Website Says</h3>
              </div>
              <div className="space-y-4">
                {[
                  { claim: '"We use only FDA-approved Botox"' },
                  { claim: '"Premium medical-grade injectables"' },
                  { claim: '"Sourced from trusted manufacturers"' },
                  { claim: '"Authentic, name-brand products"' },
                  { claim: '"Safe, regulated pharmaceutical-grade treatments"' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-clay/[0.03] border border-clay/20 rounded-xl">
                    <p className="text-sm font-medium text-espresso">{item.claim}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Supply Chain Reality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-sage/30 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                  <ShieldAlert size={18} className="text-sage-deep" />
                </div>
                <h3 className="font-display text-xl text-espresso">Your Records Must Prove</h3>
              </div>
              <div className="space-y-4">
                {[
                  { reality: 'Purchasing from authorized manufacturer distributors only' },
                  { reality: 'DSCSA transaction documentation (TI, TH, TS) for every lot' },
                  { reality: 'Complete chain of custody from manufacturer to patient administration' },
                  { reality: 'Lot numbers match patient treatment records' },
                  { reality: 'No discrepancy between purchased units and administered doses' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-sage/[0.04] border border-sage/20 rounded-xl">
                    <p className="text-sm font-medium text-espresso">{item.reality}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT WE CHECK */}
      <section className="px-6 py-20 md:py-28 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4" style={{ fontFamily: MONO }}>
              <FileSearch size={14} className="text-sage-deep" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">Audit Scope</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              What Scrutexity checks for{' '}
              <span className="italic text-sage-deep">supply chain alignment.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: FileSearch, title: 'Claim vs Supply Chain Alignment', desc: 'We extract every claim about product sourcing, FDA approval status, and manufacturer relationships. Each claim is tagged against the documentation standard it creates.' },
              { icon: ShieldAlert, title: 'FDA Approval Status Verification', desc: 'Do you claim "FDA approved" for products that are only FDA-cleared? We flag the specific language and the regulatory liability it creates under misbranding laws.' },
              { icon: Package, title: 'DSCSA Transaction Language Audit', desc: 'If your website references "traceable," "trackable," or "authenticated" injectables, we verify those claims imply DSCSA compliance — and flag where they create unmeetable documentation expectations.' },
              { icon: AlertTriangle, title: 'AI Answer Entity Distortion', desc: 'We check whether ChatGPT, Perplexity, or Google AI Overviews accurately describe your injectable sourcing — including whether they repeat or distort your supply chain claims.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-sm border border-sand-deep/30 rounded-2xl p-6 shadow-sm"
              >
                <item.icon size={20} className="text-sage-deep mb-3" />
                <h3 className="font-display text-xl text-espresso mb-2">{item.title}</h3>
                <p className="text-sm text-mist leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 md:py-28 bg-cream-deep">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              Pricing for{' '}
              <span className="italic text-sage-deep">supply chain claim risk.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Claim Intelligence Report', price: '$497', cadence: 'one-time', desc: 'Full extraction of every injectable sourcing claim on your site, mapped to the documentation standard it implies. Includes AI answer reality check.', cta: 'Order Report', href: 'https://auditgpt.ai/snapshot?source=dscsa&intent=paid', highlight: false },
              { name: 'DSCSA Cleanup Record', price: '$1,997', cadence: 'one-time', desc: 'Complete website overhaul: safer supply chain claims, FDA status corrections, DSCSA-aligned language. Clean AuditGPT Claim Cleanup Record PDF.', cta: 'Book Cleanup Record', href: '/contact?intent=claim-cleanup-record&source=dscsa', highlight: true },
              { name: 'Guardian Monitoring', price: 'from $1,497', cadence: '/month', desc: 'Continuous monitoring of your injectable and supply chain claims. Alerted when new pages or blog posts introduce DSCSA-adjacent risk language.', cta: 'Start Monitoring', href: 'https://auditgpt.ai/pricing', highlight: false },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className={`rounded-2xl p-8 shadow-sm ${tier.highlight ? 'bg-espresso text-cream border-2 border-sage' : 'bg-white/80 backdrop-blur-sm border border-sand-deep/30'}`}
              >
                <h3 className={`font-display text-2xl mb-1 ${tier.highlight ? 'text-cream' : 'text-espresso'}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`font-display text-4xl ${tier.highlight ? 'text-cream' : 'text-espresso'}`}>{tier.price}</span>
                  <span className={`text-sm ${tier.highlight ? 'text-cream/60' : 'text-mist'}`}>{tier.cadence}</span>
                </div>
                <p className={`text-sm mb-8 leading-relaxed ${tier.highlight ? 'text-cream/75' : 'text-mist'}`}>{tier.desc}</p>
                <Link href={tier.href} className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${tier.highlight ? 'bg-sage-deep hover:bg-sage text-cream' : 'bg-sage-deep hover:bg-espresso text-cream'}`}>
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 md:py-28 bg-cream">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl text-espresso leading-[1.05] tracking-[-0.02em]">
              Frequently asked{' '}
              <span className="italic text-sage-deep">questions.</span>
            </h2>
          </motion.div>
          {FAQS.map((faq, i) => <FAQ key={i} {...faq} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28 bg-cream-deep border-t border-sand-deep/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-espresso mb-6">
              Your injectable claims create a documentation liability.{' '}
              <span className="italic text-sage-deep">Know what your website promises before the FDA asks for proof.</span>
            </h2>
            <p className="text-base text-mist max-w-xl mx-auto mb-8 leading-relaxed">
              The $497 Claim Exposure Audit extracts every supply chain claim from your site and maps it against the documentation it implies. No legal advice. No compliance certification. Just a structured record of what your website says vs. what your records must prove.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://auditgpt.ai/snapshot?source=dscsa-cta" className="px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
                Run a Supply Chain Claim Audit — $497
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact?intent=dscsa" className="px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
                Talk to a compliance specialist
                <ArrowRight size={16} />
              </Link>
            </div>
            <p className="mt-6 text-xs text-mist/55" style={{ fontFamily: MONO }}>
              Not legal advice. Not FDA guidance. Not DSCSA compliance certification. Claim-to-supply-chain alignment review only. Consult your compliance attorney for regulatory guidance.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
