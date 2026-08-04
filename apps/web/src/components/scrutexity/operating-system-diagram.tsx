"use client";

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The Scrutexity bureau operating model — the company's canonical diagram.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const SERIF = 'var(--font-instrument-serif), Georgia, serif';
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

type Variant = 'source' | 'default' | 'core' | 'proof' | 'trust';

type OSNode = {
  id: string;
  recordId: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  title: string;
  sub: string;
  row: string;
  variant: Variant;
  delay: number;
};

const NODES: OSNode[] = [
  { id: 'surface', recordId: 'SRC-01', cx: 380, cy: 70, w: 232, h: 78, title: 'Public Claim Surface', sub: 'Source of observed claims', row: 'OBSERVED: PUBLIC PAGES', variant: 'source', delay: 0 },
  { id: 'scanner', recordId: 'SCAN-02', cx: 380, cy: 205, w: 232, h: 78, title: 'AuditGPT Scanner', sub: 'Extract · Classify · Diagnose', row: 'INTAKE: CLAIM SURFACE', variant: 'default', delay: 0.16 },
  { id: 'bureau', recordId: 'BUREAU-03', cx: 380, cy: 342, w: 300, h: 86, title: 'Scrutexity Claim Bureau', sub: 'Claims mapped to evidence + pattern risk', row: 'MATCH: EVIDENCE + RISK', variant: 'core', delay: 0.3 },
  { id: 'gaps', recordId: 'GAP-04', cx: 150, cy: 510, w: 178, h: 78, title: 'Evidence Gaps', sub: 'Missing · Weak · Expired', row: 'FIELD: SUPPORT STATE', variant: 'default', delay: 0.48 },
  { id: 'distortions', recordId: 'DISTORT-05', cx: 380, cy: 510, w: 190, h: 78, title: 'AI Distortions', sub: 'Answer engines · Hallucinated claims', row: 'FIELD: ANSWER RISK', variant: 'default', delay: 0.48 },
  { id: 'registry', recordId: 'PATTERN-06', cx: 610, cy: 510, w: 190, h: 78, title: 'Pattern Registry', sub: 'FTC · FDA · AG · Platform signals', row: 'FIELD: SIGNAL CLASS', variant: 'default', delay: 0.48 },
  { id: 'ledger', recordId: 'CRT-07', cx: 380, cy: 680, w: 252, h: 82, title: 'CRT Proof Ledger', sub: 'Dated · Hash-chained · Verifiable', row: 'STATUS: SEALED', variant: 'proof', delay: 0.68 },
  { id: 'record', recordId: 'RECORD-08', cx: 380, cy: 812, w: 252, h: 76, title: 'Public Review Record', sub: 'Recorded, not assumed', row: 'ACCESS: PUBLIC REVIEW', variant: 'trust', delay: 0.84 },
];

const LINKS: { d: string; delay: number }[] = [
  { d: 'M380,109 L380,166', delay: 0.08 },
  { d: 'M380,244 L380,299', delay: 0.22 },
  { d: 'M380,385 C380,445 150,440 150,471', delay: 0.38 },
  { d: 'M380,385 L380,471', delay: 0.38 },
  { d: 'M380,385 C380,445 610,440 610,471', delay: 0.38 },
  { d: 'M150,549 C150,625 380,610 380,639', delay: 0.6 },
  { d: 'M380,549 L380,639', delay: 0.6 },
  { d: 'M610,549 C610,625 380,610 380,639', delay: 0.6 },
  { d: 'M380,721 L380,774', delay: 0.78 },
];

const VARIANT_STYLE: Record<Variant, { fill: string; stroke: string; sw: number; title: string; sub: string; glow?: boolean }> = {
  source: { fill: '#FFFBF3', stroke: '#CFC2AA', sw: 1, title: '#1C1814', sub: '#6B6259' },
  default: { fill: '#FFFBF3', stroke: '#CFC2AA', sw: 1, title: '#1C1814', sub: '#5E7A5A' },
  core: { fill: '#1C1814', stroke: '#8FA98A', sw: 1.5, title: '#F8F3EA', sub: '#C7D4C2' },
  proof: { fill: '#FFFBF3', stroke: '#A45F3D', sw: 1.75, title: '#1C1814', sub: '#A45F3D', glow: true },
  trust: { fill: '#F3EBDD', stroke: '#CFC2AA', sw: 1, title: '#1C1814', sub: '#5E7A5A' },
};

