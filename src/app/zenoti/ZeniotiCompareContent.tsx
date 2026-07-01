'use client';

import { ArrowRight, Check, X, Shield, AlertCircle, Lock, Zap } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

type ComparisonValue = boolean | string;
interface ComparisonItem { value: ComparisonValue; note: string }

interface Product {
  name: string;
  tagline: string;
  highlight: boolean;
  architecture: string;
  checks: Record<string, ComparisonItem>;
}

const COMPARISON_FEATURES = [
  'Clinical question handling',
  'Data processing model',
  'PHI exposure risk',
  'Staff approval required',
  'Auditable ledger per recovery',
  'Boulevard integration depth',
  'Stripe deposit capture',
  'Read-only access to PMS',
  'CPOM-safe by design',
  'BAA execution required',
  'Off-peak availability',
  'Cost structure',
  'Liability model',
] as const;

const PRODUCTS: Product[] = [
  {
    name: 'Scrutexity',
    tagline: 'Governed Recovery Infrastructure',
    highlight: true,
    architecture: 'Read-Only, Staff-Gated',
    checks: {
      'Clinical question handling': {
        value: true,
        note: 'Hard-stop. Escalates to staff NP immediately.'
      },
      'Data processing model': {
        value: 'Deterministic',
        note: 'Zero AI medical responses. Rule-based routing only.'
      },
      'PHI exposure risk': {
        value: 'Minimal',
        note: 'PHI stripped before LLM processing. Governance audit log.'
      },
      'Staff approval required': {
        value: true,
        note: 'Every booking requires staff verification before deposit capture.'
      },
      'Auditable ledger per recovery': {
        value: true,
        note: 'Source + transcript + staff decision + deposit per entry.'
      },
      'Boulevard integration depth': {
        value: 'Deep read-only',
        note: 'Checks live availability, room matrix, provider schedule.'
      },
      'Stripe deposit capture': {
        value: true,
        note: 'PCI-compliant. Deposit confirmed before PMS injection.'
      },
      'Read-only access to PMS': {
        value: true,
        note: 'Cannot modify patient data. Booking audit trail only.'
      },
      'CPOM-safe by design': {
        value: true,
        note: 'No clinical judgment calls in AI layer. Staff decides.'
      },
      'BAA execution required': {
        value: true,
        note: 'Required before data activation. Updated annually.'
      },
      'Off-peak availability': {
        value: '24/7',
        note: '42-second median response time, 11 PM—6 AM peak.'
      },
      'Cost structure': {
        value: '$2,000/mo',
        note: 'Per location post-pilot. $0 until recovery demonstrated.'
      },
      'Liability model': {
        value: 'Read-only + staff gating',
        note: 'You approve every booking. Your name on the agreement.'
      },
    },
  },
  {
    name: 'Zenoti AI',
    tagline: 'Autonomous AI Receptionist',
    highlight: false,
    architecture: 'AI-Led Automation',
    checks: {
      'Clinical question handling': {
        value: 'AI response',
        note: 'Zenoti AI may attempt to answer medical questions.'
      },
      'Data processing model': {
        value: 'Generative LLM',
        note: 'Full conversation context sent to AI model.'
      },
      'PHI exposure risk': {
        value: 'Higher',
        note: 'Full patient conversation may be processed by external AI.'
      },
      'Staff approval required': {
        value: false,
        note: 'Zenoti AI books automatically once intent detected.'
      },
      'Auditable ledger per recovery': {
        value: 'Limited',
        note: 'Booking logged, but no source-to-deposit attribution.'
      },
      'Boulevard integration depth': {
        value: 'Native integration',
        note: 'Can check availability and auto-book into Zenoti system.'
      },
      'Stripe deposit capture': {
        value: 'Via Zenoti',
        note: 'Processed through Zenoti payment system, not standalone.'
      },
      'Read-only access to PMS': {
        value: false,
        note: 'Zenoti is the PMS—it writes directly to calendar.'
      },
      'CPOM-safe by design': {
        value: 'Depends on Zenoti config',
        note: 'AI responses depend on prompt engineering by your staff.'
      },
      'BAA execution required': {
        value: 'With Zenoti only',
        note: 'No separate BAA for Zenoti AI layer. One agreement.'
      },
      'Off-peak availability': {
        value: '24/7',
        note: 'Autonomous response. No human gating.'
      },
      'Cost structure': {
        value: '$450–$1,200/mo',
        note: 'Zenoti platform pricing. AI is add-on feature.'
      },
      'Liability model': {
        value: 'Zenoti shared liability',
        note: 'Zenoti AI has documented terms of service.'
      },
    },
  },
];

function CellValue({ value }: { value: ComparisonValue }) {
  if (value === true) return <Check className="h-4 w-4 text-sage" />;
  if (value === false) return <X className="h-4 w-4 text-mist/40" />;
  return <span className="text-xs font-semibold text-espresso">{value}</span>;
}

