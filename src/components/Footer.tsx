import Link from 'next/link';
import Image from 'next/image';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ivory py-12 border-t border-[#e1d4c5] relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity no-underline">
            <Image src="/logo-icon.png" alt="STX" width={44} height={44} className="h-9 w-auto" />
            <Image src="/logo-text-only.png" alt="Scrutexity" width={156} height={44} className="h-9 w-auto" />
          </Link>
          <div className="text-muted text-xs flex flex-col gap-3 font-sans">
            <div>© 2026 Scrutexity Private Infrastructure.</div>
            <div className="flex items-center gap-2 bg-[#6B8576]/10 px-3 py-1.5 rounded-full border border-[#6B8576]/15 w-fit">
              <Shield size={12} className="text-[#6B8576]" />
              <span className="text-[9px] tracking-widest text-[#6B8576] font-bold uppercase font-sans">BAA-Ready Infrastructure — HIPAA-Conscious</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-xs font-sans uppercase tracking-wider text-muted">
          <Link href="/intelligence/ftc-pixel-compliance" className="hover:text-[#6B8576] transition-colors">Compliance</Link>
          <Link href="/terms-of-pilot" className="hover:text-[#6B8576] transition-colors">Terms of Pilot</Link>
          <Link href="/pilot" className="text-[#6B8576] hover:text-[#5A7365] font-bold transition-colors">Diagnostic Review ↗</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-8 pt-8 border-t border-[#e1d4c5]">
        <p className="text-[10px] text-muted leading-relaxed max-w-4xl font-sans uppercase tracking-wider">
          Disclaimer: Missed-demand recovery results vary based on existing inquiry volume, baseline response practices, and the specific module configuration deployed. Estimates are directional and require manual verification. Past performance is not indicative of future results. Scrutexity makes no guarantee of business results, specific ranking positions, or AI search citations. All pilot recovery thresholds are mutually defined in writing prior to technical activation. Scrutexity provides non-clinical administrative infrastructure; fees are flat platform fees, never based on patient volume, procedure value, or clinical revenue.
        </p>
      </div>
    </footer>
  );
}
