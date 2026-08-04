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
  'From $1,497/month, billed monthly',
  'Cancel anytime after first month',
  '10 Claim Audit Receipts per month (white-label for clients)',
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
  '$497 Claim Exposure Audit',
  'Claim Audit Receipt — client approval record',
  '$1,997 Claim Cleanup Record',
  'From $1,497/month Guardian Monitoring',
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
              Before your agency launches GLP-1, body-contouring, IV therapy, exosome, or RF microneedling pages, give your client a Claim Audit Receipt — showing what was reviewed, what proof was found, what language was adjusted, and what the client approved. That is your CYA document. It is also a billable product.
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

        {/* ══ WHITE-LABEL RECEIPT PREVIEW ══════════════════════════════ */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage-deep">
              White-label receipt preview
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-espresso">
              The artifact your agency attaches to every high-claim launch.
            </h2>
            <p className="mt-4 text-sm leading-6 text-mist">
              White-labeled with your agency brand. A dated, review-ready record your client signs off on
              before launch — and the exact document that wins pitches against agencies with no proof trail.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="rounded-2xl border border-sand-deep/30 bg-white/70 p-6 md:p-8 shadow-[0_24px_80px_-60px_rgba(28,24,20,0.45)]">
              <div className="flex items-start justify-between gap-4 border-b border-sand-deep/15 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-sage-deep font-semibold" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
                      Claim Audit Receipt
                    </p>
                    <span className="text-[9px] font-mono text-mist/60 bg-bone/70 border border-sand-deep/30 px-2 py-0.5 rounded">
                      SHA-256 RECORD
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-display text-espresso">[Your Agency Name]</p>
                </div>
                <div className="text-right text-[10px] text-mist font-mono" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
                  Review date: 08/04/2026
                </div>
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ['Client', 'Radiance Medical Spa (example)'],
                  ['Page reviewed', 'GLP-1 Weight Loss Landing Page'],
                  ['Claims reviewed', '8 public-facing claims'],
                  ['Support found', '3 of 8 have visible public support'],
                  ['Support missing', '5 of 8 have evidence gaps'],
                  ['Client approval', 'Pending sign-off'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-sand-deep/15 bg-bone/60 px-4 py-3">
                    <dt className="text-[9px] uppercase tracking-[0.14em] text-mist" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{k}</dt>
                    <dd className="mt-1 text-xs text-espresso">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 rounded-lg border border-clay/25 bg-clay/5 px-4 py-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-clay font-semibold" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
                  Example flagged claim
                </p>
                <p className="mt-1 text-sm italic text-espresso">
                  &ldquo;Compounded semaglutide works the same as Ozempic.&rdquo;
                </p>
                <p className="mt-2 text-xs leading-5 text-mist">
                  Support missing: no public FDA equivalence statement found. Safer rewrite delivered
                  to client for approval.
                </p>
              </div>

              <p className="mt-5 text-[9px] leading-4 text-mist/70" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
                Not legal advice. Not medical advice. Not regulatory certification. This receipt documents
                what was reviewed and what was found — not compliance with any regulatory requirement.
              </p>
            </div>

            <div className="rounded-2xl border border-sand-deep/30 bg-bone p-6">
              <h3 className="font-display text-xl text-espresso">Why it wins pitches</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Shows the prospective client a dated proof trail — the current agency has none',
                  'Positions you as the agency that protects their brand before launch',
                  'Becomes a billable deliverable: attach it to the proposal, invoice it as a line item',
                  'Your brand on every page — Scrutexity stays behind the scenes',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-mist">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="https://auditgpt.ai/snapshot?source=partner-os-receipt"
                className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-sage-deep px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-espresso"
              >
                Run a free sample on a client page
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
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
