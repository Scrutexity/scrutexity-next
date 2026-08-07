'use client';

import { useState } from 'react';
import {
  MakroNav,
  MakroHero,
  MakroTrustedBy,
  MakroCaseStudy,
} from './top-sections';
import { MakroFeatureTabs } from './feature-grid';
import { MakroShowcase } from './showcase';
import { MakroClarity } from './clarity';
import { MakroPricing, MakroEnterprise } from './pricing';
import { MakroTestimonials } from './testimonials';
import { MakroFaq } from './faq';
import { MakroBlog } from './blog';
import { MakroFinalCTA, MakroFooter } from './closing';

/**
 * MakroRedesign — Responsive AI Website Template with Hero Option & Light/Dark Theme Toggles.
 *
 * Hero options:
 *   1 → Dark mode (Midnight #14142d, Lime #d9ff5c accents)
 *   2 → Light mode (Clean Ice #f4f6fa, Dark Charcoal text #14142d)
 *   3 → Hybrid mode (Light top with dark contrast cards)
 */
export default function MakroRedesign() {
  const [heroOption, setHeroOption] = useState<'1' | '2' | '3'>('2');

  const isLight = heroOption === '2';

  return (
    <div
      id="redesign-root"
      style={{
        fontFamily:
          'var(--font-redesign), var(--font-geist), ui-sans-serif, system-ui, sans-serif',
      }}
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isLight
          ? 'bg-[#f4f6fa] text-[#14142d] selection:bg-[#d9ff5c] selection:text-[#14142d]'
          : 'bg-[#14142d] text-[#ebedfa] selection:bg-[#d9ff5c]/30 selection:text-[#14142d]'
      }`}
    >
      <MakroNav heroOption={heroOption} setHeroOption={setHeroOption} isLight={isLight} />
      <main>
        <MakroHero heroOption={heroOption} isLight={isLight} />
        <MakroTrustedBy />
        <MakroCaseStudy />
        <MakroFeatureTabs />
        <MakroShowcase />
        <MakroClarity />
        <MakroPricing />
        <MakroEnterprise />
        <MakroTestimonials />
        <MakroFaq />
        <MakroBlog />
        <MakroFinalCTA />
      </main>
      <MakroFooter />
    </div>
  );
}
