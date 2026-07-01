import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Handshake, ShieldCheck } from 'lucide-react';
import PartnerOsApplicationForm from './PartnerOsApplicationForm';

export const metadata: Metadata = {
  title: 'Scrutexity Partner OS Founding Beta | Apply',
  description:
    'Apply for one of 5 Scrutexity Partner OS founding beta spots for agencies serving med spas, wellness clinics, aesthetic practices, and high-trust local healthcare clients.',
  alternates: { canonical: '/partner-os' },
};

const betaTerms = [
  '$499/month, billed monthly',
  'Cancel anytime after first month',
  '10 Claim Intelligence Receipts per month (white-label for clients)',
  'Claim Cleanup Record playbook + templates',
  'AI Answer Reality Receipts',
  'Safer rewrite packs + proof-gap maps',
  'Agency-branded PDF exports',
  'Optional Scrutexity fulfillment support, billed separately',
  'Access to early activation playbooks',
  'Monthly 15–20 minute feedback call',
];

const sequence = [
  'Free sample finding for client page',
  '$299 Claim Intelligence Report',
  'Claim Intelligence Receipt — client approval record',
  '$1,997 Claim Cleanup Record',
  '$299/month Claim Drift Monitoring',
  'Partner OS relationship',
];

export default function PartnerOsPage() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <section className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_420px] lg:items-start">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">
              Partner OS Founding Beta
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-espresso md:text-6xl">
              Apply for Scrutexity Partner OS.
              <span className="block italic text-sage-deep">Limited to 5 founding partners.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.65] text-mist md:text-lg">
              Before your agency launches GLP-1, body-contouring, IV therapy, exosome, or RF microneedling pages, give your client a Claim Intelligence Receipt — showing what was reviewed, what proof was found, what language was adjusted, and what the client approved. That is your CYA document. It is also a billable product.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-[1.65] text-mist">
              We are opening 5 beta spots for agencies that serve med spas, wellness clinics, aesthetic practices, and high-trust local healthcare clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#application"
                className="group inline-flex items-center gap-2 rounded-xl bg-sage-deep px-7 py-4 text-sm font-semibold text-cream transition-colors hover:bg-espresso"
              >
                Apply for Founding Beta
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="https://auditgpt.ai/snapshot?source=partner-os"
                className="inline-flex items-center gap-2 rounded-xl border border-sand-deep/45 bg-bone px-7 py-4 text-sm font-semibold text-espresso transition-colors hover:bg-cream"
              >
                Run AuditGPT
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-sand-deep/35 bg-bone p-6 shadow-[0_24px_80px_-60px_rgba(28,24,20,0.45)]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/12 text-sage-deep">
                <Handshake size={20} />
              </div>
              <div>
                <h2 className="font-display text-2xl text-espresso">Beta terms</h2>
                <p className="mt-2 text-sm leading-6 text-mist">
                  Founding terms require feedback calls and anonymized usage rights. Pricing is
                  subject to change based on early feedback.
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {betaTerms.map((term) => (
                <li key={term} className="flex gap-3 text-sm leading-6 text-mist">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mt-20 grid gap-8 border-y border-sand-deep/20 py-12 md:grid-cols-3">
          <div>
            <ShieldCheck className="mb-4 h-7 w-7 text-sage-deep" />
            <h2 className="font-display text-2xl text-espresso">CYA receipt, not audit tool</h2>
            <p className="mt-3 text-sm leading-6 text-mist">
              Agencies don&apos;t want a tool that flags their own copy. They want a Claim Intelligence Receipt they can attach to client approvals before launching high-claim pages.
            </p>
          </div>
          <div>
            <FileText className="mb-4 h-7 w-7 text-sage-deep" />
            <h2 className="font-display text-2xl text-espresso">Playbook-guided delivery</h2>
            <p className="mt-3 text-sm leading-6 text-mist">
              Beta delivery is founder-led and playbook-guided while we prove repeatable revenue,
              partner demand, and vertical claim patterns.
            </p>
          </div>
          <div>
            <Handshake className="mb-4 h-7 w-7 text-sage-deep" />
            <h2 className="font-display text-2xl text-espresso">New billable product</h2>
            <p className="mt-3 text-sm leading-6 text-mist">
              Turn claim audits into a billable product for every GLP-1, body-contouring, exosome, and IV therapy client. The receipt is yours to sell.
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">
              Winning sequence
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-espresso">
              Built around the offer sequence agencies can actually resell.
            </h2>
            <ol className="mt-6 space-y-3">
              {sequence.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl border border-sand-deep/25 bg-bone p-4">
                  <span className="font-mono text-xs text-sage-deep">0{index + 1}</span>
                  <span className="text-sm leading-6 text-mist">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div id="application" className="rounded-2xl border border-sand-deep/35 bg-bone p-6 md:p-8">
            <div className="mb-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">
                5-minute application
              </p>
              <h2 className="mt-3 font-display text-3xl text-espresso">
                Apply for Founding Beta
              </h2>
              <p className="mt-3 text-sm leading-6 text-mist">
                We review applications within 48 hours. If selected, we run a free sample snapshot
                on one client page and schedule a 20-minute call.
              </p>
            </div>
            <PartnerOsApplicationForm />
          </div>
        </section>
      </main>
    </div>
  );
}