function Node({ node, reduce }: { node: OSNode; reduce: boolean | null }) {
  const s = VARIANT_STYLE[node.variant];
  const x = node.cx - node.w / 2;
  const y = node.cy - node.h / 2;

  return (
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -3 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay: node.delay }}
      style={{ cursor: 'default' }}
    >
      <rect
        x={x}
        y={y}
        width={node.w}
        height={node.h}
        rx={7}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={s.sw}
        filter={node.variant === 'core' ? 'url(#osCoreShadow)' : undefined}
      />
      {s.glow && !reduce && (
        <motion.rect
          x={x}
          y={y}
          width={node.w}
          height={node.h}
          rx={7}
          fill="none"
          stroke={s.stroke}
          strokeWidth={2}
          initial={{ opacity: 0, scale: 1 }}
          whileInView={{ opacity: [0, 0.55, 0], scale: [1, 1.035, 1.055] }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: node.delay + 0.25 }}
        />
      )}
      <text
        x={x + 14}
        y={y + 16}
        dominantBaseline="middle"
        style={{ fontFamily: MONO, fontSize: 9, fill: s.sub, letterSpacing: '0.12em', fontWeight: 700 }}
      >
        {node.recordId}
      </text>
      <text
        x={node.cx}
        y={node.cy - 5}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontFamily: SERIF, fontSize: node.variant === 'core' ? 18 : 15, fill: s.title, letterSpacing: 0, fontWeight: node.variant === 'core' ? 600 : 500 }}
      >
        {node.title}
      </text>
      <text
        x={node.cx}
        y={node.cy + 16}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontFamily: MONO, fontSize: 7.5, fill: s.sub, letterSpacing: '0.12em' }}
      >
        {node.sub.toUpperCase()}
      </text>
      <line x1={x + 14} x2={x + node.w - 14} y1={y + node.h - 19} y2={y + node.h - 19} stroke={s.stroke} strokeOpacity={0.45} />
      <text
        x={x + 14}
        y={y + node.h - 9}
        dominantBaseline="middle"
        style={{ fontFamily: MONO, fontSize: 7, fill: s.sub, letterSpacing: '0.1em' }}
      >
        {node.row}
      </text>
    </motion.g>
  );
}

function MobileNode({ node }: { node: OSNode }) {
  const s = VARIANT_STYLE[node.variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.45, ease: EASE, delay: node.delay }}
      className="rounded-lg border px-4 py-3"
      style={{ backgroundColor: s.fill, borderColor: s.stroke }}
    >
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: s.sub }}>
        {node.recordId}
      </div>
      <div
        className="mt-1 font-display text-lg leading-tight"
        style={{ color: s.title }}
      >
        {node.title}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: s.sub }}>
        {node.sub}
      </div>
      <div className="mt-3 border-t pt-2 font-mono text-[9px] uppercase tracking-[0.1em]" style={{ borderColor: s.stroke, color: s.sub }}>
        {node.row}
      </div>
    </motion.div>
  );
}

function MobileDiagram() {
  const topNodes = NODES.slice(0, 3);
  const branchNodes = NODES.slice(3, 6);
  const bottomNodes = NODES.slice(6);

  return (
    <div className="md:hidden">
      <div className="space-y-3">
        {topNodes.map((node) => (
          <div key={node.id}>
            <MobileNode node={node} />
            <div className="mx-auto h-6 w-px bg-sand-deep/60" />
          </div>
        ))}
      </div>
      <div className="grid gap-3">
        {branchNodes.map((node) => (
          <MobileNode key={node.id} node={node} />
        ))}
      </div>
      <div className="mx-auto h-6 w-px bg-sand-deep/60" />
      <div className="space-y-3">
        {bottomNodes.map((node, index) => (
          <div key={node.id}>
            <MobileNode node={node} />
            {index < bottomNodes.length - 1 && <div className="mx-auto h-6 w-px bg-sand-deep/60" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OperatingSystemDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <MobileDiagram />
    <svg
      viewBox="0 0 760 860"
        className="hidden md:block"
      role="img"
      aria-label="The Scrutexity bureau operating model: public claim surface flows into the AuditGPT Scanner, then the Scrutexity Claim Bureau, which maps evidence gaps, AI distortions, and pattern registry signals into the CRT Proof Ledger and Public Review Record."
      style={{ width: '100%', height: 'auto' }}
    >
      <defs>
        <filter id="osCoreShadow" x="-20%" y="-20%" width="140%" height="170%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#1C1814" floodOpacity="0.16" />
        </filter>
        <radialGradient id="osCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8FA98A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#8FA98A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx={380} cy={342} rx={240} ry={112} fill="url(#osCoreGlow)" />

      {/* Connections — draw in on scroll */}
      {LINKS.map((link) => (
        <motion.path
          key={link.d}
          d={link.d}
          fill="none"
          stroke="#D2C4AC"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE, delay: link.delay }}
        />
      ))}

      {/* Junction dots */}
      <circle cx={380} cy={385} r={3} fill="#5E7A5A" />
      <circle cx={380} cy={639} r={3.5} fill="#A45F3D" />

      {/* Nodes */}
      {NODES.map((node) => (
        <Node key={node.id} node={node} reduce={reduce} />
      ))}
    </svg>
    </div>
  );
}

export default OperatingSystemDiagram;
