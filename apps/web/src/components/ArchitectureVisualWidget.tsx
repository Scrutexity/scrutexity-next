'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, FileCheck2, Network, ShieldCheck } from 'lucide-react';
import { MagneticButton, cinematicEase } from './MotionKit';

type Feature = {
  title: string;
  desc: string;
  icon: ReactNode;
  accent: 'clay' | 'pine';
};

const trustPoints = ['BAA on request', 'PHI-minimized', 'No migration', 'No obligation'];

const features: Feature[] = [
  {
    title: 'Governed AI',
    desc: 'Deterministic clinical stop-rule. The AI never gives medical advice.',
    icon: <ShieldCheck className="h-5 w-5" />,
    accent: 'pine',
  },
  {
    title: 'Verifiable ledger',
    desc: 'Source + transcript + deposit. Every recovery is fully auditable.',
    icon: <FileCheck2 className="h-5 w-5" />,
    accent: 'clay',
  },
  {
    title: 'PMS-agnostic',
    desc: 'Read-only across Boulevard, Mangomint, Zenoti. No stack migration.',
    icon: <Network className="h-5 w-5" />,
    accent: 'pine',
  },
];

const rawLogs = [
  {
    raw: 'BOULEVARD: Missed call - (310) 555-0198',
    intent: 'Consult Call',
    treatment: 'Unknown',
    status: 'Recovered',
    value: '$450',
  },
  {
    raw: "MANGOMINT: Form abandon - 'Laser Hair Removal'",
    intent: 'High-Intent Lead',
    treatment: 'Laser Hair Removal',
    status: 'Booked',
    value: '$1,200',
  },
  {
    raw: 'ZENOTI: Dormant 6mo - Botox 40 units',
    intent: 'Reactivation',
    treatment: 'Injectables',
    status: 'Deposit Secured',
    value: '$650',
  },
  {
    raw: 'BOULEVARD: Morpheus8 inquiry stalled',
    intent: 'Stalled Pipeline',
    treatment: 'Morpheus8',
    status: 'Booked',
    value: '$2,800',
  },
  {
    raw: 'MANGOMINT: Web chat left early',
    intent: 'Information Request',
    treatment: 'Needs Triage',
    status: 'Triage Escalated',
    value: '-',
  },
];

