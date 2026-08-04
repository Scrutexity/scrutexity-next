'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div key={pathname}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-full"
      >
        {/* Page Content Animation */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
            animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
            exit: { opacity: 0, y: -12, filter: 'blur(4px)' },
          }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {children}
        </motion.div>

        {/* Blueprint Line Sweep overlay */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: [0, 0.3, 0] },
            exit: { opacity: 0 },
          }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="absolute inset-0 bg-cream-deep opacity-10 [background-image:linear-gradient(rgba(28,24,20,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(28,24,20,0.07)_1px,transparent_1px)] [background-size:32px_32px]" />
          <motion.div
            className="h-px w-full bg-clay/55"
            variants={{
              initial: { scaleX: 0 },
              animate: { scaleX: [0, 1, 0] },
            }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

