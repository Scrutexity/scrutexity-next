import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ───────────────────────────────
   BRAND TOKENS
   ─────────────────────────────── */
export const BRAND = {
  cream: '#F8F3EA',
  creamDeep: '#EFE7D4',
  sand: '#E6DCC6',
  sandDeep: '#D9CCB0',
  sage: '#8FA98A',
  sageDeep: '#5E7A5A',
  gold: '#C5A059',
  ink: '#1C1814',
  mist: '#6B6259',
} as const;

export type BrandColor = keyof typeof BRAND;

/* ───────────────────────────────
   REDUCED MOTION / LOW POWER
   ─────────────────────────────── */
export function useMotionPrefs() {
  const prefersReduced = useReducedMotion() ?? false;
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    // Detect low-power / battery-saving mode
    const battery = (navigator as any).getBattery;
    if (!battery) return;
    battery().then((b: any) => {
      setLowPower(b.charging === false && b.level < 0.2);
      const handleChange = () => setLowPower(b.charging === false && b.level < 0.2);
      b.addEventListener('levelchange', handleChange);
      b.addEventListener('chargingchange', handleChange);
      return () => {
        b.removeEventListener('levelchange', handleChange);
        b.removeEventListener('chargingchange', handleChange);
      };
    });
  }, []);

  const disableMotion = prefersReduced || lowPower;
  return { prefersReduced, lowPower, disableMotion };
}

export function sketchTransition(disableMotion: boolean, duration = 0.8, delay = 0) {
  if (disableMotion) return { duration: 0, delay: 0 } as const;
  return { duration, delay, ease: [0.16, 1, 0.3, 1] as const } as const;
}

export function sketchStagger(disableMotion: boolean, stagger = 0.12) {
  return disableMotion ? 0 : stagger;
}

/* ───────────────────────────────
   HAND-DRAWN PATH HELPERS
   ─────────────────────────────── */

/** Return a roughly-sketched SVG path command with intentional wobble.
 *  `roughness` = px of max deviation. `strokeCount` = number of overlapping strokes. */
export function roughLine(
  x1: number, y1: number, x2: number, y2: number,
  roughness = 1.5,
  seed = 0
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.max(2, Math.floor(len / 12));
  let d = `M ${x1 + nudge(roughness, seed)} ${y1 + nudge(roughness, seed + 1)}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const cx = x1 + dx * t + nudge(roughness, seed + i * 2);
    const cy = y1 + dy * t + nudge(roughness, seed + i * 2 + 1);
    d += ` L ${cx} ${cy}`;
  }
  return d;
}

export function roughRect(
  x: number, y: number, w: number, h: number,
  roughness = 1.5,
  seed = 0
): string {
  const r = nudge(roughness, seed);
  return [
    `M ${x + r} ${y + r}`,
    `L ${x + w + nudge(roughness, seed + 1)} ${y + nudge(roughness, seed + 2)}`,
    `L ${x + w + nudge(roughness, seed + 3)} ${y + h + nudge(roughness, seed + 4)}`,
    `L ${x + nudge(roughness, seed + 5)} ${y + h + nudge(roughness, seed + 6)}`,
    'Z',
  ].join(' ');
}

export function roughCircle(
  cx: number, cy: number, r: number,
  roughness = 1.5,
  seed = 0
): string {
  const pts = 16;
  let d = '';
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const rr = r + nudge(roughness * 0.6, seed + i);
    const px = cx + Math.cos(a) * rr;
    const py = cy + Math.sin(a) * rr;
    d += i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`;
  }
  d += ' Z';
  return d;
}

/** Seeded-ish pseudo-noise for deterministic sketch lines */
function nudge(amt: number, seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x) - 0.5) * amt * 2;
}

/* ───────────────────────────────
   SOUND INTEGRATION
   ─────────────────────────────── */
export type SoundType = 'stamp' | 'page' | 'chain' | 'drip' | 'hover' | 'lock';

const SOUND_PRESETS: Record<SoundType, () => { freq: number[]; type: OscillatorType; duration: number; vol: number }> = {
  stamp: () => ({ freq: [880, 660], type: 'sine', duration: 0.12, vol: 0.04 }),
  page: () => ({ freq: [1200, 900], type: 'triangle', duration: 0.08, vol: 0.025 }),
  chain: () => ({ freq: [440, 550], type: 'sine', duration: 0.15, vol: 0.03 }),
  drip: () => ({ freq: [300, 200], type: 'sine', duration: 0.2, vol: 0.02 }),
  hover: () => ({ freq: [200, 150], type: 'sine', duration: 0.06, vol: 0.015 }),
  lock: () => ({ freq: [520, 780], type: 'triangle', duration: 0.1, vol: 0.03 }),
};

export function playSketchSound(type: SoundType = 'stamp') {
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const preset = SOUND_PRESETS[type]();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = preset.type;
    osc.frequency.setValueAtTime(preset.freq[0], ctx.currentTime);
    if (preset.freq[1]) {
      osc.frequency.exponentialRampToValueAtTime(preset.freq[1], ctx.currentTime + preset.duration);
    }
    gain.gain.setValueAtTime(preset.vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + preset.duration);
    osc.start();
    osc.stop(ctx.currentTime + preset.duration);
  } catch {
    // silent fail
  }
}

/* ───────────────────────────────
   A11Y HELPERS
   ─────────────────────────────── */
export function ariaLabel(label: string, decorative = false) {
  return decorative
    ? { 'aria-hidden': true as const, role: 'img' as const }
    : { 'aria-label': label, role: 'img' as const };
}

export function SketchSVG({
  children,
  viewBox = '0 0 400 300',
  className = '',
  label,
  decorative = false,
  style,
}: {
  children: ReactNode;
  viewBox?: string;
  className?: string;
  label?: string;
  decorative?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(label ? ariaLabel(label, decorative) : { 'aria-hidden': true })}
      style={style}
    >
      {children}
    </svg>
  );
}

