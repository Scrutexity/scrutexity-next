'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const findings = [
  { label: 'Unbooked inquiries identified in your lookback window', value: '—', negative: true },
  { label: 'Average first-response delay — after-hours inquiries', value: 'Your pilot will measure this', negative: true },
  { label: 'Dormant leads with no reactivation attempt', value: '—', negative: true },
  { label: 'No-shows with no rebook contact within 7 days', value: '—', negative: true },
];

const changed = [
  { label: 'Reactivated', value: '—', unit: null, note: 'dormant inquiries re-engaged in clinic voice' },
  { label: 'Consults booked', value: '—', unit: null, note: 'deposit-paid, confirmed in your calendar' },
  { label: 'Median response', value: '—', unit: '', note: 'measured from your actual after-hours flow' },
];

const funnelSteps = [
  { n: 0, label: 'Your monthly inquiries', drop: null },
  { n: 0,  label: 'Received any reply',     drop: { lost: 0, reason: 'No response' } },
  { n: 0,  label: 'Became a conversation',  drop: { lost: 0, reason: 'Slow response' } },
  { n: 0,  label: 'Booked a consult',       drop: { lost: 0, reason: 'No follow-up' } },
  { n: 0,  label: 'Completed treatment',    drop: { lost: 0, reason: 'No-show, no rebook' } },
];

const ledger = [
  { id: 'rec_0001', src: 'missed_call',  action: 'routed → staff follows up',         outcome: 'your team decides ✓', ok: true },
  { id: 'rec_0002', src: 'after_hours', action: 'routed → staff follows up',        outcome: 'your team decides ✓', ok: true },
  { id: 'rec_0003', src: 'form_drop', action: 'routed → staff follows up',           outcome: '→ routed to NP ✓', ok: true },
  { id: 'rec_0004', src: 'no_show',     action: 'routed → staff follows up',        outcome: 'deposit recovery ✓', ok: true },
];

