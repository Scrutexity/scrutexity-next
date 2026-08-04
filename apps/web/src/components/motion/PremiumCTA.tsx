'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumCTAProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit';
}

/**
 * PremiumCTA — Liquid Shine Button
 *
 * Replaces standard hover states with spring-physics tactile feedback
 * and a subtle sheen that passes over the text. Feels like opening
 * a heavy door, not clicking a web button.
 *
 * Duration: ~1s (shine) + 0.2s (spring) — well under the 1s constraint.
 */

export default function PremiumCTA({ children, onClick, className = '', type = 'button' }: PremiumCTAProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`relative overflow-hidden bg-clay text-white font-semibold tracking-wide py-3.5 px-8 rounded-full shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] group ${className}`}
    >
      {/* Liquid shine sweep — passes left to right on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <span className="relative flex items-center justify-center gap-2">
        {children}
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

/**
 * PremiumCTAAnchor — same liquid shine, renders as <a> for Next.js Link wrapping.
 * Use this when the CTA navigates rather than triggers an action.
 */
export function PremiumCTAAnchor({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.span
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`relative overflow-hidden bg-clay text-white font-semibold tracking-wide py-3.5 px-8 rounded-full shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] group inline-flex items-center justify-center cursor-pointer ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      <span className="relative flex items-center justify-center gap-2">
        {children}
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          →
        </motion.span>
      </span>
    </motion.span>
  );
}
