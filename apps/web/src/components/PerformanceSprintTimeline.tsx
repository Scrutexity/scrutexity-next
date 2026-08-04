'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

const Icons = {
  BarChart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Shield: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Zap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  FileText: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  Clock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

const timelineSteps = [
  {
    id: 'day-1',
    range: 'Day 1',
    title: 'Baseline Demand Audit',
    description:
      'We run a quiet, historical scan mapping your last 30 days of unworked forms, missed calls, and after-hours delays. You see exactly where pipeline leaked before changing anything.',
    badge: 'Read-only access',
    icon: Icons.BarChart,
    color: '#B87D6B',
  },
  {
    id: 'days-2-4',
    range: 'Days 2–4',
    title: 'Seamless Integration',
    description:
      'BAA is executed. We establish a secure, read-only bridge to your Boulevard calendar and message endpoints. No migration, no hardware to install, and zero staff training required.',
    badge: 'Zero workflow disruption',
    icon: Icons.Shield,
    color: '#2F5D4A',
  },
  {
    id: 'days-5-10',
    range: 'Days 5–10',
    title: 'Trailing Capture',
    description:
      "The recovery engine monitors incoming gaps in real-time. Missed inquiries are re-engaged in your clinic's precise voice within minutes, booking deposits directly into your system.",
    badge: 'Live recovery logs',
    icon: Icons.Zap,
    color: '#B87D6B',
  },
  {
    id: 'day-14',
    range: 'Day 14',
    title: 'Day-14 Owner Brief',
    description:
      'We present a comprehensive log of every recovery, conversation transcript, and deposit status. You verify the results against your booking and payment records before making any decision.',
    badge: 'Exportable activity record',
    icon: Icons.FileText,
    color: '#2F5D4A',
  },
] as const;

type TimelineStepData = (typeof timelineSteps)[number];

export default function PerformanceSprintTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden content-auto bg-[var(--color-ink)] py-32 md:py-40"
    >
      {/* Background ambient dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F8F6F3 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mb-24 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-[var(--color-clay)]">
            Operational Timeline
          </span>
          <h2 className="mt-2 font-display text-4xl font-normal leading-[1.05] tracking-tight text-[var(--color-bone)] md:text-5xl lg:text-6xl">
            The 14-Day
            <br />
            Performance Sprint
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--color-porcelain)]">
            A structured, risk-free window designed to demonstrate recovery
            value with zero upfront commitment.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central progress rail — background */}
          <div
            className="absolute left-8 top-0 h-full w-[2px] md:left-1/2 md:-translate-x-px"
            style={{ backgroundColor: 'rgba(232, 224, 216, 0.05)' }}
          />
          {/* Central progress rail — animated clay fill */}
          <motion.div
            className="absolute left-8 top-0 w-[2px] origin-top md:left-1/2 md:-translate-x-px"
            style={{
              height: lineHeight,
              backgroundColor: 'var(--color-clay)',
              boxShadow: '0 0 20px rgba(184, 125, 107, 0.50)',
            }}
          />

          {/* Steps */}
          <div className="relative space-y-16 md:space-y-24">
            {timelineSteps.map((step, index) => (
              <TimelineStep key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }: { step: TimelineStepData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 md:gap-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content card */}
      <motion.div
        className={`flex-1 md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: cinematicEase, delay: 0.1 }}
      >
        <div
          className="group relative overflow-hidden rounded-3xl border p-8 transition-colors duration-500 md:p-10"
          style={{
            backgroundColor: 'rgba(245, 240, 232, 0.02)',
            borderColor: 'rgba(245, 240, 232, 0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow:
              'inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 30px rgba(0,0,0,0.20)',
          }}
        >
          {/* Hover shimmer */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          {/* Step header */}
          <div className="relative z-10 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${step.color}15`,
                  border: `1px solid ${step.color}30`,
                }}
              >
                <step.icon style={{ width: 18, height: 18, color: step.color }} />
              </div>
              <span
                className="font-mono text-xs font-bold uppercase tracking-widest"
                style={{ color: step.color }}
              >
                {step.range}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="relative z-10 mb-4 font-display text-2xl font-normal leading-[1.1] tracking-tight text-[var(--color-bone)] md:text-3xl">
            {step.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 mb-8 text-sm leading-relaxed text-[var(--color-porcelain)]/80 sm:text-base">
            {step.description}
          </p>

          {/* Badge */}
          <div
            className="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-300 group-hover:bg-[rgba(232,224,216,0.08)]"
            style={{
              backgroundColor: 'rgba(232, 224, 216, 0.04)',
              border: '1px solid rgba(232, 224, 216, 0.10)',
            }}
          >
            <Icons.Clock style={{ width: 14, height: 14, color: '#E8E0D8' }} />
            <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--color-porcelain)]">
              {step.badge}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Center node */}
      <div className="absolute left-8 top-0 z-10 flex h-full flex-col items-center md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className="relative mt-8 flex h-4 w-4 items-center justify-center md:mt-12"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: cinematicEase, delay: 0.2 }}
        >
          {/* Outer ring */}
          <div
            className="absolute h-4 w-4 rounded-full"
            style={{
              backgroundColor: `${step.color}30`,
              border: `2px solid ${step.color}`,
            }}
          />
          {/* Inner dot */}
          <div
            className="relative z-10 h-2 w-2 rounded-full"
            style={{ backgroundColor: step.color }}
          />
          {/* Glow */}
          <div
            className="pointer-events-none absolute h-10 w-10 rounded-full opacity-40 blur-md"
            style={{ backgroundColor: step.color }}
          />
        </motion.div>
      </div>

      {/* Empty spacer for alternating layout */}
      <div className="hidden flex-1 md:block md:w-1/2" />
    </div>
  );
}
