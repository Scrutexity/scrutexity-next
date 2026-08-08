'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FreeSnapshotCTAProps {
  source: string;
}

export default function FreeSnapshotCTA({ source }: FreeSnapshotCTAProps) {
  return (
    <section className="relative px-6 py-24 bg-espresso border-t border-cream/10 overflow-hidden">
      {/* Premium Textured Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sage-deep/20 via-espresso to-espresso -z-10" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-block px-3 py-1 mb-6 text-[10px] uppercase tracking-[0.2em] text-sage font-mono font-bold border border-sage/20 rounded-full bg-sage/5">
          Want the quick version first?
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-cream tracking-[-0.02em] leading-[1.1] mb-6">
          Get your free Visibility &amp; Trust Snapshot
        </h2>
        <p className="text-sm md:text-base text-cream/70 leading-[1.6] mb-10 max-w-2xl mx-auto">
          Send your website and Scrutexity will prepare a free 3-point Visibility &amp; Trust Snapshot: one claim/trust issue, one AI/search visibility gap, and one quick fix.
        </p>
        
        <div className="relative inline-block group">
          {/* Animated glow behind button */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sage to-accent-bright rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
          
          <Link
            href={`/claim-audit?intent=claim-audit&source=${source}`}
            className="relative px-8 py-4 bg-cream text-espresso font-sans font-bold uppercase tracking-wider text-xs rounded-xl transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.02] hover:bg-white"
          >
            Get Free Snapshot
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <p className="mt-10 text-[10px] text-cream/40 italic font-mono uppercase tracking-widest">
          No legal, clinical, regulatory, ranking, or revenue guarantees.
        </p>
      </div>
    </section>
  );
}
