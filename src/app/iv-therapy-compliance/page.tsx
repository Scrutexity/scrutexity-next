"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Droplets,
  AlertTriangle,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const WHAT_WE_CHECK = [
  {
    icon: Droplets,
    title: "IV Cocktail Claims",
    detail:
      'Does your page say "Myer\'s Cocktail cures hangovers" or "immune boost in 30 minutes"? We flag specific cure, treatment, and outcome claims attached to IV formulations — especially where the claim goes beyond general wellness into disease treatment language.',
  },
  {
    icon: AlertTriangle,
    title: "Biohacking & Longevity Language",
    detail:
      '"Biohack your biology," "reverse aging at the cellular level," "optimize your longevity" — these phrases trigger FTC scrutiny for unsubstantiated health benefits. We flag every instance and recommend evidence-based alternatives.',
  },
  {
    icon: ShieldCheck,
    title: "Detox & Cleanse Claims",
    detail:
      'The term "detox" in IV therapy marketing is a high-risk claim unless attached to a verified medical protocol. Texas HB 3749 specifically targets centers that market IV therapies for detoxification without licensed oversight.',
  },
  {
    icon: FileText,
    title: "Nutrient Dosing Claims",
    detail:
      "Specific milligram claims, \"high-dose vitamin C\" cure framing, and nutrient-level promises that exceed general dietary guidance. We surface what dosing language needs FDA-qualified disclosure or medical citation.",
  },
];

const PRICING = [
  {
    name: "IV Therapy Claim Report",
    price: "$299",
    highlight: null,
    detail:
      "Full claim inventory of your IV therapy pages. Every flagged claim — cocktail language, biohacking phrases, detox promises, dosing statements — gets a risk label, evidence map, and safer rewrite.",
    cta: "Get the $299 Report",
    href: "#",
  },
  {
    name: "Claim Cleanup Record",
    price: "$1,997",
    highlight: "Best value",
    detail:
      "Done-for-you: safer rewrites executed across your IV therapy pages. Final Claim Cleanup Record PDF — a structured record of what changed, why, and what public support now backs each claim.",
    cta: "Book Claim Cleanup Record",
    href: "/contact?intent=claim-cleanup-record&source=iv-therapy",
  },
  {
    name: "Ongoing Monitoring",
    price: "$299/mo",
    highlight: "Stay compliant",
    detail:
      "Monthly re-scan of your IV therapy pages and AI answer surfaces. Get alerted when new risk language appears, when FTC or state regulations change, and when AI answers begin referencing your site in new ways.",
    cta: "Start Monitoring",
    href: "#",
  },
];

