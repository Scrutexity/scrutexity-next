"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  Eye,
  Database,
  FileSearch,
  CheckCircle2,
  ArrowRight,
  Ban,
  Search,
  Server,
  Fingerprint,
  ScrollText,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE },
};

const ARCHITECTURE_PILLARS = [
  {
    icon: Eye,
    title: "Read-Only by Design",
    body: "Scrutexity scans public-facing web pages only. No server access, no database connections, no API integrations with clinical systems. Zero operational disruption.",
  },
  {
    icon: FileSearch,
    title: "BAA-Governed",
    body: "Every audit is covered by a Business Associate Agreement. HIPAA-compliant data handling with full audit trail.",
  },
  {
    icon: Ban,
    title: "PHI-Redacted at Ingress",
    body: "Phone numbers, email addresses, and patient identifiers are hashed per-clinic at the point of capture. Never stored in plaintext. Twilio ingress gateway strips PII before analysis.",
  },
  {
    icon: Fingerprint,
    title: "SHA-256 Evidence Ledger",
    body: "Every claim extraction is timestamped and sealed with a SHA-256 hash. Immutable proof of what was found, when, and in what state.",
  },
];

const COMPARISON_ROWS = [
  { label: "Access", traditional: "Full system access required", scrutexity: "Public URLs only" },
  { label: "Setup Time", traditional: "2–6 weeks", scrutexity: "2 minutes" },
  { label: "Downtime", traditional: "Yes", scrutexity: "Zero" },
  { label: "PHI Exposure", traditional: "Full patient records", scrutexity: "Redacted at ingress" },
  { label: "Cost", traditional: "$15,000–$50,000", scrutexity: "$99–$2,500" },
  { label: "Frequency", traditional: "Quarterly / Annual", scrutexity: "Continuous" },
  { label: "Deliverable", traditional: "Static PDF", scrutexity: "Dated review records" },
];

const TRUST_SIGNALS = [
  { icon: ShieldCheck, title: "SOC2 Evidence Collection", body: "via Vanta — continuous control monitoring and evidence export for your compliance team." },
  { icon: Server, title: "Twilio Ingress PHI Gateway", body: "All inbound data passes through Twilio's infrastructure where PII is stripped before analysis." },
  { icon: ScrollText, title: "BAA on request", body: "A Business Associate Agreement is available on request for any engagement that may touch protected health information. We do not claim executed agreements we cannot show." },
  { icon: Lock, title: "Read-Only Architecture", body: "No database connections, no server agents, no PMS/EHR integration. Public web pages only." },
  { icon: Database, title: "SHA-256 Integrity Seals", body: "Every extraction is timestamped and sealed. The ledger is independently verifiable." },
  { icon: CheckCircle2, title: "No Data Retention Policy", body: "We do not retain PHI. Redacted extracts are retained only for the audit lifecycle and purged on completion." },
];

