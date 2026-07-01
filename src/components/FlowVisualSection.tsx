'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageSquare, FileText, Calendar, CheckCircle2, DollarSign, AtSign, Mail, ClipboardList, BellRing } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

// R3F Canvas must be client-only — dynamic import with ssr: false avoids hydration errors
const FlowOrb = dynamic(() => import('./FlowOrb'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(47,93,74,0.18),transparent_70%)] blur-2xl" />
    </div>
  ),
});

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

interface FloatingItem {
  Icon: IconType;
  // position % within the side column (x: 0–100, y: 0–100)
  x: number;
  y: number;
  // animation delay + drift radius
  delay: number;
  drift: number;
  // sizing
  size: number;
  // tone
  tone: 'clay' | 'gold' | 'pine' | 'cream';
}

const leftItems: FloatingItem[] = [
  { Icon: Phone, x: 12, y: 14, delay: 0.0, drift: 8, size: 44, tone: 'clay' },
  { Icon: MessageSquare, x: 58, y: 8, delay: 0.6, drift: 10, size: 52, tone: 'cream' },
  { Icon: FileText, x: 28, y: 38, delay: 1.0, drift: 12, size: 60, tone: 'gold' },
  { Icon: AtSign, x: 70, y: 44, delay: 1.4, drift: 9, size: 40, tone: 'clay' },
  { Icon: Mail, x: 10, y: 64, delay: 0.3, drift: 11, size: 46, tone: 'cream' },
  { Icon: ClipboardList, x: 50, y: 76, delay: 0.9, drift: 8, size: 50, tone: 'gold' },
  { Icon: BellRing, x: 80, y: 80, delay: 1.6, drift: 10, size: 42, tone: 'clay' },
];

const rightItems: FloatingItem[] = [
  { Icon: Calendar, x: 26, y: 10, delay: 0.2, drift: 9, size: 52, tone: 'pine' },
  { Icon: CheckCircle2, x: 70, y: 16, delay: 0.7, drift: 8, size: 44, tone: 'pine' },
  { Icon: DollarSign, x: 14, y: 38, delay: 1.1, drift: 10, size: 48, tone: 'gold' },
  { Icon: Calendar, x: 56, y: 44, delay: 0.4, drift: 11, size: 56, tone: 'pine' },
  { Icon: CheckCircle2, x: 30, y: 68, delay: 1.3, drift: 9, size: 42, tone: 'pine' },
  { Icon: DollarSign, x: 76, y: 72, delay: 0.5, drift: 8, size: 46, tone: 'gold' },
  { Icon: Calendar, x: 10, y: 84, delay: 1.5, drift: 10, size: 50, tone: 'pine' },
];

const TONE_STYLES: Record<FloatingItem['tone'], { bg: string; border: string; color: string; shadow: string }> = {
  clay: {
    bg: 'rgba(255,250,242,0.78)',
    border: '1px solid rgba(184,125,107,0.32)',
    color: '#B87D6B',
    shadow: '0 14px 32px -14px rgba(184,125,107,0.45), inset 0 1px 1px rgba(255,255,255,0.65)',
  },
  cream: {
    bg: 'rgba(255,250,242,0.92)',
    border: '1px solid rgba(28,24,20,0.06)',
    color: '#8a533b',
    shadow: '0 14px 36px -16px rgba(28,24,20,0.18), inset 0 1px 1px rgba(255,255,255,0.7)',
  },
  gold: {
    bg: 'rgba(255,247,232,0.85)',
    border: '1px solid rgba(217,160,103,0.40)',
    color: '#a67a3d',
    shadow: '0 14px 32px -14px rgba(217,160,103,0.45), inset 0 1px 1px rgba(255,255,255,0.7)',
  },
  pine: {
    bg: 'rgba(232,243,234,0.85)',
    border: '1px solid rgba(47,93,74,0.32)',
    color: '#2F5D4A',
    shadow: '0 14px 32px -14px rgba(47,93,74,0.40), inset 0 1px 1px rgba(255,255,255,0.6)',
  },
};

