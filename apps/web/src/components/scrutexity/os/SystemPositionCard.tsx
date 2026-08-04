"use client";

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getLayer, type Layer } from './layers';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[9px] uppercase tracking-[0.16em] text-mist/70" style={{ fontFamily: MONO }}>
        {label}
      </span>
      <span className="mt-1 block font-display text-lg text-espresso leading-tight">{value}</span>
    </div>
  );
}

/**
 * The System Position card: tells the visitor exactly where this page sits in
 * the Scrutexity Operating System — its layer number, input, output, and the
 * next layer it hands off to.
 */
export function SystemPositionCard({ layer, className = '' }: { layer: Layer; className?: string }) {
  const reduce = useReducedMotion();
  const next = layer.nextId ? getLayer(layer.nextId) : undefined;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`overflow-hidden rounded-2xl border border-sand-deep/30 bg-bone shadow-[0_1px_2px_rgba(28,24,20,0.04),0_18px_44px_-30px_rgba(28,24,20,0.25)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-sand-deep/25 px-5 py-3">
        <span className="text-[10px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
          System Position
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-mist" style={{ fontFamily: MONO }}>
          Layer {layer.layerNo} of 6
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5 p-5 sm:grid-cols-4 sm:items-center">
        <Field label="Current Layer" value={layer.name} />
        <Field label="Input" value={layer.input} />
        <Field label="Output" value={layer.output} />
        {next ? (
          <Link
            href={next.slug}
            className="group flex items-center justify-between rounded-xl border border-sand-deep/35 bg-cream px-4 py-3 transition-colors hover:border-sage-deep/50"
          >
            <div>
              <span className="block text-[9px] uppercase tracking-[0.16em] text-mist/70" style={{ fontFamily: MONO }}>
                Next
              </span>
              <span className="mt-1 block font-display text-lg text-espresso leading-tight">{next.name}</span>
            </div>
            <ArrowRight size={16} className="text-sage-deep transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <Field label="Next" value="—" />
        )}
      </div>
    </motion.div>
  );
}

export default SystemPositionCard;
