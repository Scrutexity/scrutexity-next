'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, HelpCircle } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

type BadgeState = 'none' | 'active' | 'expired';

export function SMarkLifecycle() {
  const shouldReduce = useReducedMotion();
  const [currentState, setCurrentState] = useState<BadgeState>('active');

  const states = {
    none: {
      color: '#6B6259',
      bg: 'rgba(107, 98, 89, 0.05)',
      border: 'border-dashed border-sand-deep',
      title: 'No Record',
      desc: 'No Scrutexity review artifact exists for this domain.',
      icon: HelpCircle,
    },
    active: {
      color: '#5E7A5A',
      bg: 'rgba(143, 169, 138, 0.12)',
      border: 'border-solid border-sage/40 shadow-[0_8px_24px_rgba(94,122,90,0.08)]',
      title: 'Review Record Active',
      desc: 'A dated review record exists for the indexed claim surface.',
      icon: ShieldCheck,
    },
    expired: {
      color: '#B7896B',
      bg: 'rgba(183, 137, 107, 0.12)',
      border: 'border-solid border-clay/40 shadow-[0_8px_24px_rgba(183,137,107,0.08)]',
      title: 'Record Expired',
      desc: 'The review window has aged out or the claim surface has changed.',
      icon: ShieldAlert,
    },
  };

  const current = states[currentState];
  const Icon = current.icon;

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg border border-sand-deep/40 bg-bone text-center">
      <span className="font-mono text-[9px] text-mist/60 uppercase tracking-widest block mb-6">
        Staleness Protocol Demonstration
      </span>

      {/* S-Mark Badge Render */}
      <div className="flex justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center p-4 transition-colors duration-300 ${current.border}`}
            style={{ backgroundColor: current.bg }}
          >
            <Icon size={32} style={{ color: current.color }} className="transition-colors duration-300" />
            <span 
              className="mt-3 font-mono text-[9px] font-bold tracking-widest uppercase block transition-colors duration-300"
              style={{ color: current.color }}
            >
              S-Mark
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="min-h-[72px]">
        <h4 className="font-display text-xl text-espresso font-semibold">{current.title}</h4>
        <p className="mt-1.5 text-xs text-mist leading-relaxed px-4">{current.desc}</p>
      </div>

      {/* Control buttons */}
      <div className="mt-8 flex justify-center gap-2 border-t border-sand-deep/20 pt-5">
        {(['none', 'active', 'expired'] as BadgeState[]).map((state) => (
          <button
            key={state}
            onClick={() => setCurrentState(state)}
            className={`px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
              currentState === state
                ? 'bg-espresso text-bone'
                : 'bg-cream text-mist hover:text-espresso border border-sand-deep/20'
            }`}
          >
            {state === 'none' ? 'No Record' : state === 'active' ? 'Active' : 'Expired'}
          </button>
        ))}
      </div>
    </div>
  );
}
