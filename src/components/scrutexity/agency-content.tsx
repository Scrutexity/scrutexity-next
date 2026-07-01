"use client";

import { motion } from 'framer-motion';
import { ArrowRight, FileText, Tag, Eye, Award, Clock } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const agencyIncludes = [
  { icon: FileText, label: '10 receipts / month',                     detail: 'Claim Intelligence Receipts for high-claim pages, launches, and client approvals.' },
  { icon: Tag,      label: 'White-label receipts',                    detail: 'Your logo, your color, your client packet. The Scrutexity name appears only in a discreet methodology footer.' },
  { icon: FileText, label: 'Client-ready PDFs',                       detail: 'Deliverable-grade documents you can hand to a client without rewriting.' },
  { icon: Eye,      label: 'Reviewed-badge pages',                    detail: 'A static "Reviewed by AuditGPT as of date" summary page your client can link to immediately.' },
  { icon: FileText, label: 'Fix recommendations and safer copy',      detail: 'Each surfaced claim ships with a recommended action and a drop-in safer rewrite.' },
  { icon: Eye,      label: 'Public and private report links',         detail: 'Share an unlocked sample with prospects, hold the full report behind a private link for clients.' },
  { icon: Award,    label: 'Launch packet language',                  detail: 'Clean approval language for the agency, client, and stakeholder thread before a high-claim page goes live.' },
  { icon: Clock,    label: 'Priority review',                         detail: 'Agency audits jump the queue. Standard 48-hour turnaround; agency turnaround target is 24 hours.' },
];

const idealClients = [
  { name: 'AI / SaaS launch agencies',  detail: 'Pre-launch claim review before the homepage ships. Catch autonomy and traction overreach before investors and journalists do.' },
  { name: 'Healthcare marketing teams', detail: 'Patient-facing copy review against published claim discipline. Medical, dental, veterinary, and aesthetics surfaces all benefit.' },
  { name: 'Fractional CMO portfolios',  detail: 'Run a Claim Audit on every new client in the first week. Use it as the first deliverable in the engagement.' },
  { name: 'VC platform teams',          detail: 'Portfolio-wide claim discipline. Help founders avoid the credibility cost of a marketing-to-product mismatch.' },
];

export default function AgencyContent() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
            For agencies
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-5xl md:text-6xl lg:text-[4.75rem] text-ink tracking-[-0.03em] leading-[1.02] max-w-3xl"
          >
            The CYA artifact your agency attaches to{' '}
            <span className="italic text-sage-deep">high-claim launches.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-7 text-base md:text-lg text-mist leading-[1.55] font-sans max-w-2xl"
          >
            Scrutexity acts as your invisible backend. Give clients a dated Claim Intelligence Receipt that shows what was reviewed, what proof was missing, what safer language was recommended, and what the client approved before launch.
          </motion.p>
        </div>
      </section>

      {/* PRICE CARD */}
      <section className="px-6 py-16 md:py-20 border-t border-sand-deep/15">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-2xl bg-bone border border-sand-deep/30 p-8 md:p-10 relative overflow-hidden"
            style={{
              boxShadow:
                '0 18px 44px -16px rgba(28,24,20,0.10), inset 0 1px 1px rgba(255,255,255,0.6)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#D4AF37' }} />

            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep inline-flex items-center gap-2"
              style={{ fontFamily: MONO_STACK }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
              Agency Receipt Beta
            </span>

            <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
                  Ten launch receipts.{' '}
                  <span className="italic text-sage-deep">Your brand on every one.</span>
                </h2>
                <p className="mt-5 text-base text-mist leading-[1.6]">
                  Built for agencies running client campaigns. Review before launch, deliver polished co-branded receipts, attach a reviewed-badge page, and monitor drift after cleanup. First five partners lock in the $499/mo beta rate (standard rate is $799/mo).
                </p>
              </div>
              <div className="md:text-right shrink-0">
                <div className="font-display text-6xl text-ink tabular-nums leading-none">
                  $499
                </div>
                <div className="text-xs text-mist mt-1" style={{ fontFamily: MONO_STACK }}>
                  / mo (Founding Beta)
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/claim-audit?intent=agency"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-sage-deep hover:bg-ink text-cream rounded-xl text-sm font-semibold transition-all duration-300 shadow-xs cursor-pointer"
                style={{ boxShadow: '0 8px 24px rgba(94,122,90,0.15)' }}
              >
                Apply for Agency Receipt Beta
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl mb-12"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              What&rsquo;s included
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              One artifact,{' '}
              <span className="italic text-sage-deep">eight useful pieces.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            {agencyIncludes.map((line, i) => {
              const Icon = line.icon;
              return (
                <motion.div
                  key={line.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
                  className="flex gap-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/12 shrink-0 mt-0.5">
                    <Icon size={15} className="text-sage-deep" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink tracking-[-0.01em] leading-snug">
                      {line.label}
                    </h3>
                    <p className="mt-1.5 text-sm text-mist leading-[1.65]">{line.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IDEAL CLIENTS */}
      <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl mb-12"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Who runs this
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Four shapes of buyer{' '}
              <span className="italic text-sage-deep">already use it.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {idealClients.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="rounded-2xl bg-bone border border-sand-deep/30 p-6 md:p-7"
                style={{
                  boxShadow:
                    '0 10px 28px -14px rgba(28,24,20,0.07), inset 0 1px 1px rgba(255,255,255,0.6)',
                }}
              >
                <h3 className="font-display text-2xl text-ink tracking-[-0.01em]">
                  {c.name}
                </h3>
                <p className="mt-3 text-sm text-mist leading-[1.65]">{c.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 md:py-32 border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-ink tracking-[-0.02em] leading-[1.05]">
            Try an audit on{' '}
            <span className="italic text-sage-deep">your favorite client first.</span>
          </h2>
          <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl mx-auto">
            Free preview includes the top three claim risks on one domain and
            one suggested fix. If you like the deliverable, upgrade to the
            agency tier and attach receipts to high-claim launches this month.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
            <Link
              href="/claim-audit?intent=agency"
              className="group px-7 py-4 bg-sage-deep hover:bg-ink text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 cursor-pointer shadow-xs"
              style={{ boxShadow: '0 8px 24px rgba(94,122,90,0.15)' }}
            >
              Apply for Agency Receipt Beta
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/sample-report"
              className="group text-sm font-sans font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              View Sample Report
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
