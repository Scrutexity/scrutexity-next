'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const C = {
  cream: '#F8F3EA',
  sage: '#8FA98A',
  sageDeep: '#5E7A5A',
  gold: '#C5A059',
  goldDeep: '#A8843B',
  ink: '#1C1814',
  mist: '#6B6259',
  sand: '#D9CCB0',
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSystemDiagram({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView || reduced) { setPhase(reduced ? 4 : 0); return; }
    const timers = [200, 600, 1000, 1400].map((t, i) =>
      setTimeout(() => setPhase(i + 1), t)
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView, reduced]);

  return (
    <div ref={ref} className={`relative ${className}`} aria-label="Scrutexity system pipeline: inquiry flows through BAA gate into governed ledger and verified deposit">
      {/* CSS keyframes */}
      <style>{`
        @keyframes pipelineFlow {
          0% { stroke-dashoffset: 360; }
          100% { stroke-dashoffset: -360; }
        }
        @keyframes stampDrop {
          0% { opacity: 0; transform: scale(0.4) rotate(-10deg); }
          70% { transform: scale(1.15) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .pipe-green { animation: pipelineFlow 4s infinite linear; }
        .pipe-green-long { animation: pipelineFlow 7s infinite linear 0.8s; }
        .pipe-gold { animation: pipelineFlow 3s infinite linear 1.6s; }
        .paused .pipe-green,
        .paused .pipe-green-long,
        .paused .pipe-gold { animation: none; }
      `}</style>

      <div className={`relative bg-cream border border-sand-deep/30 rounded-3xl p-6 md:p-8 shadow-sm min-h-[440px] flex items-center justify-center overflow-visible ${reduced ? 'paused' : ''}`}>
        {/* Engineering grid layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 600 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          <line x1="60" y1="40" x2="540" y2="40" stroke={C.sand} strokeWidth="0.5" />
          <line x1="60" y1="140" x2="540" y2="140" stroke={C.sand} strokeWidth="0.5" />
          <line x1="60" y1="300" x2="540" y2="300" stroke={C.sand} strokeWidth="0.5" />
          <line x1="60" y1="380" x2="540" y2="380" stroke={C.sand} strokeWidth="0.5" />
          <line x1="140" y1="20" x2="140" y2="400" stroke={C.sand} strokeWidth="0.5" strokeDasharray="3 5" />
          <line x1="300" y1="20" x2="300" y2="400" stroke={C.sand} strokeWidth="0.5" strokeDasharray="3 5" />
          <line x1="460" y1="20" x2="460" y2="400" stroke={C.sand} strokeWidth="0.5" strokeDasharray="3 5" />

          {/* Crosshair anchors */}
          {[[140, 140], [300, 140], [460, 140], [140, 300], [300, 300], [460, 300]].map(([cx, cy], i) => (
            <g key={i}>
              <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} stroke={C.mist} strokeWidth="1" opacity="0.4" />
              <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} stroke={C.mist} strokeWidth="1" opacity="0.4" />
              <circle cx={cx} cy={cy} r="2.5" fill={C.sageDeep} opacity="0.6" />
            </g>
          ))}

          <defs>
            <linearGradient id="streamGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={C.sageDeep} stopOpacity="0" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="100%" stopColor={C.sageDeep} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="streamGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={C.gold} stopOpacity="0" />
              <stop offset="50%" stopColor="#FDE047" stopOpacity="1" />
              <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Pipeline paths */}
          {/* Inquiry (140,140) → BAA (300,140) */}
          <path d="M140 140 L300 140" stroke={C.sand} strokeWidth="5" />
          {phase >= 1 && <path d="M140 140 L300 140" stroke="url(#streamGreen)" strokeWidth="3" strokeDasharray="60 120" className="pipe-green" />}

          {/* BAA → Ledger (140,300) via right column */}
          <path d="M300 140 L300 220 L140 220 L140 300" stroke={C.sand} strokeWidth="5" strokeLinejoin="round" fill="none" />
          {phase >= 2 && <path d="M300 140 L300 220 L140 220 L140 300" stroke="url(#streamGreen)" strokeWidth="3" strokeDasharray="80 240" strokeLinejoin="round" fill="none" className="pipe-green-long" />}

          {/* Ledger → Deposit (460,300) */}
          <path d="M300 300 L460 300" stroke={C.sand} strokeWidth="5" />
          {phase >= 3 && <path d="M300 300 L460 300" stroke="url(#streamGold)" strokeWidth="3" strokeDasharray="40 80" className="pipe-gold" />}

          {/* Drop-line from Ledger anchor to revenue report */}
          <line x1="460" y1="300" x2="460" y2="370" stroke={C.goldDeep} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

          {/* BAA ripple */}
          {phase >= 1 && (
            <motion.circle cx="300" cy="140" r="20" fill="none" stroke={C.sage} strokeWidth="1.5"
              initial={{ r: 12, opacity: 0.5 }} animate={{ r: 36, opacity: 0 }}
              transition={{ duration: 2, repeat: 2, ease: 'easeOut' }} />
          )}
        </svg>

        {/* Node grid */}
        <div className="w-full h-full relative grid grid-cols-2 gap-x-0 gap-y-0 z-10 select-none">
          {/* Inquiry — top-left anchor 140,140 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="pl-6 max-w-[160px] self-start justify-self-start pt-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-mist animate-ping" />
              <h4 className="text-xs font-sans font-bold uppercase tracking-[0.12em] text-ink">Inquiry</h4>
            </div>
            <p className="text-[11px] text-mist mt-1 font-sans">DM · Call · Form</p>
          </motion.div>

          {/* BAA — top-right anchor 300,140 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
            className="pr-6 max-w-[160px] self-start justify-self-end text-right pt-4"
          >
            <div className="flex items-center justify-end gap-2">
              <span className="text-sage-deep">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9 12l2 2 4-4"/></svg>
              </span>
              <h4 className="text-xs font-sans font-bold uppercase tracking-[0.12em] text-ink">BAA-First</h4>
            </div>
            <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-sage/5 border border-sage/15 text-[9px] font-sans font-bold tracking-[0.08em] text-sage-deep">READ-ONLY</span>
          </motion.div>

          {/* Ledger — bottom-left anchor 140,300 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            className="pl-6 max-w-[160px] self-end justify-self-start pb-16 relative"
          >
            <div className="flex items-center gap-2">
              <span className="text-mist/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
              </span>
              <h4 className="text-xs font-sans font-bold uppercase tracking-[0.12em] text-ink">Governed Ledger</h4>
            </div>
            <p className="text-[10px] font-mono text-mist mt-1 tracking-[0.06em]">0x8F...2B</p>

            {/* Spring stamp */}
            <div className="absolute -top-1 left-[135px] w-11 h-11" style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(-10deg)',
              transition: 'opacity 0.3s ease, transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.6s',
              filter: 'drop-shadow(0 4px 12px rgba(197,160,89,0.3))',
            }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill={C.cream} stroke={C.goldDeep} strokeWidth="5" />
                <circle cx="50" cy="50" r="37" stroke={C.goldDeep} strokeWidth="1" strokeDasharray="3 2" />
                <path d="M38 52 L46 60 L62 42" stroke={C.goldDeep} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* Deposit — bottom-right anchor 460,300 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
            className="pr-6 max-w-[160px] self-end justify-self-end text-right pb-16"
          >
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-gold-deep font-display font-semibold text-sm">$</span>
              <h4 className="text-xs font-sans font-bold uppercase tracking-[0.12em] text-ink">Deposit</h4>
            </div>
            <p className="text-[11px] font-sans font-semibold text-sage-deep mt-1">PMS Verified</p>
          </motion.div>

          {/* Weekly Revenue Report — anchored to drop-line */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={phase >= 3 ? { opacity: 1, y: [0, -3, 0, 3, 0] } : {}}
            transition={phase >= 3 ? {
              y: { duration: 5, ease: 'easeInOut', repeat: Infinity },
              opacity: { duration: 0.5 },
            } : {}}
            className="absolute bottom-[0px] left-1/2 -translate-x-1/2 bg-white border border-sand-deep/40 p-4 rounded-xl shadow-lg min-w-[200px] text-center hover:shadow-xl transition-shadow duration-300 z-20"
          >
            <span className="text-[9px] font-mono tracking-[0.12em] text-mist/60 uppercase block">Weekly Revenue Report</span>
            <span className="font-display text-2xl text-ink block mt-0.5 tabular-nums">$9,450</span>
            <span className="text-[10px] font-sans text-mist/70 block">4 verified deposits</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
