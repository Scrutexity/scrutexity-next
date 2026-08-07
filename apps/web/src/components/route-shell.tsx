'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { SiteNav } from '@/components/site-nav';
import Footer from '@/components/sections/footer';
import { MobileStickyCTA } from '@/components/scrutexity/mobile-sticky-cta';
import PaperNoise from '@/components/ui/PaperNoise';

/**
 * RouteShell — pathname-aware chrome gate.
 *
 * The root layout renders the Scrutexity marketing chrome (SiteNav, Footer,
 * paper-grain overlay, sticky mobile CTA, fixed-nav offset) on every route.
 * The /redesign route is a standalone literal-palette concept page that ships
 * its own nav/footer, so this shell suppresses the global chrome there and
 * renders it unchanged everywhere else.
 */
export default function RouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const standalone = pathname.startsWith('/redesign');

  return (
    <>
      {!standalone && <PaperNoise />}
      {!standalone && <SiteNav />}
      <main className={standalone ? 'relative z-10' : 'relative z-10 pt-nav-offset'}>
        {children}
      </main>
      {!standalone && <Footer />}
      {!standalone && <MobileStickyCTA />}
    </>
  );
}
