'use client';

import { type ReactNode } from 'react';
import SmoothScrollProvider from '@/components/scrutexity/smooth-scroll-provider';
import SiteNav from '@/components/sections/site-nav';
import Footer from '@/components/sections/footer';
import { ScrollProgress, MobileStickyCta } from '@/components/scrutexity/scroll-chrome';

/**
 * SubpageLayout — wraps any subpage with the same SiteNav, Footer,
 * scroll progress bar, and smooth scroll as the homepage.
 */
export default function SubpageLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <SiteNav />
      <main className="pt-[72px]">{children}</main>
      <Footer />
      <MobileStickyCta />
    </SmoothScrollProvider>
  );
}