function FloatingIcon({ item, side }: { item: FloatingItem; side: 'left' | 'right' }) {
  const reduced = useReducedMotion();
  const tone = TONE_STYLES[item.tone];

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: item.size,
        height: item.size,
      }}
      initial={{ opacity: 0, scale: 0.6, x: side === 'left' ? -12 : 12 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: item.delay * 0.18, ease: cinematicEase }}
    >
      <motion.div
        className="flex h-full w-full items-center justify-center rounded-2xl backdrop-blur-xl"
        style={{
          background: tone.bg,
          border: tone.border,
          boxShadow: tone.shadow,
        }}
        animate={
          reduced
            ? undefined
            : {
                y: [0, -item.drift, 0],
                rotate: [0, side === 'left' ? -2 : 2, 0],
              }
        }
        transition={{
          duration: 6 + item.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <item.Icon size={item.size * 0.42} strokeWidth={1.7} style={{ color: tone.color }} />
      </motion.div>
    </motion.div>
  );
}

export default function FlowVisualSection() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 lg:py-28">
      {/* Warm radial wash + soft pine pool under the orb */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(47,93,74,0.10),transparent_55%),radial-gradient(ellipse_at_10%_20%,rgba(217,160,103,0.08),transparent_50%),radial-gradient(ellipse_at_90%_20%,rgba(184,125,107,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-3 inline-block font-mono text-xs font-bold uppercase tracking-[0.2em] text-mist">
            From inquiry to booked deposit
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-espresso md:text-4xl">
            Re-engage the inquiries your team can&rsquo;t reach.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-mist">
            Read-only access. No migration. Clinical questions still route to your staff.
          </p>
        </motion.div>

        {/* Visual canvas: 3-column layout on desktop, stacked on mobile */}
        <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_minmax(0,1.05fr)_1fr]">
          {/* LEFT — incoming inquiries */}
          <div className="relative order-2 hidden h-[520px] w-full lg:order-1 lg:block">
            {leftItems.map((item, i) => (
              <FloatingIcon key={`L-${i}`} item={item} side="left" />
            ))}
          </div>

          {/* CENTER — the 3D glass orb */}
          <div className="relative order-1 mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px] lg:order-2">
            {/* Soft floor reflection */}
            <div className="pointer-events-none absolute inset-x-12 bottom-10 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,93,74,0.22),transparent_70%)] blur-2xl" />
            <FlowOrb />
            {/* Caption chip below orb */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5, ease: cinematicEase }}
              className="absolute inset-x-0 -bottom-2 mx-auto flex w-fit items-center gap-2 rounded-full border border-sand bg-cream/85 px-4 py-2 shadow-[0_18px_50px_-20px_rgba(61,43,31,0.16),inset_0_1px_1px_rgba(255,255,255,0.7)] backdrop-blur-xl"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2F5D4A] shadow-[0_0_8px_rgba(47,93,74,0.6)]" />
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-espresso/70">
                Scrutexity recovery engine
              </span>
            </motion.div>
          </div>

          {/* RIGHT — bookings / deposits */}
          <div className="relative order-3 hidden h-[520px] w-full lg:block">
            {rightItems.map((item, i) => (
              <FloatingIcon key={`R-${i}`} item={item} side="right" />
            ))}
          </div>
        </div>

        {/* Mobile-only side rails — compressed horizontal strips so phone users still get the narrative */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:hidden">
          <div className="relative h-32">
            {leftItems.slice(0, 4).map((item, i) => (
              <FloatingIcon key={`ML-${i}`} item={{ ...item, size: 36 }} side="left" />
            ))}
          </div>
          <div className="relative h-32">
            {rightItems.slice(0, 4).map((item, i) => (
              <FloatingIcon key={`MR-${i}`} item={{ ...item, size: 36 }} side="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
