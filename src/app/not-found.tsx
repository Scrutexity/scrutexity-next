import Link from 'next/link';
import GovButton from '@/components/GovButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 relative">
      {/* Subtle ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(184,124,110,0.06)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <span className="font-sans font-bold text-sm tracking-[0.25em] uppercase" >Scrutexity</span>
        </Link>

        {/* 404 */}
        <div className="font-display font-bold text-[120px] leading-none text-charcoal/10 mb-4 select-none">
          404
        </div>

        <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-4">
          This page doesn&apos;t exist
        </h1>

        <p className="text-[#6b6259] font-sans text-base leading-relaxed mb-10">
          The link you followed may be broken, or the page may have been removed.
          Let&apos;s get you back to finding and recovering your clinic&apos;s revenue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GovButton label="Back to Home" href="/" className="inline-flex items-center justify-center px-6 py-3 btn-md" />
          <Link
            href="/pilot"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-charcoal font-bold rounded-xl border border-[#E8E4DE] hover:border-charcoal/20 transition-colors"
          >
            Start 14-Day Pilot
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-16 pt-8 border-t border-[#E8E4DE]">
          <p className="text-xs text-charcoal/40 font-sans uppercase tracking-widest mb-4">
            Popular pages
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-charcoal/60 font-sans">
            <Link href="/mri" className="hover:text-terracotta transition-colors">Audit</Link>
            <Link href="/proof" className="hover:text-terracotta transition-colors">Proof</Link>
            <Link href="/intelligence/ftc-pixel-compliance" className="hover:text-terracotta transition-colors">Compliance</Link>
            <Link href="/revenue-leak-audit" className="hover:text-terracotta transition-colors">Calculator</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
