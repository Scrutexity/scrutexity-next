import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  BRAND,
  SketchSVG,
  DrawPath,
  roughRect,
  roughCircle,
  roughLine,
  VerifiedStamp,
  playSketchSound,
  sketchTransition,
  useStampSound,
} from '@/lib/sketch-utils';

/* ═══════════════════════════════════════
   HOW IT WORKS SKETCH — ENHANCED
   Three-step pipeline with rich animation,
   traveling indicators, spring physics,
   interactive hover states, and detailed
   visual metaphors for each phase.
   ═══════════════════════════════════════ */
export function HowItWorksSketch({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion() ?? false;
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [travelerPos, setTravelerPos] = useState(0); // 0, 1, 2, 3
  const [stampReady, setStampReady] = useState<boolean[]>([false, false, false]);
  const playStamp = useStampSound();

  const baseDelay = reduced ? 0 : 0.35;

  // Entrance sequence orchestration
  useEffect(() => {
    if (!isInView || reduced) {
      setTravelerPos(reduced ? 3 : 0);
      setStampReady(reduced ? [true, true, true] : [false, false, false]);
      return;
    }
    let stage = 0;
    const iv = setInterval(() => {
      stage++;
      setTravelerPos(stage);
      if (stage >= 1) {
        setStampReady((prev) => {
          const next = [...prev];
          if (stage === 1) next[1] = true;
          if (stage === 2) next[2] = true;
          return next;
        });
        if (stage <= 2) playStamp();
      }
      if (stage >= 3) clearInterval(iv);
    }, 600);
    return () => clearInterval(iv);
  }, [isInView, reduced, playStamp]);

  const steps = [
    {
      label: 'AUDIT',
      sub: 'Revenue leak scan',
      x: 50,
      y: 35,
      w: 190,
      h: 175,
      num: '01',
      color: BRAND.sageDeep,
      fill: BRAND.sage,
      detail: [
        { text: 'Missed calls', icon: 'phone' },
        { text: 'Stale leads', icon: 'mail' },
        { text: 'No-shows', icon: 'calendar' },
        { text: 'Abandoned bookings', icon: 'clock' },
      ],
      meta: '48-hour turnaround',
      stamp: false,
      visual: 'clipboard' as const,
    },
    {
      label: 'PILOT',
      sub: '72-hour silent install',
      x: 265,
      y: 35,
      w: 190,
      h: 175,
      num: '02',
      color: BRAND.gold,
      fill: BRAND.gold,
      detail: [
        { text: 'One channel', icon: 'target' },
        { text: 'Read-only', icon: 'lock' },
        { text: 'Zero staff load', icon: 'user' },
      ],
      meta: 'BAA-locked by default',
      stamp: true,
      stampLabel: 'SILENT',
      stampSub: 'NO STAFF',
      visual: 'shield' as const,
    },
    {
      label: 'STACK',
      sub: 'Managed revenue layer',
      x: 480,
      y: 35,
      w: 190,
      h: 175,
      num: '03',
      color: BRAND.ink,
      fill: BRAND.gold,
      detail: [
        { text: 'Capture', icon: 'inbox' },
        { text: 'Book', icon: 'check' },
        { text: 'Recover', icon: 'refresh' },
        { text: 'Report', icon: 'chart' },
      ],
      meta: 'Weekly revenue ledger',
      stamp: true,
      stampLabel: 'LIVE',
      stampSub: 'VERIFIED',
      visual: 'stack' as const,
    },
  ];

  const conn1 = { x1: 240, y1: 122, x2: 265, y2: 122 };
  const conn2 = { x1: 455, y1: 122, x2: 480, y2: 122 };

  const handleNodeHover = useCallback(
    (idx: number | null) => {
      setHoveredNode(idx);
      if (idx !== null && !reduced) playSketchSound('hover');
    },
    [reduced]
  );

  return (
    <div ref={ref} className={`relative ${className}`} aria-label="How it works: three step process from audit to managed revenue stack">
      <SketchSVG viewBox="0 0 720 300" className="w-full h-auto" label="How it works diagram" decorative>
        {/* ════════ Background field grid ════════ */}
        <g opacity={0.08} stroke={BRAND.sandDeep} strokeWidth={0.6}>
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={`hg${i}`} d={roughLine(20, 20 + i * 35, 700, 20 + i * 35, 0.6, i * 10)} />
          ))}
        </g>

        {/* ════════ Connection wire 1: Audit → Pilot ════════ */}
        <g>
          {isInView && (
            <DrawPath
              d={`M ${conn1.x1} ${conn1.y1} Q ${(conn1.x1 + conn1.x2) / 2} ${conn1.y1 - 8} ${conn1.x2} ${conn1.y2}`}
              color={BRAND.sandDeep}
              strokeWidth={2}
              delay={baseDelay * 0.8}
              duration={0.7}
              disableMotion={reduced}
            />
          )}
          {/* Animated data packet on wire 1 */}
          {!reduced && isInView && travelerPos >= 1 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.circle
                r={5}
                fill={BRAND.gold}
                fillOpacity={0.25}
                stroke={BRAND.gold}
                strokeWidth={1.5}
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut', delay: baseDelay * 0.9 }}
                style={{
                  offsetPath: `path("M ${conn1.x1} ${conn1.y1} Q ${(conn1.x1 + conn1.x2) / 2} ${conn1.y1 - 8} ${conn1.x2} ${conn1.y2}")`,
                } as any}
              />
            </motion.g>
          )}
          {/* End-dot pulse on wire 1 */}
          {!reduced && travelerPos >= 1 && (
            <motion.circle
              cx={conn1.x2}
              cy={conn1.y2}
              r={4}
              fill={BRAND.gold}
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          )}
        </g>

        {/* ════════ Connection wire 2: Pilot → Stack ════════ */}
        <g>
          {isInView && (
            <DrawPath
              d={`M ${conn2.x1} ${conn2.y1} Q ${(conn2.x1 + conn2.x2) / 2} ${conn2.y1 + 8} ${conn2.x2} ${conn2.y2}`}
              color={BRAND.sandDeep}
              strokeWidth={2}
              delay={baseDelay * 1.8}
              duration={0.7}
              disableMotion={reduced}
            />
          )}
          {!reduced && isInView && travelerPos >= 2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.circle
                r={5}
                fill={BRAND.gold}
                fillOpacity={0.25}
                stroke={BRAND.gold}
                strokeWidth={1.5}
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut', delay: baseDelay * 1.9 }}
                style={{
                  offsetPath: `path("M ${conn2.x1} ${conn2.y1} Q ${(conn2.x1 + conn2.x2) / 2} ${conn2.y1 + 8} ${conn2.x2} ${conn2.y2}")`,
                } as any}
              />
            </motion.g>
          )}
          {!reduced && travelerPos >= 2 && (
            <motion.circle
              cx={conn2.x2}
              cy={conn2.y2}
              r={4}
              fill={BRAND.gold}
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
            />
          )}
        </g>

        {/* ════════ Step Nodes ════════ */}
        {steps.map((step, i) => {
          const isHovered = hoveredNode === i;
          const isActive = travelerPos >= i;

          return (
            <motion.g
              key={step.label}
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.88, y: 18 }}
              animate={isInView ? { opacity: 1, scale: isHovered ? 1.04 : 1, y: 0 } : {}}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.5, delay: baseDelay * i },
                      scale: { type: 'spring', stiffness: 260, damping: 22, delay: baseDelay * i },
                      y: { type: 'spring', stiffness: 200, damping: 20, delay: baseDelay * i },
                    }
              }
              onMouseEnter={() => handleNodeHover(i)}
              onMouseLeave={() => handleNodeHover(null)}
              style={{ cursor: 'pointer', transformOrigin: `${step.x + step.w / 2}px ${step.y + step.h / 2}px` }}
            >
              {/* Glow shadow on hover */}
              {isHovered && (
                <motion.rect
                  x={step.x - 4}
                  y={step.y - 4}
                  width={step.w + 8}
                  height={step.h + 8}
                  rx={14}
                  fill={step.fill}
                  fillOpacity={0.08}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Main card body */}
              <path
                d={roughRect(step.x, step.y, step.w, step.h, 1.8, i * 15)}
                fill={i === 0 ? BRAND.creamDeep : BRAND.cream}
                stroke={isHovered ? step.color : BRAND.sandDeep}
                strokeWidth={isHovered ? 2.5 : 1.8}
                style={{ transition: 'stroke 0.25s ease, stroke-width 0.25s ease' }}
              />

              {/* Corner notch — tamper-evident style */}
              <path
                d={`M ${step.x} ${step.y} L ${step.x + 20} ${step.y} L ${step.x} ${step.y + 20} Z`}
                fill={step.color}
                opacity={0.15}
              />

              {/* Step number badge */}
              <motion.g
                initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 350, damping: 18, delay: baseDelay * i + 0.15 }
                }
              >
                <path
                  d={roughCircle(step.x + 22, step.y + 22, 14, 1.2, i * 7)}
                  fill={step.fill}
                  fillOpacity={0.15}
                  stroke={step.color}
                  strokeWidth={1.8}
                />
                <text
                  x={step.x + 22}
                  y={step.y + 26}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="'Geist Sans', sans-serif"
                  fontWeight={700}
                  fill={step.color}
                >
                  {step.num}
                </text>
              </motion.g>

              {/* Label */}
              <motion.text
                x={step.x + step.w / 2}
                y={step.y + 28}
                textAnchor="middle"
                fontSize={14}
                fontFamily="'Geist Sans', sans-serif"
                fontWeight={700}
                fill={BRAND.ink}
                letterSpacing="0.06em"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={reduced ? { duration: 0 } : { duration: 0.4, delay: baseDelay * i + 0.2 }}
              >
                {step.label}
              </motion.text>

              {/* Sub-label */}
              <motion.text
                x={step.x + step.w / 2}
                y={step.y + 44}
                textAnchor="middle"
                fontSize={9}
                fontFamily="'Geist Sans', sans-serif"
                fill={BRAND.mist}
                letterSpacing="0.04em"
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={reduced ? { duration: 0 } : { duration: 0.4, delay: baseDelay * i + 0.3 }}
              >
                {step.sub}
              </motion.text>

              {/* Divider line */}
              <motion.path
                d={roughLine(step.x + 16, step.y + 54, step.x + step.w - 16, step.y + 54, 0.8, i * 20)}
                stroke={BRAND.sandDeep}
                strokeWidth={1}
                strokeLinecap="round"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={reduced ? { duration: 0 } : { duration: 0.5, delay: baseDelay * i + 0.35 }}
              />

              {/* Detail checklist items with staggered appearance */}
              {step.detail.map((d, j) => (
                <motion.g
                  key={d.text}
                  initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.35, delay: baseDelay * i + 0.4 + j * 0.1, ease: 'easeOut' }
                  }
                >
                  {/* Check dot */}
                  <motion.circle
                    cx={step.x + 22}
                    cy={step.y + 68 + j * 16}
                    r={3}
                    fill={isActive ? step.color : BRAND.sandDeep}
                    fillOpacity={isActive ? 0.4 : 0.25}
                    initial={reduced ? { scale: 1 } : { scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 15, delay: baseDelay * i + 0.4 + j * 0.1 }
                    }
                  />
                  {/* Text */}
                  <text
                    x={step.x + 34}
                    y={step.y + 72 + j * 16}
                    fontSize={9.5}
                    fontFamily="'Geist Sans', sans-serif"
                    fill={isActive ? BRAND.ink : BRAND.mist}
                    fontWeight={isActive ? 500 : 400}
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {d.text}
                  </text>
                </motion.g>
              ))}

              {/* Meta tag at bottom */}
              <motion.g
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={reduced ? { duration: 0 } : { duration: 0.4, delay: baseDelay * i + 0.75 }}
              >
                <rect
                  x={step.x + 14}
                  y={step.y + step.h - 22}
                  width={step.w - 28}
                  height={16}
                  rx={4}
                  fill={step.fill}
                  fillOpacity={0.1}
                  stroke={step.color}
                  strokeWidth={1}
                  strokeOpacity={0.35}
                />
                <text
                  x={step.x + step.w / 2}
                  y={step.y + step.h - 10}
                  textAnchor="middle"
                  fontSize={8}
                  fontFamily="'Geist Sans', sans-serif"
                  fontWeight={600}
                  fill={step.color}
                  letterSpacing="0.06em"
                >
                  {step.meta.toUpperCase()}
                </text>
              </motion.g>

              {/* Visual metaphor icon area */}
              <VisualMetaphor
                type={step.visual}
                x={step.x + step.w - 48}
                y={step.y + 12}
                color={step.color}
                active={isActive}
                delay={baseDelay * i + 0.5}
                reduced={reduced}
                isInView={isInView}
              />

              {/* Stamp */}
              {step.stamp && stampReady[i] && (
                <motion.g
                  initial={reduced ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 1.3, rotate: -12 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                  style={{ transformOrigin: `${step.x + step.w - 30}px ${step.y + step.h - 30}px` }}
                >
                  <foreignObject x={step.x + step.w - 58} y={step.y + step.h - 58} width={56} height={56}>
                    <VerifiedStamp
                      size={52}
                      label={step.stampLabel!}
                      sublabel={step.stampSub!}
                      onActivate={() => playSketchSound('stamp')}
                      className="w-full h-full"
                    />
                  </foreignObject>
                </motion.g>
              )}

              {/* Hover tooltip overlay */}
              <AnimatePresence>
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d={roughRect(step.x + 8, step.y + step.h + 6, step.w - 16, 28, 1, 99)}
                      fill={BRAND.ink}
                      fillOpacity={0.85}
                      stroke="none"
                      rx={6}
                    />
                    <text
                      x={step.x + step.w / 2}
                      y={step.y + step.h + 24}
                      textAnchor="middle"
                      fontSize={9}
                      fontFamily="'Geist Sans', sans-serif"
                      fill={BRAND.cream}
                      fontWeight={500}
                      letterSpacing="0.04em"
                    >
                      {i === 0 ? 'Click to run free leak scan' : i === 1 ? 'Zero disruption to staff' : 'Revenue reports every Friday'}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>
          );
        })}

        {/* ════════ Bottom Timeline ════════ */}
        <motion.g
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={sketchTransition(reduced, 1, baseDelay * 3.5)}
        >
          {/* Timeline track */}
          <path
            d={roughLine(50, 245, 670, 245, 1, 200)}
            stroke={BRAND.sandDeep}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.5}
          />

          {/* Timeline nodes */}
          {[
            { x: 130, label: 'Day 0', sub: 'Audit begins', active: true },
            { x: 320, label: 'Day 3', sub: 'Pilot live', active: travelerPos >= 1 },
            { x: 510, label: 'Day 30', sub: 'Full stack', active: travelerPos >= 2 },
          ].map((t, i) => (
            <g key={t.label}>
              {/* Tick */}
              <motion.path
                d={[`M ${t.x} 240`, `L ${t.x} 250`].join(' ')}
                stroke={t.active ? BRAND.gold : BRAND.sandDeep}
                strokeWidth={t.active ? 2.5 : 1.5}
                strokeLinecap="round"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={reduced ? { duration: 0 } : { duration: 0.3, delay: baseDelay * 3.8 + i * 0.15 }}
              />
              {/* Active ring */}
              {t.active && (
                <motion.circle
                  cx={t.x}
                  cy={245}
                  r={6}
                  fill={BRAND.gold}
                  fillOpacity={0.15}
                  stroke={BRAND.gold}
                  strokeWidth={1.5}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 15, delay: baseDelay * 3.8 + i * 0.15 }}
                />
              )}
              {/* Label */}
              <text
                x={t.x}
                y={268}
                textAnchor="middle"
                fontSize={10}
                fontFamily="'Geist Sans', sans-serif"
                fontWeight={600}
                fill={t.active ? BRAND.ink : BRAND.mist}
                style={{ transition: 'fill 0.4s ease' }}
              >
                {t.label}
              </text>
              <text
                x={t.x}
                y={282}
                textAnchor="middle"
                fontSize={9}
                fontFamily="'Geist Sans', sans-serif"
                fill={t.active ? BRAND.mist : BRAND.sandDeep}
                style={{ transition: 'fill 0.4s ease' }}
              >
                {t.sub}
              </text>
            </g>
          ))}

          {/* Traveling timeline indicator */}
          {!reduced && (
            <motion.circle
              cx={130}
              cy={245}
              r={4}
              fill={BRAND.gold}
              animate={{
                cx: travelerPos === 0 ? 130 : travelerPos === 1 ? 320 : travelerPos >= 2 ? 510 : 130,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            />
          )}
        </motion.g>

        {/* ════════ Decorative border frame ════════ */}
        <motion.path
          d={roughRect(10, 10, 700, 280, 2, 0)}
          fill="none"
          stroke={BRAND.sand}
          strokeWidth={1}
          opacity={0.25}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={reduced ? { duration: 0 } : { duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
        />
      </SketchSVG>
    </div>
  );
}

/* ═══════════════════════════════════════
   VISUAL METAPHOR SUB-COMPONENTS
   Small hand-drawn icons for each step.
   ═══════════════════════════════════════ */
function VisualMetaphor({
  type,
  x,
  y,
  color,
  active,
  delay,
  reduced,
  isInView,
}: {
  type: 'clipboard' | 'shield' | 'stack';
  x: number;
  y: number;
  color: string;
  active: boolean;
  delay: number;
  reduced: boolean;
  isInView: boolean;
}) {
  if (type === 'clipboard') {
    return (
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={reduced ? { duration: 0 } : { duration: 0.4, delay }}
      >
        {/* Clipboard body */}
        <path
          d={roughRect(x, y, 32, 40, 1, 30)}
          fill={BRAND.cream}
          stroke={color}
          strokeWidth={1.5}
          opacity={0.6}
        />
        {/* Clip */}
        <rect x={x + 10} y={y - 4} width={12} height={6} rx={2} fill={color} opacity={0.3} />
        {/* Check lines */}
        <motion.path
          d={roughLine(x + 6, y + 12, x + 26, y + 12, 0.6, 31)}
          stroke={active ? color : BRAND.sandDeep}
          strokeWidth={1}
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: delay + 0.1 }}
        />
        <motion.path
          d={roughLine(x + 6, y + 20, x + 22, y + 20, 0.6, 32)}
          stroke={active ? color : BRAND.sandDeep}
          strokeWidth={1}
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: delay + 0.2 }}
        />
        <motion.path
          d={roughLine(x + 6, y + 28, x + 18, y + 28, 0.6, 33)}
          stroke={active ? color : BRAND.sandDeep}
          strokeWidth={1}
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: delay + 0.3 }}
        />
        {/* Small leak droplet */}
        {active && (
          <motion.circle
            cx={x + 28}
            cy={y + 36}
            r={2.5}
            fill={BRAND.gold}
            fillOpacity={0.3}
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
        )}
      </motion.g>
    );
  }

  if (type === 'shield') {
    return (
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20, delay }}
      >
        {/* Shield outline */}
        <path
          d={[
            `M ${x + 16} ${y + 2}`,
            `C ${x + 32} ${y + 4} ${x + 30} ${y + 22} ${x + 16} ${y + 34}`,
            `C ${x + 2} ${y + 22} ${x + 0} ${y + 4} ${x + 16} ${y + 2}`,
          ].join(' ')}
          fill={BRAND.cream}
          stroke={active ? color : BRAND.sandDeep}
          strokeWidth={1.5}
          style={{ transition: 'stroke 0.4s ease' }}
        />
        {/* Lock icon inside */}
        <motion.g
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={reduced ? { duration: 0 } : { duration: 0.3, delay: delay + 0.2 }}
        >
          <rect x={x + 11} y={y + 16} width={10} height={8} rx={2} fill={active ? color : BRAND.sandDeep} fillOpacity={0.2} stroke={active ? color : BRAND.sandDeep} strokeWidth={1} />
          <path d={[`M ${x + 13} ${y + 16}`, `V ${y + 12}`, `A 3 3 0 0 1 ${x + 19} ${y + 12}`, `V ${y + 16}`].join(' ')} fill="none" stroke={active ? color : BRAND.sandDeep} strokeWidth={1} />
        </motion.g>
        {/* Silent whisper lines */}
        {active && (
          <motion.g
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <path d={[`M ${x + 34} ${y + 10}`, `Q ${x + 40} ${y + 8} ${x + 42} ${y + 12}`].join(' ')} stroke={color} strokeWidth={1} fill="none" opacity={0.5} />
            <path d={[`M ${x + 36} ${y + 16}`, `Q ${x + 42} ${y + 14} ${x + 44} ${y + 18}`].join(' ')} stroke={color} strokeWidth={1} fill="none" opacity={0.4} />
          </motion.g>
        )}
      </motion.g>
    );
  }

  // stack
  return (
    <motion.g
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 18, delay }}
    >
      {/* Stack of 3 pages */}
      {[0, 1, 2].map((offset) => (
        <motion.path
          key={offset}
          d={roughRect(x + offset * 2, y + offset * 2, 28, 34, 0.8, 40 + offset)}
          fill={offset === 2 ? BRAND.cream : BRAND.creamDeep}
          stroke={active ? (offset === 2 ? color : BRAND.sandDeep) : BRAND.sandDeep}
          strokeWidth={offset === 2 ? 1.5 : 1}
          style={{ transition: 'stroke 0.4s ease' }}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={reduced ? { duration: 0 } : { duration: 0.25, delay: delay + offset * 0.08 }}
        />
      ))}
      {/* Small chart line on top page */}
      {active && (
        <motion.path
          d={[`M ${x + 6} ${y + 24}`, `L ${x + 12} ${y + 18}`, `L ${x + 18} ${y + 20}`, `L ${x + 24} ${y + 12}`].join(' ')}
          fill="none"
          stroke={BRAND.gold}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: delay + 0.3 }}
        />
      )}
      {/* Small coin */}
      {active && (
        <motion.circle
          cx={x + 26}
          cy={y + 8}
          r={4}
          fill={BRAND.gold}
          fillOpacity={0.2}
          stroke={BRAND.gold}
          strokeWidth={1}
          initial={reduced ? { scale: 1 } : { scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 12, delay: delay + 0.4 }}
        />
      )}
    </motion.g>
  );
}
