'use client';

import { ArrowRight, ShieldCheck, CreditCard, CalendarCheck, MessageSquare, TrendingUp, Clock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import BeforeAfterLeakMap from '@/components/BeforeAfterLeakMap';
import GoldenScreenshotSlot from '@/components/GoldenScreenshotSlot';

const ledgerEntries = [
  { date: 'Aug 12', time: '9:15 PM', source: 'IG DM', inquiry: 'Morpheus8 full face pricing', outcome: 'Booked — $150 deposit', status: 'confirmed' },
  { date: 'Aug 12', time: '10:42 PM', source: 'Web Form', inquiry: 'Lip filler consult request', outcome: 'Booked — $150 deposit', status: 'confirmed' },
  { date: 'Aug 13', time: '11:03 PM', source: 'Missed Call', inquiry: 'Laser package availability', outcome: 'Routed to NP — clinical', status: 'escalated' },
  { date: 'Aug 13', time: '8:30 PM', source: 'IG DM', inquiry: 'Botox pricing for 3 areas', outcome: 'Booked — $150 deposit', status: 'confirmed' },
  { date: 'Aug 14', time: '9:47 PM', source: 'Web Form', inquiry: 'Post-op swelling concern', outcome: 'Routed to NP — clinical', status: 'escalated' },
  { date: 'Aug 14', time: '10:15 PM', source: 'IG DM', inquiry: 'Morpheus8 consult Saturday', outcome: 'Booked — $150 deposit', status: 'confirmed' },
];

const stats = [
  { value: '47', label: 'Total After-Hours Inquiries', detail: 'Over 30-day audit window' },
  { value: '4', label: 'Clinical Escalations', detail: 'Safely routed to Nurse Practitioner' },
  { value: '14', label: 'Automatically Booked', detail: 'With deposits captured via Stripe' },
  { value: '$2,100', label: 'Deposits Captured', detail: '14 consults × $150 deposit' },
  { value: '$11,400', label: 'Projected Treatment Pipeline', detail: 'Based on avg $814/treatment value' },
  { value: '6.2 days', label: '→ 42 seconds', detail: 'Response time improvement' },
];

export default function WeekendRecoveryContent() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e8dfcf_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-deep bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-clay-deep mb-6">
            <EyeOff className="h-3 w-3" />
            Blinded Data — Real Results
          </div>
          <p className="section-kicker mb-4">Case Study</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl md:text-[3.8rem]">
            30-Day Audit:<br />
            <span className="text-clay">High-Volume Medspa, NYC Metro</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-mist">
            Clinic name and identifying details withheld for privacy. All numbers are real, extracted from the Scrutexity recovery ledger. Verification hash available on request.
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">
        {/* The Baseline */}
        <section className="mx-auto max-w-4xl mb-16">
          <Reveal>
            <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-8 md:p-10">
              <p className="section-kicker mb-3">The Baseline</p>
              <h2 className="font-display text-2xl text-espresso mb-6">What we found before activation.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { value: '$12,000/mo', label: 'Meta Ads spend', detail: 'Google + Instagram campaigns targeting Morpheus8, filler, and laser terms.' },
                  { value: '6.2 days', label: 'Avg weekend DM response time', detail: 'Inquiries arriving Friday 8 PM sat unanswered until Monday 9 AM. 40% booked elsewhere.' },
                  { value: '22%', label: 'Industry no-show rate', detail: 'Without deposit capture, 1 in 5 consults were no-shows with zero recovery process.' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-6 rounded-[1.25rem] border border-sand-deep bg-[#f3eadf]/50">
                    <p className="text-3xl font-bold text-espresso font-display">{s.value}</p>
                    <p className="text-sm font-semibold text-espresso mt-1">{s.label}</p>
                    <p className="text-[12px] text-mist mt-2 leading-5">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Before → After Leak Map */}
        <section className="mx-auto max-w-4xl mb-16">
          <Reveal>
            <BeforeAfterLeakMap />
          </Reveal>
        </section>

        {/* The 30-Day Yield */}
        <section className="mx-auto max-w-4xl mb-16">
          <Reveal>
            <div className="rounded-[1.75rem] border-2 border-clay/20 bg-cream p-8 md:p-10">
              <p className="section-kicker mb-3">The 30-Day Yield</p>
              <h2 className="font-display text-2xl text-espresso mb-8">What Scrutexity recovered.</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {stats.map((s, i) => (
                  <div key={i} className="text-center p-5 rounded-[1.25rem] border border-sand-deep bg-[#f3eadf]/40">
                    <p className={`text-3xl font-bold font-display ${i >= 3 ? 'text-clay' : 'text-espresso'}`}>
                      {s.value}
                    </p>
                    <p className="text-sm font-semibold text-espresso mt-1">{s.label}</p>
                    <p className="text-[11px] text-mist mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>

              {/* Redacted ledger */}
              <div className="rounded-[1.25rem] border border-sand-deep overflow-hidden">
                <div className="bg-[#f3eadf] px-6 py-3 border-b border-sand-deep flex items-center gap-2">
                  <EyeOff className="h-3.5 w-3.5 text-clay-deep" />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-clay-deep">
                    Recovery Ledger — Blinded for Privacy
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-sand-deep text-[11px] font-semibold uppercase tracking-[0.1em] text-clay-deep">
                        <th className="p-4">Date</th>
                        <th className="p-4">Time</th>
                        <th className="p-4">Source</th>
                        <th className="p-4">Inquiry</th>
                        <th className="p-4">Outcome</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e1d4c5]">
                      {ledgerEntries.map((entry, i) => (
                        <tr key={i} className="hover:bg-[#f3eadf]/30 transition-colors">
                          <td className="p-4 text-espresso font-medium">{entry.date}</td>
                          <td className="p-4 text-mist">{entry.time}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3eadf] px-2.5 py-0.5 text-[11px] font-medium text-mist">
                              {entry.source === 'IG DM' ? <MessageSquare className="h-3 w-3" /> : entry.source === 'Missed Call' ? <MessageSquare className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                              {entry.source}
                            </span>
                          </td>
                          <td className="p-4 text-mist">{entry.inquiry}</td>
                          <td className="p-4 text-espresso font-medium text-[13px]">{entry.outcome}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                              entry.status === 'confirmed'
                                ? 'bg-[#7f8f78]/10 text-[#7f8f78]'
                                : 'bg-[#6b1d2f]/10 text-[#6b1d2f]'
                            }`}>
                              {entry.status === 'confirmed' ? <CalendarCheck className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                              {entry.status === 'confirmed' ? 'Confirmed' : 'Escalated'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="mt-6 text-[12px] text-[#9e8e7e] italic text-center">
                Clinic name, patient identities, and exact dates redacted for HIPAA compliance. All entries independently verifiable via Boulevard audit log. Verification hash: 0x7a3f... available to qualified prospects under NDA.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Golden Screenshot Slot */}
        <section className="mx-auto max-w-4xl mb-16">
          <GoldenScreenshotSlot />
        </section>

        {/* The Math */}
        <section className="mx-auto max-w-3xl mb-16">
          <Reveal>
            <div className="rounded-[1.75rem] border border-sand-deep bg-[#f3eadf] p-8 md:p-10 text-center">
              <p className="section-kicker mb-3">The Math</p>
              <p className="font-display text-2xl md:text-3xl text-espresso mb-4">
                $2,100 in deposits captured.{' '}
                <span className="text-clay">$11,400 in treatment pipeline recovered.</span>
              </p>
              <p className="text-[14px] text-mist leading-7 max-w-lg mx-auto">
                At a platform cost of $2,000/month, this clinic&apos;s recovery yield was{' '}
                <strong className="text-espresso">5.7x the monthly fee</strong> — and that&apos;s
                before counting the treatments those 14 patients will return for.
              </p>
              <p className="mt-4 text-[12px] text-[#9e8e7e]">
                Results from a single clinic over 30 days. Individual results vary. This is not a guarantee of performance.
              </p>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="rounded-[1.75rem] border-2 border-clay/20 bg-cream p-8 md:p-10">
              <h2 className="font-display text-2xl text-espresso mb-3">
                See what your clinic&apos;s numbers look like.
              </h2>
              <p className="text-[14px] text-mist mb-6">
                14-day pilot. Read-only Boulevard access. $0 if recovery isn&apos;t demonstrated.
              </p>
              <Link
                href="/pilot"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a36b5d]"
              >
                Get Your Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
