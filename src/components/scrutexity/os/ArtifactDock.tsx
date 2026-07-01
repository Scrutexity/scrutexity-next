"use client";

import { motion, useReducedMotion } from 'framer-motion';
import {
  FileJson,
  FileText,
  FileSpreadsheet,
  FileCode,
  FileImage,
  FileArchive,
  type LucideIcon,
} from 'lucide-react';
import type { Artifact, ArtifactKind } from './layers';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

const KIND: Record<ArtifactKind, { Icon: LucideIcon; tint: string; label: string }> = {
  json: { Icon: FileJson, tint: '#5E7A5A', label: 'JSON' },
  pdf: { Icon: FileText, tint: '#B7896B', label: 'PDF' },
  md: { Icon: FileText, tint: '#6B6259', label: 'MD' },
  csv: { Icon: FileSpreadsheet, tint: '#5E7A5A', label: 'CSV' },
  tsx: { Icon: FileCode, tint: '#1C1814', label: 'TSX' },
  svg: { Icon: FileImage, tint: '#B7896B', label: 'SVG' },
  yaml: { Icon: FileCode, tint: '#6B6259', label: 'YAML' },
  zip: { Icon: FileArchive, tint: '#5C4633', label: 'ZIP' },
};

function ArtifactCard({ artifact, index, reduce }: { artifact: Artifact; index: number; reduce: boolean | null }) {
  const meta = KIND[artifact.kind];
  const { Icon } = meta;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.1 }}
      whileHover={reduce ? undefined : { y: -5 }}
      className="group relative flex min-w-[220px] flex-1 flex-col rounded-2xl border border-sand-deep/30 bg-bone p-4 shadow-[0_1px_2px_rgba(28,24,20,0.04)] transition-shadow duration-300 hover:shadow-[0_22px_50px_-30px_rgba(28,24,20,0.45)]"
    >
      {/* soft glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${meta.tint}33` }}
      />
      <div className="flex items-start justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{ borderColor: `${meta.tint}33`, backgroundColor: `${meta.tint}12` }}
        >
          <Icon size={18} style={{ color: meta.tint }} strokeWidth={2} />
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="rounded-md border border-sand-deep/40 px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-sage-deep"
            style={{ fontFamily: MONO }}
          >
            {artifact.id}
          </span>
          <span
            className="rounded-md border border-sand-deep/40 px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-mist"
            style={{ fontFamily: MONO }}
          >
            {meta.label}
          </span>
        </div>
      </div>

      <p className="mt-4 truncate text-sm font-semibold text-espresso" style={{ fontFamily: MONO }}>
        {artifact.name}
      </p>

      {/* metadata / preview revealed on hover */}
      <p className="mt-1.5 text-xs leading-relaxed text-mist opacity-80 transition-opacity duration-300 group-hover:opacity-100">
        {artifact.desc}
      </p>

      {/* operational metadata — makes each artifact read like infrastructure, not a PDF */}
      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-sand-deep/20 pt-3" style={{ fontFamily: MONO }}>
        {[
          { k: 'Generated', v: artifact.time },
          { k: 'Revision', v: `r${artifact.rev}` },
          { k: 'Owner', v: artifact.owner },
        ].map(({ k, v }) => (
          <div key={k}>
            <dt className="text-[8px] uppercase tracking-[0.12em] text-mist/60">{k}</dt>
            <dd className="mt-0.5 truncate text-[10px] font-semibold text-bark">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 flex items-center gap-2">
        <motion.span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: meta.tint }}
          animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        />
        <span className="text-[9px] uppercase tracking-[0.14em] text-mist/70" style={{ fontFamily: MONO }}>
          Sealed &amp; versioned
        </span>
      </div>
    </motion.div>
  );
}

/**
 * ArtifactDock — the visual signature of Scrutexity. Every product page opens
 * with the concrete outputs of its layer, rendered as Finder-style file cards
 * with hover depth and metadata. Artifacts are illustrative output formats.
 */
export function ArtifactDock({
  artifacts,
  label = 'Artifacts — outputs of this layer',
  className = '',
}: {
  artifacts: Artifact[];
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Layer artifacts" className={className}>
      <span className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
        {label}
      </span>
      <div className="flex flex-wrap gap-4">
        {artifacts.map((artifact, i) => (
          <ArtifactCard key={artifact.name} artifact={artifact} index={i} reduce={reduce} />
        ))}
      </div>
    </section>
  );
}

export default ArtifactDock;
