'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Lock, FileCheck, ShieldCheck, Eye } from 'lucide-react';
import Section from '@/components/ui-custom/section';
import Reveal, { staggerContainer, staggerItem } from '@/components/ui-custom/reveal';

/* ────────────────────────────────────────────────────────────────────────
   SECURITY — "The Vault"

   Implementation choice: per the mission's "simpler alternative if 3D
   vault feels over-engineered" path, we keep the 6 glass cards but add:

     1. Gold shimmer sweep that animates across each card sequentially on scroll
     2. Sage LED pulse dot on each card (the "SecurityBeacon")
     3. Card background shifts from bg-cream → bg-sage/5 as it enters view
     4. Slow camera-orbit feel via a subtle parallax on the section background
        (sage radial gradient that drifts with scroll)

   This avoids a 5th R3F Canvas on a homepage that already has 4
   (hero, leak, pipeline, beaker) — perf-safe.
   ──────────────────────────────────────────────────────────────────────── */

const pillars = [
  { icon: FileCheck, label: 'BAA pre-activation', detail: 'A Business Associate Agreement is executed and on file before any read connection is established.' },
  { icon: ShieldCheck, label: 'PHI minimized at edge', detail: 'Identifiers and health-intent indicators are stripped at the boundary, never landing in our application layer.' },
  { icon: Eye, label: 'Read-only bridge', detail: 'Zero write permission. We observe; we never modify your PMS, calendar, or patient files.' },
  { icon: Lock, label: 'CPOM-conscious', detail: 'Designed within the Compliance and Practice Oversight Model — no autonomous clinical decisions.' },
];

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/* ── SecurityBeacon: pulsing sage LED dot ── */
function SecurityBeacon({ delay = 0 }: { delay?: number }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      {/* Outer pulse */}
      <motion.span
        className="absolute inset-0 rounded-full bg-sage"
        animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay }}
      />
      {/* Inner solid dot */}
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage-deep shadow-[0_0_8px_rgba(94,122,90,0.6)]" />
    </span>
  );
}

/* ── Card with gold shimmer sweep + bg shift ── */
function VaultCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setInView(true);
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors duration-700 ${
        inView
          ? 'border-sage/25 bg-sage/[0.04]'
          : 'border-sand-deep/30 bg-cream'
      }`}
    >
      {/* Gold shimmer sweep — runs once when the card enters view */}
      {inView && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{
            duration: 1.4,
            ease: cinematicEase,
            delay: index * 0.12,
          }}
          style={{
            background:
              'linear-gradient(105deg, transparent 30%, rgba(197,160,89,0.18) 50%, transparent 70%)',
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/12">
              <pillar.icon size={16} className="text-sage-deep" />
            </span>
            <h3 className="font-display text-base leading-snug text-espresso" style={{ letterSpacing: '-0.02em' }}>
              {pillar.label}
            </h3>
          </div>
          <SecurityBeacon delay={index * 0.3} />
        </div>
        <p className="mt-3 text-sm leading-[1.65] text-cream/75">
          {pillar.detail}
        </p>
      </div>
    </motion.div>
  );
}

export default function Security() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Drift the sage radial gradient subtly as the user scrolls past.
  // Gated on prefers-reduced-motion — no drift if the user asked for stillness.
  const bgX = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '15%']);
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '-10%']);

  return (
    <Section className="bg-espresso" id="security">
      <div
        ref={sectionRef}
        className="relative"
      >
        {/* Sage radial glow that drifts with scroll (subtle "vault interior" feel) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(143,169,138,0.10), transparent 60%), radial-gradient(ellipse 40% 30% at 20% 30%, rgba(197,160,89,0.06), transparent 60%)',
            x: bgX,
            y: bgY,
          }}
        />

        <Reveal>
          <p className="mx-auto w-fit text-[11px] font-mono uppercase tracking-[0.18em] text-sage-soft">
            <span className="mr-2 inline-block h-1 w-1 rounded-full bg-sage-soft align-middle" />
            Always-on protocols
          </p>
          <h2 className="mt-5 text-center font-display text-3xl leading-tight text-cream md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            Four locks. <span className="italic text-sage-soft">Always engaged.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-[1.55] text-cream/75">
            Scrutexity reads the floor without touching the floor. Every recovery is performed under the same four constraints.
          </p>
        </Reveal>

        {/* Horizontal row of four stylized locks with LED status indicators */}
        <div 
          className="mt-12 max-w-xl mx-auto p-4 rounded-xl bg-cream/5 border border-cream/10 backdrop-blur-sm flex justify-around items-center"
          role="region"
          aria-label="Security system status lock indicators"
        >
          {pillars.map((p, i) => {
            const LockIcon = p.icon;
            return (
              <div 
                key={`lock-${i}`}
                className="flex flex-col items-center gap-2 group relative"
                aria-label={`Lock ${i + 1}: ${p.label} status: Engaged`}
              >
                {/* Lock container */}
                <div className="w-12 h-12 rounded-lg bg-cream/10 border border-cream/10 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105 group-hover:bg-cream/15">
                  <LockIcon className="text-sage-soft w-5 h-5" />
                  
                  {/* Glowing LED Status Indicator */}
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sage"></span>
                  </span>
                </div>
                
                {/* Lock Label */}
                <span className="text-[9px] font-mono uppercase tracking-widest text-cream/50">
                  LOCK 0{i + 1}
                </span>

                {/* Tooltip on Hover */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 p-2 rounded bg-espresso border border-cream/20 text-[10px] text-cream/90 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-30 text-center font-sans">
                  <div className="font-bold text-sage-soft">{p.label}</div>
                  <div className="mt-0.5 text-cream/70 text-[9px] leading-relaxed">{p.detail}</div>
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="mt-16 grid gap-5 sm:grid-cols-2"
        >
          {pillars.map((p, i) => (
            <VaultCard key={p.label} pillar={p} index={i} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
