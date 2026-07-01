import { Metadata } from 'next';
import Link from 'next/link';
import GovButton from '@/components/GovButton';

import { Check, ArrowRight, ShieldCheck, FileText, RefreshCw, Ban, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | Scrutexity',
  description: 'Transparent pricing for the 14-day pilot and permanent infrastructure. $0 if missed demand isn\'t demonstrated.',
};

const tiers = [
  {
    name: 'Recovery',
    price: '$2,000',
    priceDetail: 'per month · single location',
    description: 'The full recovery layer for a single-location clinic. Installs in 14 days. Yours to keep.',
    features: [
      'Boulevard or Mangomint integration',
      'Missed consult recovery layer',
      'Staff-voice follow-up sequences',
      'Clinical question routing to your team',
      'Monthly recovery report',
      'BAA-ready before activation',
    ],
    cta: 'Start Recovery',
    href: '/pilot',
    highlighted: false,
    badge: null,
    disclaimer: 'Upgrade to Growth when adding a second provider or location.',
  },
  {
    name: 'Growth',
    price: '$2,700',
    priceDetail: 'per month · multi-provider',
    description: 'For clinics with multiple providers or expanding to a second location. Full recovery plus active booking optimization.',
    features: [
      'Everything in Recovery',
      'Multi-provider routing rules',
      'Treatment-specific booking funnels',
      'Deposit workflow automation',
      'Weekly owner brief',
      'Priority support',
    ],
    cta: 'Start Growth',
    href: '/pilot',
    highlighted: true,
    badge: 'Most chosen',
    disclaimer: 'Covers the full handoff gap from inquiry to deposit.',
  },
  {
    name: 'Sovereign',
    price: '$3,900',
    priceDetail: 'per month · multi-location',
    description: 'For PE-backed groups and multi-location operators who need portfolio-wide recovery and cross-location visibility.',
    features: [
      'Everything in Growth',
      'Multi-location deployment',
      'Cross-location performance comparison',
      'Portfolio-wide leakage reporting',
      'Dedicated success manager',
      'Custom rollout planning',
    ],
    cta: 'Talk to us',
    href: '/pilot',
    highlighted: false,
    badge: null,
    disclaimer: 'Boulevard and Mangomint live today. Zenoti integration in progress — estimated Q3 2026. Pricing by portfolio scope.',
  },
];

