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
      // Keep the primary page content unobstructed until the opening composition has passed.
      if (window.scrollY > 900) {
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
          data-mobile-sticky-cta
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center border-t border-sand-deep/35 bg-cream/95 px-4 py-3 backdrop-blur-md lg:hidden"
        >
          <div className="pointer-events-auto w-full max-w-sm">
            <Link
              href="/contact?intent=claim-support-review&source=scrutexity-mobile-sticky"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_label: 'Start a Claim Support Review - Mobile Sticky',
                  destination: '/contact?intent=claim-support-review&source=scrutexity-mobile-sticky',
                  section: 'mobile-sticky',
                })
              }
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 font-sans text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Start a $99 Claim Review
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
