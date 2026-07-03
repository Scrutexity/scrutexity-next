'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  { label: 'Submit URL', icon: '🔗', color: '#C25E49' },
  { label: 'Crawl Page', icon: '🕸️', color: '#5E7A5A' },
  { label: 'Extract Claims', icon: '📋', color: '#8B8580' },
  { label: 'Match Patterns', icon: '🎯', color: '#2C2420' },
  { label: 'Score & Report', icon: '📊', color: '#C25E49' },
];

function StepNode({ step, index, isLast }: { step: typeof STEPS[0]; index: number; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3"
    >
      <motion.div
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg shadow-sm"
        style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30` }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <span>{step.icon}</span>
        {/* Pulsing dot */}
        <motion.span
          className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
          style={{ backgroundColor: step.color }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      </motion.div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-espresso">{step.label}</p>
        {!isLast && (
          <motion.div
            className="ml-1 mt-1 h-6 w-px"
            style={{ backgroundColor: `${step.color}30` }}
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function ProcessFlowChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="w-full">
      {isInView && (
        <div className="flex flex-col gap-1">
          {STEPS.map((step, i) => (
            <StepNode key={step.label} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      )}

      {/* Animated connection line */}
      <svg className="mt-2 h-2 w-full" viewBox="0 0 200 8">
        <motion.path
          d="M0 4 H200"
          stroke="#5E7A5A"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
        />
      </svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-mist/60"
      >
        End-to-end · ~30 seconds
      </motion.p>
    </div>
  );
}