export function SampleOwnerBriefWidget({ hideCTA = false }: { hideCTA?: boolean }) {
  const reportRef = useRef<HTMLDivElement>(null);
  const enteredView = useInView(reportRef, { once: true, margin: '-12% 0px' });
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* SAMPLE banner */}
      <div className="mb-6 flex items-center justify-center gap-3 rounded-xl border border-[#f0c8a8] bg-[#fdf0e8] px-5 py-3">
        <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#c9745a]" />
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[.18em] text-[#8a3a1e]">
          Sample Report — Your custom audit will replace these numbers
        </p>
        <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#c9745a]" />
      </div>

      {/* Document card */}
      <motion.div
        ref={reportRef}
        initial={reduceMotion ? false : { opacity: 0, y: 18, borderColor: '#e1d4c5' }}
        animate={enteredView || reduceMotion ? { opacity: 1, y: 0, borderColor: '#b9825f' } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] border border-sand-deep bg-[#fefaf5] shadow-[0_1px_3px_rgba(44,36,24,.06),_0_20px_50px_-16px_rgba(44,36,24,.18)]"
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ x: '-115%' }}
            animate={enteredView ? { x: '115%' } : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#b9825f] to-transparent"
          />
        )}
        
        {/* Letterhead */}
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-sand-deep px-8 py-8">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[.2em] text-clay">
              The 24-Hour Audit: Example Output
            </p>
            <h1 className="mt-2 font-display text-[2rem] font-normal leading-[1.15] tracking-[-0.015em] text-espresso">
              Recovery report:<br />what we found,<br />what changed
            </h1>
          </div>
          <div className="font-mono text-[10.5px] leading-[2] text-[#9a8775]">
            <span>brief_id: </span><span className="text-espresso">SAMPLE-0001</span><br />
            <span>window: </span><span className="text-espresso">14 days</span><br />
            <span>prepared by: </span><span className="text-espresso">Nick — Founder</span><br />
            <span>basis: </span><span className="text-espresso">illustrative model</span>
          </div>
        </div>

        {/* Clinic snapshot */}
        <div className="border-b border-sand-deep px-8 py-7">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-clay">Clinic snapshot</p>
          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-sand-deep sm:grid-cols-4">
            {[
              { label: 'Locations', value: '3' },
              { label: 'PMS', value: 'Boulevard' },
              { label: 'Ad channels', value: 'Google + IG' },
              { label: 'Avg treatment value', value: '$1,500' },
            ].map((item, i) => (
              <div key={i} className="border-b border-r border-sand-deep bg-[#f4ede0] px-4 py-3.5 last:border-r-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r">
                <dt className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#9a8775]">{item.label}</dt>
                <dd className="mt-0.5 text-[13.5px] font-medium">{item.value}</dd>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div className="border-b border-sand-deep px-8 py-7">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-clay">Where the last 30 days leaked</p>
          <div className="flex flex-col items-center gap-0">
            {funnelSteps.map((step, i) => (
              <div key={i} className="flex w-full flex-col items-center overflow-hidden">
                {i > 0 && step.drop && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: i * 0.8 - 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-1 py-2"
                  >
                    <div className="h-4 w-px bg-[#d8c9b7]" />
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0c8a8] bg-[#fdf0e8] px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[.14em] text-[#8a3a1e]">
                      <span className="h-1 w-1 flex-none rounded-full bg-[#c9745a]" />
                      −{step.drop.lost} · {step.drop.reason}
                    </span>
                    <div className="h-4 w-px bg-[#d8c9b7]" />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center justify-between gap-4 rounded-xl border px-5 py-3 ${
                    i === 0
                      ? 'border-sand-deep bg-cream'
                      : i === funnelSteps.length - 1
                      ? 'border-[#b9825f]/40 bg-[#f3eadf]'
                      : 'border-sand-deep bg-cream/80'
                  }`}
                  style={{ width: `${Math.max(38, 100 - i * 14)}%` }}
                >
                  <span className="font-mono text-2xl font-bold text-espresso">{step.n}</span>
                  <span className="text-right text-sm leading-5 text-mist">{step.label}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* What we found */}
        <div className="border-b border-sand-deep px-8 py-7">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-clay">What we found</p>
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="border-b border-sand-deep pb-2.5 text-left text-[10px] font-bold uppercase tracking-[.14em] text-[#9a8775]">Finding</th>
                <th className="border-b border-sand-deep pb-2.5 text-right text-[10px] font-bold uppercase tracking-[.14em] text-[#9a8775]">Measured</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((f, i) => (
                <tr key={i}>
                  <td className="border-b border-sand-deep py-3 text-mist last:border-0">{f.label}</td>
                  <td className="border-b border-sand-deep py-3 text-right last:border-0">
                    <span className="font-mono text-[14px] font-semibold text-[#8a3a1e]">{f.value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* What changed */}
        <div className="border-b border-sand-deep px-8 py-7">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-clay">What changed in 14 days</p>
          <div className="grid gap-3 sm:grid-cols-4">
            {changed.map((s) => (
              <div key={s.label} className="rounded-xl border border-sand-deep bg-[#f4ede0] px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#9a8775]">{s.label}</p>
                <p className="mt-1.5 font-mono text-3xl font-semibold leading-none text-espresso">
                  {s.value}
                  {s.unit && <sub className="text-sm font-normal text-[#9a8775]"> {s.unit}</sub>}
                </p>
                <p className="mt-2 text-[11px] leading-[1.45] text-[#9a8775]">{s.note}</p>
              </div>
            ))}
            {/* Key stat */}
            <div className="rounded-xl bg-[#0f2c2c] px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[rgba(244,239,228,.45)]">Your pilot will show your recovery pipeline</p>
              <p className="mt-1.5 font-mono text-3xl font-semibold leading-none text-[#e6b17e]">
                —
              </p>
              <p className="mt-2 text-[11px] leading-[1.45] text-[rgba(244,239,228,.4)]">Calculated from your actual inquiry volume and average consult value</p>
            </div>
          </div>
        </div>

        {/* Ledger */}
        <div className="border-b border-sand-deep px-8 py-7">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-clay">Ledger excerpt — every recovery is auditable</p>
          <div className="overflow-hidden rounded-xl border border-sand-deep">
            <div className="flex items-center gap-1.5 border-b border-sand-deep bg-[#f4ede0] px-4 py-2.5">
              {['rgba(154,74,46,.35)', 'rgba(196,138,92,.35)', 'rgba(127,143,120,.35)'].map((bg, i) => (
                <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: bg }} />
              ))}
            </div>
            <div className="overflow-x-auto bg-[#f4ede0] px-4 py-4">
              <table className="w-full border-collapse font-mono text-[11.5px]">
                <tbody>
                  {ledger.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={enteredView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
                      transition={{ delay: 0.08 * index, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-[#e5d4bb] last:border-0"
                    >
                      <td className="py-2 pr-4 text-[#9a8775]">{row.id}</td>
                      <td className="py-2 pr-4 text-[#6b5a48]">src: {row.src}</td>
                      <td className="py-2 pr-4 text-[#6b5a48]">{row.action}</td>
                      <td className="py-2 text-right font-semibold text-[#0f2c2c]">{row.outcome}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer of document */}
        <div className="bg-[#f4ede0] px-8 py-8">
          <p className="text-[11.5px] leading-[1.75] text-[#9a8775]">
            This is a sample brief built on modeled data so you can see the exact format you receive on Day 14 —
            not a client result. Your brief contains your numbers: every recovered lead, source, transcript, and
            deposit status. You keep it whether or not you continue. Success criteria are agreed in writing before
            Day 1. Operational reporting only — not financial, medical, legal, or insurance advice.
          </p>
          <p className="mt-2.5 font-mono text-[11px] text-[#0f2c2c]/60">
            verify our ledger format independently → scrutexity.com/api/verify/demo-001
          </p>
        </div>
      </motion.div>

      {/* CTA below document */}
      {!hideCTA && (
        <div className="mt-10 rounded-[1.75rem] border border-sand-deep bg-cream p-8 text-center">
          <p className="section-kicker mb-3">Start with your free audit</p>
          <h2 className="font-display text-2xl text-espresso md:text-3xl">
            This is what your Day-14 brief looks like with your numbers.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-mist">
            14-day pilot. $0 during the window. If the minimum number of verified re-engaged bookings
            agreed in writing isn&apos;t reached in the first 30 days, your first month is free.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 rounded-full bg-[#b9825f] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(185,130,95,.45)] transition hover:-translate-y-0.5"
            >
              Get Your Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-sand-deep px-7 py-3.5 text-sm font-semibold text-mist transition hover:bg-[#f3eadf]"
            >
              See pricing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedMoney({ value, active }: { value: number; active: boolean }) {
  const reduceMotion = useReducedMotion();
  const base = useMotionValue(reduceMotion ? value : 0);
  const spring = useSpring(base, { stiffness: 130, damping: 24, mass: 0.8 });
  const formatted = useTransform(spring, (latest) => `$${Math.round(latest).toLocaleString()}`);

  useEffect(() => {
    base.set(active || reduceMotion ? value : 0);
  }, [active, base, reduceMotion, value]);

  if (reduceMotion) {
    return <>${value.toLocaleString()}</>;
  }

  return <motion.span>{formatted}</motion.span>;
}
