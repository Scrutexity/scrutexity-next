import Link from 'next/link';
import { ArrowRight, Archive, CheckCircle2 } from 'lucide-react';
import FreeSnapshotCTA from '@/components/ui/FreeSnapshotCTA';

export const metadata = {
  title: 'Recovery Archive | Scrutexity Strategic Inventory',
  description:
    'The missed-demand recovery concept is archived strategic inventory. Scrutexity now uses the med-spa and wellness research as a wedge for AuditGPT claim intelligence.',
};

export default function RecoveryPage() {
  const archiveSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Scrutexity Recovery Archive',
    description:
      'Archived strategic inventory for Scrutexity missed-demand recovery research, retained as market context for AuditGPT claim intelligence.',
    provider: { '@type': 'Organization', name: 'Scrutexity' },
    url: 'https://www.scrutexity.com/recovery',
  };

  const archiveNotes = [
    {
      title: 'Archived, not active',
      desc: 'The old missed-demand recovery product is no longer the live Scrutexity offer. It remains useful as research, positioning history, and vertical context.',
    },
    {
      title: 'Category became crowded',
      desc: 'AI receptionist and missed-call recovery vendors now sell directly into med spas, with several Boulevard, Mangomint, and Zenoti-aligned paths already visible.',
    },
    {
      title: 'The useful wedge moved',
      desc: 'Med spas, medical weight loss, GLP-1, IV therapy, and wellness clinics are still strong AuditGPT targets because their public claims are high-scrutiny and often under-supported.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveSchema) }} />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">
            Archived Strategic Inventory
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-espresso tracking-tight leading-[1.05]">
            Recovery is archived.{' '}
            <span className="italic text-sage-deep font-sans">AuditGPT is the active line.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-[1.6]">
            Scrutexity previously explored AI-powered missed-demand recovery for med spas and
            wellness operators. That concept is now retained as strategic inventory, not sold as an
            active product. The live motion is AuditGPT: claim support review, AI answer reality, and
            agent guardrail audits for businesses whose public claims need evidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://auditgpt.ai/snapshot?source=recovery-archive"
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_8px_24px_rgba(94,122,90,0.15)]"
            >
              Run AuditGPT
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/glp-1-weight-loss-claim-audit"
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              GLP-1 Claim Audit
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div className="bg-bone border border-sand-deep/30 rounded-3xl p-8 flex flex-col justify-center">
            <Archive size={32} className="text-sage-deep mb-4" />
            <h2 className="font-display text-3xl text-espresso mb-3">Why it stays archived</h2>
            <p className="text-sm text-mist leading-[1.6]">
              The recovery idea was feature-shaped and the market moved quickly. The stronger
              position is to use that domain knowledge to sell claim intelligence into the same
              high-risk verticals, especially medical aesthetics and weight loss.
            </p>
          </div>

          <div className="space-y-5">
            {archiveNotes.map((item, i) => (
              <div key={item.title} className="flex items-start gap-4 p-5 bg-cream-deep border border-sand-deep/30 rounded-2xl">
                <span className="h-6 w-6 shrink-0 rounded-full bg-sage/15 text-sage-deep text-[10px] font-bold font-mono flex items-center justify-center">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl text-espresso mb-1">{item.title}</h3>
                  <p className="text-sm text-mist leading-[1.6]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-sand-deep/15">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">
              Active Vertical Use
            </p>
            <h2 className="font-display text-3xl text-espresso mb-6">
              Sell claim intelligence to the vertical. Do not rebuild recovery for it.
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'GLP-1 and medical weight-loss outcome claims',
                'Before-and-after and testimonial language',
                'Compounded medication wording',
                'AI support or chatbot transcript drift',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-bark font-mono">
                  <CheckCircle2 size={14} className="text-sage shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <FreeSnapshotCTA source="recovery-archive" />
    </div>
  );
}
