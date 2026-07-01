'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsapSetup';

/**
 * MODULE 3 — Data Ledger as Living Audit Trail
 * 
 * Scroll-triggered "ticker" that animates recovery log rows sequentially.
 * Each row slides in from the left with stagger. Deposit amounts get a 
 * gold highlight pulse. A floating live counter increments from 0 to actuals.
 */

interface RecoveryRow {
  day: string;
  time: string;
  src: string;
  inquiry: string;
  response: string;
  status: string;
  deposit: string | null;
}

interface LiveAuditTickerProps {
  rows: RecoveryRow[];
}

// ─── Count-up counter ─────────────────────────────────────────────────

function useCountUp(target: number, isActive: boolean, duration = 1.8) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    if (prefersReducedMotion()) {
      setCount(target);
      hasRun.current = true;
      return;
    }

    hasRun.current = true;
    const startTime = performance.now();
    const totalMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      // Ease-out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [target, isActive, duration]);

  return count;
}

function useCountUpCurrency(target: number, isActive: boolean, duration = 2.0) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    if (prefersReducedMotion()) {
      setCount(target);
      hasRun.current = true;
      return;
    }

    hasRun.current = true;
    const startTime = performance.now();
    const totalMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [target, isActive, duration]);

  return count;
}

// ─── Floating Summary Counter ─────────────────────────────────────────

function FloatingSummary({ isActive }: { isActive: boolean }) {
  const reactivated = useCountUp(19, isActive);
  const booked = useCountUp(7, isActive, 2.2);
  const pipeline = useCountUpCurrency(28400, isActive);

  return (
    <div className="absolute -top-2 -right-2 z-20 flex flex-col gap-1.5
                    rounded-2xl border border-sand-deep bg-cream/95
                    px-4 py-3 shadow-[0_12px_40px_rgba(85,62,41,0.1)]
                    backdrop-blur-xl
                    sm:top-4 sm:right-4">
      <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#9a8775]">
        Live Recovery
      </p>
      <div className="flex gap-4">
        <div>
          <p className="font-mono text-lg font-bold text-espresso tabular-nums">{reactivated}</p>
          <p className="text-[8px] text-[#9a8775]">reactivated</p>
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-espresso tabular-nums">{booked}</p>
          <p className="text-[8px] text-[#9a8775]">booked</p>
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-[#7f8f78] tabular-nums">
            ${pipeline.toLocaleString()}
          </p>
          <p className="text-[8px] text-[#9a8775]">pipeline</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────

export default function LiveAuditTicker({ rows }: LiveAuditTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const depositRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const hasInit = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasInit.current) return;
    hasInit.current = true;

    if (prefersReducedMotion()) {
      setIsVisible(true);
      rowRefs.current.forEach((row) => {
        if (row) {
          row.style.opacity = '1';
          row.style.transform = 'none';
        }
      });
      return;
    }

    // Set initial state for rows
    rowRefs.current.forEach((row) => {
      if (row) {
        gsap.set(row, { opacity: 0, x: -24 });
      }
    });

    // ScrollTrigger for the container
    ScrollTrigger.create({
      trigger: container,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        setIsVisible(true);

        // Stagger rows in
        const validRows = rowRefs.current.filter(Boolean) as HTMLTableRowElement[];
        gsap.to(validRows, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          onComplete: () => {
            // Gold pulse on deposit amounts
            const validDeposits = depositRefs.current.filter(Boolean) as HTMLSpanElement[];
            validDeposits.forEach((dep, i) => {
              gsap.fromTo(dep, {
                boxShadow: '0 0 0 0 rgba(216,177,122,0)',
              }, {
                boxShadow: '0 0 16px 4px rgba(216,177,122,0.35)',
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
              });
            });
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <FloatingSummary isActive={isVisible} />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] font-mono text-[11px]">
          <thead>
            <tr className="border-b border-[#e5d4bb]">
              {['When', 'Source', 'Inquiry', 'Response', 'Outcome'].map((h) => (
                <th
                  key={h}
                  className="pb-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#9a8775] last:pr-0 last:text-right"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0e5d4]">
            {rows.map((row, i) => (
              <tr
                key={i}
                ref={(el) => { rowRefs.current[i] = el; }}
                className="audit-ticker-row transition-all duration-300
                           hover:bg-[#f9f3ea] hover:scale-[1.005] hover:shadow-[0_4px_16px_rgba(85,62,41,0.06)]"
              >
                <td className="py-2.5 pr-4 text-[#9a8775] whitespace-nowrap">
                  {row.day} {row.time}
                </td>
                <td className="py-2.5 pr-4 text-[#6b5a48] whitespace-nowrap">{row.src}</td>
                <td className="hidden py-2.5 pr-4 text-[#6b5a48] sm:table-cell">{row.inquiry}</td>
                <td className="py-2.5 pr-4 text-[#9a8775] whitespace-nowrap">{row.response}</td>
                <td className="py-2.5 text-right whitespace-nowrap">
                  <span
                    ref={(el) => { if (row.deposit) depositRefs.current[i] = el; }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-all duration-300 ${
                      row.status === 'CLINICAL → NP'
                        ? 'bg-[#eef3ea] text-[#7f8f78]'
                        : 'bg-[#0f2c2c] text-[#e6b17e]'
                    }`}
                  >
                    {row.status}
                    {row.deposit ? ` · ${row.deposit}` : ''}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
