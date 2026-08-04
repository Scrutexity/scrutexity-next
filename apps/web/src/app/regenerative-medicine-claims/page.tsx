"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Dna,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Ban,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const HIGH_RISK_CATEGORIES = [
  {
    icon: Ban,
    title: '"Repair damaged tissue"',
    detail:
      '"Repair," "regenerate," and "restore" are clinical outcome verbs. Using them to describe stem cell or exosome treatments implies a therapeutic effect that — without FDA-reviewed clinical evidence — classifies the treatment as an unapproved biological drug.',
  },
  {
    icon: Ban,
    title: '"Reverse aging"',
    detail:
      'Aging reversal claims for stem cell therapy, exosomes, or PRP are among the highest-risk categories. The FTC has specifically pursued clinics making aging-reversal claims for regenerative procedures. These require extensive clinical evidence that most clinics cannot produce.',
  },
  {
    icon: Ban,
    title: '"Cure osteoarthritis"',
    detail:
      'Claiming stem cell therapy or PRP can "cure," "treat," or "reverse" osteoarthritis positions the therapy as a treatment for a specific disease — triggering FDA jurisdiction over your marketing as an unapproved drug claim.',
  },
  {
    icon: Ban,
    title: '"Regenerate organs"',
    detail:
      "Organ regeneration claims for stem cell treatments are the most extreme category. The FTC vs. Stem Cell Institute of America case specifically focused on claims that stem cells could regenerate organs like the heart, liver, and kidneys.",
  },
  {
    icon: Ban,
    title: '"Stem cell therapy for X"',
    detail:
      'Filling in the blank — "Stem cell therapy for Parkinson\'s," "for autism," "for spinal cord injury," "for COPD" — makes a specific disease-treatment claim. Each requires FDA-reviewed clinical evidence that hardly any clinic marketing stem cell therapies can provide.',
  },
];

const REVIEW_CATEGORIES = [
  {
    label: "Disease-treatment framing",
    detail:
      "Whether your pages frame stem cell, exosome, or PRP therapy as a treatment, cure, or mitigation for a named disease or condition.",
  },
  {
    label: '"Regenerative" language',
    detail:
      'Whether "regenerate," "repair," "rebuild," "restore," or similar terms are used in a way that implies therapeutic outcome without supporting evidence.',
  },
  {
    label: "Exosome & PRP claims",
    detail:
      "Specific marketing language around exosome therapy and platelet-rich plasma reviewed for substantiation and disease-treatment framing.",
  },
  {
    label: "FDA status disclosure",
    detail:
      "Whether your pages accurately disclose that stem cell therapies are not FDA-approved for systemic disease treatment and are regulated as biological drugs.",
  },
  {
    label: "Testimonial & outcome framing",
    detail:
      "Patient stories, before/after language, and anecdotal outcome claims reviewed against FTC substantiation requirements.",
  },
  {
    label: "AI answer surfaces",
    detail:
      "How ChatGPT, Perplexity, and Google AI Overviews describe your regenerative medicine services — including whether they repeat unsubstantiated claims.",
  },
];

const PRICING = [
  {
    name: "Regenerative Medicine Claim Report",
    price: "$497",
    highlight: null,
    detail:
      "Full claim inventory of your regenerative medicine pages. Every flagged claim — disease-treatment framing, stem cell language, exosome marketing — gets a risk label, evidence map, and safer rewrite.",
    cta: "Get the $497 Audit",
    href: "#",
  },
  {
    name: "Claim Cleanup Record",
    price: "$1,997",
    highlight: "Best value",
    detail:
      "Done-for-you: safer rewrites executed across your regenerative medicine pages. Final Claim Cleanup Record PDF — a structured record of what changed, why, and what public support now backs each claim.",
    cta: "Book Claim Cleanup Record",
    href: "/contact?intent=claim-cleanup-record&source=regenerative-medicine",
  },
  {
    name: "Ongoing Monitoring",
    price: "from $1,497/mo",
    highlight: "Regulatory alerts",
    detail:
      "Monthly re-scan of your regenerative medicine pages and AI answer surfaces. Get alerted when new risk language appears, when FTC enforcement actions occur, and when AI answers begin referencing your site in new ways.",
    cta: "Start Monitoring",
    href: "#",
  },
];

