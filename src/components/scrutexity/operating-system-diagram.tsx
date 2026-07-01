"use client";

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The Scrutexity Operating System — the company's canonical diagram.
 *
 * One signature visualization, reused across the homepage, docs, and decks:
 *   Your Website → AuditGPT → Claim Intelligence → { Content · AI Visibility · Recovery }
 *     → Proof Ledger → Customer Trust
 *
 * The four-move mental model (Find · Fix · Monitor · Prove) is embedded in the
 * node sub-labels so the diagram reads on its own, with no legend required.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const SERIF = 'var(--font-instrument-serif), Georgia, serif';
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

type Variant = 'source' | 'default' | 'core' | 'proof' | 'trust';

type OSNode = {
  id: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  title: string;
  sub: string;
  variant: Variant;
  delay: number;
};

const NODES: OSNode[] = [
  { id: 'site', cx: 380, cy: 70, w: 210, h: 60, title: 'Your Website', sub: 'Source of claims', variant: 'source', delay: 0 },
  { id: 'audit', cx: 380, cy: 195, w: 210, h: 60, title: 'AuditGPT', sub: 'Find · Diagnose', variant: 'default', delay: 0.18 },
  { id: 'claim', cx: 380, cy: 320, w: 252, h: 66, title: 'Claim Intelligence', sub: 'Claims mapped to evidence', variant: 'core', delay: 0.34 },
  { id: 'content', cx: 165, cy: 470, w: 162, h: 56, title: 'Content', sub: 'Fix · Contento', variant: 'default', delay: 0.52 },
  { id: 'visibility', cx: 380, cy: 470, w: 162, h: 56, title: 'AI Visibility', sub: 'Monitor · Answers', variant: 'default', delay: 0.52 },
  { id: 'recovery', cx: 595, cy: 470, w: 162, h: 56, title: 'Recovery', sub: 'Recover · Follow-up', variant: 'default', delay: 0.52 },
  { id: 'proof', cx: 380, cy: 620, w: 214, h: 60, title: 'Proof Ledger', sub: 'SHA-256 sealed', variant: 'proof', delay: 0.72 },
  { id: 'trust', cx: 380, cy: 745, w: 214, h: 60, title: 'Customer Trust', sub: 'Verifiable, not assumed', variant: 'trust', delay: 0.88 },
];

const LINKS: { d: string; delay: number }[] = [
  { d: 'M380,100 L380,165', delay: 0.1 },
  { d: 'M380,225 L380,287', delay: 0.28 },
  { d: 'M380,353 C380,405 165,400 165,442', delay: 0.44 },
  { d: 'M380,353 L380,442', delay: 0.44 },
  { d: 'M380,353 C380,405 595,400 595,442', delay: 0.44 },
  { d: 'M165,498 C165,555 380,545 380,590', delay: 0.66 },
  { d: 'M380,498 L380,590', delay: 0.66 },
  { d: 'M595,498 C595,555 380,545 380,590', delay: 0.66 },
  { d: 'M380,650 L380,715', delay: 0.84 },
];

const VARIANT_STYLE: Record<Variant, { fill: string; stroke: string; sw: number; title: string; sub: string; glow?: boolean }> = {
  source: { fill: '#FFFBF3', stroke: '#D9CCB0', sw: 1, title: '#1C1814', sub: '#6B6259' },
  default: { fill: '#FFFBF3', stroke: '#D9CCB0', sw: 1, title: '#1C1814', sub: '#5E7A5A' },
  core: { fill: '#1C1814', stroke: '#5E7A5A', sw: 1.5, title: '#F8F3EA', sub: '#C7D4C2' },
  proof: { fill: '#FFFBF3', stroke: '#B7896B', sw: 1.5, title: '#1C1814', sub: '#B7896B', glow: true },
  trust: { fill: '#F0E8D8', stroke: '#D9CCB0', sw: 1, title: '#1C1814', sub: '#5E7A5A' },
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
        rx={14}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={s.sw}
        filter={node.variant === 'core' || node.variant === 'trust' ? undefined : 'url(#osShadow)'}
      />
      {s.glow && !reduce && (
        <motion.rect
          x={x}
          y={y}
          width={node.w}
          height={node.h}
          rx={14}
          fill="none"
          stroke={s.stroke}
          strokeWidth={1.5}
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <text
        x={node.cx}
        y={node.cy - 8}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontFamily: SERIF, fontSize: node.variant === 'core' ? 19 : 16, fill: s.title, letterSpacing: '-0.01em' }}
      >
        {node.title}
      </text>
      <text
        x={node.cx}
        y={node.cy + 13}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontFamily: MONO, fontSize: 8, fill: s.sub, letterSpacing: '0.14em' }}
      >
        {node.sub.toUpperCase()}
      </text>
    </motion.g>
  );
}

export function OperatingSystemDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 760 810"
      className={className}
      role="img"
      aria-label="The Scrutexity Operating System: your website flows into AuditGPT, then Claim Intelligence, which branches into Content, AI Visibility, and Recovery, converging into a Proof Ledger and finally Customer Trust."
      style={{ width: '100%', height: 'auto' }}
    >
      <defs>
        <filter id="osShadow" x="-20%" y="-20%" width="140%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1C1814" floodOpacity="0.10" />
        </filter>
        <filter id="osPulseGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="osCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B7896B" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#8FA98A" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#B7896B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="osProofGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B7896B" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#B7896B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric illumination — soft warm glow lifting the core layers off the grid */}
      <motion.ellipse
        cx={380}
        cy={320}
        rx={210}
        ry={95}
        fill="url(#osCoreGlow)"
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <ellipse cx={380} cy={620} rx={165} ry={72} fill="url(#osProofGlow)" />

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
      <circle cx={380} cy={353} r={3} fill="#5E7A5A" />
      <circle cx={380} cy={590} r={3.5} fill="#B7896B" />

      {/* Zero-downtime fluid motion — terracotta pulses flow down every connector */}
      {!reduce &&
        LINKS.map((link) => (
          <motion.path
            key={`flow-${link.d}`}
            d={link.d}
            fill="none"
            stroke="#B7896B"
            strokeWidth={2.5}
            strokeLinecap="round"
            filter="url(#osPulseGlow)"
            initial={{ pathLength: 0.18, pathOffset: 0, opacity: 0 }}
            animate={{ pathOffset: [0, 1], opacity: [0, 0.9, 0.9, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8 + link.delay,
              repeatDelay: 0.7,
            }}
          />
        ))}

      {/* Nodes */}
      {NODES.map((node) => (
        <Node key={node.id} node={node} reduce={reduce} />
      ))}
    </svg>
  );
}

export default OperatingSystemDiagram;
