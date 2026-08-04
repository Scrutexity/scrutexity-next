"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past the first 400px (roughly the hero text on mobile)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 lg:hidden pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-mobile-sticky"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_label: 'Run AuditGPT Scan - Mobile Sticky',
                  destination: 'https://auditgpt.ai/snapshot?source=scrutexity-mobile-sticky',
                  section: 'mobile-sticky',
                })
              }
              className="flex items-center gap-2 rounded-full bg-sage-deep px-6 py-3.5 font-sans text-sm font-semibold text-cream shadow-[0_12px_28px_rgba(94,122,90,0.45)] transition-transform active:scale-95"
            >
              Run Scanner
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