export function ArchitectureVisualWidget({ onBookCall }: { onBookCall?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px' });
  const prefersReducedMotion = useReducedMotion();
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % rawLogs.length);
    }, 1900);

    return () => window.clearInterval(interval);
  }, [isInView, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-ink px-5 py-24 text-bone sm:px-8 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(184,125,107,0.18),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(47,93,74,0.18),transparent_28%),linear-gradient(180deg,#1C1814_0%,#15110E_100%)]" />
      <div className="absolute inset-0 luxury-noise opacity-[0.08]" />
      <div className="absolute left-1/2 top-0 h-px w-[88%] -translate-x-1/2 bg-gradient-to-r from-transparent via-bone/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-xs font-bold uppercase tracking-[0.26em] text-clay"
          >
            Architecture &amp; Unification
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.8, delay: 0.08, ease: cinematicEase }}
            className="mt-4 font-display text-4xl leading-tight text-bone sm:text-5xl lg:text-6xl"
          >
            The engine room behind recovered demand.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.8, delay: 0.16, ease: cinematicEase }}
            className="mx-auto mt-5 max-w-2xl text-base leading-8 text-porcelain/72"
          >
            Watch chaotic, multi-location data from Boulevard, Mangomint, and Zenoti get stripped, classified, and converted into recovery-ready records.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.22 } },
          }}
          className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {trustPoints.map((point) => (
            <motion.div
              key={point}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: cinematicEase } },
              }}
              className="flex items-center gap-2 rounded-full border border-bone/10 bg-creamone/[0.035] px-4 py-2 text-sm text-porcelain/78 backdrop-blur-sm"
            >
              <Check className="h-4 w-4 text-pine" />
              <span>{point}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <EngineBentoCell key={feature.title} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>

        <LiveDataTerminal
          activeLogIndex={activeLogIndex}
          isInView={isInView}
          prefersReducedMotion={Boolean(prefersReducedMotion)}
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.75, delay: 0.75, ease: cinematicEase }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-bone/10 bg-creamone/[0.035] p-5 backdrop-blur-md sm:flex-row"
        >
          <p className="max-w-2xl text-sm leading-6 text-porcelain/72">
            The output is not a chatbot transcript. It is a normalized recovery record with source, context, routing state, and audit evidence attached.
          </p>
          {onBookCall ? (
            <MagneticButton onClick={onBookCall} className="shrink-0 bg-clay text-bone hover:bg-[#A86E5E]">
              See the engine in your data
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          ) : (
            <MagneticButton href="/revenue-leak-audit" className="shrink-0 bg-clay text-bone hover:bg-[#A86E5E]">
              See the engine in your data
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function EngineBentoCell({
  feature,
  index,
  isInView,
}: {
  feature: Feature;
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const glow = feature.accent === 'pine' ? 'rgba(47,93,74,0.16)' : 'rgba(184,125,107,0.16)';
  const accentClass = feature.accent === 'pine' ? 'text-pine' : 'text-clay';

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: cinematicEase }}
      className="group relative min-h-[17rem] overflow-hidden rounded-[2rem] border border-bone/10 bg-creamone/[0.035] p-8 shadow-[inset_0_1px_1px_rgba(245,240,232,0.06),0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-clay/35"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${glow}, transparent 42%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-bone/10 bg-creamone/[0.045] ${accentClass}`}>
          {feature.icon}
        </div>
        <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-bone">
          {feature.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-porcelain/66">
          {feature.desc}
        </p>
        <div className="mt-auto pt-7">
          <span className={`inline-flex h-1.5 w-16 rounded-full ${feature.accent === 'pine' ? 'bg-pine' : 'bg-clay'} opacity-70`} />
        </div>
      </div>
    </motion.div>
  );
}

function LiveDataTerminal({
  activeLogIndex,
  isInView,
  prefersReducedMotion,
}: {
  activeLogIndex: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.95, delay: 0.5, ease: cinematicEase }}
      className="mt-6 overflow-hidden rounded-[2rem] border border-bone/10 bg-creamone/[0.028] shadow-[0_30px_110px_rgba(0,0,0,0.28)] backdrop-blur-lg"
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-bone/10 bg-creamone/[0.025] px-5 py-4">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-clay/55" />
          <span className="h-2.5 w-2.5 rounded-full bg-creamone/18" />
          <span className="h-2.5 w-2.5 rounded-full bg-pine/55" />
        </div>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-porcelain/48">
          engine.triage_process() - live normalization feed
        </span>
      </div>

      <div className="relative grid min-h-[25rem] grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
        <div className="relative overflow-hidden border-b border-bone/10 p-6 md:border-b-0 md:p-10">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink via-transparent to-ink" />
          <div className="relative z-0 mb-6 flex items-center justify-between">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-clay">01. Raw ingestion</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-porcelain/35">PMS residue</p>
          </div>
          <div className="relative z-0 flex min-h-[17rem] flex-col justify-center space-y-4">
            {rawLogs.map((log, index) => {
              const rawDistance = Math.abs(activeLogIndex - index);
              const distance = Math.min(rawDistance, rawLogs.length - rawDistance);
              const isActive = index === activeLogIndex;
              const isVisible = distance <= 2;

              return (
                <motion.div
                  key={log.raw}
                  animate={{
                    opacity: isActive ? 1 : isVisible ? 0.32 : 0.08,
                    scale: isActive ? 1 : 0.96,
                    x: isActive && !prefersReducedMotion ? 10 : 0,
                    y: prefersReducedMotion ? 0 : (activeLogIndex - index) * -4,
                  }}
                  transition={{ duration: 0.55, ease: cinematicEase }}
                  className={`relative truncate rounded-xl border px-4 py-3 font-mono text-sm sm:text-base ${
                    isActive
                      ? 'border-clay/30 bg-clay/10 text-clay shadow-[0_0_34px_rgba(184,125,107,0.16)]'
                      : 'border-transparent bg-transparent text-porcelain/55'
                  }`}
                >
                  <span className="mr-2 text-porcelain/35">&gt;</span>
                  {log.raw}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative hidden w-px bg-creamone/10 md:block">
          <motion.div
            className="absolute left-[-1px] h-32 w-[3px] bg-gradient-to-b from-transparent via-pine to-transparent"
            animate={prefersReducedMotion ? { top: '35%' } : { top: ['-20%', '112%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-pine/25 bg-ink shadow-[0_0_42px_rgba(47,93,74,0.28)]">
            <ShieldCheck className="h-5 w-5 text-pine" />
          </div>
        </div>

        <div className="bg-pine/[0.06] p-6 md:p-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-pine">02. Cleaned &amp; structured</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-porcelain/40">Recovery-ready</p>
          </div>

          <div className="relative min-h-[15rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLogIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: cinematicEase }}
                className="absolute w-full rounded-2xl border border-pine/20 bg-ink/70 p-6 font-mono text-sm shadow-[0_0_34px_rgba(47,93,74,0.12),inset_0_1px_0_rgba(245,240,232,0.05)]"
              >
                <div className="mb-5 flex items-start justify-between gap-5 border-b border-bone/10 pb-5">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain/45">Identified intent</p>
                    <p className="font-sans text-base font-medium text-bone">{rawLogs[activeLogIndex].intent}</p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-porcelain/45">Recoverable</p>
                    <p className="font-mono text-lg text-pine">{rawLogs[activeLogIndex].value}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    ['source', 'normalized'],
                    ['treatment', rawLogs[activeLogIndex].treatment],
                    ['routing', 'queued_for_recovery'],
                  ].map(([key, value], index) => (
                    <div key={key} className="leading-7 text-bone">
                      <span className="text-clay">&quot;{key}&quot;</span>: <span className="text-pine">&quot;{value}&quot;</span>{index < 2 ? ',' : ''}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-bone/10 pt-4">
                  <ShieldCheck className="h-4 w-4 text-pine" />
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-pine">
                    {rawLogs[activeLogIndex].status}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['Context kept', 'PHI boundary', 'Ledger sealed'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.08, ease: cinematicEase }}
                className="rounded-xl border border-pine/15 bg-pine/10 px-3 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-pine"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
