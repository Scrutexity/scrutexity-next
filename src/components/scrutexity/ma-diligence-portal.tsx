'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  TrendingDown,
  FileCheck2,
  Building2,
  Stethoscope,
  Scale,
  Megaphone,
  Lock,
  FolderLock,
  CircleDollarSign,
} from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: EASE },
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-clay">
      {children}
    </span>
  );
}

// ── Buy-side / sell-side track content ──────────────────────────────────────
const BUY_SIDE = [
  'Pre-LOI target screening — run a single URL or a bulk list of portfolio candidates before you commit capital or exclusivity.',
  'Corporate Practice of Medicine (CPOM) exposure: ownership, control, and fee-splitting signals that a buyer’s counsel will want resolved.',
  'Strict-supervision and delegation gaps under state Medical Board rules — surfaced per location, per claim.',
  'FTC truth-in-advertising red flags: undisclosed influencer and staff endorsements, and unsupported or illegal GLP-1 / device claims.',
];

const SELL_SIDE = [
  'Exit-Ready Audit — a structured read of your full public digital footprint against the same frameworks a buyer’s diligence team will apply.',
  'Most operators need 12–18 months of deliberate cleanup before an LOI to avoid an EBITDA penalty for an old, non-compliant page.',
  'A premium remediation sprint to scrub stale claims, fix endorsement disclosures, and document what changed — with a traceable record per fix.',
  'Walk into the data room with the marketing-compliance question already answered, instead of letting a buyer discover it for you.',
];

// ── Regulatory frameworks screened ──────────────────────────────────────────
const FRAMEWORKS = [
  {
    icon: FileCheck2,
    label: 'FDA',
    title: 'Labeling & promotion limits',
    body: 'Off-label drug and device promotion, unapproved-use language, and restricted compounded / GLP-1 marketing claims.',
  },
  {
    icon: Megaphone,
    label: 'FTC',
    title: 'Endorsement & truth-in-advertising',
    body: 'Undisclosed material connections, fabricated or unsubstantiated results, and the 2023 endorsement-guide requirements.',
  },
  {
    icon: Scale,
    label: 'State Boards',
    title: 'Delegation & supervision rules',
    body: 'Physician supervision, good-faith-exam, and scope-of-practice signals surfaced against the rules of the practice’s state.',
  },
  {
    icon: Lock,
    label: 'HIPAA',
    title: 'Marketing & data handling',
    body: 'Patient imagery consent, testimonial sourcing, and marketing uses of protected health information in the public footprint.',
  },
];

