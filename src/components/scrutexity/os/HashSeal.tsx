"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const HEX = '0123456789abcdef';
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

/**
 * HashSeal — a tiny "sealing" micro-component. On mount and on hover it briefly
 * scrambles through randomized hex, then resolves to a fixed verification code.
 * Reinforces the SHA-256 / proof-ledger identity without extra copy.
 *
 * Accessibility: the resolved value is rendered on the server and as the initial
 * state, so non-JS and reduced-motion users always see the final code with no
 * layout shift (monospace + tabular-nums keep the width fixed while scrambling).
 */
export function HashSeal({
  value = '0x8f9a17f4e8d2',
  label = 'Seal',
  className = '',
}: {
  value?: string;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const scramble = useCallback(() => {
    if (reduce) return;
    stop();
    let iteration = 2; // preserve the "0x" prefix
    timer.current = setInterval(() => {
      setDisplay(
        value
          .split('')
          .map((ch, i) => {
            if (i < 2) return ch; // keep 0x
            if (i <= iteration) return value[i];
            return HEX[Math.floor(Math.random() * HEX.length)];
          })
          .join(''),
      );
      iteration += 1;
      if (iteration >= value.length) {
        stop();
        setDisplay(value);
      }
    }, 45);
  }, [reduce, stop, value]);

  useEffect(() => {
    scramble();
    return stop;
  }, [scramble, stop]);

  return (
    <span
      onMouseEnter={scramble}
      className={`flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-mist/80 ${className}`}
      style={{ fontFamily: MONO }}
    >
      {label}
      <span className="font-semibold text-espresso tabular-nums lowercase">{display}</span>
    </span>
  );
}

export default HashSeal;
