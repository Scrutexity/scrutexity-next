'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Pillar, Container, Eyebrow, SectionHeading, Lead } from '@/components/ui-custom/section';
import { HandUnderline } from '@/components/scrutexity/hand-accents';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const LEAKS = [
  {
    num: '01',
    title: 'Missed calls after hours',
    body: 'Every unanswered call is a booking that never had a chance. Most clinics have no system to catch or re-engage these inquiries — they simply vanish into voicemail.',
    amount: '$4,800/mo',
    accent: 'sage' as const,
  },
  {
    num: '02',
    title: 'Unanswered DMs and web forms',
    body: 'Inquiries arrive through Instagram, your website, and review platforms — but without a unified inbox, they pile up and go cold within hours.',
    amount: '$9,100/mo',
    accent: 'gold' as const,
  },
  {
    num: '03',
    title: 'The lead cooling window',
    body: 'A lead is 100× more likely to book within the first 6 minutes. Every minute after that dramatically reduces conversion. Speed is the entire game.',
    amount: '$2,300/mo',
    accent: 'sage' as const,
  },
];

export default function RevenueLeak() {
  const reduced = useReducedMotion();

  return (
    <Pillar id="leaks" tone="cream" py="normal">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="gold">
            <span className="h-1 w-1 rounded-full bg-gold" />
            03 · Where revenue leaks
          </Eyebrow>
          <SectionHeading className="mt-5">
            Three places your pipeline goes dark.
          </SectionHeading>
          <Lead className="mt-6">
            Every missed inquiry is a deposit your competitor collects. Most clinics lose six figures
            a year across these three leakage points — quietly, invisibly, every single month.
          </Lead>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {LEAKS.map((leak, i) => (
            <motion.div
              key={leak.num}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
              className="relative p-7 lg:p-8 rounded-2xl bg-cream-deep border border-sand-deep/50"
            >
              {/* Number */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                    leak.accent === 'gold' ? 'text-gold-deep' : 'text-sage-deep'
                  }`}
                >
                  {leak.num}
                </span>
                {/* Pulsing pressure point — visual metaphor for "leakage" */}
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${
                      leak.accent === 'gold' ? 'bg-gold' : 'bg-sage'
                    } ${reduced ? '' : 'animate-ping'}`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      leak.accent === 'gold' ? 'bg-gold' : 'bg-sage'
                    }`}
                  />
                </span>
              </div>

              <h3 className="font-display text-2xl lg:text-[1.7rem] leading-[1.15] text-ink">
                {leak.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-[1.6] text-mist">{leak.body}</p>

              {/* Loss amount — gold for emphasis */}
              <div className="mt-7 pt-5 border-t border-sand-deep/40 flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist/70">
                  Est. monthly loss
                </span>
                <span className="font-display text-xl text-gold-deep tabular-nums">
                  {leak.amount}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inline CTA — Bridge-like transition */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-between flex-wrap gap-4"
        >
          <p className="font-sans text-sm text-mist max-w-md">
            Scrutexity catches what your front desk misses — and turns it into verified deposits.
          </p>
          <a
            href="#pilot"
            className="sage-cta inline-flex items-center justify-center rounded-lg px-6 py-3 font-sans text-sm font-semibold"
          >
            Start 14-day pilot <span className="ml-2" aria-hidden>→</span>
          </a>
        </motion.div>
      </Container>
    </Pillar>
  );
}
