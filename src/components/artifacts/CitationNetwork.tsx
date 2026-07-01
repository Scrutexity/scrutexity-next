'use client';

/**
 * CitationNetwork — how AI engines cite the client.
 * Center node = client website; surrounding nodes = AI engines from the
 * canonical model. Connections animate; hovering an engine reveals citation
 * quality + gaps. Warm dark-brown + sage treatment (footer style).
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { ArtifactHeading, Reveal, BlueprintGrid, MONO_STACK, EASE } from './_shared';
import { SAMPLE_CITATIONS, type CitationEngine } from '@/lib/claim-intelligence';

const QUALITY_COLOR: Record<CitationEngine['quality'], string> = {
  Strong: '#C7D4C2',
  Partial: '#B7896B',
  Weak: '#6b1d2f',
};

export interface CitationNetworkProps {
  engines?: CitationEngine[];
}

export default function CitationNetwork({ engines = SAMPLE_CITATIONS }: CitationNetworkProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CitationEngine | null>(null);
  const center = { x: 50, y: 48 };

  return (
    <section className="relative overflow-hidden border-t border-sand-deep/15 bg-espresso px-5 py-24 text-cream sm:px-8 md:py-32">
      <BlueprintGrid dark />
      <div className="absolute -top-24 left-1/2 h-64 w-[70vw] -translate-x-1/2 rounded-full bg-sage-deep/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <ArtifactHeading
            tone="dark"
            kicker="AI Visibility · Citation Map"
            title="How AI engines"
            italic="cite — or distort — you."
            body="We map how each answer engine describes your business and where its sources are missing or broken. Hover an engine to inspect its citation quality."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* graph */}
          <Reveal delay={0.05}>
            <div className="relative aspect-square w-full max-w-xl">
              {/* connection lines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
                {engines.map((e, i) => {
                  const dim = active && active.id !== e.id;
                  return (
                    <motion.line
                      key={e.id}
                      x1={center.x}
                      y1={center.y}
                      x2={e.x}
                      y2={e.y}
                      stroke={QUALITY_COLOR[e.quality]}
                      strokeWidth={active?.id === e.id ? 0.6 : 0.3}
                      strokeDasharray="2 2"
                      style={{ opacity: dim ? 0.2 : 0.7 }}
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      whileInView={reduce ? undefined : { pathLength: 1, opacity: dim ? 0.2 : 0.7 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.12 }}
                    />
                  );
                })}
                {!reduce &&
                  engines.map((e, i) => (
                    <motion.circle
                      key={`pulse-${e.id}`}
                      r={0.7}
                      fill={QUALITY_COLOR[e.quality]}
                      initial={{ cx: center.x, cy: center.y }}
                      animate={{ cx: [center.x, e.x], cy: [center.y, e.y] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                      style={{ opacity: active && active.id !== e.id ? 0.15 : 0.9 }}
                    />
                  ))}
              </svg>

              {/* center node */}
              <NodeChip x={center.x} y={center.y} center>
                <Globe size={15} className="text-espresso" />
                <span>Your site</span>
              </NodeChip>

              {/* engine nodes */}
              {engines.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onMouseEnter={() => setActive(e)}
                  onFocus={() => setActive(e)}
                  onMouseLeave={() => setActive(null)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(e)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${e.x}%`, top: `${e.y}%` }}
                  aria-label={`${e.name}: ${e.quality} citation quality`}
                >
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold backdrop-blur transition-all ${
                      active?.id === e.id
                        ? 'border-sage-soft/60 bg-sage-soft/15 text-cream scale-105'
                        : 'border-cream/15 bg-cream/[0.06] text-cream/85'
                    }`}
                    style={{ fontFamily: MONO_STACK }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: QUALITY_COLOR[e.quality] }} />
                    {e.name}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* detail panel */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-cream/12 bg-cream/[0.04] p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-cream/45" style={{ fontFamily: MONO_STACK }}>
                {active ? `${active.name} · citation detail` : 'Hover an engine'}
              </p>
              <p className="mt-3 font-display text-2xl text-cream">
                {active ? `${active.confidence}% confidence` : 'Inspect any answer engine'}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">
                {active
                  ? `${active.name} describes you with ${active.quality.toLowerCase()} citation quality.`
                  : 'Each line is a citation path from an AI engine back to your site. Color shows source quality.'}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Stat label="Quality" value={active ? active.quality : '—'} />
                <Stat label="Missing src" value={active ? String(active.missing) : '—'} />
                <Stat label="Broken proof" value={active ? String(active.broken) : '—'} />
              </div>

              <div className="mt-6 space-y-2">
                {(['Strong', 'Partial', 'Weak'] as CitationEngine['quality'][]).map((q) => (
                  <div key={q} className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: QUALITY_COLOR[q] }} />
                    <span className="text-xs text-cream/70">{q} citation</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function NodeChip({ x, y, center, children }: { x: number; y: number; center?: boolean; children: React.ReactNode }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-bold ${
          center ? 'bg-cream text-espresso shadow-[0_0_30px_rgba(199,212,194,0.4)]' : ''
        }`}
        style={{ fontFamily: MONO_STACK }}
      >
        {children}
      </span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-cream/12 bg-cream/[0.04] p-3 text-center">
      <p className="font-display text-lg text-cream">{value}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-cream/45" style={{ fontFamily: MONO_STACK }}>
        {label}
      </p>
    </div>
  );
}
