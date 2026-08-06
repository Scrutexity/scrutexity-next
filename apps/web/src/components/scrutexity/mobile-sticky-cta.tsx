"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

// Routes where the sticky CTA would point at the page you are already on —
// and, worse, sit on top of the form you are trying to fill in.
const SUPPRESSED_ROUTES = ['/private-assessment', '/contact', '/checkout'];

export function MobileStickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const suppressed = SUPPRESSED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

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
      {isVisible && !suppressed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 lg:hidden pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Link
              href="/private-assessment?source=scrutexity-mobile-sticky"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_label: 'Request a Private Assessment - Mobile Sticky',
                  destination: '/private-assessment?source=scrutexity-mobile-sticky',
                  section: 'mobile-sticky',
                })
              }
              className="flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 font-sans text-sm font-semibold text-cream shadow-[0_12px_28px_rgba(28,24,20,0.24)] transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Request a Private Assessment
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
