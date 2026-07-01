'use client';

import { ArrowRight, ShieldAlert, CreditCard, CalendarCheck, MessageSquare, Brain, Stethoscope, Check } from 'lucide-react';
import { Reveal } from './Reveal';
import Link from 'next/link';

const STEPS = [
  {
    step: 1,
    label: 'Lead Arrives',
    icon: MessageSquare,
    time: 'Saturday 10:47 PM',
    detail: 'Instagram DM, web form, or missed call. Prospect asks about Morpheus8 pricing or filler availability. Your front desk is closed.',
    bothPaths: true,
  },
  {
    step: 2,
    label: 'AI Qualifies',
    icon: Brain,
    time: '10:47:04 PM',
    detail: 'Deterministic classifier checks: is this a scheduling question or a clinical concern? Two paths diverge here.',
    bothPaths: true,
    split: true,
  },
  {
    step: 3,
    label: 'Operational Path',
    icon: CalendarCheck,
    time: '10:47:08 PM',
    detail: 'Queries Boulevard for real-time provider availability. Quotes your exact pricing. Offers two open time slots.',
    path: 'operational',
    color: 'border-[#7f8f78] bg-[#7f8f78]/5',
    iconColor: 'text-[#7f8f78]',
    iconBg: 'bg-[#7f8f78]/10',
  },
  {
    step: 3,
    label: 'Clinical Escalation',
    icon: Stethoscope,
    time: '10:47:05 PM',
    detail: 'Hard stop. Zero AI response to patient. Immediate Slack + SMS alert to on-call provider with full context.',
    path: 'clinical',
    color: 'border-[#6b1d2f] bg-[#6b1d2f]/5',
    iconColor: 'text-[#6b1d2f]',
    iconBg: 'bg-[#6b1d2f]/10',
  },
  {
    step: 4,
    label: 'Deposit Captured',
    icon: CreditCard,
    time: '10:48 PM',
    detail: 'Patient selects time slot. Secure Stripe checkout for your standard $150 consult deposit. PCI-compliant.',
    path: 'operational',
    color: 'border-[#7f8f78] bg-[#7f8f78]/5',
    iconColor: 'text-[#7f8f78]',
    iconBg: 'bg-[#7f8f78]/10',
  },
  {
    step: 5,
    label: 'Boulevard Updated',
    icon: CalendarCheck,
    time: '10:48 PM',
    detail: 'Stripe webhook fires. Appointment injected into Boulevard as Confirmed with deposit reference. Patient receives confirmation SMS.',
    path: 'operational',
    color: 'border-[#7f8f78] bg-[#7f8f78]/5',
    iconColor: 'text-[#7f8f78]',
    iconBg: 'bg-[#7f8f78]/10',
  },
];

