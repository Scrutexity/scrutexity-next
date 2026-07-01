"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { MOVES, layerForMove, type Move } from './layers';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

/**
 * OperatingSystemHeader / System Position rail.
 * Shows the five-move operating system (Find → Fix → Monitor → Recover → Prove)
 * with the current layer highlighted. The same rail anchors every product page.
 */
export function LayerIndicator({
  currentMove,
  className = '',
}: {
  currentMove: Move;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const currentIndex = MOVES.indexOf(currentMove);

  return (
    <div
      className={`flex flex-wrap items-stretch gap-y-3 ${className}`}
      role="group"
      aria-label={`Operating system position: ${currentMove}`}
    >
      <span
        className="mr-4 hidden self-center text-[10px] uppercase tracking-[0.18em] text-mist sm:inline"
        style={{ fontFamily: MONO }}
      >
        Operating System
      </span>
      {MOVES.map((move, i) => {
        const layer = layerForMove(move);
        const active = move === currentMove;
        const passed = i < currentIndex;

        return (
          <div key={move} className="flex items-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className={`flex flex-col rounded-xl border px-3.5 py-2 ${
                active
                  ? 'border-sage-deep bg-sage-deep text-cream shadow-[0_10px_24px_-12px_rgba(94,122,90,0.6)]'
                  : 'border-sand-deep/40 bg-bone text-mist'
              }`}
            >
              <span
                className={`flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] ${
                  active ? 'text-cream/80' : passed ? 'text-sage-deep' : 'text-mist/70'
                }`}
                style={{ fontFamily: MONO }}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? 'bg-cream' : passed ? 'bg-sage-deep' : 'bg-sand-deep'
                  }`}
                />
                {move}
              </span>
              <span
                className={`mt-0.5 text-[12px] font-semibold tracking-[-0.01em] ${
                  active ? 'text-cream' : 'text-espresso'
                }`}
              >
                {layer?.name ?? move}
              </span>
            </motion.div>

            {i < MOVES.length - 1 && (
              <motion.span
                aria-hidden
                className={`mx-1.5 h-px w-5 origin-left sm:w-7 ${
                  i < currentIndex ? 'bg-sage-deep' : 'bg-sand-deep/50'
                }`}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default LayerIndicator;