const FAQS = [
  {
    q: "Was the Stem Cell Institute of America really fined $5.1 million?",
    a: "Yes. The FTC and the State of Florida obtained a $5.1 million judgment against the Stem Cell Institute of America for false claims about stem cell treatments — including that stem cells could cure or treat serious diseases like Parkinson's, multiple sclerosis, and COPD without FDA-reviewed evidence.",
  },
  {
    q: "Does Scrutexity provide legal or regulatory advice?",
    a: "No. Scrutexity reviews public-facing claim language against visible support and known regulatory guidance. It does not provide legal advice, certify compliance with any regulator, or guarantee that a regulator will not take action against your marketing.",
  },
  {
    q: "Are exosome and PRP therapies also reviewed?",
    a: "Yes. Exosome marketing and PRP claims fall under the same regulatory framework. If your pages frame exosomes or PRP as treatments for specific diseases or conditions, they carry similar risk to direct stem cell therapy claims.",
  },
  {
    q: "My clinic only offers stem cell therapy for orthopedic conditions. Is that safer?",
    a: "Not necessarily. Orthopedic claims — 'stem cell therapy for osteoarthritis,' 'cartilage regeneration,' 'joint repair' — remain disease-treatment claims. The specific body part does not change the regulatory classification.",
  },
  {
    q: "What does 'unapproved biological drug' mean for my marketing?",
    a: "The FDA classifies stem cells, exosomes, and certain regenerative products as biological drugs when they are marketed to treat, cure, or prevent disease. If your marketing frames them as systemic cures, they are being marketed as unapproved biological drugs — a classification that carries significant enforcement risk.",
  },
  {
    q: "Can you tell me if my website will trigger an FTC investigation?",
    a: "No. Scrutexity cannot predict enforcement actions. We surface what claim language is visible, what support exists for each claim, and what a regulator would likely scrutinize. The decision about enforcement rests entirely with regulators.",
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

export default function RegenerativeMedicineClaimsPage() {
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
              Regenerative Medicine · FTC Enforcement Surface
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            Regenerative Medicine Claim Compliance.{" "}
            <span className="italic text-sage-deep">
              The FTC fined $5.1M. Don&apos;t be next.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
            className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-2xl"
          >
            FTC vs. Stem Cell Institute of America set a $5.1 million
            precedent for false stem cell cure claims. Exosomes, PRP, and
            stem cell marketing face active enforcement. Treating stem
            cells as systemic cures classifies them as unapproved
            biological drugs. Scrutexity audits your regenerative medicine
            pages before regulators do.
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
              Run Free Regenerative Medicine Snapshot
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#"
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Get the $497 Audit
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

      {/* THE $5.1M WARNING */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              The $5.1M Warning
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              FTC vs. Stem Cell Institute of America set the precedent.
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.65]">
              In 2023, the FTC and the State of Florida obtained a $5.1
              million judgment against the Stem Cell Institute of America
              for false and unsubstantiated claims about stem cell
              treatments. The defendants claimed stem cells could treat
              Parkinson&apos;s disease, multiple sclerosis, COPD,
              arthritis, and more — without FDA-reviewed clinical
              evidence.
            </p>
            <p className="mt-4 text-sm text-mist leading-[1.6]">
              That case is not an outlier. The FTC has signaled that
              regenerative medicine marketing is a priority enforcement
              area. Every clinic offering stem cell therapy, exosome
              treatments, or PRP — and marketing those services on a
              website — is operating on active regulatory ground.
            </p>
            <div className="mt-6 p-5 rounded-xl border-2 border-clay/25 bg-cream">
              <p
                className="text-[10px] uppercase tracking-[0.18em] text-clay mb-2 font-semibold"
                style={{ fontFamily: MONO }}
              >
                Key regulatory doctrine
              </p>
              <p className="font-display text-base text-espresso italic leading-snug">
                &ldquo;Treating stem cells as systemic cures classifies
                them as unapproved biological drugs.&rdquo;
              </p>
              <p className="mt-3 text-xs text-mist leading-relaxed">
                This means your marketing language directly determines
                whether your stem cell therapy is classified under
                regulatory review as a medical procedure or an
                unapproved drug — with enforcement consequences that
                follow the latter.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "$5.1M judgment",
                detail:
                  "The FTC vs. Stem Cell Institute of America case resulted in a multi-million dollar penalty for claims that stem cells could treat serious diseases without clinical evidence.",
              },
              {
                label: "Unapproved biological drug classification",
                detail:
                  "When stem cells, exosomes, or PRP are marketed to treat, cure, or prevent disease, they are classified as unapproved biological drugs — subject to FDA enforcement.",
              },
              {
                label: "Ongoing FTC priority",
                detail:
                  "The FTC has explicitly identified regenerative medicine marketing as a priority enforcement area with active investigations and penalties.",
              },
              {
                label: "AI answer amplification",
                detail:
                  "AI engines repeat your website claims. If your pages say 'stem cells cure arthritis,' that claim now lives in ChatGPT, Perplexity, and Google AI answers — multiplying your regulatory exposure surface.",
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
                className="flex gap-4 p-5 rounded-xl border border-sand-deep/30 bg-cream hover:border-clay/35 transition-colors"
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

      {/* HIGH-RISK CLAIM CATEGORIES */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              High-risk claim categories
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Five claim categories that trigger enforcement.
            </h2>
            <p className="mt-4 text-sm text-mist leading-[1.6]">
              Each of these claim types has been the basis for FTC or FDA
              enforcement actions against regenerative medicine clinics.
              If any appear on your website, you are operating on active
              regulatory ground.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HIGH_RISK_CATEGORIES.map((item, i) => {
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
                  className="rounded-2xl border border-sand-deep/30 bg-white/80 backdrop-blur-sm p-6 hover:border-clay/40 transition-colors shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-clay/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-clay" />
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

      {/* WHAT SCRUTEXITY REVIEWS */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              What we review
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Six claim categories reviewed on every regenerative medicine
              page.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEW_CATEGORIES.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: i * 0.07,
                }}
                className="rounded-2xl border border-sand-deep/30 bg-cream p-6 hover:border-sage-deep/40 transition-colors"
              >
                <p className="font-semibold text-espresso text-sm mb-2">
                  {item.label}
                </p>
                <p className="text-xs text-mist leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              Pricing
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Protect your regenerative medicine practice.
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
                className="relative flex-1 flex flex-col rounded-2xl border border-sand-deep/35 bg-bone p-6 hover:border-sage-deep/40 hover:-translate-y-1 transition-all duration-300 group"
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
                      : "bg-cream hover:bg-bone border border-sand-deep/40 text-espresso"
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
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-6"
            style={{ fontFamily: MONO }}
          >
            Questions
          </p>
          <h2 className="font-display text-3xl text-espresso tracking-[-0.02em] mb-10">
            What regenerative medicine clinics need to know.
          </h2>
          {FAQS.map((f) => (
            <FAQ key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-cream text-center">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck
            size={28}
            className="text-sage-deep mx-auto mb-6"
          />
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            Regenerative medicine marketing reviewed.{" "}
            <span className="italic text-sage-deep">
              Before the FTC arrives.
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Run Free Regenerative Medicine Snapshot{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#"
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Get the $497 Audit{" "}
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
