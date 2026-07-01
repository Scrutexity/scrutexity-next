'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsapSetup';

/**
 * MODULE 6 — Data Visualization Animation
 * 
 * Count-up counters triggered on scroll with connecting line animations.
 * The "before" metrics (47 unbooked, 6.2 days, etc.) animate as count-ups,
 * then SVG lines draw between related metrics to show causality.
 */

interface MetricDef {
  label: string;
  value: number;
  /** Display prefix (e.g., '$') */
  prefix?: string;
  /** Display suffix (e.g., ' days') */
  suffix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Accent color: 'terracotta' | 'sage' | 'default' */
  accent?: 'terracotta' | 'sage' | 'default';
}

interface AnimatedMetricBlockProps {
  metrics: MetricDef[];
  /** Show connecting lines between metrics */
  showConnections?: boolean;
  /** Label above the metric grid */
  sectionLabel?: string;
}

// ─── Individual Metric Counter ────────────────────────────────────────

function MetricCounter({
  metric,
  isActive,
  index,
}: {
  metric: MetricDef;
  isActive: boolean;
  index: number;
}) {
  const [display, setDisplay] = useState('0');
  const hasRun = useRef(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    hasRun.current = true;

    const isReduced = prefersReducedMotion();
    const target = metric.value;
    const decimals = metric.decimals || 0;

    if (isReduced) {
      setDisplay(target.toFixed(decimals));
      return;
    }

    // Delay based on index for sequential feel
    const delay = index * 200;
    const duration = 1600;

    setTimeout(() => {
      const startTime = performance.now();

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = eased * target;
        setDisplay(current.toFixed(decimals));
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(target.toFixed(decimals));
      }

      requestAnimationFrame(tick);
    }, delay);
  }, [isActive, metric, index]);

  const accentColor =
    metric.accent === 'terracotta'
      ? 'text-[#8a3a1e]'
      : metric.accent === 'sage'
        ? 'text-[#7f8f78]'
        : 'text-espresso';

  // Format the display value with commas for large numbers
  const formatted = (() => {
    const num = parseFloat(display);
    if (isNaN(num)) return display;
    if (metric.decimals && metric.decimals > 0) return num.toFixed(metric.decimals);
    return Math.round(num).toLocaleString();
  })();

  return (
    <div ref={elRef} className="metric-counter-block">
      <p className={`font-mono text-xl font-bold ${accentColor} tabular-nums`}>
        {metric.prefix || ''}{formatted}{metric.suffix || ''}
      </p>
      <p className="mt-0.5 text-[11px] text-[#9a8775]">{metric.label}</p>
    </div>
  );
}

// ─── SVG Connecting Lines ─────────────────────────────────────────────

function ConnectingLines({ isActive }: { isActive: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;

    const svg = svgRef.current;
    if (!svg) return;

    if (prefersReducedMotion()) {
      svg.querySelectorAll('path').forEach((p) => {
        p.style.strokeDashoffset = '0';
        p.style.opacity = '1';
      });
      return;
    }

    const paths = svg.querySelectorAll<SVGPathElement>('.connect-line');
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.opacity = '1';

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        delay: 1.5 + i * 0.3, // Wait for counters to finish
        ease: 'power2.inOut',
      });
    });
  }, [isActive]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 800 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Line from metric 1 (Unbooked) → metric 2 (Response delay) */}
      <path
        className="connect-line"
        d="M 150 40 C 230 15, 370 15, 450 40"
        fill="none"
        stroke="rgba(185,130,95,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ opacity: 0 }}
      />
      {/* Line from metric 2 (Delay) → metric 4 (Pipeline) */}
      <path
        className="connect-line"
        d="M 450 40 C 530 65, 600 65, 700 40"
        fill="none"
        stroke="rgba(127,143,120,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ opacity: 0 }}
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────

export default function AnimatedMetricBlock({
  metrics,
  showConnections = true,
  sectionLabel,
}: AnimatedMetricBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const hasInit = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasInit.current) return;
    hasInit.current = true;

    if (prefersReducedMotion()) {
      setIsActive(true);
      return;
    }

    ScrollTrigger.create({
      trigger: container,
      start: 'top 78%',
      once: true,
      onEnter: () => setIsActive(true),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {sectionLabel && (
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#9a8775]">
          {sectionLabel}
        </p>
      )}
      <div className="relative grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4">
        {metrics.map((metric, i) => (
          <MetricCounter key={metric.label} metric={metric} isActive={isActive} index={i} />
        ))}
        {showConnections && <ConnectingLines isActive={isActive} />}
      </div>
    </div>
  );
}
