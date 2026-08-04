'use client';

import Link from 'next/link';
import React, { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export function MaskedHeadline({
  children,
  delay = 0,
  className = '',
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  const lines = children.split('\n');

  return (
    <span className={`block overflow-hidden ${className}`}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className="block"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              ease: cinematicEase,
              delay: delay + index * 0.15,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: cinematicEase,
    },
  },
};

export function BentoGrid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function BentoCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={`rounded-3xl border border-bone/10 bg-[var(--color-card-bg)] p-8 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-clay/40 hover:shadow-[0_0_20px_rgba(184,125,107,0.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const sharedClass = `group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-bone/10 bg-ink px-8 py-4 text-sm font-semibold text-bone transition-[border-color,box-shadow,transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-clay/50 hover:shadow-[0_0_20px_rgba(184,125,107,0.15)] ${className}`;
  const content = (
    <>
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-bone/18 to-transparent opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-full group-hover:opacity-100" />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: cinematicEase }}
        className="inline-flex"
      >
        <Link href={href} onClick={onClick} className={sharedClass}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: cinematicEase }}
      className={sharedClass}
    >
      {content}
    </motion.button>
  );
}
