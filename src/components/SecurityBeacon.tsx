'use client';

import { motion, useReducedMotion } from 'framer-motion';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/**
 * SecurityBeacon — micro pulsing champagne dot.
 *
 * Drop next to "HIPAA," "BAA," "Read-Only," "Verified," etc. to signal a live,
 * monitored security state. Champagne by default; tone="sage" or tone="pine"
 * switches the color family. Reduced-motion safe.
 */

interface SecurityBeaconProps {
  tone?: 'champagne' | 'sage' | 'pine';
  size?: 'sm' | 'md';
  className?: string;
}

const TONE_HEX: Record<NonNullable<SecurityBeaconProps['tone']>, string> = {
  champagne: '#D4AF37',
  sage: '#B2AC88',
  pine: '#2F5D4A',
};

export default function SecurityBeacon({
  tone = 'champagne',
  size = 'sm',
  className = '',
}: SecurityBeaconProps) {
  const reduced = useReducedMotion();
  const color = TONE_HEX[tone];
  const dotSize = size === 'sm' ? 6 : 8;
  const haloSize = dotSize * 3;

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: haloSize, height: haloSize }}
      aria-hidden="true"
    >
      {/* Pulse halo */}
      {!reduced && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color, opacity: 0.5 }}
          animate={{ scale: [1, 2.4], opacity: [0.45, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: cinematicEase }}
        />
      )}
      {/* Solid dot */}
      <span
        className="relative inline-block rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
    </span>
  );
}
