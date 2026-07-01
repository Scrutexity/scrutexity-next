'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DataCardProps {
  metric: string;
  label: string;
  ledgerContext: string;
}

export default function DataCard({ metric, label, ledgerContext }: DataCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      className="group relative overflow-hidden rounded-lg border border-[#d9e5df] bg-white/88 p-6 shadow-[0_22px_58px_-34px_rgba(11,82,91,0.55)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-success/70 hover:shadow-[0_28px_70px_-32px_rgba(0,245,212,0.48)]"
    >
      <button
        type="button"
        className="flex w-full items-start justify-between gap-5 text-left"
        onClick={() => setIsExpanded((value) => !value)}
        aria-expanded={isExpanded}
      >
        <span>
          <span className="font-space-grotesk block text-5xl font-semibold leading-none tracking-normal text-primary sm:text-6xl">
            {metric}
          </span>
          <span className="mt-4 block text-base leading-7 text-[#405c5f]">{label}</span>
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-success/35 bg-success/10 text-primary"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="ledger"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="font-jetbrains mt-6 border-t border-[#d9e5df] bg-[#f4fbf8] p-4 text-xs leading-6 text-[#29484a]">
              {ledgerContext}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-urgency via-success to-primary transition-all duration-700 group-hover:w-full" />
    </motion.article>
  );
}
