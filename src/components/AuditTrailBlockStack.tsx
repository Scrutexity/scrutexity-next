'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Link2, Lock } from 'lucide-react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

const ledgerData = {
  sources: [
    { id: 'nyc', label: 'NYC — Midtown', metric: '47 leads' },
    { id: 'la', label: 'LA — Beverly Hills', metric: '32 leads' },
    { id: 'chi', label: 'CHI — Gold Coast', metric: '28 leads' },
  ],
  outcomes: [
    { id: 'dep', label: 'Deposits Collected', metric: '$12,400', highlight: false },
    { id: 'con', label: 'Consults Booked', metric: '19', highlight: false },
    { id: 'rev', label: 'Revenue Recovered', metric: '$28,400', highlight: true },
  ],
  seals: [
    { id: 'hash1', label: 'Hash Verified', metric: 'a3f8...2b1e' },
    { id: 'stamp', label: 'Verification Stamp', metric: 'SCX-0047' },
    { id: 'hash2', label: 'Audit Trail Locked', metric: '14d window' },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.12 },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

function FlowDivider({ tone, delay = 0 }: { tone: 'clay' | 'pine'; delay?: number }) {
  return (
    <motion.div variants={columnVariants} className="hidden w-16 flex-col items-center justify-center lg:flex">
      <div className="relative h-px w-full bg-creamone/10">
        <motion.div
          className={`absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${
            tone === 'clay' ? 'bg-clay shadow-[0_0_14px_rgba(184,125,107,0.65)]' : 'bg-pine shadow-[0_0_14px_rgba(47,93,74,0.65)]'
          }`}
          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay, ease: cinematicEase }}
        />
      </div>
    </motion.div>
  );
}

export default function AuditTrailBlockStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px' });
  const [activePath, setActivePath] = useState<string | null>(null);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#1C1814] px-5 py-28 text-[#F5F0E8] sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B87D6B] opacity-[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_78%,rgba(47,93,74,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 luxury-noise opacity-[0.04]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#F5F0E8]/10 bg-[rgba(245,240,232,0.04)] px-4 py-1.5"
          >
            <Lock className="h-4 w-4 text-[#B87D6B]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8E0D8]">
              Tamper-Evident Chain
            </span>
          </motion.div>

          <h2 className="font-display text-4xl leading-[1.05] text-[#F5F0E8] sm:text-5xl md:text-[3.25rem]">
            Cryptographically Sealed.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-[#E8E0D8]/80 sm:text-lg">
            Every recovered lead, booked appointment, and generated dollar is immutably logged. Hover over the ingestion nodes to trace the pipeline.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="relative overflow-hidden rounded-[2rem] border border-[#F5F0E8]/10 bg-[rgba(245,240,232,0.03)] p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-12"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B87D6B]/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,240,232,0.045),transparent_42%)]" />

          <div className="relative flex flex-col items-stretch justify-between gap-8 lg:flex-row lg:items-center lg:gap-4">
            <motion.div variants={columnVariants} className="relative z-10 w-full space-y-3 lg:w-1/3">
              <h3 className="mb-6 pl-2 font-mono text-xs uppercase tracking-[0.2em] text-[#B87D6B]">01. Ingestion</h3>
              {ledgerData.sources.map((item) => {
                const isActive = activePath === item.id;
                const isDimmed = Boolean(activePath && !isActive);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActivePath(item.id)}
                    onMouseLeave={() => setActivePath(null)}
                    onFocus={() => setActivePath(item.id)}
                    onBlur={() => setActivePath(null)}
                    className={`group relative flex w-full cursor-default items-center justify-between rounded-xl border p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'border-[#B87D6B]/35 bg-[rgba(184,125,107,0.08)] shadow-[0_4px_20px_rgba(184,125,107,0.10)]'
                        : isDimmed
                          ? 'border-transparent bg-transparent opacity-40'
                          : 'border-[#F5F0E8]/[0.05] bg-cream/[0.02] hover:border-[#B87D6B]/20 hover:bg-cream/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${isActive ? 'scale-110 bg-[#B87D6B] shadow-[0_0_12px_rgba(184,125,107,0.8)]' : 'bg-[#B87D6B]/40'}`} />
                      <span className="text-sm font-medium tracking-wide text-[#F5F0E8] sm:text-base">{item.label}</span>
                    </span>
                    <span className="font-mono text-xs text-[#E8E0D8]/60 sm:text-sm">{item.metric}</span>
                  </button>
                );
              })}
            </motion.div>

            <FlowDivider tone="clay" />

            <motion.div variants={columnVariants} className="relative z-10 w-full space-y-3 lg:w-1/3">
              <h3 className="mb-6 pl-2 font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">02. Resolution</h3>
              {ledgerData.outcomes.map((item) => {
                const shouldGlow = Boolean(activePath && item.highlight);

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-700 ${
                      shouldGlow
                        ? 'border-[#2F5D4A]/40 bg-[rgba(47,93,74,0.12)] shadow-[0_4px_24px_rgba(47,93,74,0.20)]'
                        : activePath
                          ? 'border-[#F5F0E8]/[0.02] bg-cream/[0.01] opacity-40'
                          : 'border-[#F5F0E8]/[0.05] bg-cream/[0.02]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full transition-all duration-700 ${shouldGlow ? 'scale-110 bg-[#2F5D4A] shadow-[0_0_12px_rgba(47,93,74,0.8)]' : 'bg-[#2F5D4A]/40'}`} />
                      <span className="text-sm font-medium tracking-wide text-[#F5F0E8] sm:text-base">{item.label}</span>
                    </span>
                    <span className={`font-mono text-sm tracking-wide sm:text-base ${item.highlight ? 'font-bold text-sage-deep' : 'text-[#E8E0D8]/60'}`}>
                      {item.metric}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            <FlowDivider tone="pine" delay={0.5} />

            <motion.div variants={columnVariants} className="relative z-10 w-full space-y-3 lg:w-1/4">
              <h3 className="mb-6 pl-2 font-mono text-xs uppercase tracking-[0.2em] text-[#E8E0D8]/80">03. Immutability</h3>
              {ledgerData.seals.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition-all duration-700 ${
                    activePath
                      ? 'border-[#F5F0E8]/20 bg-cream/[0.06] shadow-[0_4px_20px_rgba(245,240,232,0.05)]'
                      : 'border-[#F5F0E8]/[0.05] bg-cream/[0.02]'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Link2 className={`h-3.5 w-3.5 transition-colors duration-700 ${activePath ? 'text-[#E8E0D8]' : 'text-[#E8E0D8]/40'}`} />
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#E8E0D8]/80">
                      {item.label}
                    </span>
                  </div>
                  <span className={`font-mono text-sm tracking-wider transition-colors duration-700 ${activePath ? 'text-[#F5F0E8]' : 'text-[#F5F0E8]/60'}`}>{item.metric}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: cinematicEase }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-bone/10 bg-creamone/[0.035] px-4 py-2">
            <Check className="h-3.5 w-3.5 text-pine" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-porcelain/66">
              Tamper-evident chain · every block sealed by hash
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
