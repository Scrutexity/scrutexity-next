import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const quickLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Proof', href: '/proof' },
  { label: 'Pilot', href: '/pilot' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,rgba(94,122,90,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <span
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
          style={{ fontFamily: MONO_STACK }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
          Block not found · 404
        </span>

        <h1 className="mt-7 font-display text-5xl md:text-[4rem] text-ink tracking-[-0.03em] leading-[1.02]">
          This entry isn&rsquo;t{' '}
          <span className="italic text-sage-deep">in the ledger.</span>
        </h1>

        <p className="mt-6 text-base text-mist leading-[1.6] max-w-md mx-auto font-sans">
          The page you tried to reach has been removed or was never sealed.
          The rest of the ledger is intact — head back and pick up where you were.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
          <Link
            href="/"
            className="group px-7 py-4 bg-sage-deep hover:bg-ink text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
          >
            Back to the ledger
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/pilot"
            className="group text-sm font-sans font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
          >
            Start the 14-day pilot
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-sand-deep/20">
          <p
            className="text-[10px] uppercase tracking-[0.16em] text-mist/60 mb-4"
            style={{ fontFamily: MONO_STACK }}
          >
            Sealed pages
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-mist">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-sage-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p
          className="mt-14 text-[10px] uppercase tracking-[0.14em] text-mist/40 tabular-nums"
          style={{ fontFamily: MONO_STACK }}
        >
          sha256 · 0000…0000 · unsealed
        </p>
      </div>
    </div>
  );
}
