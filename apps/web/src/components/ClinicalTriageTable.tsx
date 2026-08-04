'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { AlertTriangle, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

const scenarios = [
  {
    id: 'guard-01',
    trigger: '"Is this redness normal 48 hours after Morpheus"',
    context: 'SMS · Saturday 11:15 PM',
    secure: {
      label: 'CLINICAL ESCALATION',
      detail: 'Escalates to the provider with full inquiry context. No AI response is sent.',
      tag: 'NO AI RESPONSE',
    },
    risk: {
      label: 'LIABILITY RISK',
      detail: 'Could hallucinate "apply ice" and create clinical liability.',
      tag: 'CLINICAL LIABILITY RISK',
    },
  },
  {
    id: 'guard-02',
    trigger: '"Can I get Botox if I\'m currently pregnant"',
    context: 'Website form · Sunday 3:30 PM',
    secure: {
      label: 'POLICY ENFORCED',
      detail: 'Refuses to schedule, cites clinic policy, and escalates to licensed staff.',
      tag: 'POLICY ENFORCED AND ESCALATED',
    },
    risk: {
      label: 'INCIDENT RISK',
      detail: 'Could book the appointment creating a clinical incident.',
      tag: 'CLINICAL INCIDENT RISK',
    },
  },
  {
    id: 'guard-03',
    trigger: '"What dose did I get last time?"',
    context: 'SMS · Monday 8:14 AM',
    secure: {
      label: 'BOUNDARY ENFORCED',
      detail: 'Escalates to staff. The AI does not access medical records or surface prior dosing.',
      tag: 'PHI BOUNDARY ENFORCED',
    },
    risk: {
      label: 'PHI EXPOSURE',
      detail: "Could surface PHI it shouldn't have.",
      tag: 'PHI EXPOSURE RISK',
    },
  },
];

function SafetyScenarioCard({
  scenario,
  index,
}: {
  scenario: (typeof scenarios)[number];
  index: number;
}) {
  const [mode, setMode] = useState<'secure' | 'risk'>('secure');
  const isSecure = mode === 'secure';

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 34 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: cinematicEase },
        },
      }}
      className={`relative z-10 overflow-hidden rounded-[2rem] border bg-[rgba(245,240,232,0.035)] transition-[border-color,box-shadow,background-color] duration-700 ${
        isSecure
          ? 'border-pine/24 shadow-[0_30px_90px_-54px_rgba(47,93,74,0.72)]'
          : 'border-clay/42 shadow-[0_30px_90px_-52px_rgba(184,125,107,0.72)]'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_12%_0%,rgba(184,125,107,0.12),transparent_34%),radial-gradient(circle_at_88%_100%,rgba(47,93,74,0.10),transparent_34%)]" />

      <div className="relative z-10 border-b border-bone/10 bg-clay/[0.10] px-6 py-7 sm:px-8 lg:px-10">
        <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-clay">
          <MessageSquare className="h-3.5 w-3.5" />
          Patient trigger
          <span className="text-porcelain/34">·</span>
          <span className="text-porcelain/56">{scenario.context}</span>
          <span className="ml-auto hidden rounded-full border border-bone/10 px-2.5 py-1 text-porcelain/38 sm:inline-flex">
            0{index + 1}
          </span>
        </div>

        <div className="max-w-3xl rounded-3xl rounded-tl-none border border-bone/10 bg-bone/[0.045] p-5 shadow-[inset_0_1px_0_rgba(245,240,232,0.08)]">
          <p className="font-display text-2xl italic leading-snug text-bone sm:text-3xl lg:text-[2.45rem]">
            {scenario.trigger}
          </p>
        </div>
      </div>

      <div className="relative z-20 p-6 sm:p-8 lg:p-10">
        <div className="relative z-30 mb-8 inline-flex w-full rounded-full border border-bone/10 bg-bone/[0.045] p-1 shadow-[inset_0_1px_0_rgba(245,240,232,0.08)] sm:w-auto">
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 top-1 z-0 w-[calc(50%-4px)] rounded-full"
            initial={false}
            animate={{
              x: isSecure ? 0 : '100%',
              backgroundColor: isSecure ? 'var(--color-pine)' : 'var(--color-clay)',
            }}
            transition={{ duration: 0.5, ease: cinematicEase }}
          />
          <button
            type="button"
            onClick={() => setMode('secure')}
            aria-pressed={isSecure}
            className={`relative z-10 flex-1 cursor-pointer rounded-full px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-500 sm:flex-none ${
              isSecure ? 'text-bone' : 'text-porcelain/50 hover:text-bone'
            }`}
          >
            Scrutexity OS
          </button>
          <button
            type="button"
            onClick={() => setMode('risk')}
            aria-pressed={!isSecure}
            className={`relative z-10 flex-1 cursor-pointer rounded-full px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-500 sm:flex-none ${
              !isSecure ? 'text-bone' : 'text-porcelain/50 hover:text-bone'
            }`}
          >
            Generic AI Bot
          </button>
        </div>

        <div className="relative z-20 min-h-[150px]">
          <AnimatePresence mode="wait">
            {isSecure ? (
              <motion.div
                key="secure"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: cinematicEase }}
                className="max-w-2xl"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-pine/25 bg-pine/10 text-pine">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-pine">
                  {scenario.secure.label}
                </p>
                <p className="mt-4 text-[15px] leading-7 text-porcelain/82">
                  {scenario.secure.detail}
                </p>
                <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-pine">
                  {scenario.secure.tag}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="risk"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: cinematicEase }}
                className="max-w-2xl"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-clay/25 bg-clay/10 text-clay">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-clay">
                  {scenario.risk.label}
                </p>
                <p className="mt-4 text-[15px] leading-7 text-porcelain/64">
                  {scenario.risk.detail}
                </p>
                <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-clay">
                  {scenario.risk.tag}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

export default function ClinicalTriageTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px' });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink px-5 py-24 text-bone sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,125,107,0.12),transparent_35%),radial-gradient(circle_at_82%_72%,rgba(47,93,74,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 luxury-noise opacity-[0.04]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: cinematicEase }}
            className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-clay"
          >
            Clinical Safety
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.8, ease: cinematicEase }}
            className="font-display text-4xl leading-tight text-bone md:text-5xl"
          >
            The Invisible Guardrail: AI Scheduling vs. Clinical Triage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.8, ease: cinematicEase }}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-porcelain/72"
          >
            Scrutexity is strictly an operational tool. It is hard-coded to refuse medical questions — protecting your clinical license and ensuring every patient interaction is either booked correctly or escalated immediately.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: { opacity: 1 },
            show: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          className="relative z-20 grid grid-cols-1 gap-6"
        >
          {scenarios.map((scenario, index) => (
            <SafetyScenarioCard key={scenario.id} scenario={scenario} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.36, duration: 0.7, ease: cinematicEase }}
          className="relative z-10 mt-12 text-center"
        >
          <p className="mb-4 text-[13px] text-porcelain/62">
            Every interaction is logged. Every escalation is timestamped. Your medical director can audit everything.
          </p>
          <Link
            href="/trust"
            className="inline-flex items-center gap-2 text-sm font-semibold text-clay transition-colors hover:text-bone"
          >
            See Trust Center <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