const FAQS = [
  {
    q: "Is Texas HB 3749 already in effect for IV therapy centers?",
    a: "Texas HB 3749 was introduced to regulate IV therapy and micronutrient infusion centers. The bill requires licensed medical oversight for certain IV therapies and restricts marketing language. Scrutexity tracks the bill's status and flags language that would violate its provisions if enacted or enforced.",
  },
  {
    q: "Does Scrutexity guarantee my IV therapy site will pass regulatory review?",
    a: "No. Scrutexity reviews public-facing claim language against visible support and known regulatory guidance. It does not provide legal advice, certify compliance with any regulator, or guarantee that a regulator will not take action against your marketing.",
  },
  {
    q: "What about my 'Myer's Cocktail' page — is that specifically reviewed?",
    a: "Yes. IV cocktail names and associated benefit claims are reviewed individually. We flag whether 'Myer's Cocktail,' 'NAD+ drip,' 'Glutathione push,' or similar named protocols include unsubstantiated cure, treatment, or performance claims.",
  },
  {
    q: "My clinic uses IV therapy for hydration only. Do I need this audit?",
    a: "Even hydration-only pages are reviewed. Documenting that your marketing stays within general wellness boundaries is valuable. The audit confirms no accidental drift into treatment or cure language that could trigger review.",
  },
  {
    q: "Can you help with my Google and Meta ads for IV therapy?",
    a: "No. Scrutexity reviews your website claim language, not your ad platform creatives. However, website claims found in ads or landing pages may affect platform ad review outcomes.",
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sand-deep/20">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-display text-lg text-espresso leading-snug">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 mt-1 text-mist transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-mist leading-[1.7] max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function IVTherapyCompliancePage() {
  return (
    <main className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20 pt-[100px]">
      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-44 md:pb-28 bg-cream-deep border-b border-sand-deep/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-10%,rgba(94,122,90,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:linear-gradient(rgba(92,70,51,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6"
            style={{ fontFamily: MONO }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sage-deep opacity-50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-deep" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">
              IV Therapy Marketing · Active Regulatory Surface
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            IV Therapy Marketing Compliance.{" "}
            <span className="italic text-sage-deep">
              Before the state cites your website.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
            className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-2xl"
          >
            Texas HB 3749 is regulating IV therapy centers. The FTC is
            scrutinizing &ldquo;biohacking&rdquo; and unverified
            longevity/detox claims. Scrutexity audits your IV therapy
            pages — cocktail claims, detox language, nutrient dosing, and
            AI answer surfaces — so you see what is supported, what is
            overstated, and what should be rewritten.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="#"
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]"
            >
              Run Free IV Therapy Snapshot
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#"
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Get the $299 Report
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-5 text-xs text-mist/55"
            style={{ fontFamily: MONO }}
          >
            Not legal advice. Not regulatory certification. Claim language
            review only.
          </motion.p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              The problem
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              IV therapy marketing is entering a regulatory crosshair.
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.65]">
              Over the past two years, the rapid expansion of IV therapy
              and micronutrient infusion centers has outpaced the
              regulatory framework designed to oversee them. Texas HB 3749
              represents one of the first state-level efforts to regulate
              how these centers market their services — and it won&apos;t
              be the last.
            </p>
            <p className="mt-4 text-sm text-mist leading-[1.6]">
              Simultaneously, the FTC has increased scrutiny of
              &ldquo;biohacking&rdquo; and longevity-related marketing
              across medical aesthetics. Claims like &ldquo;reverse
              aging,&rdquo; &ldquo;cellular repair,&rdquo; and
              &ldquo;mitigate chronic disease&rdquo; are being reviewed
              against substantiation requirements that many IV therapy
              websites do not meet.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Texas HB 3749",
                detail:
                  "Introduced to regulate IV therapy and micronutrient infusion centers — requiring licensed medical oversight for certain procedures and restricting unsubstantiated marketing language about treatment outcomes.",
              },
              {
                label: "FTC biohacking scrutiny",
                detail:
                  'The FTC has explicitly warned against "biohacking" and "longevity" claims made without substantiation. IV therapy pages using these terms are at elevated risk of review.',
              },
              {
                label: "Detox claim enforcement",
                detail:
                  'Marketing "detox" or "cleanse" benefits of IV therapy without a verified medical protocol triggers regulatory scrutiny. State and federal regulators treat these as unsubstantiated health claims.',
              },
              {
                label: "AI answer distortion risk",
                detail:
                  "AI engines synthesize your public IV therapy pages. If your page claims a Myer's Cocktail treats migraines, that claim is repeated in AI-generated answers — multiplying your exposure surface.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: i * 0.08,
                }}
                className="flex gap-4 p-5 rounded-xl border border-sand-deep/30 bg-cream hover:border-sage-deep/35 transition-colors"
              >
                <AlertTriangle
                  size={18}
                  className="text-clay shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-semibold text-espresso text-sm mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-mist leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE CHECK */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              Audit categories
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              What Scrutexity checks on every IV therapy page.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHAT_WE_CHECK.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: i * 0.07,
                  }}
                  className="rounded-2xl border border-sand-deep/30 bg-white/80 backdrop-blur-sm p-6 hover:border-sage-deep/40 transition-colors shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-sage-deep" />
                  </div>
                  <p className="font-semibold text-espresso text-base mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-mist leading-relaxed">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              Pricing
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Three ways to address your IV therapy claim surface.
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">
            {PRICING.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: i * 0.1,
                }}
                className="relative flex-1 flex flex-col rounded-2xl border border-sand-deep/35 bg-cream p-6 hover:border-sage-deep/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  {s.highlight && (
                    <span className="px-2 py-1 bg-sage-soft/15 text-sage-deep border border-sage-deep/20 text-[9px] font-mono uppercase tracking-[0.14em] rounded-sm">
                      {s.highlight}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg text-espresso mb-1">
                  {s.name}
                </h3>
                <p className="font-display text-2xl text-espresso font-bold mb-3">
                  {s.price}{" "}
                  <span className="text-[10px] font-mono uppercase text-mist">
                    {i === 2 ? "per month" : "one-time"}
                  </span>
                </p>
                <p className="text-xs text-mist leading-relaxed flex-1 mb-5">
                  {s.detail}
                </p>
                <Link
                  href={s.href}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 group/btn ${
                    i === 1
                      ? "bg-sage-deep hover:bg-espresso text-cream"
                      : "bg-bone hover:bg-cream border border-sand-deep/40 text-espresso"
                  }`}
                >
                  {s.cta}{" "}
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-6"
            style={{ fontFamily: MONO }}
          >
            Questions
          </p>
          <h2 className="font-display text-3xl text-espresso tracking-[-0.02em] mb-10">
            What IV therapy clinics ask about claim compliance.
          </h2>
          {FAQS.map((f) => (
            <FAQ key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-bone text-center">
        <div className="max-w-2xl mx-auto">
          <CheckCircle2
            size={28}
            className="text-sage-deep mx-auto mb-6"
          />
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            Compliant IV therapy marketing.{" "}
            <span className="italic text-sage-deep">
              Before the state inspects your pages.
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Run Free IV Therapy Snapshot{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#"
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Get the $299 Report{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <p
            className="mt-8 text-[10px] text-mist/50 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: MONO }}
          >
            Scrutexity does not provide medical, legal, regulatory,
            clinical, or prescribing advice. It does not certify compliance
            or guarantee ad approvals, rankings, AI answers, or revenue
            outcomes. It reviews public-facing claims against visible
            support and identifies proof gaps, risky language, and safer
            rewrite options.
          </p>
        </div>
      </section>
    </main>
  );
}