export default function ZeniotiCompareContent() {
  const publishDate = '2026-06-15';
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:pb-16 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e8dfcf_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-4">Comparison</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl md:text-[3.8rem]">
            Zenoti vs Scrutexity
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-8 text-mist">
            Zenoti's AI follows up until booked. Scrutexity stops when it should—routes clinical questions to your NP, requires staff approval, and leaves you in control.
          </p>
          <p className="mx-auto mt-4 text-xs text-mist uppercase tracking-[0.1em]">
            Published {formattedDate}
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">
        {/* Architecture explainer */}
        <section className="mx-auto max-w-4xl mb-16">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Zenoti */}
              <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-8">
                <div className="flex items-start gap-3 mb-4">
                  <Zap className="h-5 w-5 text-mist flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl text-espresso mb-1">Zenoti AI</h3>
                    <p className="text-xs text-mist">Automation-first</p>
                  </div>
                </div>
                <p className="text-sm text-mist leading-6">
                  Zenoti AI responds autonomously. It attempts to answer patient questions directly, books appointments without staff review, and processes full conversation context through its AI model.
                </p>
              </div>

              {/* Scrutexity */}
              <div className="rounded-[1.75rem] border-2 border-clay/40 bg-cream p-8 shadow-[0_14px_40px_-14px_rgba(185,130,95,0.20)]">
                <div className="flex items-start gap-3 mb-4">
                  <Lock className="h-5 w-5 text-clay flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl text-clay mb-1">Scrutexity</h3>
                    <p className="text-xs text-mist">Governance-first</p>
                  </div>
                </div>
                <p className="text-sm text-mist leading-6">
                  Scrutexity routes clinical questions to staff immediately. It books only after staff approval. PHI is stripped before processing. Your staff stays in the loop.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Detailed comparison table */}
        <div className="hidden lg:block mx-auto max-w-6xl overflow-x-auto mb-16">
          <Reveal>
            <div className="rounded-[1.75rem] border border-sand-deep bg-cream overflow-hidden shadow-sm min-w-[900px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-sand-deep bg-cream-deep/60">
                    <th className="p-5 text-xs font-semibold uppercase tracking-[0.15em] text-clay-deep w-2/5">
                      Governance Question
                    </th>
                    {PRODUCTS.map((p) => (
                      <th
                        key={p.name}
                        className={`p-5 text-xs font-semibold uppercase tracking-[0.15em] ${
                          p.highlight ? 'text-clay bg-cream' : 'text-mist'
                        }`}
                      >
                        <div>{p.name}</div>
                        <div className="text-[10px] font-normal normal-case tracking-normal mt-0.5 text-mist">
                          {p.architecture}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1d4c5]">
                  {COMPARISON_FEATURES.map((feature) => (
                    <tr key={feature} className="hover:bg-cream-deep/30 transition-colors">
                      <td className="p-5 text-sm font-medium text-espresso">{feature}</td>
                      {PRODUCTS.map((p) => {
                        const item = p.checks[feature];
                        const isHighlight = p.highlight;
                        return (
                          <td
                            key={`${p.name}-${feature}`}
                            className={`p-5 ${isHighlight ? 'bg-cream' : ''}`}
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-shrink-0 mt-0.5">
                                <CellValue value={item.value} />
                              </div>
                              <span className={`text-[11px] leading-5 ${isHighlight ? 'text-mist' : 'text-mist'}`}>
                                {item.note}
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

        {/* Mobile cards */}
        <div className="lg:hidden space-y-8 mb-16">
          {PRODUCTS.map((p) => (
            <Reveal key={p.name}>
              <div
                className={`rounded-[1.75rem] border-2 p-6 ${
                  p.highlight
                    ? 'border-clay/40 bg-cream shadow-[0_14px_40px_-14px_rgba(185,130,95,0.20)]'
                    : 'border-sand-deep bg-cream'
                }`}
              >
                <div className="mb-5">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display text-xl ${p.highlight ? 'text-clay' : 'text-espresso'}`}>
                      {p.name}
                    </h3>
                    {p.highlight && (
                      <span className="rounded-full bg-clay/10 border border-clay/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-clay">
                        Governance-First
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-mist mt-0.5">{p.architecture}</p>
                </div>
                <ul className="space-y-3">
                  {Object.entries(p.checks).map(([feature, check]) => (
                    <li key={feature} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-mist font-medium">{feature}</span>
                      <div className="flex items-start gap-1.5 shrink-0">
                        <CellValue value={check.value} />
                        <span className="text-[11px] text-mist text-right leading-5 max-w-[120px]">
                          {check.note}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Key insight section */}
        <section className="mx-auto max-w-3xl mb-16">
          <Reveal>
            <div className="rounded-[1.75rem] border-2 border-clay/20 bg-cream p-8 md:p-10">
              <div className="flex gap-4 mb-4">
                <Shield className="h-5 w-5 text-clay flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-2xl text-espresso mb-3">
                    The Governance Question
                  </h2>
                  <p className="text-sm text-mist leading-7 mb-4">
                    If a patient sends a DM at 11 PM asking about pain post-procedure, do you want an AI to respond? Or do you want that routed to your NP with a transcript, so your staff approves every response?
                  </p>
                  <p className="text-sm text-mist leading-7">
                    Zenoti automates. Scrutexity governs. Both have trade-offs. The difference is who decides.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="rounded-[1.75rem] border-2 border-clay/20 bg-cream p-8 md:p-10">
              <h2 className="font-display text-2xl text-espresso mb-3">
                See governance in action.
              </h2>
              <p className="text-[14px] text-mist mb-6">
                14-day pilot. $0 cost. Read-only Boulevard access. You control every decision.
              </p>
              <Link
                href="/pilot"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-deep"
              >
                Request Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
