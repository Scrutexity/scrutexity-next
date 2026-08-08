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

export function MakroPricing({ isLight = true }: { isLight?: boolean }) {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className={`transition-colors duration-500 px-5 py-24 sm:px-8 ${
      isLight ? 'bg-paper-light text-ink' : 'bg-ink text-ink'
    }`}>
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mx-auto max-w-[700px] text-center">
            <Kicker>Pricing</Kicker>
            <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${
              isLight ? 'text-ink' : 'text-ink'
            }`}>
              Your smart claim intelligence,{' '}
              <span className="inline-block rounded-full bg-accent px-5 py-1 text-ink shadow-sm">
                starting free
              </span>
            </h2>
            <p className={`mt-4 text-base ${
              isLight ? 'text-muted' : 'text-muted'
            }`}>
              Simple plans for agencies and teams. No contracts, no hidden fees. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>
        </Reveal>

        {/* Annual/Monthly pill switcher matching screenshot */}
        <Reveal delay={0.06}>
          <div className="mt-10 flex justify-center">
            <div className={`inline-flex items-center rounded-full p-1.5 shadow-xs ${
              isLight ? 'bg-hairline border border-black/5' : 'bg-white/10 border border-white/10'
            }`}>
              {(['annual', 'monthly'] as const).map((mode) => {
                const active = annual === (mode === 'annual');
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setAnnual(mode === 'annual')}
                    className={`rounded-full px-6 py-2 text-xs font-bold transition-all duration-300 ${
                      active
                        ? isLight
                          ? 'bg-white text-ink shadow-sm'
                          : 'bg-accent text-ink'
                        : isLight
                        ? 'text-muted hover:text-ink'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {mode === 'annual' ? 'Annual' : 'Monthly'}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <GlassCard
                hover={true}
                isLight={isLight}
                className={`relative flex h-full flex-col p-8 sm:p-9 ${
                  t.highlight
                    ? 'border-accent ring-2 ring-accent/30 shadow-xl'
                    : ''
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm">
                    Most Popular
                  </span>
                )}

                <h3 className={`text-2xl font-bold ${isLight ? 'text-ink' : 'text-ink'}`}>
                  {t.name}
                </h3>
                <p className={`mt-1.5 text-xs ${isLight ? 'text-muted' : 'text-muted'}`}>
                  {t.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-5xl font-extrabold tracking-tight ${isLight ? 'text-ink' : 'text-ink'}`}>
                    ${annual ? t.annual : t.monthly}
                  </span>
                  <span className={`text-xs font-medium ${isLight ? 'text-muted' : 'text-muted'}`}>
                    /mo
                  </span>
                </div>
                <span className={`mt-1 text-[11px] font-medium ${isLight ? 'text-muted' : 'text-muted'}`}>
                  per workspace
                </span>

                <div className="mt-8">
                  <CTAButton
                    href={t.cta.href}
                    variant={t.highlight ? 'lime' : 'ghost'}
                    className="w-full py-3.5 text-sm"
                  >
                    {t.cta.label}
                  </CTAButton>
                </div>

                <div className="mt-8 border-t border-black/5 pt-6 dark:border-white/10">
                  <ul className="space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-xs ${isLight ? 'text-ink' : 'text-ink'}`}>
                        <Check size={16} className="mt-0.5 shrink-0 text-accent-text" />
                        <span className={f.endsWith(':') ? `font-semibold ${isLight ? 'text-muted' : 'text-muted'}` : ''}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
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

export function MakroEnterprise({ isLight = true }: { isLight?: boolean }) {
  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <GlassCard isLight={isLight} className="relative overflow-hidden p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-[90px]"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-[520px]">
                <Kicker isLight={isLight}>Enterprise</Kicker>
                <h3 className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${
                  isLight ? 'text-ink' : 'text-ink'
                }`}>
                  Diligence-scale evidence programs.
                </h3>
                <p className={`mt-3 text-[14.5px] leading-relaxed ${
                  isLight ? 'text-ink-soft' : 'text-muted'
                }`}>
                  Portfolios, deal pipelines, and recurring regulatory exposure
                  — with dedicated support and custom delivery.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/enterprise" variant="lime" className="px-7 py-3">
                  Get custom pricing
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
