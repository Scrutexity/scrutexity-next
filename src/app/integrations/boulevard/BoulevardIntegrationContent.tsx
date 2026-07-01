'use client';

import { ArrowRight, Check, Database, Key, ShieldCheck, Clock, CreditCard, Tag, Users, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const reads = [
  {
    icon: CalendarCheck,
    title: 'Live Resource Matrix',
    body: 'We check both Provider availability AND Room/Equipment constraints before ever offering a time slot. If your Morpheus8 device is booked for 2 PM, we won\'t offer it.',
  },
  {
    icon: Users,
    title: 'Patient Directory Deduplication',
    body: 'We query existing phone numbers and emails before creating anything. No duplicate client profiles. No merged records. Your database stays clean.',
  },
  {
    icon: Database,
    title: 'Custom Service Menus',
    body: 'We read your active service categories, durations, and pricing variations directly from your Boulevard settings — not a static CSV someone uploaded six months ago.',
  },
];

const writes = [
  {
    icon: CalendarCheck,
    title: 'Confirmed Appointments',
    body: 'Injected instantly into the calendar view, bypassing the "pending requests" folder entirely. The patient receives a confirmation SMS with your branding.',
  },
  {
    icon: CreditCard,
    title: 'The Stripe-to-Ledger Handshake',
    body: 'When the $150 Stripe deposit clears, the Transaction Reference ID is automatically written into the Boulevard appointment notes. Your accountant reconciles in seconds — no double-charging at checkout.',
  },
  {
    icon: Tag,
    title: 'Source Attribution Tags',
    body: 'Every recovered booking is tagged "SCX-RECOVERED" in the appointment metadata. Your marketing ROI reports remain perfectly accurate. Your agency can\'t take credit for what we recovered.',
  },
];

const edgeCases = [
  {
    title: 'The "Sniper" Scenario',
    question: 'What if a slot gets taken while the patient is paying?',
    answer: 'Scrutexity places a 10-minute API hold on the slot the moment the Stripe link is generated. No double-bookings. If the deposit doesn\'t clear within 10 minutes, the slot is instantly released back to inventory.',
  },
  {
    title: 'The Control Scenario',
    question: 'What if I need to pause the AI instantly?',
    answer: 'You retain a 1-Click Access Revocation switch inside your Boulevard Developer Settings. You hold the master key. Revoke it and everything stops — no support tickets, no cancellation calls.',
  },
  {
    title: 'The Provider Matrix Scenario',
    question: 'What happens when Nurse Sarah is out sick?',
    answer: 'Scrutexity reads the live provider schedule. If Sarah\'s hours are blocked in Boulevard, her slots are never offered. If a specific treatment requires an RN (not an aesthetician), we enforce that credential gate.',
  },
  {
    title: 'The Existing Patient Scenario',
    question: 'What if the person DMing is already in my system?',
    answer: 'We match on phone and email before creating anything. Returning patients see "Welcome back" — not a new intake form. Their existing consent forms and treatment history remain intact.',
  },
];

export default function BoulevardIntegrationContent() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e8dfcf_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7f8f78]/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#7f8f78] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7f8f78] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7f8f78]" />
            </span>
            Verified Integration Partner
          </div>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl md:text-[3.8rem]">
            A native Boulevard integration<br />
            <span className="text-clay">built for the luxury aesthetics ledger.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-mist">
            We don&apos;t just &ldquo;sync&rdquo; with your calendar. Scrutexity natively reads your live provider availability, respects your room resource constraints, and writes confirmed bookings directly into your ledger with the Stripe deposit ID attached.
          </p>
          <div className="mt-8">
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a36b5d]"
            >
              Get Your Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">
        {/* GET / POST — The API Proof */}
        <section className="mx-auto max-w-6xl mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* READ */}
            <Reveal>
              <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-8 md:p-10 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand-deep">
                  <div className="flex items-center gap-1.5 rounded-full bg-[#f3eadf] border border-sand-deep px-3 py-1.5 text-[10px] font-bold font-mono text-[#7f8f78] uppercase tracking-wider">
                    <Database className="h-3 w-3" /> GET
                  </div>
                  <h3 className="font-display text-xl text-espresso">What We Read</h3>
                </div>
                <p className="text-[13px] text-mist mb-6 leading-relaxed">
                  Read-only access. We can see availability — never patient charts, clinical notes, or financial records.
                </p>
                <ul className="space-y-5">
                  {reads.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7f8f78]/8">
                          <Icon className="h-4 w-4 text-[#7f8f78]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-espresso">{item.title}</p>
                          <p className="text-[13px] leading-6 text-mist mt-0.5">{item.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* WRITE */}
            <Reveal>
              <div className="rounded-[1.75rem] border border-[#3d3731]/30 bg-[#1e1b17] p-8 md:p-10 shadow-lg h-full">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3d3731]/40">
                  <div className="flex items-center gap-1.5 rounded-full bg-clay/15 border border-clay/20 px-3 py-1.5 text-[10px] font-bold font-mono text-clay uppercase tracking-wider">
                    <Key className="h-3 w-3" /> POST
                  </div>
                  <h3 className="font-display text-xl text-[#e1d4c5]">What We Write</h3>
                </div>
                <p className="text-[13px] text-[#9e8e7e] mb-6 leading-relaxed">
                  Write access is scoped to appointments and notes only. We never touch patient charts, clinical data, or billing records.
                </p>
                <ul className="space-y-5">
                  {writes.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay/10">
                          <Icon className="h-4 w-4 text-clay" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#e1d4c5]">{item.title}</p>
                          <p className="text-[13px] leading-6 text-[#9e8e7e] mt-0.5">{item.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Edge Cases — The Operator Proof */}
        <section className="mx-auto max-w-4xl mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <p className="section-kicker mb-3">Edge Cases</p>
              <h2 className="font-display text-3xl text-espresso tracking-tight md:text-4xl">
                Built for the reality of a high-volume front desk.
              </h2>
              <p className="mt-3 text-mist max-w-xl mx-auto">
                Every scenario below came from watching real clinics operate. We solved them before writing the integration.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {edgeCases.map((ec, i) => (
              <Reveal key={i}>
                <div className="rounded-[1.25rem] border border-sand-deep bg-cream p-6 h-full">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-clay-deep mb-2">{ec.title}</p>
                  <p className="text-sm text-espresso font-semibold mb-1.5">{ec.question}</p>
                  <p className="text-[13px] leading-6 text-mist">{ec.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Bottom stats */}
        <section className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-[1.75rem] border border-sand-deep bg-[#f3eadf] p-8 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: '5 min', label: 'Boulevard setup time' },
                  { value: 'Read-only', label: 'API access scope' },
                  { value: '1-click', label: 'Revocation in Boulevard' },
                  { value: '10 min', label: 'Slot hold during payment' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-espresso font-display">{stat.value}</p>
                    <p className="text-[12px] text-mist mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-2xl mt-20 text-center">
          <Reveal>
            <h2 className="font-display text-2xl text-espresso mb-6">Ready to automate your after-hours Boulevard bookings?</h2>
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a36b5d]"
            >
              Get Your Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs text-[#9e8e7e]">Zero setup fees. Zero staff training required. Read-only access.</p>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