/* ───────────────────────────────
   ANIMATED PATH COMPONENT
   ─────────────────────────────── */
export function DrawPath({
  d,
  color = BRAND.ink,
  strokeWidth = 1.5,
  delay = 0,
  duration = 1.2,
  fill = 'none',
  opacity = 1,
  className = '',
  onComplete,
  disableMotion = false,
}: {
  d: string;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  fill?: string;
  opacity?: number;
  className?: string;
  onComplete?: () => void;
  disableMotion?: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (disableMotion || !pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${len}`;
    pathRef.current.style.strokeDashoffset = `${len}`;
    pathRef.current.style.transition = `stroke-dashoffset ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
    // Force reflow
    void pathRef.current.getBoundingClientRect();
    pathRef.current.style.strokeDashoffset = '0';
    const t = setTimeout(() => onComplete?.(), (delay + duration) * 1000);
    return () => clearTimeout(t);
  }, [d, delay, duration, onComplete, disableMotion]);

  return (
    <path
      ref={pathRef}
      d={d}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      opacity={opacity}
      className={className}
      style={disableMotion ? undefined : { strokeDasharray: '1000', strokeDashoffset: '1000' }}
    />
  );
}

/* ───────────────────────────────
   STAMP SOUND HOOK
   ─────────────────────────────── */
export function useStampSound() {
  const lastPlay = useRef(0);
  return useCallback(() => {
    const now = Date.now();
    if (now - lastPlay.current > 300) {
      lastPlay.current = now;
      playSketchSound('stamp');
    }
  }, []);
}

/**
 * FadeIn — reusable scroll-reveal wrapper used across Kimi sketch sections.
 */
export function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * VerifiedStamp — compact gold SVG stamp for hero diagram
 */
export function VerifiedStamp({ size = 70, label = "VERIFIED", sublabel, onActivate }: {
  size?: number; label?: string; sublabel?: string; className?: string; onActivate?: () => void;
}) {
  return (
    <svg viewBox="0 0 70 70" className="cursor-pointer select-none" width={size} height={size} aria-label={`Verified stamp: ${label}`} role="img">
      <g style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <path d="M65.6 35L58.76 41.37L61.5 50.3L52.4 52.4L50.3 61.5L41.37 58.76L35 65.6L28.63 58.76L19.7 61.5L17.6 52.4L8.5 50.3L11.24 41.37L4.4 35L11.24 28.63L8.5 19.7L17.6 17.6L19.7 8.5L28.63 11.24L35 4.4L41.37 11.24L50.3 8.5L52.4 17.6L61.5 19.7L58.76 28.63Z" fill="#C5A059" fillOpacity={0.12} stroke="#C5A059" strokeWidth={2} strokeLinejoin="round" />
        <path d="M56.8 35L54.84 43.22L50.86 50.86L43.12 54.6L35 56.33L26.65 55.15L19.18 50.82L15.06 43.26L13.08 35L14.56 26.53L19.12 19.12L26.81 15.24L35 12.98L43.1 15.45L49.95 20.05L55.15 26.65L56.75 35Z" fill="none" stroke="#C5A059" strokeWidth={1.5} strokeOpacity={0.7} />
        <path d="M27.02 35L33.67 41.65L44.31 27.02" fill="none" stroke="#C5A059" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={0} style={{ transition: 'opacity 0.4s ease' }} />
        <text x={35} y={49.63} textAnchor="middle" fontSize={7.7} fontFamily="'Geist Sans', sans-serif" fontWeight={600} fill="#C5A059" opacity={0.9} letterSpacing="0.08em">{label}</text>
        {sublabel && <text x={35} y={55.75} textAnchor="middle" fontSize={5.6} fontFamily="'Geist Sans', sans-serif" fontWeight={400} fill="#6B6259" opacity={0.8}>{sublabel}</text>}
      </g>
    </svg>
  );
}

/**
 * ProtocolGateIcon — compact gate icon for hero diagram
 */
export function ProtocolGateIcon({ size = 40, active = false, className = '' }: { size?: number; active?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} width={size} height={size} aria-label="Protocol gate: BAA-locked access control" role="img">
      <path d="M20 7C36 9 34 21.5 20 33C6 21.5 4 9 20 7" fill="none" stroke="#5E7A5A" strokeWidth={2} strokeLinejoin="round" />
      <rect x={13} y={18} width={14} height={12} rx={2} fill="#8FA98A" fillOpacity={0.15} stroke="#5E7A5A" strokeWidth={1.5} />
      <path d="M16 18V13A4 4 0 0 1 24 13V18" fill="none" stroke="#5E7A5A" strokeWidth={1.5} />
      <circle cx={20} cy={22} r={1.5} fill="#5E7A5A" />
      <path d="M20 23.5L20 26" stroke="#5E7A5A" strokeWidth={1.5} />
    </svg>
  );
}

/**
 * ReadOnlyBadge — compact read-only ribbon for hero diagram
 */
export function ReadOnlyBadge({ width = 70, height = 22, className = '' }: { width?: number; height?: number; className?: string }) {
  return (
    <svg viewBox="0 0 70 22" className={className} width={width} height={height} aria-label="Read-only system connection" role="img">
      <path d="M-0.11 -0.11L70.86 0.63L69.28 22.06L0.47 22.56Z" fill="#8FA98A" fillOpacity={0.12} stroke="#5E7A5A" strokeWidth={1.5} />
      <text x={35} y={12} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontFamily="'Geist Sans', sans-serif" fontWeight={600} fill="#5E7A5A" letterSpacing="0.12em">READ-ONLY</text>
    </svg>
  );
}
