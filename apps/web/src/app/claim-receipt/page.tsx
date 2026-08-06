'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle, ShieldCheck, Printer, ExternalLink, Copy } from 'lucide-react';
import Link from 'next/link';

function generateReceiptId(): string {
  const rnd = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `RCP-${rnd}`;
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface ReceiptData {
  id: string;
  date: string;
  name: string;
  organization: string;
  email: string;
  url: string;
}

function ClaimReceiptForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [urlParam, setUrlParam] = useState('');

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      setUrlParam(url);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name') as string,
      organization: form.get('organization') as string,
      email: form.get('email') as string,
      url: urlParam || (form.get('url') as string),
    };

    const receiptId = generateReceiptId();
    setReceipt({
      id: receiptId,
      date: formatDate(),
      name: data.name,
      organization: data.organization,
      email: data.email,
      url: data.url,
    });

    try {
      await fetch('/api/claim-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, receiptId }),
      });
    } catch {
      // non-blocking
    }
    setSubmitted(true);
    setLoading(false);
  }

  function handlePrint() {
    window.print();
  }

  function handleCopyLink() {
    const link = `${window.location.origin}/claim-receipt?id=${receipt?.id}`;
    navigator.clipboard.writeText(link);
  }

  function handleUpsellClick() {
    window.open(`/contact?intent=claim-cleanup-record&receipt=${receipt?.id}`, '_blank');
  }

  if (submitted && receipt) {
    return (
      <>
        {/* Printable receipt */}
        <div className="hidden print:block print:m-0 print:p-0">
          <div className="max-w-3xl mx-auto p-10 font-sans text-ink">
            <div className="border-b-2 border-ink pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-sans text-2xl mb-1">Claim Audit Receipt</p>
                  <p className="text-sm text-ink/60">reviewed for regulatory risk and competitive positioning</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink/40 font-mono">ID: {receipt.id}</p>
                  <p className="text-xs text-ink/40">{receipt.date}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-ink/40 mb-1">Submitted by</p>
              <p className="text-lg font-semibold">{receipt.name}</p>
              <p className="text-sm text-ink/60">{receipt.organization}</p>
              <p className="text-sm text-ink/60 font-mono break-all">{receipt.url}</p>
            </div>

            <div className="border border-ink/10 p-6 mb-6">
              <p className="text-xs uppercase tracking-widest text-ink/50 mb-3">What we audit</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  'Regulatory claim risk',
                  'Competitive positioning gaps',
                  'Guarantee language exposure',
                  'Clinical vs. marketing tone',
                  'Medical advice boundaries',
                  'Outcome claims analysis',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-badge rotate-45 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-ink/10 pt-6">
              <p className="text-xs text-ink/50 leading-relaxed mb-3">
                Scrutexity provides an audit receipt showing detected risk factors on your page. This is for pre-publish review only — not a legal opinion or guarantee. All claims should be reviewed with your legal and compliance team.
              </p>
              <p className="text-xs text-ink/40 leading-relaxed">
                Receipt generated at time of submission. Results reflect the page state at audit time. For agencies: share this receipt with your client before go-live.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-ink/10 text-center">
              <p className="text-[10px] text-ink/30 font-mono">
                Scrutexity · Claim Audit Receipt · {receipt.id} · {receipt.date}
              </p>
            </div>
          </div>
        </div>

        {/* Success page */}
        <div className="min-h-screen bg-paper-light text-ink font-sans antialiased flex items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <CheckCircle className="mx-auto h-14 w-14 text-amber-badge" />
            <h1 className="mt-6 font-sans text-4xl tracking-tight">Receipt generated</h1>
            <p className="mt-4 text-lg text-ink/70 leading-relaxed">
              Your claim audit receipt is ready. Review it before publishing, or share it with your team for final approval.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-ink/10 bg-paper-light text-xs font-mono text-ink/50">
              <span>Receipt ID:</span>
              <span className="text-ink font-semibold">{receipt.id}</span>
              <span className="text-ink/30">|</span>
              <span>{receipt.date}</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-sand-deep bg-paper-light/60 text-ink text-sm uppercase tracking-widest font-semibold hover:border-amber-badge/50 hover:bg-paper-light/90 transition-all backdrop-blur-sm"
              >
                <Printer className="w-4 h-4" />
                Save Receipt (PDF)
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-sand-deep bg-paper-light/60 text-ink text-sm uppercase tracking-widest font-semibold hover:border-amber-badge/50 hover:bg-paper-light/90 transition-all backdrop-blur-sm"
              >
                <Copy className="w-4 h-4" />
                Copy Report Link
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink/20 text-ink text-sm uppercase tracking-widest font-semibold hover:bg-ink/5 transition-all"
              >
                Return home
              </Link>
            </div>

            <div className="mt-6 text-xs text-ink/40">
              Share this receipt with your team before go-live.
            </div>
          </div>
        </div>

        {/* Cleanup Record upsell */}
        <div className="bg-cream-deep border-t border-sand-deep">
          <div className="max-w-lg mx-auto text-center px-6 py-12">
            <h2 className="font-sans text-2xl text-ink tracking-tight mb-3">
              Turn this receipt into a Claim Cleanup Record
            </h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-6">
              Your receipt flagged priority claims that may need safer language. Scrutexity can rewrite priority claims, document what changed, map visible support, and produce a review-ready record for your team or client.
            </p>
            <button
              onClick={handleUpsellClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-badge text-[var(--color-paper-light)] text-sm uppercase tracking-widest font-semibold hover:bg-ink transition-all duration-300"
            >
              Request Claim Cleanup Record — $1,997
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-paper-light text-ink font-sans antialiased">
      <section className="py-20 px-6 lg:px-16 max-w-3xl mx-auto">
        {/* Intro */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-amber-badge mb-2">Pre-publish audit</p>
          <h1 className="font-sans text-4xl md:text-5xl tracking-tight mb-4">
            Generate Your Claim Audit Receipt
          </h1>
          <p className="text-lg text-ink/70 max-w-xl mx-auto">
            Get an instant receipt showing regulatory risk, competitive gaps, and guarantee exposure on your live page. Review before publish, or share with your team.
          </p>
        </div>

        {/* What we audit */}
        <div className="border border-ink/10 bg-paper-light p-6 mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-ink/50 mb-3">We audit for</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Regulatory claim risk',
              'Competitive positioning gaps',
              'Guarantee language exposure',
              'Clinical vs. marketing tone',
              'Medical advice boundaries',
              'Outcome claims analysis',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-ink/80">
                <span className="w-1.5 h-1.5 bg-amber-badge rotate-45 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* URL field - prefilled from query param, but user can override */}
          <div>
            <label htmlFor="url" className="block text-xs uppercase tracking-widest font-semibold text-ink/60 mb-1.5">
              Page URL to audit
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={urlParam}
              onChange={(e) => setUrlParam(e.target.value)}
              required
              placeholder="https://yoursite.com/page"
              className="w-full px-4 py-3 border border-ink/15 bg-paper-light text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-amber-badge transition-colors font-mono"
            />
            {urlParam && (
              <p className="mt-2 text-xs text-ink/50">
                From extension: <span className="font-mono text-ink/70 break-all">{urlParam}</span>
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest font-semibold text-ink/60 mb-1.5">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full px-4 py-3 border border-ink/15 bg-paper-light text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-amber-badge transition-colors"
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-xs uppercase tracking-widest font-semibold text-ink/60 mb-1.5">
                Organization / Agency
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                required
                placeholder="Your Agency or Clinic"
                className="w-full px-4 py-3 border border-ink/15 bg-paper-light text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-amber-badge transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest font-semibold text-ink/60 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@agency.com"
              className="w-full px-4 py-3 border border-ink/15 bg-paper-light text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-amber-badge transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-amber-badge text-[var(--color-paper-light)] text-sm uppercase tracking-widest font-semibold hover:bg-ink transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Generating Receipt...' : 'Generate Claim Audit Receipt'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink/50">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-badge" />
            No obligation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-badge" />
            Receipt in seconds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-badge" />
            For agencies & teams
          </span>
        </div>

        {/* Usage info */}
        <div className="mt-12 p-6 bg-cream-deep rounded-lg border border-sand-deep">
          <p className="text-xs uppercase tracking-widest font-semibold text-ink/70 mb-2">How to use this receipt</p>
          <ul className="space-y-2 text-sm text-ink/60">
            <li>✓ Share with your client before go-live</li>
            <li>✓ Review risk factors before publish</li>
            <li>✓ Use as part of your QA workflow</li>
            <li>✓ Keep on file for compliance</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper-light flex items-center justify-center"><div className="text-sm text-ink/50">Loading...</div></div>}>
      <ClaimReceiptForm />
    </Suspense>
  );
}
