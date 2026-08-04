'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Anchor, Container, Eyebrow, SectionHeading, Lead } from '@/components/ui-custom/section';
import { HandUnderline } from '@/components/scrutexity/hand-accents';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const TIERS = [
  {
    name: 'Pilot',
    price: '$0',
    period: '14 days',
    description: 'Risk-free proof on your real ledger.',
    features: [
      'Read-only PMS connection',
      '30-day missed-demand audit',
      'Governed recovery protocol',
      'Staff-approved outreach',
      'Verified deposit report',
      'No card required',
    ],
    cta: 'Start your pilot',
    href: '#pilot',
    featured: false,
  },
  {
    name: 'Practice',
    price: '% of recovery',
    period: 'monthly',
    description: 'For single-location med-spas. Pay only on verified deposits.',
    features: [
      'Everything in Pilot, ongoing',
      'Boulevard + Mangomint live',
      'Full evidence chain + audit trail',
      'Staff approval workflow',
      'Monthly verified-deposit report',
      'Cancel anytime, keep your data',
    ],
    cta: 'Start your pilot',
    href: '#pilot',
    featured: true,
    badge: 'Most common',
  },
  {
    name: 'Group',
    price: 'Custom',
    period: 'for PE-backed multi-location',
    description: 'For operators who need diligence-grade evidence across locations.',
    features: [
      'Everything in Practice, scaled',
      'Multi-location portfolio view',
      'PE-diligence export formats',
      'SHA-256 audit trail',
      'Dedicated implementation',
      'Custom BAA + MSA review',
    ],
    cta: 'Talk to us',
    href: '#pilot',
    featured: false,
  },
];

export default function PricingSection() {
  const reduced = useReducedMotion();
  const animate = !reduced;

  return (
    <Anchor id="pricing" tone="ivory" py="loose">
      <Container>
        <div className="max-w-3xl mb-14">
          <Eyebrow tone="gold">
            <span className="h-1 w-1 rounded-full bg-gold" />
            08 · Pricing
          </Eyebrow>
          <SectionHeading className="mt-5">
            Pay only on{' '}
            <span className="relative inline-block">
              <span className="font-serif italic text-sage-deep">verified deposits.</span>
              <HandUnderline className="absolute left-0 right-0 -bottom-2 w-full h-3" delay={0.4} />
            </span>
          </SectionHeading>
          <Lead className="mt-6">
            No vanity metrics. No lead counts. No &ldquo;engaged conversations.&rdquo;
            You pay a percentage of deposits actually recovered and recorded in your PMS.
            If we do not recover, you do not pay.
          </Lead>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={animate ? { opacity: 0, y: 20 } : false}
              whileInView={animate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className={cn(
                'relative rounded-2xl p-7 lg:p-8 flex flex-col',
                tier.featured
                  ? 'bg-ink text-cream border-2 border-gold/40 shadow-[0_30px_70px_-22px_rgba(28,24,20,0.3)]'
                  : 'bg-cream border border-sand-deep/50'
              )}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-7 gold-pill">
                  {tier.badge}
                </span>
              )}

              <div className="mb-5">
                <h3 className={cn('font-display text-2xl', tier.featured ? 'text-cream' : 'text-ink')}>
                  {tier.name}
                </h3>
                <p className={cn('mt-1 font-sans text-sm', tier.featured ? 'text-cream/60' : 'text-mist')}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={cn('font-display text-4xl lg:text-5xl', tier.featured ? 'text-gold' : 'text-ink')}>
                    {tier.price}
                  </span>
                  <span className={cn('font-mono text-[10px] uppercase tracking-[0.14em]', tier.featured ? 'text-cream/50' : 'text-mist/70')}>
                    {tier.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={cn('h-4 w-4 mt-0.5 shrink-0', tier.featured ? 'text-gold' : 'text-sage-deep')}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className={cn('font-sans text-sm leading-relaxed', tier.featured ? 'text-cream/80' : 'text-mist')}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-sans text-sm font-semibold transition-all',
                  tier.featured
                    ? 'bg-gold text-ink hover:bg-gold-deep hover:text-cream'
                    : 'sage-cta'
                )}
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={animate ? { opacity: 0 } : false}
          whileInView={animate ? { opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-mist/70"
        >
          All tiers · BAA before activation · Read-only · No card to start · Cancel anytime
        </motion.p>
      </Container>
    </Anchor>
  );
}
