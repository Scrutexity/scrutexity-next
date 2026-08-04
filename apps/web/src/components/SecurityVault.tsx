'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lock, FileCheck, ShieldCheck, UserCheck } from 'lucide-react';
import SecurityBeacon from './SecurityBeacon';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

/**
 * SecurityVault — "The Protocol of Discretion"
 *
 * Brushed-metal vault aesthetic over deep warm charcoal (#1A1A1A).
 * Four Lutron-style architectural light-switch toggles, each locked ON, for
 * the four trust commitments. Muted sage (#B2AC88) borders, high-penumbra
 * shadows, no glow. Reads as a physical control panel, not a SaaS dashboard.
 */

interface ProtocolSwitch {
  id: string;
  label: string;
  detail: string;
  Icon: typeof Lock;
}

const protocols: ProtocolSwitch[] = [
  {
    id: 'read-only',
    label: 'Read-only access',
    detail: 'No write permission. We observe; we never modify your PMS, calendar, or patient files.',
    Icon: Lock,
  },
  {
    id: 'baa',
    label: 'BAA signed first',
    detail: 'A Business Associate Agreement is executed and on file before any read connection is established.',
    Icon: FileCheck,
  },
  {
    id: 'phi-stripped',
    label: 'PHI minimized at edge',
    detail: 'Identifiers and health-intent indicators are stripped at the boundary, never landing in our application layer.',
    Icon: ShieldCheck,
  },
  {
    id: 'staff-handoff',
    label: 'Clinical questions → your staff',
    detail: 'Any message flagged clinical halts the automated reply and routes straight to your licensed staff inside Boulevard.',
    Icon: UserCheck,
  },
];

export default function SecurityVault() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#1A1A1A] px-5 py-24 sm:px-8 lg:py-32"
    >
      {/* Architectural ambient — warm key + sage rim */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,rgba(255,245,230,0.06),transparent_55%),radial-gradient(ellipse_at_80%_85%,rgba(178,172,136,0.10),transparent_55%)]" />
      {/* Brushed-metal subtle vertical grain on the whole section */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent 0 2px, rgba(255,245,230,0.6) 2px 3px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-mist">
            The protocol of discretion
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-[#F8F7F3] md:text-4xl lg:text-5xl">
            Four locks. <span className="text-mist">Always engaged.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#E8E0D8]/70">
            Scrutexity reads the floor without touching the floor. Every recovery is performed under the same four constraints &mdash; before, during, and after the pilot.
          </p>
        </motion.div>

        {/* The vault panel — brushed metal + sage hairlines */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: cinematicEase }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Panel outer — heavy frame with high-penumbra shadow */}
          <div
            className="relative rounded-[28px] border border-[#B2AC88]/22 p-6 sm:p-9 lg:p-12"
            style={{
              background:
                'linear-gradient(180deg, rgba(36,32,28,0.85) 0%, rgba(24,22,20,0.95) 50%, rgba(36,32,28,0.85) 100%)',
              boxShadow:
                /* High-penumbra outer — large soft shadow, no harsh edge */
                '0 60px 120px -40px rgba(0,0,0,0.55), 0 8px 24px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,245,230,0.06), inset 0 -1px 0 rgba(0,0,0,0.35)',
            }}
          >
            {/* Top vault tag */}
            <div className="mb-8 flex items-center justify-between border-b border-[#B2AC88]/18 pb-4 sm:mb-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-mist">
                Vault · Always-on protocols
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F8F7F3]/55">
                <SecurityBeacon tone="sage" size="sm" />
                Live · monitored
              </span>
            </div>

            {/* Switch grid */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:gap-9">
              {protocols.map((p, i) => (
                <ProtocolToggle key={p.id} protocol={p} index={i} isInView={isInView} />
              ))}
            </div>

            {/* Footer fine print */}
            <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#B2AC88]/18 pt-5 sm:flex-row sm:items-center sm:gap-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F8F7F3]/55">
                Per-clinic BAA framework
              </p>
              <a
                href="/security-brief"
                className="group inline-flex items-center gap-2 rounded-full border border-[#B2AC88]/35 bg-[#B2AC88]/8 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist transition-colors hover:border-[#B2AC88]/65 hover:bg-[#B2AC88]/14"
              >
                Read the security brief
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProtocolToggle({
  protocol,
  index,
  isInView,
}: {
  protocol: ProtocolSwitch;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.35 + index * 0.12, ease: cinematicEase }}
      className="flex items-start gap-5"
    >
      {/* The light switch — vertical Lutron-style toggle */}
      <div className="shrink-0">
        <div
          className="relative h-[88px] w-[42px] rounded-[10px]"
          style={{
            background:
              'linear-gradient(180deg, #2C2823 0%, #1F1C18 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,245,230,0.08), inset 0 -1px 0 rgba(0,0,0,0.4), 0 8px 18px -8px rgba(0,0,0,0.6)',
            border: '1px solid rgba(178,172,136,0.22)',
          }}
        >
          {/* "ON" label at top */}
          <div className="absolute inset-x-0 top-1.5 text-center">
            <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.2em] text-mist">
              On
            </span>
          </div>
          {/* "OFF" label at bottom */}
          <div className="absolute inset-x-0 bottom-1.5 text-center">
            <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#F8F7F3]/22">
              Off
            </span>
          </div>

          {/* Toggle handle — pulled UP (engaged) */}
          <motion.div
            initial={{ y: 22 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.55 + index * 0.12, ease: cinematicEase }}
            className="absolute left-1/2 top-5 h-[40px] w-[26px] -translate-x-1/2 rounded-[6px]"
            style={{
              background:
                'linear-gradient(180deg, #E8DFD0 0%, #C9BFA6 60%, #A89F88 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.45)',
            }}
          >
            {/* Brushed grain on the handle */}
            <div
              className="absolute inset-1 rounded-[3px] opacity-50"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(180deg, transparent 0 1px, rgba(28,24,20,0.18) 1px 2px)',
              }}
            />
          </motion.div>

          {/* Status LED */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 + index * 0.12, ease: cinematicEase }}
            className="absolute -right-2 top-3 h-2 w-2 rounded-full bg-[#B2AC88]"
            style={{ boxShadow: '0 0 6px rgba(178,172,136,0.7)' }}
          />
        </div>
      </div>

      {/* Label + detail */}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-center gap-2">
          <protocol.Icon size={14} strokeWidth={1.8} className="text-mist" />
          <h3 className="font-display text-lg leading-tight tracking-tight text-[#F8F7F3]">
            {protocol.label}
          </h3>
        </div>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-[#E8E0D8]/65">
          {protocol.detail}
        </p>
      </div>
    </motion.div>
  );
}
