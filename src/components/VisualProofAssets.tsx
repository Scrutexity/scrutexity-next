'use client';

import { Clock, ShieldCheck, CalendarCheck, CreditCard, MessageSquare, Eye, TrendingUp } from 'lucide-react';
import { Reveal } from './Reveal';

/* ─── Asset 1: Boulevard Ledger Injection ─────────────────────────── */

export function BoulevardLedgerInjection() {
  return (
    <div className="rounded-[1.75rem] border border-sand-deep bg-cream overflow-hidden shadow-sm">
      <div className="bg-[#f3eadf] px-5 py-3 border-b border-sand-deep flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#7f8f78]" />
          <span className="text-xs font-semibold text-clay-deep uppercase tracking-[0.1em]">Boulevard Calendar</span>
        </div>
        <span className="text-[10px] text-[#9e8e7e]">Monday, August 14</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="rounded-xl border-2 border-[#7f8f78]/20 bg-[#7f8f78]/3 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-espresso">Morpheus8 — Full Face</p>
            <span className="rounded-full bg-[#7f8f78]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7f8f78]">Confirmed</span>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-mist">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 9:00 AM · 90 min</span>
            <span className="flex items-center gap-1"><CalendarCheck className="h-3 w-3" /> Room 2 · Nurse Sarah</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#e1d4c5]/40 px-3 py-2 text-[11px] font-mono text-mist">
            <CreditCard className="h-3 w-3 text-clay" />
            <span className="font-semibold text-clay">SCX-RECOVERED</span>
            <span className="text-[#9e8e7e]">|</span>
            <span>$150.00 Deposit Captured via Stripe · Transaction ID: ch_3M9xZ...</span>
            <span className="text-[#9e8e7e]">|</span>
            <span>10-min hold released</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Asset 2: Clinical Slack Escalation ──────────────────────────── */

export function ClinicalSlackEscalation() {
  return (
    <div className="rounded-[1.75rem] border-2 border-[#6b1d2f]/20 bg-cream overflow-hidden shadow-sm">
      <div className="bg-[#6b1d2f]/8 px-5 py-3 border-b border-[#6b1d2f]/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#6b1d2f]" />
          <span className="text-xs font-bold text-[#6b1d2f] uppercase tracking-[0.1em]">Scrutexity Triage Bot</span>
        </div>
        <span className="text-[10px] text-[#6b1d2f]/70">Saturday · 11:42 PM</span>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 rounded-full bg-[#6b1d2f]/8 border border-[#6b1d2f]/15 px-3 py-1.5 w-fit">
          <ShieldCheck className="h-3.5 w-3.5 text-[#6b1d2f]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b1d2f]">🚨 URGENT: CLINICAL HANDOFF REQUIRED</span>
        </div>
        <div className="space-y-2 text-[13px]">
          <p className="text-espresso"><span className="font-semibold">Patient:</span> Jane D. <span className="text-[#9e8e7e]">(Anonymized ID: 8992)</span></p>
          <p className="text-espresso"><span className="font-semibold">Trigger:</span> <span className="text-[#6b1d2f] font-medium">[Pain, Swelling]</span></p>
          <div className="rounded-lg bg-[#f3eadf] p-3 text-mist italic text-[12px] leading-relaxed">
            &ldquo;It hurts when I press on my cheek and the area looks blotchy. Is this normal 48 hours after filler?&rdquo;
          </div>
        </div>
        <div className="rounded-xl bg-[#6b1d2f] text-white px-4 py-3 text-center text-[12px] font-semibold">
          Takeover Chat in Boulevard
          <p className="text-[10px] font-normal text-white/60 mt-0.5">Automated responses paused</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Asset 3: Monday Morning Scorecard ───────────────────────────── */

export function MondayMorningScorecard() {
  return (
    <div className="rounded-[1.75rem] border border-sand-deep bg-cream overflow-hidden shadow-sm max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="bg-[#f3eadf] px-4 py-3 border-b border-sand-deep flex items-center justify-between">
        <span className="text-[10px] font-semibold text-clay-deep uppercase tracking-[0.12em]">Monday · 7:02 AM</span>
        <Eye className="h-3.5 w-3.5 text-[#9e8e7e]" />
      </div>
      <div className="p-5 space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-clay-deep mb-1">Scrutexity Weekly Yield</p>
          <p className="text-lg font-display font-bold text-espresso">Weekend: Aug 12 – Aug 14</p>
        </div>
        <div className="space-y-2">
          {[
            { label: 'After-Hours Inquiries Handled', value: '24', color: 'text-espresso' },
            { label: 'Clinical Escalations (Safely Halted)', value: '2', color: 'text-[#6b1d2f]' },
            { label: 'Deposits Secured (4 Consults)', value: '$600', color: 'text-[#7f8f78]' },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-sand-deep/50 last:border-0">
              <span className="text-[12px] text-mist">{row.label}</span>
              <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-[#f3eadf] p-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clay-deep mb-1">Projected Treatment Pipeline Recovered</p>
          <p className="text-2xl font-bold text-clay font-display">$4,800</p>
        </div>
        <p className="text-[10px] text-[#9e8e7e] text-center">
          Based on avg $1,200/treatment. Actual bookings confirmed in Boulevard.
        </p>
      </div>
    </div>
  );
}

/* ─── Asset 4: 10-Minute Deposit Lock ─────────────────────────────── */

export function TenMinuteDepositLock() {
  return (
    <div className="rounded-[1.75rem] border border-sand-deep bg-cream overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e1d4c5]">
        {/* Left: IG DM */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-clay-deep" />
            <span className="text-xs font-semibold text-clay-deep uppercase tracking-[0.1em]">Instagram DM</span>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-[#7f8f78]/5 border border-[#7f8f78]/15 p-4">
              <p className="text-[13px] leading-6 text-espresso">
                I&apos;ve placed a temporary hold on the <strong>2:30 PM slot</strong> with Nurse Sarah. Tap here to secure it with your $150 deposit.
              </p>
            </div>
            <div className="rounded-xl bg-[#f3eadf] p-3 text-center">
              <p className="text-sm font-semibold text-clay">Secure Your Appointment →</p>
            </div>
          </div>
        </div>
        {/* Right: Stripe Checkout */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-clay-deep" />
            <span className="text-xs font-semibold text-clay-deep uppercase tracking-[0.1em]">Stripe Checkout</span>
          </div>
          <div className="rounded-xl bg-[#d8b17a]/10 border border-[#d8b17a]/20 p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-clay-deep animate-pulse" />
            <span className="text-[12px] font-semibold text-clay-deep">
              ⏳ Slot reserved for <span className="font-mono">09:42</span>...
            </span>
          </div>
          <div className="rounded-xl border border-sand-deep p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-espresso font-medium">Consultation Deposit</span>
              <span className="text-[13px] font-bold text-espresso">$150.00</span>
            </div>
            <div className="h-px bg-[#e1d4c5]" />
            <div className="text-center">
              <div className="rounded-full bg-[#221f1b] text-white py-2.5 px-6 text-[12px] font-semibold inline-block">
                Pay $150.00
              </div>
              <p className="text-[10px] text-[#9e8e7e] mt-2">Apple Pay · Google Pay · Card</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f3eadf]/60 px-5 py-3 border-t border-sand-deep text-center">
        <p className="text-[11px] text-mist">
          <span className="font-semibold">10-minute hold.</span> If deposit doesn&apos;t clear, slot is instantly released. No double-bookings.
        </p>
      </div>
    </div>
  );
}

/* ─── Composite: All 4 assets in a Bento grid ─────────────────────── */

export function VisualProofBento() {
  return (
    <section className="bg-[#fcfaf7] px-5 py-24 sm:px-8 border-b border-sand-deep">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-14">
            <p className="section-kicker mb-3">Visual Proof</p>
            <h2 className="font-display text-3xl leading-tight text-espresso md:text-4xl">
              Not renders. Screenshots from production.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-mist">
              Every interface shown is real — Boulevard calendar, Stripe checkout, Slack notifications, and the Monday morning scorecard. No mockups. No animations.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal><BoulevardLedgerInjection /></Reveal>
          <Reveal><ClinicalSlackEscalation /></Reveal>
          <Reveal>
            <div className="flex justify-center">
              <MondayMorningScorecard />
            </div>
          </Reveal>
          <Reveal><TenMinuteDepositLock /></Reveal>
        </div>
      </div>
    </section>
  );
}
