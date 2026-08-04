'use client';

import { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const COMMIT_SHA =
  (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'a17f4e8d').slice(0, 8);
const BUILD_DATE = new Date()
  .toISOString()
  .slice(0, 10)
  .replace(/-/g, '.')
  .replace(/^\d{4}\./, '');

type FooterLink = { label: string; href?: string; disabled?: boolean; note?: string };

const linkColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'Home',      href: '/' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Partners',  href: '/partners' },
      { label: 'Proof',     href: '/proof' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Verify',    href: '/verify' },
    ],
  },
  {
    title: 'Instrument',
    links: [
      { label: 'Run AuditGPT',       href: 'https://auditgpt.ai/snapshot?source=scrutexity-footer' },
      { label: 'Sample Report',      href: '/sample-report' },
      { label: 'Pricing',            href: '/pricing' },
      { label: 'Enforcement Tracker', href: '/tracker' },
    ],
  },
  {
    title: 'Proof Library',
    links: [
      { label: 'Proof Home',           href: '/proof' },
      { label: 'Sealed Audit Trail',   href: '/proof/sealed-audit-trail' },
      { label: 'Verification',         href: '/verify' },
      { label: 'Claim Receipts',       href: '/proof' },
    ],
  },
  {
    title: 'Discipline',
    links: [
      { label: 'CRT Methodology', href: '/methodology' },
      { label: 'Claim Standards', href: '/methodology' },
      { label: 'Insurers & Acquirers', href: '/enterprise' },
      { label: 'Disclaimer',      href: '#disclaimer' },
    ],
  },
];

const FOOTER_DISCLAIMER =
  'Scrutexity reviews public claim language, visible proof, and AI answer risk. It does not provide legal, medical, regulatory, financial, or clinical advice.';

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <footer className="bg-espresso px-5 py-16 text-cream sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Top: brand + 4-column links */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <Image
                src="/logo-wordmark-green.png"
                alt="Scrutexity"
                width={180}
                height={38}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-xs leading-5 text-cream/70">
              Claim-risk bureau behind AuditGPT. Methodology, proof library, and review records for public trust.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="sage-pill border-cream/15 text-[10px] text-cream/70">
                <ShieldCheck size={10} />
                Claim discipline
              </span>
              <span className="sage-pill border-cream/15 text-[10px] text-cream/70">
                Claims-first governance
              </span>
            </div>
          </div>

          {/* 4 link columns — umbrella architecture */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.disabled || !link.href ? (
                      <span className="text-xs text-cream/35 inline-flex items-center gap-1.5">
                        {link.label}
                        {link.note && (
                          <span className="text-[9px] font-mono uppercase tracking-[0.14em] text-cream/30">
                            · {link.note}
                          </span>
                        )}
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        className="text-xs text-cream/70 transition-colors hover:text-sage inline-flex items-center gap-1.5"
                      >
                        {link.label}
                        {link.note && (
                          <span className="text-[9px] font-mono uppercase tracking-[0.14em] text-cream/35">
                            · {link.note}
                          </span>
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {col.title === 'Discipline' && (
                <p className="mt-5 text-[10px] leading-[1.55] text-cream/40 font-mono">
                  {FOOTER_DISCLAIMER}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-cream/10" />

        {/* Ledger seal line — build fingerprint and verifier entrypoint. */}
        <div className="mb-8 flex flex-wrap justify-between items-center gap-3 text-[10px] font-mono uppercase tracking-[0.14em] text-cream/40 tabular-nums">
          <a href="/verify" className="inline-flex items-center gap-2 transition-colors hover:text-sage">
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            Verify seal · {COMMIT_SHA}
          </a>
          <span>build · {BUILD_DATE} · UTC</span>
        </div>

        {/* Bottom: legal + copyright */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Scrutexity. All rights reserved.
          </p>

          {/* Collapsible legal disclaimer (closed by default) */}
          <div className="w-full sm:w-auto">
            <button
              onClick={() => setLegalOpen(!legalOpen)}
              className="inline-flex items-center gap-1.5 text-xs text-cream/40 transition-colors hover:text-cream/60"
            >
              Legal disclaimer
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${legalOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {legalOpen && (
              <div className="mt-3 max-w-lg rounded-xl border border-cream/10 bg-cream/5 p-4 text-xs leading-relaxed text-cream/50">
                <p>
                  Scrutexity provides claim-intelligence and content-risk review infrastructure. It does
                  not provide medical advice, diagnosis, treatment, legal advice, or compliance
                  certification. Clinical decisions remain the sole responsibility of licensed
                  professionals. Visibility figures, risk labels, and remediation priorities are
                  review outputs, not guarantees of rankings, regulator outcomes, ad approvals, or
                  revenue. Healthcare-adjacent reviews can support a Business Associate Agreement on
                  request where appropriate, but compliance is a shared responsibility. Review our
                  terms of service and privacy policy for full details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
