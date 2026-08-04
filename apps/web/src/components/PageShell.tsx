'use client';

import { motion } from 'framer-motion';
import GovButton from '@/components/GovButton';
import Link from 'next/link';

const lux = [0.16, 1, 0.3, 1] as const;

export default function PageShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream text-espresso">
      {/* Premium hero band */}
      <section className="relative overflow-hidden px-7 pb-14 pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="luxury-noise absolute inset-0 opacity-[0.06]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(127,143,120,0.10),transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: lux }}
            className="section-kicker block"
          >
            {kicker}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: lux }}
            className="mt-4 max-w-[20ch] font-display text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.01em] sm:text-[3.2rem]"
          >
            {title}
          </motion.h1>
          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: lux }}
              className="mt-6 max-w-[58ch] text-[1.1rem] leading-relaxed text-espresso/70"
            >
              {intro}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.24, ease: lux }}
            className="mt-9 h-px w-28 origin-left bg-gradient-to-r from-terracotta/60 to-transparent"
          />
        </div>
      </section>
      {children}
    </div>
  );
}

export function CTARow() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <GovButton href="/pilot" label="Get Your Free Audit" className="btn-md" />
      <Link href="/for-pe" className="btn-ghost btn-md">
        For PE buyers
      </Link>
    </div>
  );
}
