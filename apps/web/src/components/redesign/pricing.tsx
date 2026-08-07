'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { CTAButton, GlassCard, Kicker, Reveal } from './motion-kit';

/* ------------------------------ Pricing data ----------------------------- */
/* Live Scrutexity pricing (8/2026): Snapshot FREE / Review $99 / Watch $1,500-mo */

const TIERS = [
  {
    name: 'Snapshot',
    tagline: 'Free · see one exposure read',
    monthly: 0,
    annual: 0,
    cta: { label: 'Get your snapshot', href: '/snapshot' },
    features: [
      '3-point initial claim review',
      'Public claim scan',
      'Evidence gap summary',
      'Dated record you can share',
    ],
    highlight: false,
  },
  {
    name: 'Claim Support Review',
    tagline: 'One detailed finding, done right',
    monthly: 99,
    annual: 79,
    cta: { label: 'Start a review', href: '/sample-report' },
    features: [
      'Everything in Snapshot, plus:',
      'One Exhibit A finding in depth',
      'Claim-by-claim analysis',
      'Evidence gap + safer wording',
      'Source-linked references',
    ],
    highlight: true,
  },
  {
    name: 'Watch',
    tagline: 'Continuous claim surveillance',
    monthly: 1500,
    annual: 1200,
    cta: { label: 'Start Watch', href: '/watch' },
    features: [
      'Everything in Review, plus:',
      'Recurring drift monitoring',
      'Evidence change alerts',
      'AI narrative shift signals',
      'Priority counsel access',
    ],
    highlight: false,
  },
];

export function MakroPricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="border-t border-white/[0.07] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mx-auto max-w-[640px] text-center">
            <Kicker>Pricing</Kicker>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#ebedfa] sm:text-5xl">
              Evidence for costly decisions, priced plainly.
            </h2>
            <p className="mt-4 text-[15px] text-[#9391b8]">
              Start free. Upgrade when you need depth. Watch when exposure is
              continuous.
            </p>
          </div>
        </Reveal>

        {/* Annual/Monthly toggle */}
        <Reveal delay={0.06}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] p-1">
              {(['monthly', 'annual'] as const).map((mode) => {
                const active = annual === (mode === 'annual');
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setAnnual(mode === 'annual')}
                    className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all ${
                      active
                        ? 'bg-[#d9ff5c] text-[#14142d]'
                        : 'text-[#9391b8] hover:text-[#ebedfa]'
                    }`}
                  >
                    {mode === 'annual' ? 'Annual' : 'Monthly'}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <GlassCard
                hover={false}
                className={`relative flex h-full flex-col p-7 ${
                  t.highlight ? 'border-[#d9ff5c]/40 bg-[#d9ff5c]/[0.06]' : ''
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#d9ff5c] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#14142d]">
                    Most used
                  </span>
                )}

                <h3 className="text-[17px] font-semibold text-[#ebedfa]">{t.name}</h3>
                <p className="mt-1 text-[12.5px] text-[#9391b8]">{t.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-5xl font-bold tracking-tight text-[#ebedfa]">
                    ${annual ? t.annual : t.monthly}
                  </span>
                  <span className="text-[13px] text-[#9391b8]">
                    /mo{annual ? ' · billed annually' : ''}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#ebedfa]">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#d9ff5c]" />
                      <span className={f.endsWith(':') ? 'font-semibold text-[#9391b8]' : ''}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <CTAButton
                    href={t.cta.href}
                    variant={t.highlight ? 'lime' : 'ghost'}
                    className="w-full py-3"
                  >
                    {t.cta.label}
                    <ArrowRight size={15} />
                  </CTAButton>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Enterprise ------------------------------ */

export function MakroEnterprise() {
  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <GlassCard className="relative overflow-hidden p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d9ff5c]/10 blur-[90px]"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-[520px]">
                <Kicker>Enterprise</Kicker>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#ebedfa] sm:text-3xl">
                  Diligence-scale evidence programs.
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#9391b8]">
                  Portfolios, deal pipelines, and recurring regulatory exposure
                  — with dedicated support and custom delivery.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/enterprise" className="px-7 py-3">
                  Get custom pricing
                  <ArrowRight size={15} />
                </CTAButton>
                <CTAButton href="/contact" variant="ghost" className="px-7 py-3">
                  Contact sales
                </CTAButton>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
