"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { PMS_BRANDS } from './pms-logos';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function HeroSketchSection() {
  const reduced = useReducedMotion() ?? false;
  const blockNumber = useStore((s) => s.blockNumber);

  return (
    <section className="w-full bg-cream min-h-[88vh] flex items-center py-20 lg:py-28 px-6 font-sans relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* LEFT: Copy */}
        <div className="lg:col-span-5 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
            BAA-Governed Revenue Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="text-5xl lg:text-[5rem] font-display text-ink tracking-[-0.03em] leading-[1.02]"
          >
            Stop bleeding revenue{' '}
            <span className="italic text-sage-deep">you already earned.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="text-base text-mist max-w-lg leading-[1.55] font-sans"
          >
            A read-only, BAA-governed layer over your scheduling system. Missed
            inquiries route to your licensed staff — you pay only if they recover
            bookings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="flex flex-wrap items-center gap-7"
          >
            <a
              href="/pilot"
              className="group px-7 py-4 bg-sage-deep hover:bg-ink text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm flex items-center gap-2"
              style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
            >
              Start 14-Day Pilot
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/leak-audit"
              className="group text-sm font-sans font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              Run a free leak scan
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="pt-8 border-t border-sand-deep/20"
          >
            <p
              className="text-[11px] uppercase tracking-[0.14em] text-mist/70 leading-[1.6]"
              style={{ fontFamily: MONO_STACK }}
            >
              BAA-READY · READ-ONLY · SHA-256 LEDGER · NO RECOVERY · NO FEE
            </p>
          </motion.div>
        </div>

        {/* RIGHT: Pipeline diagram — 7 cols, 3 stacked depth layers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="lg:col-span-7 w-full relative min-h-[280px] lg:min-h-[600px] flex items-center justify-center"
        >
          {/* LAYER 1 — BLUEPRINT GRID (z-0) — etched into cream */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 700 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern id="bp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#A89F8C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="700" height="600" fill="url(#bp-grid)" opacity="0.22" />

            {/* Faint alignment rings (kept per brief — 'blueprint etched' feel) */}
            <circle cx="350" cy="300" r="240" stroke="#A89F8C" strokeWidth="0.5" opacity="0.30" strokeDasharray="2 6" />
            <circle cx="350" cy="300" r="160" stroke="#5E7A5A" strokeWidth="0.5" opacity="0.18" />

            {/* Technical labels — subtle blueprint annotations */}
            <text x="22" y="28" fontSize="8" fontFamily="monospace" fill="#A89F8C" opacity="0.55" letterSpacing="0.14em">SX-01 / PIPELINE</text>
            <text x="546" y="582" fontSize="8" fontFamily="monospace" fill="#A89F8C" opacity="0.55" letterSpacing="0.14em">REV · 06.18.26</text>
            <text x="22" y="304" fontSize="7" fontFamily="monospace" fill="#A89F8C" opacity="0.5" letterSpacing="0.1em" transform="rotate(-90 22 304)">y · axis</text>
          </svg>

          {/* LAYER 2 — PIPELINE PATH (z-10) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 700 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Input pipeline — sage, left edge → core */}
            <motion.path
              d="M 60 300 L 260 300"
              stroke="#5E7A5A"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.6 }}
            />
            {/* Tunnel arrowhead into core */}
            <motion.path
              d="M 252 296 L 260 300 L 252 304"
              stroke="#5E7A5A"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              fill="none"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 1.4 }}
            />
            {/* Tick marks on input — blueprint instrumentation */}
            {[100, 140, 180, 220].map((x) => (
              <line key={`in-${x}`} x1={x} y1="295" x2={x} y2="305" stroke="#5E7A5A" strokeWidth="0.4" opacity="0.35" />
            ))}

            {/* Output tunnel — champagne, core → right edge */}
            <motion.path
              d="M 440 300 L 640 300"
              stroke="#D4AF37"
              strokeWidth="1.4"
              strokeOpacity="0.55"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.8 }}
            />
            <motion.path
              d="M 632 296 L 640 300 L 632 304"
              stroke="#D4AF37"
              strokeWidth="1.4"
              strokeOpacity="0.6"
              fill="none"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 1.6 }}
            />
            {[480, 520, 560, 600].map((x) => (
              <line key={`out-${x}`} x1={x} y1="295" x2={x} y2="305" stroke="#D4AF37" strokeWidth="0.4" opacity="0.4" />
            ))}
          </svg>

          {/* TRAVELING SAGE PIP — the single live element */}
          {!reduced && (
            <motion.div
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full z-10 bg-sage-deep"
              style={{ boxShadow: '0 0 6px rgba(94,122,90,0.55)' }}
              animate={{
                left: ['9%', '37%', '50%', '63%', '91%'],
                scale: [1, 1, 1.5, 1, 1],
                backgroundColor: ['#5E7A5A', '#5E7A5A', '#D4AF37', '#D4AF37', '#D4AF37'],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.42, 0.5, 0.58, 1],
                repeatDelay: 0.4,
              }}
            />
          )}

          {/* LAYER 3 — CORE (z-20) — pine sphere, lock at center, hairline rings */}
          {/* LAYER 3 — CORE STACK (z-20) */}
          <div className="relative z-20 w-52 h-52 md:w-56 md:h-56 select-none">
            
            {/* 1. BOTTOM LAYER: The Practice PMS (Boulevard/Zenoti/Mangomint) — desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, x: 12, y: 12 }}
              animate={{ opacity: 1, scale: 1, x: 12, y: 12 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="hidden lg:flex absolute inset-0 w-full h-full rounded-2xl border border-sand-deep/35 bg-white/60 backdrop-blur-md flex-col justify-end p-4 shadow-[0_8px_30px_rgba(28,24,20,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.8)] z-10"
            >
              {/* Partner Wordmark Badges stacked horizontally with Colored SVG Logos */}
              <div className="absolute top-4 right-4 flex flex-col items-end gap-1 text-right">
                <span className="text-[7px] font-mono uppercase tracking-[0.14em] text-mist/60 font-extrabold mb-0.5">
                  Connected PMS
                </span>
                <div className="flex flex-col gap-1 items-end">
                  {PMS_BRANDS.map(({ name, Mark, tintBg, color }) => (
                    <div
                      key={name}
                      className="flex items-center gap-1.5 bg-white/90 border border-sand-deep/45 pl-1.5 pr-1 py-0.5 rounded shadow-[0_1px_2px_rgba(28,24,20,0.05)]"
                    >
                      <span
                        className="font-sans text-[9px] font-extrabold tracking-tight"
                        style={{ color }}
                      >
                        {name}
                      </span>
                      <div
                        className="w-4 h-4 rounded-[4px] flex items-center justify-center border border-ink/8"
                        style={{ background: tintBg }}
                      >
                        <Mark size={10} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope Boundary Chip */}
              <div className="flex flex-col items-end w-full mt-auto">
                <div className="inline-flex items-center gap-1 rounded-md border border-sand-deep/45 bg-[#F5F2EB]/55 px-1.5 py-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
                  <span className="h-1 w-1 rounded-full bg-sage-deep animate-pulse" />
                  <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-sage-deep font-bold">
                    SCOPE: read_consults
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. SECURE API CONNECTOR BRIDGE — desktop only */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 2.1 }}
              className="hidden lg:block absolute inset-0 w-full h-full overflow-visible pointer-events-none z-25"
              viewBox="0 0 224 224"
              fill="none"
            >
              <path d="M 180 180 Q 148 148, 115 115" stroke="#5E7A5A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
              {/* Directional read pull label rotated along the bridge line */}
              <text
                x="148"
                y="140"
                fill="#5E7A5A"
                fontSize="6.5"
                fontFamily="monospace"
                letterSpacing="0.08em"
                transform="rotate(-45 148 140)"
                textAnchor="middle"
                className="opacity-95 font-bold"
              >
                READ ←
              </text>
              {/* Pulsing dot traveling from bottom-right (PMS) to top-left (Scrutexity) */}
              <circle r="3" fill="#8FA98A">
                <animateMotion path="M 180 180 Q 148 148, 115 115" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </motion.svg>

            {/* 3. TOP LAYER: Scrutexity Governed Recovery Layer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -24, y: -24 }}
              animate={{ opacity: 1, scale: 1, x: -24, y: -24 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
              className="absolute inset-[26%] w-[48%] h-[48%] rounded-full flex flex-col items-center justify-center text-center p-3 border border-sage-deep/45 shadow-[0_20px_50px_rgba(35,63,51,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.15)] z-20"
              style={{
                background:
                  'radial-gradient(circle at 35% 28%, #3D6B57 0%, #2F5D4A 50%, #1F3A2D 100%)',
              }}
            >
              {/* Inner hairline rings */}
              <div className="absolute inset-2 rounded-full border border-cream/12" />
              <div className="absolute inset-5 rounded-full border border-cream/8" />

              {/* Orbital PMS bubbles — desktop only (hidden on mobile where they overlap core) */}
              <div className="hidden lg:contents">
                {[
                  { brand: PMS_BRANDS[0], pos: '-top-3.5 -left-3.5', drift: -4, duration: 4.0, delay: 0 },
                  { brand: PMS_BRANDS[2], pos: '-bottom-3.5 -left-2.5', drift: 3.5, duration: 4.5, delay: 0.5 },
                  { brand: PMS_BRANDS[1], pos: '-top-2.5 -right-3.5', drift: -3, duration: 3.8, delay: 1.0 },
                ].map(({ brand, pos, drift, duration, delay }) => {
                  const { Mark, tintBg, borderColor, name } = brand;
                  return (
                    <motion.div
                      key={name}
                      className={`absolute ${pos} w-7 h-7 rounded-full flex items-center justify-center z-30`}
                      style={{
                        background: tintBg,
                        border: `1px solid ${borderColor}`,
                        boxShadow: '0 6px 14px -4px rgba(28,24,20,0.12), inset 0 1px 1px rgba(255,255,255,0.6)',
                      }}
                      animate={reduced ? {} : { y: [0, drift, 0] }}
                      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
                    >
                      <Mark size={14} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Padlock */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 flex items-center justify-center">
                <Lock size={11} strokeWidth={2} className="text-[#D4AF37]" style={{ filter: 'drop-shadow(0 1px 2px rgba(28,24,20,0.4))' }} />
              </div>

              <div className="flex flex-col items-center text-center px-1 mt-1.5">
                <span className="text-[7.5px] uppercase tracking-[0.20em] text-cream/90" style={{ fontFamily: MONO_STACK }}>
                  Scrutexity
                </span>
                <span className="text-[7.5px] uppercase tracking-[0.20em] text-cream/90 mt-0.5" style={{ fontFamily: MONO_STACK }}>
                  Layer
                </span>
                <div className="mt-1.5 h-px w-4" style={{ background: 'rgba(248,246,243,0.18)' }} />
                <span className="mt-1.5 text-[6.5px] uppercase tracking-[0.14em] text-cream/55 font-bold" style={{ fontFamily: MONO_STACK }}>
                  BAA READ-ONLY
                </span>
              </div>
            </motion.div>

            {/* PMS-unchanged signal — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 2.8 }}
              className="hidden lg:flex absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap z-25 items-center gap-1.5 px-3 py-1 rounded-full border border-sand-deep/30 bg-cream/80 backdrop-blur-sm shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist font-semibold">
                ✓ Your booking system: untouched
              </span>
            </motion.div>

          </div>

          {/* LAYER 4 — GLASS CARDS (z-30) */}

          {/* INPUT: Inbound inquiry — styled as a real SMS / email notification */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
            className="hidden lg:block absolute z-30 top-[14%] left-[1%] w-[228px] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(248,246,243,0.85)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(248,246,243,0.95)',
              boxShadow: '0 14px 36px -12px rgba(28,24,20,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
          >
            <div className="px-4 py-2.5 border-b border-sand-deep/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pine/15 flex items-center justify-center">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2F5D4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-mist" style={{ fontFamily: MONO_STACK }}>
                  Inbound · SMS
                </span>
              </div>
              <span className="text-[10px] text-mist/60 tabular-nums" style={{ fontFamily: MONO_STACK }}>
                2m
              </span>
            </div>
            <div className="px-4 py-3 flex flex-col items-start gap-2">
              <div 
                className="bg-[#007AFF] text-white px-3.5 py-1.5 rounded-[18px] rounded-br-[4px] text-[11px] leading-snug font-sans font-medium max-w-[95%] shadow-[0_1px_2px_rgba(0,122,255,0.25)] relative"
                style={{ wordBreak: 'break-word' }}
              >
                Hi! Do you have anything next Tuesday?
              </div>
              <p className="text-[9px] uppercase tracking-[0.10em] text-pine flex items-center gap-1.5 mt-0.5" style={{ fontFamily: MONO_STACK }}>
                <span className="w-1.5 h-1.5 rounded-full bg-pine animate-pulse" />
                Captured · governed routing
              </p>
            </div>
          </motion.div>

          {/* Read-Only Tunnel label — floats above the input pipeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
            className="hidden lg:block absolute z-30 top-[42%] left-[20%]"
          >
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(248,246,243,0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(248,246,243,0.95)',
                boxShadow: '0 6px 18px -8px rgba(28,24,20,0.14)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
              <span className="text-[9px] uppercase tracking-[0.14em] text-pine" style={{ fontFamily: MONO_STACK }}>
                Read-Only Tunnel
              </span>
            </div>
          </motion.div>

          {/* OUTPUT: Sealed deposit receipt */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 2.5 }}
            className="hidden lg:block absolute z-30 bottom-[14%] right-[1%] w-[210px] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(248,246,243,0.92)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(248,246,243,0.95)',
              boxShadow: '0 18px 44px -14px rgba(28,24,20,0.22), inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
          >
            <div className="px-4 py-2.5 border-b border-sand-deep/25 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Lock size={11} strokeWidth={2} className="text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-[0.14em] text-pine" style={{ fontFamily: MONO_STACK }}>
                  Sealed
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.10em] text-mist/60" style={{ fontFamily: MONO_STACK }}>
                Illustrative
              </span>
            </div>
            <div className="px-4 py-3 pb-2.5">
              <span className="text-[10px] uppercase tracking-[0.14em] text-mist/65 block" style={{ fontFamily: MONO_STACK }}>
                Recovered
              </span>
              <h4 className="font-display text-2xl text-ink tabular-nums tracking-tight leading-none mt-1">
                $6,480
              </h4>
              <p className="mt-1 text-[11px] font-sans text-mist">
                14 PMS-verified deposits
              </p>
              <div className="mt-2 h-px w-12" style={{ background: '#D4AF37' }} />
            </div>
            <div className="px-4 py-2 border-t border-sand-deep/20 flex justify-between items-center text-[8px] text-mist/55 font-mono">
              <span>Block {blockNumber.toLocaleString('en-US')}</span>
              <span>11:42:08 UTC</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