const FAQ_DATA = [
  {
    q: "Do you connect to our PMS or EHR?",
    a: "No. Scrutexity never connects to your Practice Management System, EHR, or any clinical database. Our audits scan only the public-facing web pages you choose. There is no server-side integration, no API key exchange, and no database access of any kind.",
  },
  {
    q: "What PHI do you store?",
    a: "We do not store PHI in plaintext. Phone numbers, email addresses, and patient identifiers are hashed per-clinic at the point of capture using SHA-256. The hashed identifiers are used for deduplication only. No raw patient data ever enters our application layer.",
  },
  {
    q: "Do you need our login credentials?",
    a: "Never. Scrutexity requires no usernames, passwords, API keys, or any form of authenticated access to your systems. The entire audit operates on what is publicly visible — the same pages a patient, regulator, or plaintiff's attorney would see.",
  },
  {
    q: "Can regulators subpoena your audit records?",
    a: "Scrutexity maintains a SHA-256 sealed evidence ledger of every claim extraction. If legally compelled, we can produce the sealed ledger. However, because PHI is redacted at ingress and never stored in plaintext, the ledger contains no protected health information — making it minimally responsive to subpoenas seeking patient data.",
  },
  {
    q: "How do I know the audit wasn't tampered with?",
    a: "Every claim extraction is timestamped and sealed with a SHA-256 hash at the moment of capture. The hash is recorded in our evidence ledger alongside a timestamp, a snapshot of the source page, and the extraction result. You can independently verify the integrity of any extraction by comparing the hash against the sealed record. Any post-capture modification would break the hash chain.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  toggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-sand-deep/30 last:border-b-0">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left transition hover:text-clay"
      >
        <span className="font-semibold text-sm leading-6 text-espresso">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="shrink-0 text-mist"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-1 pb-5 text-sm leading-7 text-mist">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SafetyArchitecturePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-cream text-espresso font-sans selection:bg-clay/20 pt-[100px]">

      {/* ═══ HERO ═══ */}
      <section className="bg-cream-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-sage-deep"
              style={{ fontFamily: MONO }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage-deep" />
              Architecture · Safety-First Design
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-8 font-display text-4xl leading-tight tracking-tight text-espresso sm:text-5xl md:text-6xl"
          >
            Your data never leaves your control.{" "}
            <span className="italic text-sage-deep">
              Our audits enter through a read-only tunnel.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-8 text-mist md:text-lg"
          >
            Scrutexity doesn't install software, doesn't connect to PMS/EHR
            databases, and doesn't store PHI. Every audit is conducted through a
            read-only tunnel that captures only what is publicly visible — no
            server access, no database connections, no clinic-side integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="https://auditgpt.ai/snapshot"
              className="sage-cta inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold"
            >
              Start a Free Claim Snapshot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p
              className="mt-4 text-xs leading-5 text-mist/60"
              style={{ fontFamily: MONO }}
            >
              No software install · No credentials needed · Zero downtime
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE PILLARS ═══ */}
      <section className="bg-cream px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.p
            {...fadeUp}
            className="section-kicker text-center"
          >
            Architecture Pillars
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-3 text-center font-display text-3xl tracking-tight text-espresso md:text-4xl"
          >
            Four layers of safety, baked into every audit.
          </motion.h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {ARCHITECTURE_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group rounded-[1.5rem] border border-sand-deep bg-cream p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-sage/25 bg-sage/10 text-sage-deep">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl tracking-tight text-espresso">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="bg-cream-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.p
            {...fadeUp}
            className="section-kicker text-center"
          >
            Comparison
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-3 text-center font-display text-3xl tracking-tight text-espresso md:text-4xl"
          >
            Traditional audit vs. Scrutexity.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mt-10 overflow-hidden rounded-[1.5rem] border border-sand-deep/30 bg-cream"
          >
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-sand-deep/30 bg-cream-deep">
                  <th className="w-1/3 p-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">
                    &nbsp;
                  </th>
                  <th className="w-1/3 border-l border-sand-deep/30 p-5 text-xs font-bold uppercase tracking-[0.13em] text-mist">
                    Traditional Compliance Audit
                  </th>
                  <th className="w-1/3 border-l border-sand-deep/30 p-5 text-xs font-bold uppercase tracking-[0.13em] text-sage-deep">
                    Scrutexity
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className="border-b border-sand-deep/20 last:border-b-0"
                  >
                    <td className="p-5 text-sm font-semibold leading-7 text-espresso">
                      {row.label}
                    </td>
                    <td className="border-l border-sand-deep/20 p-5 text-sm leading-7 text-mist">
                      {row.traditional}
                    </td>
                    <td className="border-l border-sand-deep/20 p-5 text-sm leading-7 text-sage-deep font-semibold">
                      {row.scrutexity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST SIGNALS ═══ */}
      <section className="bg-cream px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.p
            {...fadeUp}
            className="section-kicker text-center"
          >
            Trust Infrastructure
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-3 text-center font-display text-3xl tracking-tight text-espresso md:text-4xl"
          >
            Six verifiable safeguards.
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-mist"
          >
            Every layer of the audit infrastructure is independently verifiable,
            documented, and governed by contract.
          </motion.p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_SIGNALS.map((signal, i) => (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                className="rounded-2xl border border-sand-deep bg-cream p-6 transition-shadow hover:shadow-sm"
              >
                <signal.icon className="h-5 w-5 text-sage-deep" />
                <h3 className="mt-4 font-semibold text-sm text-espresso">
                  {signal.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-mist">{signal.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-cream-deep px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.p
            {...fadeUp}
            className="section-kicker text-center"
          >
            FAQ
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-3 text-center font-display text-3xl tracking-tight text-espresso md:text-4xl"
          >
            Questions about the architecture.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mt-10 rounded-[1.5rem] border border-sand-deep/30 bg-cream px-6 py-4"
          >
            {FAQ_DATA.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FALLBACK LOOP — back to AuditGPT ═══ */}
      <section className="bg-cream-deep px-5 py-16 sm:px-8 border-t border-sand-deep/15">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-sm text-mist"
          >
            Not sure if your site has claim drift?{' '}
            <Link href="https://auditgpt.ai/snapshot" className="font-semibold text-sage-deep underline underline-offset-2 hover:text-espresso transition-colors">
              Run a free scan on AuditGPT
            </Link>
            {' '}— 30 seconds, no signup required.
          </motion.p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-cream px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-3xl tracking-tight text-espresso md:text-4xl"
          >
            Run a Free Claim Snapshot.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mt-4 text-sm leading-7 text-mist"
          >
            Enter your clinic URL. See exactly what claims your website is making — and
            what risks a regulator would flag. No signup, no software, no downtime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <Link
              href="https://auditgpt.ai/snapshot"
              className="sage-cta inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold"
            >
              Start a Free Claim Snapshot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p
              className="max-w-lg text-xs leading-5 text-mist/60"
              style={{ fontFamily: MONO }}
            >
              Boundary: This is a non-clinical audit of marketing claims only.
              Results do not constitute legal advice, regulatory clearance, or
              FDA approval. Consult your compliance counsel before making
              material changes to your website.
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