const pilotFAQ = [
  {
    q: 'What does the scan cost?',
    a: 'Nothing. The demand scan is included in the 14-day pilot. We map your last 30 days of missed calls, unworked forms, and abandoned bookings before activating anything.',
  },
  {
    q: 'What does the pilot cost?',
    a: '$0 upfront. You grant read-only access to your booking system — no staff retraining, no integration work. The pilot is a performance trial: plans start at $2,000/mo, but you only pay after Day 14 if recovery is demonstrated. Both parties agree in writing on what "demonstrated" means before we begin.',
  },
  {
    q: 'When do I pay, and what\'s the guarantee?',
    a: 'After Day 14, if the pilot delivers. Not before — no setup fee, no deposit, no charge during the 14-day window. The condition: before we activate anything, we agree in writing on a minimum number of verified re-engaged bookings. If that threshold isn\'t reached in your first 30 days, your first month is free. A verified re-engaged booking means an inquiry with its source logged, a staff-approved conversation transcript on file, and a completed booking deposit.',
  },
  {
    q: 'What happens if nothing is found?',
    a: '$0 owed. Clean rollback. You keep the written scan report regardless — it documents exactly what we looked at and what we found.',
  },
  {
    q: 'What happens after 14 days?',
    a: 'You receive a written recovery report: every re-engaged consult, source, transcript, and booking status. If the pilot delivers, we propose the permanent infrastructure plan. You decide whether to continue. No pressure, no lock-in.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-ivory text-[#221f1b] font-sans">


      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:pb-16 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-4">Pricing</p>
          <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-[#201d19] sm:text-5xl md:text-6xl">
            Start with a pilot.<br />Pay only if it delivers.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#5f574f]">
            Plans start at $2,000/mo — but you pay nothing during the 14-day pilot. If the minimum number of verified re-engaged bookings we agree on in writing isn&rsquo;t reached in your first 30 days, your first month is free.
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">

        {/* Pilot FAQ — the 5 questions every owner has */}
        <section className="mx-auto max-w-3xl py-16">
          <p className="section-kicker mb-3">Before you commit</p>
          <h2 className="font-display text-3xl text-[#221f1b] mb-10 tracking-tight">Five questions owners ask before signing anything.</h2>
          <div className="space-y-4">
            {pilotFAQ.map((item) => (
              <div key={item.q} className="luxury-panel p-7">
                <p className="font-semibold text-[#221f1b] mb-2">{item.q}</p>
                <p className="text-[15px] leading-7 text-[#5f574f]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="mx-auto max-w-7xl pb-16">
          <div className="text-center mb-12">
            <p className="section-kicker mb-3">Monthly plans</p>
            <h2 className="font-display text-3xl text-[#221f1b] tracking-tight md:text-4xl">After the pilot delivers.</h2>
            <p className="mt-3 text-[#6b6259]">Plans begin only after the 14-day pilot demonstrates recovery. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-[1.75rem] p-8 flex flex-col ${
                  tier.highlighted
                    ? 'bg-[#fffaf2] border-2 border-terracotta shadow-[0_14px_40px_-14px_rgba(185,130,95,0.30)]'
                    : 'bg-[#fffaf2] border border-[#e1d4c5] shadow-sm'
                }`}
              >
                {tier.badge && (
                  <span className="mb-4 self-start rounded-full bg-terracotta/10 border border-terracotta/25 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#9b6a51]">
                    {tier.badge}
                  </span>
                )}
                <h2 className="font-display text-2xl text-[#221f1b] mb-1">{tier.name}</h2>
                <div className="mt-3 mb-2">
                  <span className="text-4xl font-bold text-[#221f1b]">{tier.price}</span>
                  <span className="text-sm text-[#6b6259]"> {tier.priceDetail}</span>
                </div>
                <p className="text-sm text-[#6b6259] mb-6 leading-6">{tier.description}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#5f574f]">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-terracotta" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#9e8e7e] mb-5">{tier.disclaimer}</p>
                {tier.highlighted ? (
                  <GovButton label={tier.cta} href={tier.href} className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 btn-md" />
                ) : (
                  <Link
                    href={tier.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 border border-[#d8c4ad] text-[#5f574f] hover:bg-[#f3eadf]"
                  >
                    {tier.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ROI anchor */}
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[1.75rem] border border-[#e1d4c5] bg-[#f3eadf] p-8 text-center">
            <p className="section-kicker mb-3">The math</p>
            <p className="font-display text-2xl md:text-3xl text-[#221f1b] mb-4">
              Recovery pays for itself with{' '}
              <span className="text-terracotta">one Morpheus8 package a month.</span>
            </p>
            <p className="text-[#6b6259] text-sm leading-7 max-w-lg mx-auto">
              At a <strong className="text-[#221f1b]">$1,500 average treatment value</strong>, Recovery at{' '}
              <strong className="text-[#221f1b]">$2,000/mo</strong> breaks even at roughly{' '}
              <strong className="text-[#221f1b]">1.3 recovered consults per month</strong> — a single missed Morpheus8 inquiry re-engaged and booked.
              That&rsquo;s not a forecast. That&rsquo;s the floor.
            </p>
            <p className="mt-4 text-xs text-[#9e8e7e]">
              Based on $1,500 avg. treatment value. Actual results depend on clinic volume and require manual verification.
            </p>
          </div>
        </div>

        {/* Founding clinic rate */}
        <div className="mx-auto max-w-3xl mt-16">
          <div className="rounded-[1.75rem] border-2 border-[#6b1d2f]/20 bg-[#fffaf2] p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <div>
                <span className="inline-block rounded-full bg-[#6b1d2f]/8 border border-[#6b1d2f]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#6b1d2f] mb-3">
                  Founding clinic offer
                </span>
                <h3 className="font-display text-2xl text-[#221f1b]">Three founding spots</h3>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-3xl font-bold text-[#221f1b]">$1,200</span>
                <span className="text-sm text-[#6b6259]">/mo</span>
                <p className="text-xs text-[#9e8e7e] mt-0.5">locked 12 months</p>
              </div>
            </div>
            <p className="text-[#5f574f] leading-7 mb-5">
              We&rsquo;re accepting three founding clinics at $1,200/mo — locked for 12 months — in exchange for one thing: a{' '}
              <strong className="text-[#221f1b]">verified before-and-after number we can publish</strong>, with your name on it.
              We need real, attributable results. You get the recovery layer at a rate that closes before we have them.
            </p>
            <p className="text-sm text-[#6b6259] mb-7">
              Same 14-day pilot. Same $0 if nothing is demonstrated. Same clean rollback if it doesn&rsquo;t deliver.
              When the three founding spots fill, this rate closes — the standard Recovery tier begins at $2,000.
            </p>
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 rounded-full bg-[#6b1d2f] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(107,29,47,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5a1727]"
            >
              Apply for a founding spot <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-4 text-xs text-[#9e8e7e]">
              Founding rate requires willingness to provide a named, verifiable result for publication. Standard pilot terms apply.
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mx-auto max-w-3xl mt-16 border-t border-[#e1d4c5] pt-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {[
              { icon: ShieldCheck, label: 'HIPAA-aligned' },
              { icon: FileText, label: 'BAA available' },
              { icon: RefreshCw, label: 'Read-only integration' },
              { icon: Ban, label: 'Data never sold' },
              { icon: Zap, label: 'Cancel anytime' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-[#5f574f]">
                <Icon className="h-4 w-4 shrink-0 text-terracotta" strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </div>
          <p className="mt-7 text-center text-xs text-[#9e8e7e]">
            All plans begin with a 14-day pilot. $0 if missed demand isn&rsquo;t demonstrated. No obligation.
          </p>
        </div>

      </main>

    </div>
  );
}
