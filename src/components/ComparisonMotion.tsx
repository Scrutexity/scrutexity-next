'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const enabled = process.env.NEXT_PUBLIC_ENABLE_2026_UI === 'true';

export function GradientComparisonHeading({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (!enabled || reduced) return <>{children}</>;
  return (
    <motion.span
      className="inline-block bg-clip-text text-transparent"
      style={{ backgroundImage: 'linear-gradient(90deg,#d879aa,#8f73c8,#c89a4b,#d879aa)', backgroundSize: '300% 100%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}

export function ComparisonCardMotion({ index, children }: { index: number; children: ReactNode }) {
  const reduced = useReducedMotion();
  if (!enabled || reduced) return children;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 28 }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(216,121,170,0.20)' }}
      className="h-full rounded-[1.75rem] will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedTableRow({ index, children, className }: { index: number; children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (!enabled || reduced) return <tr className={className}>{children}</tr>;
  return (
    <motion.tr
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.05, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.tr>
  );
}

export function FAQAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <div className="mt-8 space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="overflow-hidden rounded-2xl border border-sand-deep bg-cream">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-5 p-6 text-left font-semibold"
            >
              {item.question}
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={enabled && !reduced ? { type: 'spring', stiffness: 400, damping: 25 } : { duration: 0 }}>
                <ChevronDown className="h-5 w-5 text-[#8a533b]" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={enabled && !reduced ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={enabled && !reduced ? { type: 'spring', stiffness: 400, damping: 25 } : { duration: 0 }}
                >
                  <p className="px-6 pb-6 text-sm leading-7 text-mist">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function AuditBurstLink({ children, className }: { children: ReactNode; className?: string }) {
  const [burst, setBurst] = useState(0);
  const reduced = useReducedMotion();
  return (
    <Link href="/revenue-leak-audit" onClick={() => setBurst((value) => value + 1)} className={`relative ${className ?? ''}`}>
      {children}
      {enabled && !reduced && (
        <span key={burst} aria-hidden="true" className="pointer-events-none absolute inset-1/2">
          {Array.from({ length: 10 }, (_, index) => {
            const angle = (index / 10) * Math.PI * 2;
            return (
              <motion.span
                key={index}
                className="absolute h-2 w-2 rounded-full bg-[#efb6d2]"
                initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                animate={{ x: Math.cos(angle) * 54, y: Math.sin(angle) * 54, opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            );
          })}
        </span>
      )}
    </Link>
  );
}
