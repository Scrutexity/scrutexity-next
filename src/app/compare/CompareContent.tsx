'use client';

import { ArrowRight, Check, X, Minus, ShieldCheck, CreditCard, Users, Clock, Building2, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

type CheckValue = boolean | string;
interface CompetitorCheck { value: CheckValue; note: string }
interface Competitor {
  name: string;
  tagline: string;
  highlight: boolean;
  checks: Record<string, CompetitorCheck>;
}

const FEATURES = [
  'After-hours response',
  'Checks live Boulevard availability',
  'Captures Stripe deposit',
  'Injects confirmed booking into PMS',
  'Clinical question hard-stop',
  'PHI stripped before processing',
  '1-click API revocation',
  'Staff training required',
  'Works across multiple PMS systems',
  'Auditable recovery ledger',
  'Monthly cost',
  'Primary Strength',
  'Fatal Operational Flaw',
] as const;

const COMPETITORS: Competitor[] = [
  {
    name: 'Scrutexity',
    tagline: 'Governed Recovery Infrastructure',
    highlight: true,
    checks: {
      'After-hours response': { value: true, note: '42 sec median' },
      'Checks live Boulevard availability': { value: true, note: 'Provider + Room matrix' },
      'Captures Stripe deposit': { value: true, note: 'PCI-compliant checkout' },
      'Injects confirmed booking into PMS': { value: true, note: 'Bypasses pending folder' },
      'Clinical question hard-stop': { value: true, note: 'Zero AI medical responses' },
      'PHI stripped before processing': { value: true, note: 'BAA executed pre-activation' },
      '1-click API revocation': { value: true, note: 'Inside Boulevard settings' },
      'Staff training required': { value: false, note: 'Zero. Operates in background.' },
      'Works across multiple PMS systems': { value: true, note: 'Boulevard + Mangomint + Zenoti Q3' },
      'Auditable recovery ledger': { value: true, note: 'Source + transcript + deposit per entry' },
      'Monthly cost': { value: '$2,000', note: 'Per location. Pilot: $0 until demonstrated.' },
      'Primary Strength': { value: 'Highest revenue recovery + strict CPOM governance', note: '' },
      'Fatal Operational Flaw': { value: 'Lacks human warmth — strictly transactional and operational', note: '' },
    },
  },
  {
    name: 'AI Receptionist',
    tagline: 'Generic Chatbot',
    highlight: false,
    checks: {
      'After-hours response': { value: true, note: 'Instant replies' },
      'Checks live Boulevard availability': { value: false, note: 'Cannot access PMS calendar' },
      'Captures Stripe deposit': { value: false, note: 'Not supported' },
      'Injects confirmed booking into PMS': { value: false, note: 'Manual entry by staff Monday AM' },
      'Clinical question hard-stop': { value: false, note: 'May hallucinate medical advice' },
      'PHI stripped before processing': { value: false, note: 'Often stores full transcripts' },
      '1-click API revocation': { value: false, note: 'Vendor controls access' },
      'Staff training required': { value: true, note: 'Must monitor + manually transfer bookings' },
      'Works across multiple PMS systems': { value: false, note: 'Platform-agnostic but PMS-blind' },
      'Auditable recovery ledger': { value: false, note: 'No deposit tracking or attribution' },
      'Monthly cost': { value: '$200-$500', note: 'Low upfront. High manual overhead.' },
      'Primary Strength': { value: 'Lowest upfront software cost', note: '' },
      'Fatal Operational Flaw': { value: 'High liability — hallucinates advice, cannot securely lock Boulevard slots', note: '' },
    },
  },
  {
    name: 'Virtual Assistant',
    tagline: 'Offshore / 24/7 Human Agent',
    highlight: false,
    checks: {
      'After-hours response': { value: true, note: 'Human replies' },
      'Checks live Boulevard availability': { value: false, note: 'Must be given PMS login' },
      'Captures Stripe deposit': { value: false, note: 'Not PCI-compliant as third party' },
      'Injects confirmed booking into PMS': { value: 'Manual', note: 'Agent manually books in PMS' },
      'Clinical question hard-stop': { value: 'Variable', note: 'Training-dependent. No audit trail.' },
      'PHI stripped before processing': { value: false, note: 'Human sees full patient data' },
      '1-click API revocation': { value: false, note: 'Must revoke PMS login + change password' },
      'Staff training required': { value: true, note: 'Scripts, protocols, escalation paths' },
      'Works across multiple PMS systems': { value: 'Limited', note: 'Training required per platform' },
      'Auditable recovery ledger': { value: false, note: 'Manual notes. No verifiable ledger.' },
      'Monthly cost': { value: '$1,500-$3,000', note: 'Per agent. Scaling requires hiring.' },
      'Primary Strength': { value: 'Lower cost human fallback', note: '' },
      'Fatal Operational Flaw': { value: 'High latency — cannot safely triage post-op medical complications', note: '' },
    },
  },
  {
    name: 'Hiring More Front Desk',
    tagline: 'In-House Expansion',
    highlight: false,
    checks: {
      'After-hours response': { value: false, note: 'Staff goes home at 5 PM' },
      'Checks live Boulevard availability': { value: 'Manual', note: 'Staff checks PMS directly' },
      'Captures Stripe deposit': { value: 'Manual', note: 'Staff sends invoice' },
      'Injects confirmed booking into PMS': { value: 'Manual', note: 'Staff enters booking' },
      'Clinical question hard-stop': { value: 'Training-dependent', note: 'Human judgment required' },
      'PHI stripped before processing': { value: true, note: 'Staff handles directly' },
      '1-click API revocation': { value: false, note: 'Employment termination process' },
      'Staff training required': { value: true, note: 'Weeks of onboarding' },
      'Works across multiple PMS systems': { value: 'Manual', note: 'Staff learns each platform' },
      'Auditable recovery ledger': { value: false, note: 'Discretionary. No standardized log.' },
      'Monthly cost': { value: '$3,500-$5,500', note: 'Salary + benefits + training per hire' },
      'Primary Strength': { value: 'Highest empathy and in-clinic patient experience', note: '' },
      'Fatal Operational Flaw': { value: 'Off the clock exactly when high-intent web traffic peaks (8 PM–12 AM)', note: '' },
    },
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-[#7f8f78]" />;
  if (value === false) return <X className="h-4 w-4 text-[#9e8e7e]/40" />;
  if (value === 'Manual' || value === 'Variable' || value === 'Training-dependent' || value === 'Limited')
    return <Minus className="h-4 w-4 text-[#d8b17a]" />;
  return <span className="text-xs font-semibold text-espresso">{value}</span>;
}

export default function CompareContent() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:pb-16 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e8dfcf_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-4">Compare</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl md:text-[3.8rem]">
            Scrutexity vs. The Rest
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-8 text-mist">
            Most tools answer your patients. Only one infrastructure layer books them — with a deposit captured, a Boulevard appointment confirmed, and a clinical boundary that never blurs.
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">
        {/* Desktop comparison table */}
        <div className="hidden lg:block mx-auto max-w-7xl overflow-x-auto">
          <Reveal>
            <div className="rounded-[1.75rem] border border-sand-deep bg-cream overflow-hidden shadow-sm min-w-[900px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-sand-deep bg-[#f3eadf]/60">
                    <th className="p-5 text-xs font-semibold uppercase tracking-[0.15em] text-clay-deep w-1/5">Feature</th>
                    {COMPETITORS.map((c) => (
                      <th
                        key={c.name}
                        className={`p-5 text-xs font-semibold uppercase tracking-[0.15em] ${
                          c.highlight ? 'text-clay bg-cream' : 'text-mist'
                        }`}
                      >
                        <div>{c.name}</div>
                        <div className="text-[10px] font-normal normal-case tracking-normal mt-0.5 text-[#9e8e7e]">{c.tagline}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1d4c5]">
                  {FEATURES.map((feature) => (
                    <tr key={feature} className="hover:bg-[#f3eadf]/30 transition-colors">
                      <td className="p-5 text-sm font-medium text-espresso">{feature}</td>
                      {COMPETITORS.map((c) => {
                        const check = c.checks[feature];
                        const isHighlight = c.highlight;
                        return (
                          <td
                            key={`${c.name}-${feature}`}
                            className={`p-5 ${isHighlight ? 'bg-cream' : ''}`}
                          >
                            <div className="flex items-center gap-2">
                              <CellValue value={check.value} />
                              <span className={`text-[11px] ${isHighlight ? 'text-mist' : 'text-[#9e8e7e]'}`}>
                                {check.note}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* Mobile: Per-competitor cards */}
        <div className="lg:hidden space-y-8">
          {COMPETITORS.map((c) => (
            <Reveal key={c.name}>
              <div
                className={`rounded-[1.75rem] border-2 p-6 ${
                  c.highlight
                    ? 'border-clay/40 bg-cream shadow-[0_14px_40px_-14px_rgba(185,130,95,0.20)]'
                    : 'border-sand-deep bg-cream'
                }`}
              >
                <div className="mb-5">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display text-xl ${c.highlight ? 'text-clay' : 'text-espresso'}`}>
                      {c.name}
                    </h3>
                    {c.highlight && (
                      <span className="rounded-full bg-clay/10 border border-clay/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-clay">
                        Best
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#9e8e7e] mt-0.5">{c.tagline}</p>
                </div>
                <ul className="space-y-3">
                  {Object.entries(c.checks).map(([feature, check]) => (
                    <li key={feature} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-mist">{feature}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <CellValue value={check.value} />
                        <span className="text-[11px] text-[#9e8e7e]">{check.note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-2xl mt-20 text-center">
          <Reveal>
            <div className="rounded-[1.75rem] border-2 border-clay/20 bg-cream p-8 md:p-10">
              <h2 className="font-display text-2xl text-espresso mb-3">
                See the difference in 14 days.
              </h2>
              <p className="text-[14px] text-mist mb-6">
                $0 pilot. Read-only Boulevard access. If recovery isn&rsquo;t demonstrated, you pay nothing.
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
