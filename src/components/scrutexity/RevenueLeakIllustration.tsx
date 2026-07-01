import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  BRAND,
  SketchSVG,
  DrawPath,
  roughRect,
  roughCircle,
  roughLine,
  playSketchSound,
  sketchTransition,
} from '@/lib/sketch-utils';

/* ═══════════════════════════════════════
   REVENUE LEAK ILLUSTRATION
   Funnel with demand dripping out through
   cracks, rendered as hand-drawn technical
   sketch. Drips animate on scroll entry.
   ═══════════════════════════════════════ */
export function RevenueLeakIllustration({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion() ?? false;
  const [dripPhase, setDripPhase] = useState(0);

  useEffect(() => {
    if (!isInView || reduced) return;
    const steps = [0, 1, 2, 3];
    let idx = 0;
    const iv = setInterval(() => {
      setDripPhase(steps[idx]);
      if (steps[idx] > 0) playSketchSound('drip');
      idx++;
      if (idx >= steps.length) clearInterval(iv);
    }, 600);
    return () => clearInterval(iv);
  }, [isInView, reduced]);

  const funnelLeft = `M 80 40 Q 120 120 60 220 L 100 220 Q 160 120 120 40 Z`;
  const funnelRight = `M 520 40 Q 480 120 540 220 L 500 220 Q 440 120 480 40 Z`;

  return (
    <div ref={ref} className={`relative ${className}`} aria-label="Revenue leak diagram: demand enters the funnel but drips out through cracks at each stage">
      <SketchSVG viewBox="0 0 600 280" className="w-full h-auto" label="Revenue leak illustration" decorative>
        {/* Background grid — subtle clinical feel */}
        <g opacity={0.12} stroke={BRAND.sandDeep} strokeWidth={0.5}>
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={`h${i}`} d={roughLine(20, 40 + i * 35, 580, 40 + i * 35, 0.5, i * 10)} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={`v${i}`} d={roughLine(20 + i * 50, 20, 20 + i * 50, 260, 0.5, i * 10 + 100)} />
          ))}
        </g>

        {/* Funnel shape */}
        <motion.g
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={sketchTransition(reduced, 0.8, 0.1)}
        >
          <path d={funnelLeft} fill={BRAND.cream} stroke={BRAND.ink} strokeWidth={2} strokeLinejoin="round" />
          <path d={funnelRight} fill={BRAND.cream} stroke={BRAND.ink} strokeWidth={2} strokeLinejoin="round" />
          {/* Top rim */}
          <path d={roughLine(80, 40, 520, 40, 2, 1)} stroke={BRAND.ink} strokeWidth={2} strokeLinecap="round" />
          <path d={roughLine(60, 220, 540, 220, 2, 2)} stroke={BRAND.ink} strokeWidth={2} strokeLinecap="round" />
          {/* Label */}
          <text x={300} y={30} textAnchor="middle" fontSize={13} fontFamily="'Geist Sans', sans-serif" fontWeight={700} fill={BRAND.ink} letterSpacing="0.1em">INBOUND DEMAND</text>
          <text x={300} y={238} textAnchor="middle" fontSize={11} fontFamily="'Geist Sans', sans-serif" fontWeight={600} fill={BRAND.sageDeep} letterSpacing="0.06em">BOOKED REVENUE</text>
        </motion.g>

        {/* Demand dots entering top */}
        <motion.g
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={sketchTransition(reduced, 0.6, 0.4)}
        >
          {[
            [150, 55], [220, 52], [300, 56], [380, 53], [450, 55],
            [180, 65], [260, 62], [340, 66], [420, 63],
          ].map(([cx, cy], i) => (
            <path key={i} d={roughCircle(cx, cy, 4, 0.8, i * 7)} fill={BRAND.sage} fillOpacity={0.25} stroke={BRAND.sageDeep} strokeWidth={1} />
          ))}
        </motion.g>

        {/* Leak cracks / holes */}
        {[
          { x: 110, y: 110, label: 'MISSED CALL' },
          { x: 490, y: 140, label: 'NO-SHOW' },
          { x: 140, y: 170, label: 'STALE LEAD' },
          { x: 470, y: 190, label: 'ABANDONED' },
        ].map((crack, i) => (
          <motion.g
            key={crack.label}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={sketchTransition(reduced, 0.5, 0.6 + i * 0.15)}
          >
            {/* Crack shape */}
            <path
              d={roughCircle(crack.x, crack.y, 14 + i * 2, 2, i * 20)}
              fill={BRAND.cream}
              stroke={BRAND.mist}
              strokeWidth={1.5}
              strokeDasharray="3 2"
            />
            <text
              x={crack.x}
              y={crack.y - 22}
              textAnchor="middle"
              fontSize={9}
              fontFamily="'Geist Sans', sans-serif"
              fontWeight={600}
              fill={BRAND.mist}
              letterSpacing="0.06em"
            >
              {crack.label}
            </text>
          </motion.g>
        ))}

        {/* Dripping revenue */}
        {[
          { x: 110, y: 125, delay: 0 },
          { x: 490, y: 155, delay: 1 },
          { x: 140, y: 185, delay: 2 },
          { x: 470, y: 205, delay: 3 },
        ].map((drip, i) => (
          <g key={i}>
            {dripPhase > drip.delay && (
              <motion.g
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: [0, 1, 1, 0], y: [0, 18, 30, 40] }}
                transition={{ duration: 1.2, ease: 'easeIn' }}
              >
                <path d={roughCircle(drip.x, drip.y + 14, 5, 1, i * 30)} fill={BRAND.gold} fillOpacity={0.2} stroke={BRAND.gold} strokeWidth={1} />
                <text x={drip.x} y={drip.y + 38} textAnchor="middle" fontSize={8} fontFamily="'Geist Sans', sans-serif" fill={BRAND.gold} opacity={0.7}>$</text>
              </motion.g>
            )}
          </g>
        ))}

        {/* Bottom recovery layer annotation */}
        <motion.g
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={sketchTransition(reduced, 0.8, 1.2)}
        >
          <path d={roughRect(180, 240, 240, 32, 1.5, 60)} fill={BRAND.sage} fillOpacity={0.12} stroke={BRAND.sageDeep} strokeWidth={1.5} />
          <text x={300} y={260} textAnchor="middle" fontSize={10} fontFamily="'Geist Sans', sans-serif" fontWeight={600} fill={BRAND.sageDeep} letterSpacing="0.06em">SCRUTEXITY RECOVERY LAYER</text>
        </motion.g>
      </SketchSVG>
    </div>
  );
}
