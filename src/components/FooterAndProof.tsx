'use client';

import { Lock, FileText, Activity, ArrowUpRight, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GovButton from '@/components/GovButton';

type Col = { heading: string; links: [string, string][] };

const COLUMNS: Col[] = [
  {
    heading: 'Platform',
    links: [
      ['Platform Overview', '/platform'],
      ['Revenue Flow', '/flow'],
      ['Proof & Verification', '/proof'],
      ['Live Demo', '/demo'],
      ['Revenue Leak Audit', '/revenue-leak-audit'],
      ['Boulevard Lead Recovery', '/boulevard-lead-recovery'],
      ['Mangomint Lead Recovery', '/mangomint-lead-recovery'],
      ['Considering Zenoti?', '/zenoti-alternative-without-migration'],
      ['Comparison Hub', '/compare'],
      ['Zenoti Comparison', '/compare/zenoti'],
      ['Booker Comparison', '/compare/booker'],
      ['Mindbody Comparison', '/compare/mindbody'],
      ['Vagaro Comparison', '/compare/vagaro'],
      ['Pricing', '/pricing'],
    ],
  },
  {
    heading: 'Intelligence',
    links: [
      ['All Articles', '/intelligence'],
      ['Revenue Recovery', '/intelligence/medspa-revenue-recovery'],
      ['FTC Pixel Compliance', '/intelligence/ftc-pixel-compliance'],
      ['Morpheus8 Benchmarks', '/intelligence/morpheus8-consult-conversion'],
      ['Medspa Benchmarks', '/medspa-revenue-benchmarks'],
    ],
  },
  {
    heading: 'Company',
    links: [
      ['About Scrutexity', '/company'],
      ['For PE Buyers', '/for-pe'],
      ['For Multi-Location', '/for-multi-location'],
      ['Roadmap', '/roadmap'],
      ['Sample Owner Brief', '/sample-owner-brief'],
      ['Contact', '/contact'],
    ],
  },
  {
    heading: 'Trust & Legal',
    links: [
      ['Trust Center', '/trust'],
      ['Governance', '/governance'],
      ['Security', '/security'],
      ['Compliance', '/compliance'],
      ['Live Verification', '/verify'],
      ['BAA Details', '/baa'],
      ['Security Brief', '/security-brief'],
      ['Terms of Pilot', '/terms-of-pilot'],
    ],
  },
];

const COMPLIANCE = [
  {
    icon: Lock,
    title: 'CPOM-Conscious Structure',
    body: "Contracts designed to respect Corporate Practice of Medicine boundaries — subject to your counsel’s review.",
  },
  {
    icon: FileText,
    title: 'BAA-Ready Infrastructure',
    body: 'We execute a comprehensive Business Associate Agreement per client pre-activation, supporting HIPAA-conscious administrative workflows.',
  },
  {
    icon: Activity,
    title: 'PHI Minimized at the Edge',
    body: "Identity and health-intent indicators are stripped and redacted before processing. We don’t store raw identifiers in our application layer.",
  },
];

function HipaaBadgeWithModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-pine)]/40 bg-[var(--color-pine)]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#cfe1d3] transition-colors hover:border-[var(--color-pine)]/70 hover:bg-[var(--color-pine)]/25"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-lenis-prevent
      >
        <ShieldCheck size={12} className="text-[#cfe1d3]" />
        HIPAA-Conscious · BAA-Ready
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="hipaa-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1814]/65 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-sand-deep bg-cream p-8 shadow-2xl sm:p-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1 text-mist transition-colors hover:bg-[#e1d4c5]/60 hover:text-espresso"
            >
              <X size={18} />
            </button>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6B8576]/30 bg-[#6B8576]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#496052]">
              <ShieldCheck size={12} className="text-[#6B8576]" />
              HIPAA-Conscious Infrastructure
            </div>

            <h2 id="hipaa-modal-title" className="font-display text-3xl leading-tight text-espresso">
              Scrutexity signs BAAs. We do not store PHI.
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-mist">
              <section>
                <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso">
                  BAA available upon request
                </h3>
                <p>
                  A Business Associate Agreement is executed with every clinic before any patient-adjacent workflow is
                  activated. Email{' '}
                  <a href="mailto:nick@scrutexity.com" className="font-semibold text-[#7f8f78] hover:underline">
                    nick@scrutexity.com
                  </a>{' '}
                  and we will send the current BAA, security brief, and architecture summary the same day.
                </p>
              </section>

              <section>
                <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso">Data architecture</h3>
                <p className="mb-2">
                  Our architecture is designed so PHI does not enter the Scrutexity processing layer:
                </p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>
                    <span className="font-semibold text-espresso">What is stored:</span> inquiry source, timestamps,
                    scheduling intent, conversation transcripts after identifier stripping, booking and deposit status — the
                    fields needed to produce the recovery ledger.
                  </li>
                  <li>
                    <span className="font-semibold text-espresso">What is not stored:</span> raw patient identifiers, dates
                    of birth, medical histories, diagnoses, treatment recommendations, and clinical conversation content.
                    Identifiers are stripped at the edge before processing; clinical questions stop the automated flow and
                    route to licensed clinic staff.
                  </li>
                  <li>
                    <span className="font-semibold text-espresso">Access:</span> read-only API connections where supported,
                    minimum necessary scope, and one-click revocation from your Boulevard or Mangomint settings.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso">SOC 2 status</h3>
                <p>
                  SOC 2 Type I is in progress; a formal report is not yet issued. Our current security posture, vendor
                  controls, and incident-response plan are documented in the security brief and shared on request. We do not
                  claim certifications we do not hold.
                </p>
              </section>

              <section>
                <p className="text-xs leading-6 text-[#8f8174]">
                  This summary is informational and does not replace the BAA, security brief, or a clinic-specific compliance
                  review. Contact us for the full compliance documentation.
                </p>
              </section>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="mailto:nick@scrutexity.com?subject=Scrutexity%20BAA%20%2B%20compliance%20documentation%20request"
                className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all btn-sm inline-flex items-center gap-2"
              >
                Request BAA & compliance docs
              </a>
              <Link
                href="/security-brief"
                className="text-xs font-semibold text-[#8a533b] underline underline-offset-4 hover:text-[#5f3020]"
              >
                Security brief
              </Link>
              <Link
                href="/trust"
                className="text-xs font-semibold text-[#8a533b] underline underline-offset-4 hover:text-[#5f3020]"
              >
                Trust Center
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function FooterAndProof() {
  return (
    <footer className="relative bg-[var(--color-ink)] font-sans text-[var(--color-bone)] border-t border-white/10">
      {/* Hairline accent + soft warm glow at the join */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-clay)]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(184,125,107,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-[60%] bg-[radial-gradient(ellipse_at_center,rgba(47,93,74,0.10),transparent_70%)]" />

      {/* 1. Compliance bar */}
      <div className="relative w-full overflow-hidden border-b border-white/10 py-16">
        <div className="luxury-noise pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-3">
            {COMPLIANCE.map(({ icon: Icon, title, body }) => (
              <div key={title} className="group flex flex-col items-start">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--color-clay)] backdrop-blur-sm transition-colors group-hover:border-[var(--color-clay)]/40">
                  <Icon size={18} />
                </div>
                <h4 className="mb-2 font-space-grotesk text-sm font-semibold tracking-tight text-[var(--color-bone)]">
                  {title}
                </h4>
                <p className="text-xs leading-relaxed text-[var(--color-bone)]/55">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Link grid */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-12 pt-16 lg:px-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-white/10 pb-14 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="mb-5 flex items-center gap-3 no-underline">
              <Image
                src="/logo-icon.png"
                alt="Scrutexity icon"
                width={44}
                height={44}
                className="h-10 w-auto opacity-95 brightness-[1.1] contrast-[0.95]"
              />
              <Image
                src="/logo-text-only.png"
                alt="Scrutexity"
                width={156}
                height={44}
                className="h-9 w-auto opacity-90 invert"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-bone)]/60">
              Missed-demand recovery for medical aesthetics — installed read-only alongside Boulevard and Mangomint.
            </p>
            <div className="mt-6">
              <GovButton href="/pilot" label="Get Your Free Audit" className="btn-sm" />
            </div>
            <div className="mt-7 space-y-0.5 text-xs leading-relaxed text-[var(--color-bone)]/60">
              <p className="font-semibold text-[var(--color-bone)]">Scrutexity Infrastructure</p>
              <p>New York, NY</p>
              <a
                href="mailto:nick@scrutexity.com"
                className="inline-flex items-center gap-1 text-[var(--color-clay)] transition-colors hover:text-[#d59a83]"
              >
                nick@scrutexity.com <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h5 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-bone)]">
                {col.heading}
              </h5>
              <ul className="space-y-3 text-[13px] text-[var(--color-bone)]/55">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1 transition-colors hover:text-[var(--color-bone)]"
                      data-lenis-prevent
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-[var(--color-bone)]/50 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-5">
            <p>&copy; 2026 Scrutexity Infrastructure. All rights reserved.</p>
            <HipaaBadgeWithModal />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-[var(--color-bone)]" data-lenis-prevent>
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--color-bone)]" data-lenis-prevent>
              Terms of Service
            </Link>
            <Link href="/trust" className="transition-colors hover:text-[var(--color-bone)]" data-lenis-prevent>
              Trust Center
            </Link>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mt-8 max-w-5xl text-[10px] leading-relaxed text-[var(--color-bone)]/40">
          Disclaimer: Missed-demand recovery results vary based on existing inquiry volume, baseline response practices, and the specific module configuration deployed. Estimates are directional and require manual verification. Past performance is not indicative of future results. Scrutexity makes no guarantee of business results, specific ranking positions, or AI search citations. All pilot recovery thresholds are mutually defined in writing prior to technical activation. Scrutexity provides non-clinical administrative infrastructure; fees are flat platform fees, never based on patient volume, procedure value, or clinical revenue.
        </p>
      </div>
    </footer>
  );
}
