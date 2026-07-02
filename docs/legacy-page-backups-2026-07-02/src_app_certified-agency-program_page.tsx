"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  FileText,
  Users,
  Zap,
  CheckCircle2,
  Star,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: "Your clients are getting cited",
    detail:
      "Medical aesthetics and wellness clinics are receiving regulatory notices for website claim language. If you built their site, their compliance problem becomes your liability concern. The average citation costs more than a year of your retainer.",
  },
  {
    icon: Users,
    title: "You're losing compliance upsells",
    detail:
      "Every client with a website needs claim language reviewed — but most agencies have no compliance offering. You leave $497-$4,997 per client on the table every time you hand off a site without an audit.",
  },
  {
    icon: Zap,
    title: "AI is rewriting your clients' brand",
    detail:
      "AI answer engines synthesize your clients' public pages. If their site says 'cure migraines with IV therapy,' that claim now lives in ChatGPT and Google AI Overviews. You need a way to surface and fix that — and bill for it.",
  },
];

const WHAT_YOU_GET = [
  {
    icon: Award,
    title: "Certified Agency Badge",
    detail:
      "Display the Scrutexity Certified Agency badge on your site and in your proposals. It signals to medical and wellness clients that you understand their compliance landscape — a competitive differentiator that commands higher retainers.",
  },
  {
    icon: FileText,
    title: "Agency Claim Intelligence Receipt",
    detail:
      "A branded, white-label PDF you deliver to every client. Shows exactly what claims were reviewed, what was flagged, what the safer rewrites are, and what the client's 'proximity to enforcement' currently looks like. You look like the expert.",
  },
  {
    icon: Star,
    title: "White-Label Resell Rights",
    detail:
      "Resell Scrutexity audits under your own brand. The $497 Claim Exposure Audit is yours to present as your service. No co-branding. No mention of Scrutexity. Your client sees your logo on every deliverable.",
  },
  {
    icon: Zap,
    title: "Priority Monitoring & Alerts",
    detail:
      "Get notified the moment one of your client sites drifts into risky claim territory — new pages, new service offerings, AI answer changes. Proactive monitoring you can bill as a managed compliance retainer.",
  },
];

const TIERS = [
  {
    name: "Partner",
    price: "from $1,497/mo",
    highlight: null,
    includes: [
      "Certified Agency badge",
      "White-label report resell rights",
      "Up to 10 client audits/mo included",
      "Agency Claim Intelligence Receipt",
      "Monthly compliance newsletter",
      "Email support",
    ],
    cta: "Apply for Partner",
  },
  {
    name: "Enterprise",
    price: "$999/mo",
    highlight: "Most popular",
    includes: [
      "Everything in Partner",
      "Unlimited client audits",
      "Priority monitoring — all clients",
      "Dedicated compliance advisor",
      "Custom white-label deliverables",
      "Quarterly compliance review",
      "API access for automated audits",
      "Slack integration & priority support",
    ],
    cta: "Apply for Enterprise",
  },
];

const STEPS = [
  {
    step: 1,
    title: "Submit Your Application",
    detail:
      "Tell us about your agency — clients served, verticals, current compliance offerings. We review your application within 48 hours. Most agencies that serve medical aesthetics or wellness clients are approved.",
  },
  {
    step: 2,
    title: "Onboarding & Training",
    detail:
      "60-minute onboarding call covering the Scrutexity platform, white-label workflow, and how to present the Claim Intelligence Receipt to clients. You'll run your first audit during the call.",
  },
  {
    step: 3,
    title: "Start Reselling & Monitoring",
    detail:
      "Begin submitting client URLs. Deliver white-label audits. Set up monitoring alerts. Your first month's audits are included — start billing clients immediately.",
  },
];

