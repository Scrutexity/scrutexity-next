'use client';

import { motion } from 'framer-motion';
import Reveal, { staggerContainer, staggerItem } from '@/components/ui-custom/reveal';
import AnimatedNumber from '@/components/ui-custom/animated-number';
import Section from '@/components/ui-custom/section';

const stats = [
  { value: 4200, prefix: '$', suffix: '/mo', label: 'Avg. recovered revenue per clinic' },
  { value: 14, suffix: ' days', label: 'Time to first verified recovery' },
  { value: 3, suffix: '×', label: 'ROI on first month with deposit data' },
  { value: 100, suffix: '%', label: 'Deposit-verified recoveries (not leads)' },
];

const testimonials: never[] = [];

export default function Proof() {
  return (
    <Section className="bg-cream" id="proof">
      <Reveal>
        <p className="sage-pill text-[10px] uppercase tracking-[0.2em] mx-auto w-fit">
          Proven results
        </p>
        <h2 className="mt-5 text-center font-display text-3xl leading-tight text-espresso md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
          What clinics are recovering.
        </h2>
      </Reveal>

      {/* 4 animated stats */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className="rounded-2xl border border-sand bg-cream p-6 text-center shadow-card"
          >
            <p className="font-display text-3xl text-espresso md:text-4xl">
              <AnimatedNumber
                target={stat.value}
                prefix={stat.prefix ?? ''}
                suffix={stat.suffix}
                duration={2}
              />
            </p>
            <p className="mt-2 text-xs font-medium text-mist">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

    </Section>
  );
}
