'use client';

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HolographicDataCardProps {
  metric: string;
  label: string;
  ledgerContext: string;
}

export default function HolographicDataCard({ metric, label, ledgerContext }: HolographicDataCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canTilt, setCanTilt] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 170, damping: 18, mass: 0.55 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 170, damping: 18, mass: 0.55 });
  const hue = useMotionValue(170);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const transform = useMotionTemplate`perspective(1100px) translateZ(28px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const border = useMotionTemplate`conic-gradient(from ${hue}deg at ${shineX}% ${shineY}%, rgba(184,125,107,0.58), rgba(245,240,232,0.20), rgba(47,93,74,0.30), rgba(184,125,107,0.42), rgba(245,240,232,0.26), rgba(184,125,107,0.58))`;
  const highlight = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(245,240,232,0.52), rgba(184,125,107,0.11) 26%, rgba(245,240,232,0) 58%)`;

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanTilt(pointerQuery.matches);

    update();
    pointerQuery.addEventListener('change', update);
    return () => pointerQuery.removeEventListener('change', update);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !canTilt) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - y) * 3.5);
    rotateY.set((x - 0.5) * 3.5);
    shineX.set(x * 100);
    shineY.set(y * 100);
    hue.set(140 + x * 90 + y * 36);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    shineX.set(50);
    shineY.set(50);
    hue.set(170);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsExpanded(false);
        reset();
      }}
      onHoverStart={() => setIsExpanded(true)}
      style={canTilt && !prefersReducedMotion ? { transform } : undefined}
      className={`group relative transform-gpu overflow-hidden rounded-xl p-px shadow-[0_18px_52px_-38px_rgba(47,93,74,0.52),0_0_32px_-24px_rgba(184,125,107,0.72)] transition-shadow duration-500 hover:shadow-[0_22px_60px_-40px_rgba(47,93,74,0.58),0_0_28px_-12px_rgba(184,125,107,0.28)] ${
        canTilt && !prefersReducedMotion ? 'will-change-transform' : ''
      }`}
    >
      <motion.div className="absolute inset-0 opacity-45 transition-opacity duration-300 group-hover:opacity-100" style={{ background: border }} />
      <div className="relative overflow-hidden rounded-[11px] border border-bone/35 bg-[linear-gradient(to_bottom,rgba(245,240,232,0.92),rgba(245,240,232,0.72)_18%,rgba(232,224,216,0.58)_100%)] p-6 shadow-[inset_0_1px_0_rgba(245,240,232,0.92),inset_0_-1px_0_rgba(47,93,74,0.08)] backdrop-blur-2xl">
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100" style={{ background: highlight }} />
        <button
          type="button"
          className="relative z-10 flex w-full items-start justify-between gap-5 text-left"
          onClick={() => setIsExpanded((value) => !value)}
          aria-expanded={isExpanded}
        >
          <span>
            <span className="font-space-grotesk block text-5xl font-semibold leading-none tracking-normal text-pine sm:text-6xl">
              {metric}
            </span>
            <span className="mt-4 block text-base leading-7 text-ink/70">{label}</span>
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-clay/30 bg-clay/10 text-pine"
          >
            <ChevronDown size={18} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="ledger"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="font-jetbrains mt-6 border-t border-clay/20 bg-creamone/55 p-4 text-xs leading-6 text-ink/75">
                {ledgerContext}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
