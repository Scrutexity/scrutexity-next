'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionStyle,
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'mint' | 'dark' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
};

const variants = {
  mint: 'bg-clay text-bone shadow-[0_20px_46px_-28px_rgba(184,125,107,0.9)] hover:bg-[#A86E5E]',
  dark: 'bg-pine text-bone shadow-[0_22px_52px_-32px_rgba(47,93,74,0.9)] hover:bg-[#274D3E]',
  ghost: 'border border-clay/25 bg-bone/72 text-ink shadow-[0_14px_36px_-30px_rgba(184,125,107,0.55)] backdrop-blur-xl hover:border-clay/45',
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'dark',
  className = '',
  ...buttonProps
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [canTilt, setCanTilt] = useState(false);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 });
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const highlight = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(245,240,232,0.42), rgba(184,125,107,0.16) 20%, rgba(245,240,232,0) 46%)`;

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanTilt(pointerQuery.matches);

    update();
    pointerQuery.addEventListener('change', update);
    return () => pointerQuery.removeEventListener('change', update);
  }, []);

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    shineX.set(50);
    shineY.set(50);
  };

  const track = (event: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !canTilt) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - y) * 10);
    rotateY.set((x - 0.5) * 10);
    shineX.set(x * 100);
    shineY.set(y * 100);
  };

  const baseClass = `group relative inline-flex transform-gpu items-center justify-center overflow-hidden rounded-full px-7 py-4 text-sm font-semibold transition-colors ${canTilt && !prefersReducedMotion ? 'will-change-transform' : ''} ${variants[variant]} ${className}`;
  const content = (
    <>
      <motion.span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: highlight }} />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
    </>
  );
  const style = (canTilt && !prefersReducedMotion ? { transform } : undefined) satisfies MotionStyle | undefined;

  if (href) {
    return (
      <motion.div style={style} onMouseMove={track} onMouseLeave={reset} whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}>
        <Link href={href} onClick={onClick} className={baseClass}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={buttonProps.type ?? 'button'}
      disabled={buttonProps.disabled}
      aria-label={buttonProps['aria-label']}
      style={style}
      onMouseMove={track}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      className={baseClass}
    >
      {content}
    </motion.button>
  );
}
