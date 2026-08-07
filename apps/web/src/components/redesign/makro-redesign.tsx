'use client';

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
 * MakroRedesign — literal-palette clone of makro.framer.website/home-alt
 * (Makro: Responsive AI Website Template) with ORIGINAL Scrutexity copy.
 *
 * 14 sections in source order:
 *   1 Nav → 2 Hero → 3 TrustedBy → 4 CaseStudy → 5 FeatureTabs → 6 Showcase
 *   → 7 Clarity → 8 Pricing → 9 Enterprise → 10 Testimonials → 11 FAQ
 *   → 12 Blog → 13 FinalCTA → 14 Footer
 *
 * Palette (literal Makro tokens, founder-approved override of DESIGN_SYSTEM.md,
 * scoped to this route only):
 *   bg #14142d · panels #33335e/#242426 · text #ebedfa · muted #9391b8
 *   lime #d9ff5c · periwinkle #c0adff · ice #b8deff · blush #e0c5b6
 */
export default function MakroRedesign() {
  return (
    <div
      id="redesign-root"
      style={{
        fontFamily:
          'var(--font-redesign), var(--font-geist), ui-sans-serif, system-ui, sans-serif',
      }}
      className="min-h-screen overflow-x-hidden bg-[#14142d] text-[#ebedfa] selection:bg-[#d9ff5c]/30 selection:text-[#14142d]"
    >
      <MakroNav />
      <main>
        <MakroHero />
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