const FAQS = [
  {
    q: "Can I resell Scrutexity audits under my own brand?",
    a: "Yes. Both Partner and Enterprise tiers include white-label resell rights. The Claim Intelligence Report, monitoring alerts, and all client-facing deliverables show your logo and brand — not Scrutexity's.",
  },
  {
    q: "How many clients can I audit per month?",
    a: "Partner tier includes up to 10 client audits per month. Enterprise tier includes unlimited audits for your entire client portfolio.",
  },
  {
    q: "Do I need compliance experience to join?",
    a: "No. The program is designed for agencies without in-house compliance expertise. The platform handles the review; you deliver the report. The onboarding call covers everything you need to present the service confidently.",
  },
  {
    q: "What happens if a client's site has high-risk claims?",
    a: "The audit surfaces every flagged claim with risk labels and safer rewrites. You deliver the findings as a value-add service and offer the Claim Cleanup Record ($1,997) as an upsell if the client wants done-for-you rewrites.",
  },
  {
    q: "Can I start with Partner and upgrade later?",
    a: "Yes. You can upgrade from Partner to Enterprise at any time. The difference is prorated for the remainder of your billing cycle.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "No minimum commitment. Month-to-month billing. Cancel anytime.",
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

export default function CertifiedAgencyProgramPage() {
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
              Certified Agency Program · Partner Application Open
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            The Scrutexity Certified Agency Program.{" "}
            <span className="italic text-sage-deep">
              Your clients&apos; compliance is your revenue.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
            className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-2xl"
          >
            Medical aesthetics and wellness clinics need claim compliance
            reviews — and they need an agency that understands the
            landscape. Become a Scrutexity Certified Agency. Resell
            white-label audits. Deliver the Claim Intelligence Receipt as
            your own service. Turn compliance into a recurring revenue
            stream.
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
              Apply for the Program
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#"
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              View Partner Pricing
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
            No compliance experience required. No minimum commitment.
            Month-to-month.
          </motion.p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              Agency pain points
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Three problems every medical marketing agency faces.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: i * 0.1,
                  }}
                  className="rounded-2xl border border-sand-deep/30 bg-white/80 backdrop-blur-sm p-6 hover:border-clay/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
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

      {/* WHAT YOU GET */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              What you get
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Everything you need to sell compliance as a service.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHAT_YOU_GET.map((item, i) => {
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

      {/* TIERS */}
      <section className="px-6 py-20 bg-bone border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              Membership tiers
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Two tiers. One mission: grow your agency.
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: i * 0.1,
                }}
                className={`relative flex-1 flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  i === 1
                    ? "border-sage-deep/40 bg-cream shadow-[0_16px_40px_-16px_rgba(94,122,90,0.2)]"
                    : "border-sand-deep/35 bg-white/80 backdrop-blur-sm shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-xl text-espresso">
                    {tier.name}
                  </h3>
                  {tier.highlight && (
                    <span className="px-2 py-1 bg-sage-soft/15 text-sage-deep border border-sage-deep/20 text-[9px] font-mono uppercase tracking-[0.14em] rounded-sm">
                      {tier.highlight}
                    </span>
                  )}
                </div>
                <p className="font-display text-3xl text-espresso font-bold mb-6">
                  {tier.price}{" "}
                  <span className="text-[11px] font-mono uppercase text-mist font-normal">
                    /mo
                  </span>
                </p>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-mist"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 mt-0.5 text-sage-deep"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 group ${
                    i === 1
                      ? "bg-sage-deep hover:bg-espresso text-cream"
                      : "bg-bone hover:bg-cream border border-sand-deep/40 text-espresso"
                  }`}
                >
                  {tier.cta}{" "}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="px-6 py-20 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep mb-4"
              style={{ fontFamily: MONO }}
            >
              Application process
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Three steps to becoming a Certified Agency.
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
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
                  <div className="w-8 h-8 rounded-full bg-cream border border-sand-deep/40 flex items-center justify-center font-mono text-[11px] font-bold text-mist group-hover:text-sage-deep group-hover:border-sage-deep transition-colors">
                    {s.step}
                  </div>
                </div>
                <h3 className="font-display text-lg text-espresso mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-mist leading-relaxed flex-1">
                  {s.detail}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Link
              href="#"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm"
            >
              Start Your Application{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
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
            What agencies ask about the Certified Agency Program.
          </h2>
          {FAQS.map((f) => (
            <FAQ key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-cream text-center">
        <div className="max-w-2xl mx-auto">
          <Award size={28} className="text-sage-deep mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            Turn compliance into revenue.{" "}
            <span className="italic text-sage-deep">
              Join the Certified Agency Program.
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Apply Now{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#"
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Schedule a Call{" "}
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
            No minimum commitment. Month-to-month billing. Cancel anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
