'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Shield, Lock, Unlock, Calendar, Check, ArrowRight,
  X, Phone, MessageSquare, FileText, BarChart4,
} from 'lucide-react';
import Link from 'next/link';
import { BentoCard as MoseyBentoCard, BentoGrid as MoseyBentoGrid, cinematicEase } from './MotionKit';

/* ==========================================================================
   0. REDUCED-MOTION GUARD & SHARED CONSTANTS
   ========================================================================== */

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefers;
}

const luxuryEase = [0.16, 1, 0.3, 1] as const;

/* ==========================================================================
   1. COUNT-UP UTILITY COMPONENT
   ========================================================================== */

function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    const end = value;
    if (end === 0) { setCount(0); return; }
    if (reducedMotion) { setCount(end); return; }

    const totalMs = duration * 1000;
    const startTime = performance.now();
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      setCount(+(easeOutExpo(progress) * (end - 0)).toFixed(decimals));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(end);
    };
    requestAnimationFrame(animate);
  }, [value, duration, isInView, reducedMotion, decimals]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ==========================================================================
   2. PROGRESS RING
   ========================================================================== */

function ProgressRing({ percentage, size = 60, strokeWidth = 5 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = usePrefersReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg ref={ref} width={size} height={size} className="transform -rotate-90">
      <circle className="text-[#efe6d7]" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
      <motion.circle
        className="text-[#7f8f78]"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: isInView ? offset : circumference }}
        transition={{ duration: reducedMotion ? 0 : 1.6, ease: luxuryEase }}
        strokeLinecap="round" stroke="currentColor" fill="transparent"
        r={radius} cx={size / 2} cy={size / 2}
      />
    </svg>
  );
}

/* ==========================================================================
   3. THE 14-DAY SCROLL-LINKED TIMELINE (refined physics)
   ========================================================================== */

interface TimelineStep {
  day: string;
  title: string;
  desc: string;
  badge?: string;
  icon: React.ReactNode;
}

const timelineSteps: TimelineStep[] = [
  { day: 'Day 1', title: 'Baseline Demand Audit', desc: 'We run a quiet, historical scan mapping your last 30 days of unworked forms, missed calls, and after-hours delays. You see exactly where pipeline leaked before changing anything.', badge: 'Read-only access', icon: <BarChart4 size={15} /> },
  { day: 'Days 2–4', title: 'Seamless Integration', desc: 'BAA is executed. We establish a secure, read-only bridge to your Boulevard calendar and message endpoints. No migration, no hardware to install, and zero staff training required.', badge: 'Zero workflow disruption', icon: <Shield size={15} /> },
  { day: 'Days 5–10', title: 'Trailing Capture', desc: 'The recovery engine monitors incoming gaps in real-time. Missed inquiries are re-engaged in your clinic\'s precise voice within minutes, booking deposits directly into your system.', badge: 'Live recovery logs', icon: <Phone size={15} /> },
  { day: 'Day 14', title: 'Day-14 Owner Brief', desc: 'We present a comprehensive log of every recovery, conversation transcript, and deposit status. You verify the results against your booking and payment records before making any decision.', badge: 'Exportable activity record', icon: <Check size={15} /> },
];