export default function DepositCaptureWorkflow() {
  return (
    <section className="bg-[#fcfaf7] px-5 py-24 sm:px-8 border-b border-sand-deep">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center mb-14">
            <p className="section-kicker mb-3">How It Works</p>
            <h2 className="font-display text-3xl leading-tight text-espresso md:text-4xl">
              From Midnight DM to Confirmed Booking
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-mist">
              Five steps. Two paths. One deposits the consult fee and injects the booking. The other alerts your medical team and refuses to engage.
            </p>
          </div>
        </Reveal>

        {/* Desktop: Horizontal flow */}
        <div className="hidden lg:block">
          {/* Top lane: Operational */}
          <div className="relative mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7f8f78] mb-4 text-center">
              Operational Path — Booking &amp; Deposit
            </p>
            <div className="grid grid-cols-5 gap-3">
              {[
                STEPS[0], // Lead Arrives
                STEPS[1], // AI Qualifies
                STEPS[2], // Operational Path (step 3 ops)
                STEPS[4], // Deposit Captured
                STEPS[5], // Boulevard Updated
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={`${s.step}-${s.label}`} className="flex flex-col items-center text-center group">
                    <div className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border ${s.path === 'operational' || !s.path ? 'border-[#7f8f78]/30 bg-[#7f8f78]/5' : 'border-sand-deep bg-cream'}`}>
                      <Icon className={`h-6 w-6 ${s.path === 'operational' || !s.path ? 'text-[#7f8f78]' : 'text-[#9e8e7e]'}`} />
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f3eadf] text-[10px] font-bold text-clay-deep border border-sand-deep">
                        {s.step}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-espresso mb-1">{s.label}</p>
                    <p className="text-[11px] text-[#9e8e7e] mb-2">{s.time}</p>
                    <p className="text-[12px] leading-5 text-mist">{s.detail}</p>
                  </div>
                );
              })}
            </div>
            {/* Arrow connectors between steps */}
            <div className="absolute top-7 left-[calc(10%+28px)] right-[calc(10%+28px)] flex justify-between pointer-events-none" style={{ display: 'none' }}>
              {/* Hidden — replaced by CSS connectors */}
            </div>
          </div>

          {/* Divergence visualization */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="h-px flex-1 bg-[#e1d4c5]" />
            <div className="rounded-full border border-[#6b1d2f]/20 bg-[#6b1d2f]/5 px-4 py-1.5 text-[11px] font-semibold text-[#6b1d2f] flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" />
              Clinical questions take a different path
            </div>
            <div className="h-px flex-1 bg-[#e1d4c5]" />
          </div>

          {/* Bottom lane: Clinical */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b1d2f] mb-4 text-center">
              Clinical Path — Hard Stop &amp; Escalate
            </p>
            <div className="max-w-md mx-auto">
              <div className="rounded-[1.75rem] border-2 border-[#6b1d2f]/20 bg-[#6b1d2f]/3 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#6b1d2f]/30 bg-[#6b1d2f]/10">
                    <Stethoscope className="h-6 w-6 text-[#6b1d2f]" />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#f3eadf] text-[10px] font-bold text-[#6b1d2f] border border-[#6b1d2f]/20">
                      3
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-espresso mb-1">Clinical Escalation</p>
                    <p className="text-[11px] text-[#6b1d2f] font-medium mb-2">10:47:05 PM — Instant</p>
                    <p className="text-[13px] leading-6 text-mist mb-4">
                      System hard-stops. Generates zero patient-facing response. Immediately pings on-call provider via Slack + SMS with full patient context, procedure history, and the triggering message.
                    </p>
                    <div className="flex items-center gap-2 rounded-full border border-[#6b1d2f]/15 bg-[#6b1d2f]/5 px-3 py-1.5 w-fit">
                      <ShieldAlert className="h-3.5 w-3.5 text-[#6b1d2f]" />
                      <span className="text-[11px] font-semibold text-[#6b1d2f]">AI Never Responds to Clinical Questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="lg:hidden space-y-4">
          {/* Operational header */}
          <div className="rounded-full bg-[#7f8f78]/8 border border-[#7f8f78]/20 px-4 py-1.5 text-center mb-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7f8f78]">
              Operational Path → Booking &amp; Deposit
            </p>
          </div>

          {[
            STEPS[0], STEPS[1], STEPS[2], STEPS[4], STEPS[5],
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={`m-${i}`} className="flex items-start gap-4 rounded-[1.25rem] border border-sand-deep bg-cream p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7f8f78]/20 bg-[#7f8f78]/5">
                  <Icon className="h-5 w-5 text-[#7f8f78]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-clay-deep bg-[#f3eadf] px-2 py-0.5 rounded-full">Step {s.step}</span>
                    <span className="text-xs text-[#9e8e7e]">{s.time}</span>
                  </div>
                  <p className="text-sm font-semibold text-espresso">{s.label}</p>
                  <p className="text-[13px] leading-6 text-mist mt-1">{s.detail}</p>
                </div>
              </div>
            );
          })}

          {/* Clinical path divider */}
          <div className="flex items-center gap-2 py-2">
            <div className="h-px flex-1 bg-[#6b1d2f]/15" />
            <span className="text-[11px] font-semibold text-[#6b1d2f] flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              Clinical questions take a different path
            </span>
            <div className="h-px flex-1 bg-[#6b1d2f]/15" />
          </div>

          {/* Clinical card */}
          <div className="rounded-[1.25rem] border-2 border-[#6b1d2f]/15 bg-[#6b1d2f]/3 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#6b1d2f]/20 bg-[#6b1d2f]/8">
                <Stethoscope className="h-5 w-5 text-[#6b1d2f]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-[#6b1d2f] bg-[#6b1d2f]/8 px-2 py-0.5 rounded-full">Step 3</span>
                  <span className="text-xs text-[#6b1d2f]/70">10:47:05 PM</span>
                </div>
                <p className="text-sm font-semibold text-espresso">Clinical Escalation</p>
                <p className="text-[13px] leading-6 text-mist mt-1">{STEPS[3].detail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <Reveal>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '42 sec', label: 'Median response time' },
              { value: '$150', label: 'Standard deposit captured' },
              { value: '0', label: 'AI clinical responses ever' },
              { value: '1-click', label: 'Boulevard disconnect' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[1.25rem] border border-sand-deep bg-cream p-5 text-center">
                <p className="text-2xl font-bold text-espresso font-display">{stat.value}</p>
                <p className="text-[12px] text-mist mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/triage"
              className="inline-flex items-center gap-2 text-sm font-semibold text-clay hover:text-[#a36b5d] transition-colors"
            >
              Test the clinical guardrails yourself → <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
