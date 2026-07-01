'use client';

import { motion } from 'framer-motion';
import Reveal, { staggerContainer } from '@/components/ui-custom/reveal';
import AnimatedNumber from '@/components/ui-custom/animated-number';
import Section from '@/components/ui-custom/section';

interface LeakPoint {
  numeral: string;
  title: string;
  description: string;
  stat: { value: number; suffix: string; prefix?: string };
  revenueEquivalent: string;
}

const leakPoints: LeakPoint[] = [
  {
    numeral: '01',
    title: 'Missed calls after hours',
    description: 'Every unanswered call is a booking that never had a chance. Most clinics have no system to catch or re-engage these inquiries.',
    stat: { value: 41, suffix: '%' },
    revenueEquivalent: '≈ $4,800/mo',
  },
  {
    numeral: '02',
    title: 'Unanswered DMs and web forms',
    description: 'Inquiries arrive through Instagram, your website, and review platforms — but without a unified inbox, they pile up and go cold.',
    stat: { value: 78, suffix: '%' },
    revenueEquivalent: '≈ $9,100/mo',
  },
  {
    numeral: '03',
    title: 'The lead cooling window',
    description: 'A lead is 100x more likely to book within the first 6 minutes. Every minute after dramatically reduces conversion.',
    stat: { value: 6, suffix: 'min', prefix: '<' },
    revenueEquivalent: '≈ $2,300/mo',
  },
];

/* ── Spring-reveal card with dramatic entrance ── */
function SpringCard({
  item,
  index,
}: {
  item: LeakPoint;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', damping: 22, stiffness: 180, delay: index * 0.12 }}
      className="group relative overflow-hidden rounded-2xl border border-sand bg-cream p-8 transition-all duration-300 hover:border-clay/30 hover:shadow-card"
    >
      {/* Oversized background numeral */}
      <span className="pointer-events-none absolute -right-4 -top-4 select-none font-display text-[7rem] font-normal leading-none text-sand/50">
        {item.numeral}
      </span>

      <div className="relative">
        <h3 className="font-display text-xl leading-snug text-espresso" style={{ letterSpacing: '-0.02em' }}>
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-mist">
          {item.description}
        </p>

        {/* Animated stat */}
        <div className="mt-5 flex items-baseline gap-1 font-mono text-2xl font-bold text-clay">
          <AnimatedNumber
            target={item.stat.value}
            suffix={item.stat.suffix}
            prefix={item.stat.prefix ?? ''}
            duration={1.8 + index * 0.3}
          />
        </div>

        {/* Gold revenue equivalent — staggered in AFTER the percentage finishes animating */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: (1.8 + index * 0.3) + 0.15 + index * 0.12, // after AnimatedNumber finishes
          }}
          className="mt-3 font-mono text-sm font-medium text-[#C5A059]"
        >
          {item.revenueEquivalent}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <Section className="bg-beige" id="problem">
      <Reveal>
        <p className="sage-pill text-[10px] uppercase tracking-[0.2em] mx-auto w-fit">
          Where revenue leaks
        </p>
        <h2 className="mt-5 text-center font-display text-3xl leading-tight text-espresso md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
          Three places your pipeline goes dark.
        </h2>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {leakPoints.map((item, i) => (
          <SpringCard key={item.numeral} item={item} index={i} />
        ))}
      </motion.div>
    </Section>
  );
}
