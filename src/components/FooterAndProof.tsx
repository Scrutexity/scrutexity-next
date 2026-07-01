'use client';
 
import { Lock, FileText, Activity } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
 
export default function FooterAndProof() {
  return (
    <footer className="bg-ivory text-charcoal font-sans border-t border-[#e1d4c5]">
 
      {/* 1. The Compliance Bar */}
      <div className="relative w-full py-16 border-b border-[#e1d4c5] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="flex flex-col items-start">
              <Lock className="text-[#7f8f78] mb-3" size={20} />
              <h4 className="text-[#221f1b] font-semibold text-sm mb-2">CPOM-Conscious Structure</h4>
              <p className="text-[#5f574f] text-xs leading-relaxed">
                Contracts designed to respect Corporate Practice of Medicine boundaries — subject to your counsel&rsquo;s review.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <FileText className="text-[#7f8f78] mb-3" size={20} />
              <h4 className="text-[#221f1b] font-semibold text-sm mb-2">BAA-Ready Infrastructure</h4>
              <p className="text-[#5f574f] text-xs leading-relaxed">
                We execute a comprehensive Business Associate Agreement per client pre-activation, supporting HIPAA-conscious administrative workflows.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <Activity className="text-[#7f8f78] mb-3" size={20} />
              <h4 className="text-[#221f1b] font-semibold text-sm mb-2">PHI Minimized at the Edge</h4>
              <p className="text-[#5f574f] text-xs leading-relaxed">
                Identity and health-intent indicators are stripped and redacted before processing. We don&rsquo;t store raw identifiers in our application layer.
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* 3. Minimalist Enterprise Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-b border-[#e1d4c5] pb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo-icon.png" alt="Scrutexity icon" width={44} height={44} className="h-10 w-auto" />
              <Image src="/logo-text-only.png" alt="Scrutexity" width={156} height={44} className="h-10 w-auto" />
            </div>
            <p className="text-[#5f574f] text-xs max-w-sm leading-relaxed">
              Lead recovery layer for premium NYC aesthetics practices — installed on top of Boulevard, Mangomint, and Zenoti.
            </p>
            <div className="mt-6 text-xs text-[#5f574f] leading-relaxed">
              <p className="font-semibold text-[#221f1b]">Scrutexity Infrastructure</p>
              <p>New York, NY</p>
              <p className="mt-1">nick@scrutexity.com</p>
            </div>
          </div>
          <div>
            <h5 className="text-[#221f1b] tracking-wider text-[10px] uppercase font-semibold mb-6 font-mono">Company</h5>
            <ul className="space-y-4 text-xs text-[#5f574f] font-mono uppercase tracking-wider">
              <li><a href="/company" className="hover:text-[#7f8f78] transition-colors">Company</a></li>
              <li><a href="/pricing" className="hover:text-[#7f8f78] transition-colors">Pricing</a></li>
              <li><a href="/sample-owner-brief" className="hover:text-[#7f8f78] transition-colors">Sample Owner Brief</a></li>
              <li><a href="/for-pe" className="hover:text-[#7f8f78] transition-colors">For PE Buyers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[#221f1b] tracking-wider text-[10px] uppercase font-semibold mb-6 font-mono">Trust &amp; Legal</h5>
            <ul className="space-y-4 text-xs text-[#5f574f] font-mono uppercase tracking-wider">
              <li><a href="/trust" className="hover:text-[#7f8f78] transition-colors">Trust Center</a></li>
              <li><a href="/verify" className="hover:text-[#7f8f78] transition-colors">Live Verification</a></li>
              <li><a href="/security" className="hover:text-[#7f8f78] transition-colors">HIPAA Statement</a></li>
              <li><a href="/baa" className="hover:text-[#7f8f78] transition-colors">BAA Details</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-[10px] text-[#5f574f] font-mono uppercase tracking-wider">
          <p>&copy; 2026 Scrutexity Infrastructure. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-[#221f1b] transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#221f1b] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