export function ScrollLinkedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  return (
    <section ref={containerRef} className="relative py-28 bg-cream overflow-hidden border-b border-sand-deep/60">
      {/* Soft sage column glow */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(127,143,120,0.14),transparent_75%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-clay-deep mb-4">Operational Timeline</p>
          <h2 className="font-display text-4xl text-espresso leading-tight sm:text-5xl md:text-[3.25rem]">The 14-Day Performance Sprint</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-mist max-w-xl mx-auto">
            A structured, risk-free window designed to demonstrate recovery value with zero upfront commitment.
          </p>
        </div>

        <div className="relative">
          {/* Warm track line */}
          <div className="absolute left-6 md:left-1/2 top-6 bottom-6 w-[2px] bg-[#efe6d7] -translate-x-1/2 rounded-full" />
          {/* Sage progress line — silkier spring draw */}
          <motion.div
            style={{ scaleY: reducedMotion ? 1 : scrollYProgress, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-6 bottom-6 w-[2px] bg-[#7f8f78] -translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(127,143,120,0.25)]"
          />

          <div className="space-y-24">
            {timelineSteps.map((step, i) => (
              <TimelineCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ step, index }: { step: TimelineStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isInView = useInView(ref, { once: false, margin: '-30% 0px -30% 0px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-start md:items-center">
      {/* Dot on central line */}
      <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 w-5 h-5 rounded-full border-2 border-[#efe6d7] bg-cream -translate-x-1/2 -translate-y-1/2 z-10 transition-colors duration-700 flex items-center justify-center">
        <motion.div
          animate={{ scale: isInView ? 1 : 0.35, backgroundColor: isInView ? '#7f8f78' : '#e1d4c5' }}
          transition={{ duration: 0.55, ease: cinematicEase }}
          className="w-2 h-2 rounded-full"
        />
      </div>

      {/* Card wrapper */}
      <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
        <motion.div
          animate={reducedMotion ? { opacity: 1 } : { scale: isInView ? 1.01 : 0.97, opacity: isInView ? 1.0 : 0.42, y: isInView ? 0 : 18 }}
          transition={{ duration: 0.75, ease: cinematicEase }}
          className="bg-cream border border-sand-deep p-8 rounded-2xl
                     shadow-[0_4px_30px_rgba(85,62,41,0.02)]
                     hover:shadow-[0_16px_48px_rgba(85,62,41,0.07)]
                     hover:border-[#7f8f78]/20
                     transition-all duration-500"
        >
          {/* Day + icon row */}
          <div className={`flex items-center gap-3 mb-5 ${isEven ? 'md:justify-end md:flex-row-reverse' : ''}`}>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f8f78] bg-[#eef3ea] border border-[#7f8f78]/15 px-3 py-1 rounded-full">
              {step.day}
            </span>
            {/* Icon with subtle pulse when visible */}
            <motion.span
              animate={isInView ? { scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] } : { scale: 1, opacity: 0.5 }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="text-[#7f8f78]/70"
            >
              {step.icon}
            </motion.span>
          </div>

          <h3 className="font-display text-[1.65rem] text-espresso mb-3 leading-snug">{step.title}</h3>
          <p className="text-sm leading-relaxed text-mist">{step.desc}</p>

          {step.badge && (
            <div className={`mt-4 ${isEven ? 'md:text-right' : ''}`}>
              <span className="inline-block rounded-full bg-[#f3eadf]/70 border border-sand-deep/50 px-3 py-1 text-[9px] font-semibold text-[#7a7066] uppercase tracking-wider">
                {step.badge}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. INTERACTIVE SAMPLE-LEDGER + TRANSCRIPT PEERS (refined)
   ========================================================================== */

interface TranscriptExchange { system: string; patient: string; resolution: string; }
interface LedgerRow {
  id: string; time: string; src: string; inquiry: string; response: string;
  deposit: string; icon: 'phone' | 'form' | 'chat'; transcript: TranscriptExchange;
}

const ledgerData: LedgerRow[] = [
  { id: 'SCX-0911', time: '10:14 AM', src: 'Missed Call', inquiry: 'Morpheus8 package inquiry', response: '32s SMS', deposit: '$650 deposit ✓', icon: 'phone', transcript: { system: "Hi Sarah — sorry we missed your call! Did you want to book a Morpheus8 package slot before the weekend?", patient: 'Yes, is there any opening on Saturday morning?', resolution: 'Saturday at 10 AM is secured. Deposit of $650 verified in Boulevard.' } },
  { id: 'SCX-0912', time: '11:42 AM', src: 'Abandoned Form', inquiry: 'Tox + filler consult request', response: '15s SMS', deposit: '$250 deposit ✓', icon: 'form', transcript: { system: "Hi Jessica — we noticed you started booking a Tox consult but didn't finish. We have a slot open tomorrow at 3 PM if that works?", patient: "Oh yes, please! I got interrupted. I'll take it.", resolution: 'Booked for tomorrow at 3 PM. Deposit of $250 verified.' } },
  { id: 'SCX-0913', time: '2:18 PM', src: 'After-Hours DM', inquiry: 'Post-op swelling concern', response: 'NP Escalation', deposit: 'Triage escalation ✓', icon: 'chat', transcript: { system: "Hi Amanda — we've received your query about swelling. Because this is a medical question, we have alerted our Nurse Practitioner. They will call you immediately.", patient: 'Okay thank you, I was a bit worried.', resolution: 'NP Escalation active. Automated text sequence halted instantly.' } },
  { id: 'SCX-0914', time: '4:05 PM', src: 'Missed Call', inquiry: 'Laser package series rate', response: '24s SMS', deposit: '$400 deposit ✓', icon: 'phone', transcript: { system: 'Hi Emily — sorry we missed you. Were you checking on the laser package series rates?', patient: 'Yes, is the package price still available?', resolution: 'Yes! Package confirmed. Booking deposit of $400 verified.' } },
  { id: 'SCX-0915', time: '8:51 PM', src: 'Abandoned Form', inquiry: 'Microneedling session slot', response: '40s SMS', deposit: '$350 deposit ✓', icon: 'form', transcript: { system: "Hi Clara — we have an opening for microneedling this Monday at 11 AM if you'd like to claim it.", patient: "That works perfectly. I'll take it.", resolution: 'Booked for Monday at 11 AM. Deposit of $350 verified.' } },
];

function OutcomeBadge({ deposit, icon }: { deposit: string; icon: string }) {
  const isTriage = icon === 'chat';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wide uppercase border transition-all duration-500 ${isTriage ? 'bg-[#eef3ea] border-[#7f8f78]/20 text-[#7f8f78]' : 'bg-[#b9825f]/8 border-[#b9825f]/15 text-[#a36b5d]'}`}>
      {!isTriage && <Check size={10} className="stroke-[3] text-[#7f8f78]" />}
      {deposit.replace(' deposit ✓', ' deposit').replace(' booking ✓', '').replace(' ✓', '')}
    </span>
  );
}

export function InteractiveSampleLedger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const reducedMotion = usePrefersReducedMotion();
  const [activeRowId, setActiveRowId] = useState<string>('SCX-0911');
  const activeRow = ledgerData.find((r) => r.id === activeRowId) || ledgerData[0];

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.065, ease: luxuryEase },
    }),
  };

  return (
    <section ref={containerRef} className="py-28 bg-cream border-b border-sand-deep/60 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-clay mb-4">Audit Transparency</p>
          <h2 className="font-display text-4xl text-espresso leading-tight sm:text-5xl md:text-[3.25rem]">Surfaced Ledger Interface</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-mist max-w-xl mx-auto">
            How every re-engaged booking is compiled into a single, clean ledger verifying exact source, response time, and deposit captured.
          </p>
          <p className="mt-4 inline-block font-mono text-[9px] uppercase tracking-wider text-[#9a8775] bg-[#f3eadf]/60 border border-sand-deep/50 px-4 py-1.5 rounded-full">
            Illustrative — format sample, not a client result.
          </p>
        </div>

        {/* 4-Up Stat Bento */}
        <MoseyBentoGrid className="mb-14 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Reengaged Value', val: 28400, prefix: '$', note: 'Estimated 14-day recovered pipeline', delay: 0.05 },
            { label: 'Leads Reactivated', val: 19, extra: '/ 47 leaks', note: '40.4% recovery rate', delay: 0.12, ring: 40.4 },
            { label: 'Median Delay', val: 42, suffix: 's', note: 'Reduced from 6.2d baseline', delay: 0.19 },
            { label: 'EMR Integration', note: 'Verified', delay: 0.26, verified: true },
          ].map((s, i) => (
            <MoseyBentoCard
              key={i}
              className="flex flex-col justify-between border-sand-deep bg-white/70 p-6 shadow-sm hover:border-clay/35"
            >
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9a8775] mb-4">{s.label}</p>
                {s.verified ? (
                  <div className="flex items-center gap-2 mb-2 text-[#7f8f78]">
                    <Check size={18} className="stroke-[3]" />
                    <span className="font-display text-2xl text-pine font-semibold leading-none">Verified</span>
                  </div>
                ) : s.ring ? (
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <motion.span whileHover={reducedMotion ? undefined : { scale: 1.03 }} transition={{ duration: 0.4, ease: cinematicEase }} className="font-display text-[2.75rem] text-pine leading-none inline-block origin-left cursor-default">
                          <Counter value={s.val!} />
                        </motion.span>
                        <span className="text-xs text-[#9a8775] ml-1">{s.extra}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-2"><ProgressRing percentage={s.ring} size={50} /></div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1 mb-2">
                    <motion.span whileHover={reducedMotion ? undefined : { scale: 1.03 }} transition={{ duration: 0.4, ease: cinematicEase }} className={`font-display text-[2.75rem] leading-none inline-block origin-left cursor-default ${s.prefix === '$' ? 'text-pine' : 'text-espresso'}`}>
                      <Counter value={s.val!} prefix={s.prefix} suffix={s.suffix} />
                    </motion.span>
                  </div>
                )}
                <p className="text-xs text-mist">{s.note}</p>
              </div>
              {s.verified && (
                <Link href="/verify" className="text-[10px] font-semibold text-clay hover:underline inline-flex items-center gap-1 uppercase tracking-wider font-mono mt-2">
                  Live Verification ↗
                </Link>
              )}
            </MoseyBentoCard>
          ))}
        </MoseyBentoGrid>
        <p className="-mt-10 mb-14 text-center font-mono text-[8.5px] uppercase tracking-wider text-[#b3a28e]">
          Illustrative — format sample, not a client result.
        </p>

        {/* Two-Column Board */}
        <div className="grid gap-8 lg:grid-cols-10 items-stretch">
          {/* ── LEFT: Ledger Table ── */}
          <div className="lg:col-span-6 rounded-3xl border border-sand-deep bg-white shadow-[0_20px_50px_rgba(85,62,41,0.03)] overflow-hidden flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-deep bg-white/40 px-6 py-5">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#9a8775]">Active Pipeline · Illustrative</p>
                <h3 className="mt-1 text-sm font-semibold text-espresso">Demo Diagnostic Record (SCX-0900)</h3>
              </div>
              <div className="font-mono text-[9px] text-right text-[#7f8f78] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7f8f78] animate-pulse" /> BAA Active
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full min-w-[550px] font-mono text-[11px] text-mist">
                <thead>
                  <tr className="border-b border-sand-deep/70 bg-cream/50 text-[#9a8775]">
                    <th className="py-3 px-6 text-left font-semibold uppercase tracking-wider w-[80px]">Event ID</th>
                    <th className="py-3 px-3 text-left font-semibold uppercase tracking-wider w-[70px]">When</th>
                    <th className="py-3 px-3 text-left font-semibold uppercase tracking-wider">Source</th>
                    <th className="py-3 px-3 text-left font-semibold uppercase tracking-wider">Inquiry</th>
                    <th className="py-3 px-6 text-right font-semibold uppercase tracking-wider">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1d4c5]/30">
                  {ledgerData.map((row, i) => {
                    const isActive = row.id === activeRowId;
                    return (
                      <motion.tr
                        key={row.id}
                        custom={i}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={rowVariants}
                        onMouseEnter={() => setActiveRowId(row.id)}
                        className={`relative transition-all duration-300 cursor-pointer group ${
                          isActive ? 'bg-[#7f8f78]/6 scale-[1.005]' : 'hover:bg-cream/50'
                        }`}
                      >
                        {/* Sage left-border accent on active row */}
                        <td className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none">
                          <motion.div
                            animate={isActive ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: luxuryEase }}
                            className="h-full w-full bg-[#7f8f78]/40 rounded-r-full origin-top"
                          />
                        </td>
                        <td className="py-4 px-6 font-semibold text-espresso">{row.id}</td>
                        <td className="py-4 px-3 text-[#9a8775]">{row.time}</td>
                        <td className="py-4 px-3">
                          <span className="flex items-center gap-1.5">
                            {row.icon === 'phone' && <Phone size={10} className="text-clay" />}
                            {row.icon === 'form' && <FileText size={10} className="text-clay" />}
                            {row.icon === 'chat' && <MessageSquare size={10} className="text-clay" />}
                            {row.src}
                          </span>
                        </td>
                        <td className="py-4 px-3 max-w-[130px] truncate">{row.inquiry}</td>
                        <td className="py-4 px-6 text-right font-semibold">
                          <span className={`inline-block transition-all duration-500 group-hover:shadow-[0_0_18px_-4px_rgba(127,143,120,0.30)] ${isActive ? 'shadow-[0_0_22px_-4px_rgba(127,143,120,0.36)]' : ''}`}>
                            <OutcomeBadge deposit={row.deposit} icon={row.icon} />
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-sand-deep bg-cream/30 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
              <span className="text-[10px] text-[#9a8775] leading-relaxed">*Hover over rows to inspect active SMS transcripts.</span>
              <Link href="/terms-of-pilot" className="text-[10px] font-semibold text-clay hover:underline flex items-center gap-1">
                Verify compliance rules <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Transcript Inspector ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: luxuryEase }}
            className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-sand-deep bg-cream p-5 shadow-[0_20px_50px_rgba(85,62,41,0.03)] relative overflow-hidden select-none"
          >
            {/* Deeper sage radial aura */}
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(127,143,120,0.08),transparent_60%),radial-gradient(ellipse_at_80%_100%,rgba(185,130,95,0.03),transparent_50%)] pointer-events-none" />

            <div className="relative flex-1 flex flex-col">
              <div className="border-b border-sand-deep pb-3 mb-5 flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#7f8f78]/10 text-[#7f8f78] flex items-center justify-center"><Shield size={12} /></div>
                <div>
                  <h4 className="text-xs font-semibold text-espresso">Transcript Inspector</h4>
                  <p className="text-[9px] font-mono text-[#9a8775]">Record ID: {activeRow.id}</p>
                </div>
                <span className="ml-auto inline-block h-1.5 w-1.5 rounded-full bg-[#7f8f78] animate-pulse" />
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-end min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRow.id}
                    initial={{ opacity: 0, scale: 0.97, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -6 }}
                    transition={{ duration: 0.45, ease: cinematicEase }}
                    className="space-y-4"
                  >
                    {/* System Message */}
                    <div className="flex flex-col items-start max-w-[88%]">
                      <span className="text-[9px] font-mono text-[#9a8775] mb-1">Scrutexity Layer</span>
                      <div className="rounded-2xl rounded-tl-sm bg-[#eef3ea] border border-[#7f8f78]/15 px-4 py-3 text-xs text-espresso leading-relaxed shadow-sm">
                        {activeRow.transcript.system}
                      </div>
                    </div>
                    {/* Patient Reply */}
                    {activeRow.transcript.patient && (
                      <div className="flex flex-col items-end max-w-[88%] ml-auto">
                        <span className="text-[9px] font-mono text-[#9a8775] mb-1">Patient Reply</span>
                        <div className="rounded-2xl rounded-tr-sm bg-white border border-sand-deep px-4 py-3 text-xs text-espresso leading-relaxed shadow-sm italic">
                          &ldquo;{activeRow.transcript.patient}&rdquo;
                        </div>
                      </div>
                    )}
                    {/* Resolution */}
                    <div className="flex flex-col items-center mt-3">
                      <div className="rounded-xl border border-[#7f8f78]/30 bg-[#7f8f78]/6 px-4 py-3 w-full text-center flex items-center justify-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                        <Check className="h-3.5 w-3.5 text-[#7f8f78] stroke-[3]" />
                        <span className="font-mono text-[9px] font-bold text-[#7f8f78] uppercase tracking-wider">{activeRow.transcript.resolution}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-sand-deep text-[10px] text-center text-[#9a8775]">
              Every row has a verifiable audit trail linked directly to Boulevard deposit receipts.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. FLOATING "SEE LIVE LEDGER FORMAT" MODAL
   ========================================================================== */

export function SampleBriefFloatingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      {/* Floating Pill — breathing sage shadow lives on the wrapper. */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 rounded-full"
        animate={reducedMotion ? {} : { boxShadow: [
          '0 14px 40px rgba(127,143,120,0.08), 0 2px 8px rgba(85,62,41,0.04)',
          '0 14px 44px rgba(127,143,120,0.16), 0 2px 8px rgba(85,62,41,0.06)',
          '0 14px 40px rgba(127,143,120,0.08), 0 2px 8px rgba(85,62,41,0.04)',
        ]}}
        transition={{ duration: 3.0, ease: 'easeInOut', repeat: Infinity }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={reducedMotion ? {} : { scale: 1.02, y: -2 }}
          whileTap={reducedMotion ? {} : { scale: 0.98 }}
          transition={{ duration: 0.4, ease: cinematicEase }}
          className="rounded-full bg-white/85 border border-[#7f8f78]/25 text-espresso
                     px-5 py-3 shadow-[0_14px_40px_rgba(127,143,120,0.10),0_2px_8px_rgba(85,62,41,0.04)]
                     hover:border-[#7f8f78]/50
                     backdrop-blur-xl flex items-center gap-2.5 font-sans text-[11px]
                     font-semibold tracking-wider uppercase transition-colors duration-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7f8f78] opacity-40" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7f8f78]" />
          </span>
          See Live Ledger Format
        </motion.button>
      </motion.div>

      {/* Modal overlay — slower, more luxurious entrance */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream/50 backdrop-blur-xl"
          >
            <div className="absolute inset-0 cursor-default" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { scale: 0.93, y: 28, opacity: 0 }}
              animate={reducedMotion ? { opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { scale: 0.93, y: 28, opacity: 0 }}
              transition={{ duration: 0.6, ease: cinematicEase }}
              className="relative w-full max-w-2xl bg-cream/95 border border-sand-deep
                         rounded-[1.75rem] shadow-[0_40px_100px_rgba(85,62,41,0.14)]
                         overflow-hidden z-10 backdrop-blur-3xl"
            >
              <button onClick={() => setIsOpen(false)} className="absolute right-6 top-6 h-9 w-9 rounded-full bg-cream border border-sand-deep/60 text-[#7a7066] hover:text-espresso flex items-center justify-center transition-colors z-20">
                <X className="h-4 w-4" />
              </button>

              <div className="p-8 md:p-10">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#9a8775] mb-2 block">Scrutexity · Ledger Structure</span>
                <h3 className="font-display text-3xl text-espresso mb-4">Day-14 Owner Brief Mockup</h3>
                <p className="text-sm leading-relaxed text-mist mb-7 max-w-lg">
                  Below is a representation of the diagnostic dashboard delivered to practice directors at the end of the 14-day performance pilot.
                </p>

                {/* Dashboard mockup */}
                <div className="bg-cream/70 border border-sand-deep rounded-2xl p-6 mb-8 font-mono text-[10.5px] space-y-5 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(127,143,120,0.04),transparent_55%)] pointer-events-none" />
                  <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-sand-deep/60 pb-5">
                    {[
                      { label: 'Audited Inquiries', val: 112 },
                      { label: 'Surfaced Leaks', val: 47, terracotta: true },
                      { label: 'Recovery Rate', staticVal: '40.4%' },
                      { label: 'Re-engaged Value', staticVal: '$28,400', sage: true },
                    ].map((m, i) => (
                      <div key={i}>
                        <p className="text-[#9a8775] uppercase tracking-wide text-[9px]">{m.label}</p>
                        <p className={`text-lg font-bold mt-1 ${m.sage ? 'text-[#7f8f78]' : m.terracotta ? 'text-clay' : 'text-espresso'}`}>
                          {m.staticVal || <Counter value={m.val!} duration={m.val! > 50 ? 1.2 : 0.8} />}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="relative space-y-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#9a8775]">Latest Verified Recovery</p>
                    <div className="bg-white/60 border border-sand-deep/50 rounded-lg p-3.5 text-[11px] leading-relaxed text-espresso/80">
                      <p className="text-[9px] text-clay-deep font-semibold mb-1">Morpheus8 inquiry re-engagement transcript (illustrative):</p>
                      <p className="italic">&ldquo;Hi Sarah — an opening came up this Thursday at 2 PM for your Morpheus8 consult. Would you like us to hold it for you? Reply STOP to opt out.&rdquo;</p>
                      <p className="mt-2 text-[9px] text-[#7f8f78] font-bold uppercase tracking-wider">✓ Deposit Verified: $650 · Boulevard Booking ID: #BVD-0891</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/pilot" onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center rounded-full bg-clay text-white px-7 py-3.5 text-xs font-semibold tracking-wider uppercase hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
                    Get Your Free Audit
                  </Link>
                  <button onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center rounded-full border border-sand-deep px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-mist hover:bg-cream hover:text-espresso transition-all">
                    Dismiss preview
                  </button>
                </div>
                <p className="mt-5 text-[9px] font-mono text-[#9a8775] leading-relaxed">
                  Illustrative — format sample, not a client result. All pilot recovery criteria are agreed in writing before technical connection.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ==========================================================================
   6. SECURITY & DATA POSTURE BENTO PANELS (deeper glow, refined SVG loops)
   ========================================================================== */

interface SecurityCardProps { title: string; desc: string; badge: string; icon: 'shield' | 'lock' | 'revocation'; }

export function SecurityPostureBento() {
  const cards: SecurityCardProps[] = [
    { title: 'BAA Pre-Execution', desc: 'A Business Associate Agreement (BAA) is legally executed prior to any technical connection. Patient data is covered under strict HIPAA compliance boundaries from minute zero.', badge: 'HIPAA Compliant', icon: 'shield' },
    { title: 'Deterministic PHI Stripping', desc: 'All incoming communication undergoes localized PHI scrubbing. Personal identifiers, names, and contact credentials are automatically redacted before routing to any compute endpoint.', badge: 'Privacy Airlock', icon: 'lock' },
    { title: 'Instant Disconnect', desc: 'The integration uses a read-only API key generated inside your Boulevard dashboard. You can revoke the access token there at any time.', badge: 'Access stays in your control', icon: 'revocation' },
  ];

  return (
    <section className="py-28 bg-cream border-b border-sand-deep/60 relative overflow-hidden">
      {/* Soft persistent sage ambience behind the panel grid */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(127,143,120,0.06),transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-clay mb-4">Technical Safeguards</p>
          <h2 className="font-display text-4xl text-espresso leading-tight sm:text-5xl md:text-[3.25rem]">Data Access &amp; Security</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-mist max-w-xl mx-auto">
            Three defensive layers constructed to enforce absolute confidentiality, BAA compliance, and structural control on top of your existing Boulevard workspace.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => <BentoCard key={i} card={card} />)}
        </div>
      </div>
    </section>
  );
}

/* ── Refined SVG Icon Loops ────────────────────────────────────────────── */

function ShieldIconLoop({ isHovered }: { isHovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-colors duration-500">
      <motion.path
        d="M12 2L4 5v5.6c0 4.9 3.5 9.5 8 11.4 4.5-1.9 8-6.5 8-11.4V5l-8-3z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        animate={isHovered ? { strokeDasharray: ['1 60', '60 0'] } : { strokeDasharray: '60 0' }}
        transition={{ duration: 1.6, ease: luxuryEase, repeat: isHovered ? Infinity : 0 }}
      />
      <motion.path
        d="M9 12l2 2 4-4"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isHovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: luxuryEase }}
      />
    </svg>
  );
}

function LockIconLoop({ isHovered }: { isHovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-colors duration-500">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <motion.path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={isHovered ? { y: [0, -2.5, 0], rotate: [0, -4, 0] } : { y: 0, rotate: 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut', repeat: isHovered ? Infinity : 0 }}
      />
      {/* Lock keyhole dot */}
      <motion.circle
        cx="12" cy="16" r="1.2" fill="currentColor"
        animate={isHovered ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.4, ease: 'easeInOut', repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}

function RevocationIconLoop({ isHovered }: { isHovered: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-colors duration-500">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <motion.path
        d="M12 7v5M12 14v0"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isHovered ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: isHovered ? Infinity : 0 }}
      />
      <motion.path
        d="M15 9.5a5.5 5.5 0 1 1-6 0"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={isHovered ? { strokeDasharray: ['1 32', '18 0'] } : { strokeDasharray: '18 0' }}
        transition={{ duration: 1.4, ease: luxuryEase, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}

function BentoCard({ card }: { card: SecurityCardProps }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reducedMotion) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1000px) rotateX(${-(y / (rect.height / 2)) * 3.5}deg) rotateY(${(x / (rect.width / 2)) * 3.5}deg) translateY(-3px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full rounded-3xl border border-sand-deep bg-cream p-8 shadow-[0_4px_20px_rgba(85,62,41,0.02)] transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden ${
        isHovered ? 'shadow-[0_20px_52px_rgba(127,143,120,0.13)] border-[#7f8f78]/30' : ''
      }`}
    >
      {/* Radial sage glow on hover */}
      <motion.div
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: luxuryEase }}
        className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_50%_20%,rgba(127,143,120,0.09),transparent_65%)] pointer-events-none"
      />

      <div className="relative">
        {/* Icon + badge */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500 ${
            isHovered ? 'bg-[#7f8f78]/10 border-[#7f8f78]/35 text-[#7f8f78]' : 'bg-[#f3eadf] border-sand-deep text-clay'
          }`}>
            {card.icon === 'shield' && <ShieldIconLoop isHovered={isHovered} />}
            {card.icon === 'lock' && <LockIconLoop isHovered={isHovered} />}
            {card.icon === 'revocation' && <RevocationIconLoop isHovered={isHovered} />}
          </div>
          <span className="rounded-full border border-sand-deep bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#7a7066]">{card.badge}</span>
        </div>

        <h3 className="font-display text-2xl text-espresso mb-4">{card.title}</h3>

        {/* Bulleted content */}
        <div className="text-[13px] leading-relaxed text-mist space-y-2">
          {card.icon === 'shield' && (
            <>
              <p>Our HIPAA protocol establishes strict accountability before we integrate:</p>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[12.5px] text-mist/90">
                <li>Full BAA executed prior to connection.</li>
                <li>Data covered under HIPAA compliance boundaries.</li>
                <li>Zero clinical routing or patient medical advice.</li>
              </ul>
            </>
          )}
          {card.icon === 'lock' && (
            <>
              <p>Your patient transcripts are kept private via automatic scrubbing:</p>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[12.5px] text-mist/90">
                <li>Names, D.O.B., and contact details redacted.</li>
                <li>Clinical triggers route exceptions to staff.</li>
                <li>Transcripts not stored on external AI models.</li>
              </ul>
            </>
          )}
          {card.icon === 'revocation' && (
            <>
              <p>You control the connection through your own access key:</p>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[12.5px] text-mist/90">
                <li>Connected via a read-only API access token.</li>
                <li>API can be revoked inside Boulevard in 1 click.</li>
                <li>No cancellation calls or support tickets needed.</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
