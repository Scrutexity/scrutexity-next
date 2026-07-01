import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Clinical Demand Governance | Scrutexity',
  description: 'AI is hallucinating your FDA-regulated claims. Run a live snapshot of your domain and secure your clinical marketing surface area.',
  robots: 'noindex, nofollow', // Ensure this is explicitly for podcast listeners, not organic search
};

export default function TechWeekPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans flex flex-col justify-center items-center py-20 px-6">
      
      {/* Narrative Focus */}
      <div className="max-w-3xl text-center">
        <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-6 font-mono font-bold">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage-deep mr-2" />
          NY Tech Week Podcast Listeners
        </span>
        
        <h1 className="font-display text-5xl md:text-7xl text-ink tracking-[-0.03em] leading-[1.02] mb-6">
          Clinical Demand <span className="italic text-sage-deep">Governance.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-mist leading-[1.6] max-w-2xl mx-auto mb-10 font-sans">
          The greatest existential threat to scaling a medical aesthetic or SaaS company isn't competition — it's AI hallucinating FDA-regulated claims on your marketing surface area. Stop guessing where your liability lies.
        </p>

        {/* Singular CTA Push */}
        <div className="bg-bone border border-sand-deep/30 rounded-2xl p-8 md:p-12 shadow-xl inline-block max-w-2xl w-full text-left">
          <h2 className="font-display text-2xl md:text-3xl text-ink tracking-[-0.01em] mb-4">
            See your exposure in real-time.
          </h2>
          <p className="text-sm text-mist leading-[1.6] mb-8 font-sans">
            Run your domain through our diagnostic engine. We will map your unsupported claims, proof gaps, and regulatory exposure in a live snapshot. No credit card, no sign-up.
          </p>
          <Link
            href="https://auditgpt.ai/snapshot?source=techweek"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-sage-deep px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.16em] text-cream border border-ink/30 ring-1 ring-inset ring-cream/10 hover:bg-ink hover:text-sage-soft transition-all duration-300 group/btn shadow-md"
          >
            Run Domain Snapshot
            <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
