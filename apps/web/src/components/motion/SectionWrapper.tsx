'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { createElement, type ReactNode } from 'react';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

type RenderTag = 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav' | 'ul';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  as?: RenderTag;
  id?: string;
  delay?: number;
  amount?: number;
}

function pickMotionTag(tag: RenderTag) {
  switch (tag) {
    case 'section': return motion.section;
    case 'div': return motion.div;
    case 'article': return motion.article;
    case 'aside': return motion.aside;
    case 'header': return motion.header;
    case 'footer': return motion.footer;
    case 'main': return motion.main;
    case 'nav': return motion.nav;
    case 'ul': return motion.ul;
  }
}

export default function SectionWrapper({
  children,
  className = '',
  as = 'section',
  id,
  delay = 0,
  amount = 0.18,
}: SectionWrapperProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(as, { id, className }, children);
  }

  const Tag = pickMotionTag(as);

  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: CINEMATIC_EASE }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </Tag>
  );
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.18,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: CINEMATIC_EASE },
  },
};

interface StaggerSectionProps extends SectionWrapperProps {
  staggerChildren?: number;
  delayChildren?: number;
}

export function StaggerSection({
  children,
  className = '',
  as = 'section',
  id,
  amount = 0.18,
  staggerChildren: stagger = 0.12,
  delayChildren = 0.18,
}: StaggerSectionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(as, { id, className }, children);
  }

  const Tag = pickMotionTag(as);

  return (
    <Tag
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: RenderTag;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(as, { className }, children);
  }

  const Tag = pickMotionTag(as);

  return (
    <Tag className={className} variants={staggerItem}>
      {children}
    </Tag>
  );
}

export { staggerContainer, staggerItem, CINEMATIC_EASE };
