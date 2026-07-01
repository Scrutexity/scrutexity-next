import { Metadata } from 'next';
import Link from 'next/link';
import ConsultRecoveryPipeline from '@/components/ConsultRecoveryPipeline';

export const metadata: Metadata = {
  title: 'Scrutexity | Platform – Cross-EMR Normalization for MSOs',
  description: 'The only read-only governance layer that normalizes intent and compliance data across Boulevard, Mangomint, and Zenoti. One portfolio, one audit trail.',
};

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#221F1B] font-sans antialiased">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <section className="mb-20 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Cross-EMR Normalization
          </h1>
          <p className="text-xl text-[#221F1B]/70 max-w-3xl mx-auto">
            One read-only layer above <span className="font-semibold text-[#221F1B]">Boulevard and Mangomint</span>{' '}
            (Zenoti: pipeline pending Q3). Unified intent record, tamper-evident audit trail, and portfolio-wide governance.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 border border-[#B9825F]/30 bg-[#B9825F]/5 text-[#B9825F] text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Demo verification record</span>
            <span className="opacity-40">|</span>
            <span className="font-mono">Sample · scrutexity.com/verify</span>
          </div>
        </section>

        {/* Integration Grid */}
        <section className="mb-24">
          <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">Supported platforms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <IntegrationCard
              name="Boulevard"
              status="live"
              description="Read-only webhook integration. Captures missed consults, routing exceptions, and deposit intent."
            />
            <IntegrationCard
              name="Mangomint"
              status="live"
              description="Real-time event ingestion. Tracks after-hours inquiries and clinical handoff compliance."
            />
            <IntegrationCard
              name="Zenoti"
              status="planned"
              description="Portfolio-level normalization only. Available for mixed-stack MSOs with 5+ locations."
            />
          </div>
          <p className="text-center text-sm text-[#221F1B]/50 mt-6">
            All integrations are read-only and HIPAA-aligned. No data migration, no staff retraining.
          </p>
        </section>

        {/* Technical schematic */}
        <section className="mb-24">
          <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">Architecture overview</h2>
          <div className="space-y-8">
            <div className="bg-[#FBF7EF] border border-[#221F1B]/10 rounded-2xl overflow-hidden shadow-sm">
              <img 
                src="/cross-emr-schematic.svg" 
                alt="How revenue data flows across EMRs into one unified view"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="bg-[#FBF7EF] border border-[#221F1B]/10 rounded-2xl overflow-hidden shadow-sm">
              <img 
                src="/aggregation-mesh.svg" 
                alt="Unified revenue visibility layer showing data flowing from multiple systems into one dashboard"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <p className="text-center text-xs text-[#221F1B]/50 mt-4">Operational verification only. Not legal or medical advice.</p>
        </section>

        {/* Animated cross-EMR pipeline */}
        <section className="mb-24">
          <ConsultRecoveryPipeline />
        </section>

        {/* How Cross-EMR Works */}
        <section className="mb-24 border-t border-[#221F1B]/10 pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-4">One portfolio, one record</h2>
              <p className="text-[#221F1B]/70 leading-relaxed mb-4">
                Each location runs its own EMR. Your portfolio has no single source of truth — until now.
              </p>
              <p className="text-[#221F1B]/70 leading-relaxed">
                Scrutexity ingests events from every EMR, compares them side by side,
                and seals each event into a tamper-evident audit trail. The result: a unified view of
                missed consults, clinical handoffs, and attestation records across your entire MSO.
              </p>
            </div>
            <div className="bg-white border border-[#221F1B]/10 rounded-2xl p-6 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-terracotta mb-2">Audit trail sample</div>
              <pre className="font-mono text-xs text-[#221F1B]/80 whitespace-pre-wrap">
{`{
  "event": "missed_consult",
  "source": "boulevard",
  "location": "NYC - Flatiron",
  "protocol_step": "escalated_to_np",
  "hash": "0x7f83b1..."
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Scale Section */}
        <section className="mb-24 bg-white border border-[#221F1B]/10 rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="font-serif text-2xl md:text-3xl mb-4 text-center">Scale without replacing your EMRs</h2>
          <p className="text-center text-[#221F1B]/70 max-w-2xl mx-auto mb-10">
            Add locations, open new markets, or acquire clinics — your comparison layer stays intact.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-serif text-terracotta mb-2">14 days</div>
              <div className="text-sm text-[#221F1B]/60">to deploy across a new location</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-terracotta mb-2">100%</div>
              <div className="text-sm text-[#221F1B]/60">read-only, no migration risk</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-terracotta mb-2">Unlimited</div>
              <div className="text-sm text-[#221F1B]/60">locations per portfolio</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">Ready to see your unified portfolio?</h2>
          <p className="text-[#221F1B]/70 mb-8 max-w-xl mx-auto">
            Request a 14-day calibration. We'll connect to your existing EMRs and deliver a portfolio-wide audit trail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pilot"
              className="govbtn inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold transition duration-300"
            >
              Request portfolio audit →
            </Link>
            <Link
              href="/for-pe"
              className="btn-ghost inline-flex items-center gap-2 rounded-full border border-[#d8c4ad] px-8 py-3.5 text-sm font-semibold text-[#5f574f] transition hover:bg-[#f3eadf]"
            >
              Download diligence packet
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function IntegrationCard({ name, status, description }: { name: string; status: 'live' | 'planned'; description: string }) {
  const config = status === 'live'
    ? { label: 'Live', bg: 'bg-[#eef3ea]', text: 'text-[#3b6d44]' }
    : { label: 'Planned · pipeline pending Q3', bg: 'bg-[#f4ecdf]', text: 'text-[#9b6a51]' };

  return (
    <div className="border border-[#221F1B]/10 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-serif text-xl">{name}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
          {config.label}
        </span>
      </div>
      <p className="text-sm text-[#221F1B]/70 mb-4">{description}</p>
    </div>
  );
}
