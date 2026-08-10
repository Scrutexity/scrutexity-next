"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SUPPRESSED_ROUTES = ["/contact", "/checkout"];

export function MobileStickyCTA() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const suppressed = SUPPRESSED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !suppressed && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: reducedMotion ? 0 : 0.24 }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 lg:hidden"
        >
          <Link
            href="/contact?intent=construction-brief"
            className="pointer-events-auto flex min-h-12 items-center gap-3 bg-safety-orange px-6 text-xs font-semibold uppercase tracking-[0.08em] text-graphite shadow-2xl"
          >
            Request an intelligence brief <ArrowRight size={15} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
