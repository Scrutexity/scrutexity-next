'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  rotation?: number;
  className?: string;
}

export default function FloatingCard({ children, delay = 0, rotation = -3, className = '' }: FloatingCardProps) {
  return (
    <motion.div
      className={`relative bg-cream rounded-2xl border border-sand shadow-[0_20px_60px_-15px_rgba(61,43,31,0.12)] overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 60, rotateY: rotation }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: '0 30px 80px -20px rgba(61,43,31,0.18)', transition: { duration: 0.3 } }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}
