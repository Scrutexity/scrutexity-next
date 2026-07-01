'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from './Reveal';
import { LeadCalculator } from './LeadCalculator';
import { BookingModal } from './BookingModal';
import { ArrowRight, Check, LockKeyhole, ShieldCheck, X, Database, ShieldAlert, Cpu } from 'lucide-react';
import { useState } from 'react';
import { SampleOwnerBriefWidget } from './SampleOwnerBriefWidget';
import { Accordion } from './Accordion';
import { ArchitectureVisualWidget } from './ArchitectureVisualWidget';
import HeroLedgerIllustration from './HeroLedgerIllustration';
import { 
  ScrollLinkedTimeline, 
  InteractiveSampleLedger, 
  SampleBriefFloatingModal, 
  SecurityPostureBento 
} from './UXEnhancements';

/* ─── 1. PROBLEM — Hero ─────────────────────────────────────────────────── */

function HeroSection({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-36 lg:pt-36">
      {/* Warm layered gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_30%,#e8dfcf_65%,#f5efe6_100%)]" />
      <div className="absolute inset-0 luxury-noise opacity-[0.10]" />

      {/* Floating ambient blobs */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      {/* Subtle sage radial accent near the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(127,143,120,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          {/* Trust badge — soft sage pulse dot */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d8c9b7] bg-white/52 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7d6048] shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7f8f78] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7f8f78]" />
            </span>
            Works on Boulevard &amp; Mangomint — Zenoti Q3
          </div>

          {/* Headline with sage-accented question */}
          <h1 className="font-display text-[3.25rem] leading-[1.02] tracking-[-0.02em] text-[#201d19] sm:text-5xl md:text-6xl">
            You already paid for the lead.<br />
            <span className="text-[#b9825f] italic">Why didn&apos;t it become an appointment?</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-8 text-[#5f574f] md:text-lg">
            Every inquiry that doesn&apos;t book is money you already spent. Missed calls, after-hours DMs, no-shows, unworked forms — we catch what falls through and log exactly what was recoverable.
          </p>

          {/* Sage accent line + microcommitment */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="block w-12 h-px bg-[#7f8f78]/40" />
            <p className="text-[15px] leading-relaxed text-[#3d3731] font-medium">
              <span className="text-[#7f8f78] font-semibold">14-day pilot.</span>{' '}
              <span className="text-[#7f8f78] font-semibold">$0</span> if missed-demand recovery isn&apos;t demonstrated.
            </p>
          </div>

          {/* CTA — soft hover lift + gentle pulse */}
          <div className="mt-10 mb-16">
            <button
              onClick={onBookCall}
              className="govbtn animate-cta-pulse group inline-flex items-center justify-center
                         rounded-full px-9 py-4.5 text-sm font-semibold
                         transition-all duration-300 cursor-pointer
                         shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
            >
              Request Free 14-Day Audit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-xs font-semibold text-[#9b6a51]">
              Free report in 24 hours. Read-only access. No call required.
            </p>
          </div>

          {/* Animated ledger visual */}
          <div className="mt-4 mb-12">
            <HeroLedgerIllustration />
          </div>

          {/* Trustmarks row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#5f574f]">
            {['BAA-ready', 'Zero PHI exposure', 'No migration', 'No obligation'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#7f8f78] stroke-[2.5]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InteractiveWidgetSection() {
  return (
    <section className="relative overflow-hidden bg-[#efe6d7] px-5 py-20 sm:px-8">
      <div className="absolute inset-0 luxury-noise opacity-[0.05]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl leading-tight text-[#221f1b] md:text-4xl">
            Here is exactly what you see on Day 14.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#6b6259]">
            Scroll through a sample 14-day recovery ledger. Every audit is backed by source logs and completed bookings.
          </p>
        </Reveal>
        
        <Reveal className="mt-12">
          {/* Subtle atmospheric glassmorphic window */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#e1d4c5] bg-[#fffaf2]/60 p-4 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            <div className="relative max-h-[600px] overflow-y-auto rounded-2xl border border-[#e1d4c5]/50 bg-white shadow-inner [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d8c9b7] [&::-webkit-scrollbar-track]:bg-transparent">
              <div className="origin-top scale-90 sm:scale-95 md:scale-100">
                <SampleOwnerBriefWidget hideCTA={true} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-[#e1d4c5] bg-[#f7f2ea] px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b6a51]">
          Installs on top of
        </p>
        {['Boulevard', 'Mangomint', 'Zenoti (Q3)'].map((name) => (
          <span key={name} className="rounded-full border border-[#e1d4c5] bg-white/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#3d3731]">
            {name}
          </span>
        ))}
        <span className="h-4 w-px bg-[#e1d4c5]" />
        <span className="text-xs text-[#5f574f]">
          BAA signed before any connection · PHI stripped before processing · clinical questions go to your staff, never the AI ·{' '}
          <a href="/trust" className="font-semibold text-[#7f8f78] hover:underline">Trust Center →</a>
        </span>
      </div>
    </section>
  );
}

/* ─── 1.5 TRUST — Security Posture ──────────────────────────────────────── */

function SecurityPostureSection() {
  const securityFeatures = [
    {
      icon: <Cpu className="h-5 w-5 text-[#9b6a51]" />,
      title: 'Zero-Retention Compute',
      desc: 'Scrutexity utilizes enterprise-grade API endpoints for all natural language processing. Your patient transcripts and inquiry data are strictly designated for zero-retention compute. They are never stored by, or used to train, external large language models (e.g., OpenAI, Anthropic).',
    },
    {
      icon: <Database className="h-5 w-5 text-[#9b6a51]" />,
      title: 'Siloed Postgres Infrastructure',
      desc: 'Your operational data is never commingled. Every pilot and active deployment is partitioned into an isolated, clinic-specific Postgres environment.',
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-[#9b6a51]" />,
      title: 'Absolute Access Revocation (The Kill Switch)',
      desc: 'You maintain absolute sovereignty over your data. Because Scrutexity operates via a read-only API key generated within your Boulevard settings, you can sever our access instantly, at any time, directly from your own dashboard. No cancellation calls or support tickets required.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#9b6a51]" />,
      title: 'Clinical Guardrails & CPOM',
      desc: 'Our architecture is built specifically for the constraints of the Corporate Practice of Medicine (CPOM). We employ deterministic routing protocols. The moment an inquiry requires medical triage, diagnostic input, or clinical advice, the automated sequence halts and the lead is routed to your licensed medical staff.',
    },
  ];

  return (
    <section className="bg-[#fcfaf7] px-5 py-24 sm:px-8 border-b border-[#e1d4c5]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl leading-tight text-[#221f1b] md:text-4xl">
              SECURITY POSTURE & DATA ISOLATION
            </h2>
          </div>
        </Reveal>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feat, i) => (
            <Reveal key={i}>
              <div className="h-full rounded-2xl border border-[#e1d4c5] bg-[#fffaf2] p-6 shadow-sm">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f3eadf] border border-[#e1d4c5]">
                  {feat.icon}
                </div>
                <h3 className="mb-3 font-semibold text-[#221f1b]">{feat.title}</h3>
                <p className="text-[13.5px] leading-6 text-[#6b6259]">
                  {feat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 2. PROOF — Recovery receipt artifact ──────────────────────────────── */

const recoveryLog = [
  { day: 'Day 4',  time: '4:47 PM',  src: 'missed_call',   inquiry: 'Morpheus8 pkg inquiry', response: '28 sec',   status: 'BOOKED', deposit: '$650' },
  { day: 'Day 5',  time: '11:23 PM', src: 'ig_dm',         inquiry: 'Lip filler consult',    response: '41 sec',   status: 'BOOKED', deposit: '$250' },
  { day: 'Day 6',  time: '3:12 PM',  src: 'form_submit',   inquiry: 'Laser pkg (60d old)',   response: 'reactivated', status: 'BOOKED', deposit: '$400' },
  { day: 'Day 7',  time: '10:04 AM', src: 'no_show',       inquiry: 'RF consult no-show',    response: '52 min',   status: 'BOOKED', deposit: '$400' },
  { day: 'Day 8',  time: '2:31 PM',  src: 'ig_dm',         inquiry: 'BBL clinical question', response: '38 sec',   status: 'CLINICAL → NP', deposit: null },
  { day: 'Day 9',  time: '9:17 PM',  src: 'missed_call',   inquiry: 'Filler touch-up',       response: '31 sec',   status: 'BOOKED', deposit: '$250' },
  { day: 'Day 11', time: '6:43 PM',  src: 'form_submit',   inquiry: 'Morpheus8 series',      response: 'reactivated', status: 'BOOKED', deposit: '$1,200' },
];

function ProofSection() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="section-kicker">Proof</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[#221f1b] md:text-5xl">
            Here&apos;s the receipt.
          </h2>
          <p className="mt-4 text-[17px] leading-8 text-[#6b6259] max-w-xl">
            One clinic. One 14-day window. Every inquiry tracked to source, every deposit logged.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#e1d4c5] shadow-[0_1px_3px_rgba(44,36,24,.06),_0_20px_50px_-16px_rgba(44,36,24,.18)]">

            {/* Modeled data banner */}
            <div className="flex items-center justify-center gap-3 border-b border-[#f0c8a8] bg-[#fdf0e8] px-6 py-2.5">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#c9745a]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#8a3a1e]">
                Modeled Data — Not a Live Client Result
              </span>
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#c9745a]" />
            </div>

            {/* Scan header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e1d4c5] bg-[#fefaf5] px-7 py-5">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#9a8775]">Clinic profile</p>
                <p className="mt-1 text-sm font-semibold text-[#221f1b]">2-provider injectables + laser · Boulevard · Google Ads + IG</p>
              </div>
              <div className="font-mono text-[10px] leading-[2.1] text-[#9a8775]">
                scan_id: <span className="text-[#221f1b]">SCX-0001</span><br />
                window: <span className="text-[#221f1b]">30d scan → 14d recovery</span>
              </div>
            </div>

            {/* Before block */}
            <div className="border-b border-[#e1d4c5] bg-[#fefaf5] px-7 py-5">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#9a8775]">
                Before — 30-day scan
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4">
                {[
                  { label: 'Unbooked inquiries', value: '47' },
                  { label: 'Avg response delay', value: '6.2 days' },
                  { label: 'Dormant leads (60d+)', value: '112' },
                  { label: 'No-shows unrebooked', value: '9' },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="font-mono text-xl font-bold text-[#8a3a1e]">{m.value}</p>
                    <p className="mt-0.5 text-[11px] text-[#9a8775]">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recovery log */}
            <div className="border-b border-[#e1d4c5] bg-[#fefaf5] px-7 py-5">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#9a8775]">
                Recovery log — Days 4–14
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] font-mono text-[11px]">
                  <thead>
                    <tr className="border-b border-[#e5d4bb]">
                      {['When', 'Source', 'Inquiry', 'Response', 'Outcome'].map((h) => (
                        <th key={h} className="pb-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#9a8775] last:pr-0 last:text-right">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0e5d4]">
                    {recoveryLog.map((row, i) => (
                      <tr key={i}>
                        <td className="py-2 pr-4 text-[#9a8775] whitespace-nowrap">{row.day} {row.time}</td>
                        <td className="py-2 pr-4 text-[#6b5a48] whitespace-nowrap">{row.src}</td>
                        <td className="hidden py-2 pr-4 text-[#6b5a48] sm:table-cell">{row.inquiry}</td>
                        <td className="py-2 pr-4 text-[#9a8775] whitespace-nowrap">{row.response}</td>
                        <td className="py-2 text-right whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                            row.status === 'CLINICAL → NP'
                              ? 'bg-[#eef3ea] text-[#7f8f78]'
                              : 'bg-[#0f2c2c] text-[#e6b17e]'
                          }`}>
                            {row.status}{row.deposit ? ` · ${row.deposit}` : ''}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Result summary */}
            <div className="grid grid-cols-2 bg-[#f4ede0] sm:grid-cols-4">
              {[
                { label: 'Reactivated', value: '19' },
                { label: 'Consults booked', value: '7' },
                { label: 'Median response', value: '42 sec' },
                { label: 'Est. pipeline', value: '$28,400', highlight: true },
              ].map((s) => (
                <div key={s.label} className={`border-r border-[#e5d4bb] px-5 py-4 last:border-r-0 ${s.highlight ? 'bg-[#ede4d3]' : ''}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#9a8775]">{s.label}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-[#221f1b]">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e1d4c5] bg-[#fefaf5] px-7 py-4">
              <p className="text-[11px] text-[#9a8775]">
                Every row above has a source log, transcript, and deposit record. Yours to export anytime.
              </p>
              <Link href="/sample-owner-brief" className="flex-none text-[11px] font-semibold text-[#b9825f] hover:underline">
                See the full sample brief →
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Founder 2-liner */}
        <Reveal className="mt-10 flex items-center gap-4">
          <Image
            src="/founder.jpg"
            alt="Nick, Founder"
            width={44}
            height={44}
            className="h-11 w-11 flex-none rounded-full border border-[#d8c9b7] object-cover"
          />
          <div>
            <p className="font-semibold text-[#221f1b]">I run every pilot personally. I cap concurrent pilots so yours gets my direct attention.</p>
            <p className="text-sm text-[#6b6259]">The system is read-only and staff-approved — if I&apos;m sick for a day, your patient communication doesn&apos;t stop. Nick — Founder, Scrutexity</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 3. MECHANISM — 3 steps + funnel + calculator chained ─────────────── */

function MechanismSection({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="bg-[#f7f2ea] border-b border-[#e1d4c5]">
      {/* We embed the visual widget which intrinsically handles the background color, padding, and layout */}
      <ArchitectureVisualWidget onBookCall={onBookCall} />
    </section>
  );
}

/* ─── 4. OPERATIONAL PARAMETERS — FAQs ───────────────────────────────────── */

function OperationalParametersSection() {
  const faqs = [
    {
      q: 'Does this replace my front desk staff?',
      a: 'No. Scrutexity is an automated safety net, engineered to capture the 15% to 20% of inquiry volume that your human staff physically cannot address during peak hours, weekends, and overnight gaps. It augments your team; it does not replace them.'
    },
    {
      q: 'How does the system handle complex or off-script medical questions?',
      a: 'It doesn\'t. Scrutexity is explicitly programmed to identify clinical terminology. If a lead asks a medical question, the system instantly halts the automated interaction and flags the conversation for your Nurse Practitioners or Medical Director to review natively in Boulevard.'
    },
    {
      q: 'What happens if a lead texts us back three months later?',
      a: 'The system maintains perpetual context. If a dormant lead replies 80 days after their initial inquiry, Scrutexity instantly recognizes the historical context, resumes the conversation in your clinic’s voice, and drives them toward deposit capture.'
    },
    {
      q: 'How long does the Boulevard integration actually take?',
      a: 'Under five minutes. The connection is established via a single, read-only API key that you generate in your Boulevard settings. It requires zero custom development from your team, zero downtime, and zero workflow changes for your front desk.'
    },
    {
      q: 'What if I don\'t see an ROI during the 14-day pilot?',
      a: 'You pay nothing. The pilot is a $0 capital sandbox. If the 14-day ledger does not demonstrate a mutually agreed-upon baseline of recovered pipeline, we disconnect the API and purge your isolated environment.'
    }
  ];

  return (
    <section className="px-5 py-24 sm:px-8 lg:py-32 bg-[#efe6d7]">
      <div className="absolute inset-0 luxury-noise opacity-[0.05]" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="section-kicker">OPERATIONAL PARAMETERS</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[#221f1b] md:text-5xl mb-12">
            Engineered for clinical constraints.
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={i}>
              <Accordion question={faq.q} answer={faq.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. CLOSING CTA — numbers as the argument ──────────────────────────── */

function ClosingCTASection({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#efe6d7] px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute inset-0 luxury-noise opacity-[0.05]" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#b9825f]/12 blur-3xl" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="section-kicker">The offer</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[#221f1b] md:text-5xl">
            The numbers are the argument.
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: '14-day pilot', value: '$0', note: 'No setup fee. No commitment during the window.' },
              { label: 'Recovery plan', value: '$2,000', sub: '/mo', note: 'Starts after Day 14, only if recovery is demonstrated.' },
              { label: '30-day bar', value: 'Bookings', note: 'A minimum count of verified re-engaged bookings — set before Day 1, both parties agree on it. Miss it — your first month is free.', highlight: true },
              { label: 'Success criteria', value: 'In writing', note: 'Agreed before Day 1. Both parties sign off on what "demonstrated" means.' },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border p-6 ${
                  s.highlight
                    ? 'border-[#b9825f]/40 bg-[#f3eadf]'
                    : 'border-[#e1d4c5] bg-[#fffaf2]'
                }`}
              >
                <p className="text-[10.5px] font-bold uppercase tracking-[.18em] text-[#9b6a51]">{s.label}</p>
                <p className="mt-2 font-mono text-3xl font-bold text-[#221f1b]">
                  {s.value}
                  {s.sub && <span className="text-lg font-normal text-[#9b6a51]">{s.sub}</span>}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#6b6259]">{s.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <p className="text-sm text-[#6b6259] max-w-xl">
            A verified recovery = source logged + conversation transcript on file + completed booking deposit. That&apos;s the bar. Everything else is yours to keep.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={onBookCall}
            className="govbtn animate-cta-pulse group inline-flex items-center justify-center rounded-full px-9 py-4.5 text-sm font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
          >
            Request Free 14-Day Audit
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-[#d8c4ad] px-8 py-4 text-sm font-semibold text-[#5f574f] transition-all hover:bg-[#f3eadf] hover:text-[#221f1b] hover:-translate-y-0.5"
          >
            See full pricing
          </Link>
        </Reveal>

        <Reveal className="mt-6">
          <p className="text-xs text-[#9b6a51]">
            BAA signed before any connection · PHI stripped before processing · cancel anytime, keep everything
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 6. FOUNDER THESIS ─────────────────────────────────────────────────── */

function FounderThesisSection() {
  return (
    <section className="relative overflow-hidden bg-[#efe6d7] px-5 py-28 sm:px-8 lg:py-32 text-center border-b border-[#e1d4c5]/60">
      <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
      {/* Warm sage radial glow behind the quote */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(127,143,120,0.08),transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="section-kicker mb-10">THE ARCHITECTURE OF ACCOUNTABILITY</p>
          <blockquote className="font-display text-2xl md:text-3xl leading-[1.6] text-[#221f1b] italic mb-10">
            &ldquo;We engineered Scrutexity to solve a singular, expensive failure point in premium medical aesthetics: the operational latency between top-of-funnel ad spend and front-desk booking capture. General AI chatbots create unacceptable clinical liability, so we built a deterministic, CPOM-conscious layer that integrates natively with your existing infrastructure. We do not charge you to guess what might work; we build the ledger that proves it did.&rdquo;
          </blockquote>
          <div className="flex flex-col items-center gap-3">
            <span className="w-8 h-px bg-[#7f8f78]/30" />
            <p className="font-display text-lg tracking-wide text-[#221f1b]">Nick</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#9a8775]">Founder, Scrutexity</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Root ──────────────────────────────────────────────────────────────── */

export default function PremiumHomepage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HeroSection onBookCall={() => setShowModal(true)} />
      <InteractiveWidgetSection />
      <TrustStrip />
      <SecurityPostureBento />
      <InteractiveSampleLedger />
      <ScrollLinkedTimeline />
      <MechanismSection onBookCall={() => setShowModal(true)} />
      <OperationalParametersSection />
      <ClosingCTASection onBookCall={() => setShowModal(true)} />
      <FounderThesisSection />
      <BookingModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <SampleBriefFloatingModal />
    </>
  );
}
