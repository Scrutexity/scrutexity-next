"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

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
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 lg:hidden pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Link
              href="/contact?intent=claim-support-review&source=scrutexity-mobile-sticky"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_label: 'Get a Claim Snapshot - Mobile Sticky',
                  destination: '/contact?intent=claim-support-review&source=scrutexity-mobile-sticky',
                  section: 'mobile-sticky',
                })
              }
              className="flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 font-sans text-sm font-semibold text-cream shadow-[0_12px_28px_rgba(28,24,20,0.24)] transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Get a Claim Snapshot
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