export default function MADiligencePortal() {
  return (
    <div className="bg-cream text-espresso">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_38%,#e6d9c6_72%,#f5efe6_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(127,143,120,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Kicker>M&amp;A Due Diligence Portal · For Private Equity &amp; Founders</Kicker>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mt-5 max-w-[18ch] font-display text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.01em] sm:text-[3.5rem]"
          >
            Stop marketing compliance from killing your med spa deal.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            className="mt-6 max-w-[60ch] text-[1.12rem] leading-relaxed text-espresso/75"
          >
            When private equity acquires an aesthetic practice, unverified medical claims and
            scope-of-practice violations can quietly erode the valuation. Scrutexity runs an
            automated digital-footprint audit to surface hidden FTC, FDA, and state-board
            exposures — before the deal closes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="/sample-report" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
              Request a diligence sample report
              <ArrowRight size={16} />
            </Link>
            <Link href="/claim-audit" className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
              <Search size={15} /> Screen a target URL
            </Link>
          </motion.div>

          {/* Framework trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-mist/80"
          >
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-sage-deep" /> Screens against</span>
            <span>FDA</span><span className="opacity-30">·</span>
            <span>FTC</span><span className="opacity-30">·</span>
            <span>State Medical Boards</span><span className="opacity-30">·</span>
            <span>HIPAA</span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── FINANCIAL STAKES (THE "WHY") ──────────────── */}
      <section className="px-6 py-24 sm:px-8 lg:py-28 bg-cream-deep">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp}>
            <Kicker>The financial stakes</Kicker>
            <h2 className="mt-4 max-w-[22ch] font-display text-[2rem] font-semibold leading-[1.1] sm:text-[2.7rem]">
              One stale claim can move a multiple.
            </h2>
            <p className="mt-5 max-w-[60ch] text-[1.04rem] leading-relaxed text-espresso/70">
              Aesthetic practices trade on adjusted EBITDA — so anything a buyer can use to
              discount that number is leverage. Marketing-compliance risk is exactly that kind
              of leverage, and it almost always surfaces during exclusivity.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <motion.div {...fadeUp} className="rounded-[1.5rem] border border-sand-deep/40 bg-bone p-7 shadow-[0_18px_50px_rgba(85,62,41,0.07)]">
              <CircleDollarSign className="text-clay" size={22} />
              <p className="mt-4 font-display text-[2.4rem] font-semibold leading-none text-espresso">4–9×</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-espresso/70">
                Typical adjusted-EBITDA range for a single-location med spa.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="rounded-[1.5rem] border border-sand-deep/40 bg-bone p-7 shadow-[0_18px_50px_rgba(85,62,41,0.07)]">
              <Building2 className="text-clay" size={22} />
              <p className="mt-4 font-display text-[2.4rem] font-semibold leading-none text-espresso">7–13×</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-espresso/70">
                Range multi-location platforms can command at scale.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.16 }} className="rounded-[1.5rem] border border-clay/40 bg-[#fbeee6] p-7 shadow-[0_18px_50px_rgba(138,83,59,0.10)]">
              <TrendingDown className="text-clay-deep" size={22} />
              <p className="mt-4 font-display text-[2.4rem] font-semibold leading-none text-clay-deep">−38%</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-espresso/70">
                Per-unit value drop documented in some re-trades after compliance findings
                emerge during diligence.
              </p>
            </motion.div>
          </div>

          <motion.p {...fadeUp} className="mt-8 max-w-[64ch] text-[0.92rem] leading-relaxed text-espresso/65">
            <span className="font-semibold text-espresso/80">The re-trade is the real risk.</span>{' '}
            When findings land during the exclusivity window, the buyer has every incentive to
            renegotiate price or restructure terms. Surfacing those findings early — on the
            sell-side, or before the LOI on the buy-side — is what protects the number.
          </motion.p>

          <p className="mt-6 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-mist/70">
            Illustrative — market ranges and the −38% figure are directional industry references,
            not Scrutexity results. Verify independently for any specific deal.
          </p>
        </div>
      </section>

      {/* ──────────────── TWO DISTINCT USER JOURNEYS ──────────────── */}
      <section className="px-6 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-3xl">
            <Kicker>Two diligence tracks</Kicker>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] sm:text-[2.7rem]">
              Buy-side screens targets. Sell-side protects the multiple.
            </h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Track A — Buy-side */}
            <motion.div {...fadeUp} className="rounded-[1.75rem] border border-sand-deep/45 bg-bone p-8 shadow-[0_22px_70px_rgba(85,62,41,0.08)]">
              <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-sage-deep">
                <Search size={14} /> Track A · Private equity (buy-side)
              </div>
              <h3 className="mt-4 font-display text-[1.7rem] font-semibold leading-snug">
                Pre-LOI target screening
              </h3>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-espresso/70">
                Run a single candidate or a bulk URL list through the audit before you commit
                exclusivity — and walk into the LOI knowing where the exposures are.
              </p>
              <ul className="mt-6 space-y-3.5">
                {BUY_SIDE.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-espresso/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/claim-audit" className="mt-7 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-clay hover:text-clay-deep transition-colors">
                Screen a target <ArrowRight size={13} />
              </Link>
            </motion.div>

            {/* Track B — Sell-side */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="rounded-[1.75rem] border border-sand-deep/45 bg-bone p-8 shadow-[0_22px_70px_rgba(85,62,41,0.08)]">
              <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-sage-deep">
                <ShieldCheck size={14} /> Track B · Founders (sell-side)
              </div>
              <h3 className="mt-4 font-display text-[1.7rem] font-semibold leading-snug">
                The exit-ready audit
              </h3>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-espresso/70">
                Preparing for a PE buyout means cleaning the digital footprint long before the
                LOI — so your EBITDA isn&apos;t penalized for an old, non-compliant claim.
              </p>
              <ul className="mt-6 space-y-3.5">
                {SELL_SIDE.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-espresso/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-clay hover:text-clay-deep transition-colors">
                Scope an exit-ready sprint <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── REGULATORY FRAMEWORKS SCREENED ──────────────── */}
      <section className="px-6 py-24 sm:px-8 lg:py-28 bg-cream-deep">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-3xl">
            <Kicker>What the audit screens for</Kicker>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] sm:text-[2.7rem]">
              The four frameworks a buyer&apos;s counsel will ask about.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-espresso/70">
              Every flagged item ships with the source line and the reason it was surfaced —
              so your counsel can review the exposure, not chase it.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FRAMEWORKS.map((f, i) => (
              <motion.div
                key={f.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-[1.5rem] border border-sand-deep/40 bg-bone p-7 shadow-[0_16px_46px_rgba(85,62,41,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-soft/50 text-sage-deep">
                    <f.icon size={18} />
                  </span>
                  <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-clay">
                    {f.label}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-snug">{f.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-espresso/70">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── VDR & ENTERPRISE INTEGRATION ──────────────── */}
      <section className="px-6 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...fadeUp}>
              <Kicker>VDR &amp; enterprise integration</Kicker>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] sm:text-[2.6rem]">
                Built to drop straight into the data room.
              </h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-espresso/70">
                Scrutexity generates lender-ready compliance packages and PDF reports designed
                to sit alongside your financial and legal diligence documents in a Virtual Data
                Room — same format, same rigor, ready for the deal team.
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  'Per-finding source line, reason, and framework citation.',
                  'Lender- and counsel-ready PDF, exportable per entity or portfolio-wide.',
                  'A traceable record of what was flagged, what was fixed, and when.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[0.94rem] leading-relaxed text-espresso/80">
                    <FileCheck2 size={17} className="mt-0.5 shrink-0 text-sage-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <div className="rounded-[1.75rem] border border-sand-deep/45 bg-bone p-7 shadow-[0_22px_70px_rgba(85,62,41,0.08)]">
                <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-mist">
                  <FolderLock size={14} className="text-sage-deep" /> Virtual Data Room
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { name: 'Quality of Earnings.pdf', muted: true },
                    { name: 'Legal Diligence Memo.pdf', muted: true },
                    { name: 'Scrutexity Compliance Package.pdf', muted: false },
                    { name: 'Marketing Claim Audit.pdf', muted: false },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-[0.84rem] ${
                        doc.muted
                          ? 'border-sand-deep/30 bg-cream-deep/60 text-espresso/55'
                          : 'border-clay/40 bg-[#fbeee6] text-espresso font-semibold'
                      }`}
                    >
                      <FileCheck2 size={15} className={doc.muted ? 'text-mist/60' : 'text-clay-deep'} />
                      {doc.name}
                      {!doc.muted && (
                        <span className="ml-auto font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sage-deep">
                          ready
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <section className="px-6 pb-28 sm:px-8">
        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-sand-deep/45 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_45%,#e9dcc8_100%)] px-8 py-16 text-center shadow-[0_30px_80px_rgba(85,62,41,0.10)]"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(127,143,120,0.14),transparent_70%)]" />
          <div className="relative">
            <Stethoscope className="mx-auto text-clay" size={26} />
            <h2 className="mx-auto mt-5 max-w-[24ch] font-display text-[2rem] font-semibold leading-[1.1] sm:text-[2.6rem]">
              Answer the compliance question before diligence does.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[1.02rem] leading-relaxed text-espresso/70">
              Screen a target, or get an exit-ready read on your own footprint. Either way,
              you&apos;ll see the exposures in writing — with the source and the reason.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/sample-report" className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
                Request a diligence sample report
                <ArrowRight size={16} />
              </Link>
              <Link href="/claim-audit" className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                <Search size={15} /> Screen a target URL
              </Link>
            </div>
          </div>
        </motion.div>

        <p className="mx-auto mt-8 max-w-[68ch] text-center font-mono text-[0.64rem] uppercase tracking-[0.13em] text-mist/65">
          Scrutexity surfaces potential marketing-compliance exposures for review by your own
          legal and diligence advisors. It is not legal advice and does not certify any practice
          as compliant. Figures shown are illustrative and require independent verification.
        </p>
      </section>
    </div>
  );
}
