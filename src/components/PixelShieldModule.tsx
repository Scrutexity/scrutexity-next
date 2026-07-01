import Image from 'next/image';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
 
export default function PixelShieldModule() {
  return (
    <div className="text-[#1A1A1A] py-24 px-6 lg:px-12 w-full font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Column: The Abstract Security Image */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-sm border border-[#E5E3DF]">
          <Image 
            src="/compliance-airlock.jpg"
            alt="Abstract representation of Scrutexity's encrypted compliance airlock"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-50" />
        </div>
 
        {/* Right Column: The Airlock Copy */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <span className="text-[#6B8576] font-semibold tracking-[0.15em] text-sm uppercase mb-4 font-mono">
            The Compliance Airlock
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-[#1A1A1A] leading-tight mb-6">
            Run Profitable Ads. <br /> Built for HIPAA-Conscious Marketing.
          </h2>
          <p className="text-lg text-[#6E6E6C] mb-10 leading-relaxed max-w-lg">
            Standard Meta and Google pixels leak Patient Identifiers and search intent directly to big tech, exposing your clinic to significant privacy penalties. Scrutexity acts as an encrypted airlock, stripping all patient data before it leaves your server.
          </p>
 
          {/* Agency vs Infrastructure Comparison */}
          <div className="grid md:grid-cols-2 gap-6 w-full mt-4">
            
            {/* The Danger */}
            <div className="p-6 rounded-xl bg-[#F5F2EB] border border-[#6B1D2F]/25 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="text-[#6B1D2F]" size={20} />
                <h3 className="font-semibold text-[#6B1D2F] font-mono text-xs uppercase tracking-wider">Standard Agency</h3>
              </div>
              <ul className="space-y-3 text-xs text-[#6E6E6C]">
                <li className="flex items-start gap-2"><span className="text-[#6B1D2F] font-bold">✕</span> Pixels on your site</li>
                <li className="flex items-start gap-2"><span className="text-[#6B1D2F] font-bold">✕</span> Leaks &ldquo;Botox&rdquo; page visits</li>
                <li className="flex items-start gap-2"><span className="text-[#6B1D2F] font-bold">✕</span> Privacy exposure risk</li>
              </ul>
            </div>
 
            {/* The Solution */}
            <div className="p-6 rounded-xl bg-[#6B8576]/10 border border-[#6B8576]/25 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-[#6B8576]" size={20} />
                <h3 className="font-semibold text-[#1A1A1A] font-mono text-xs uppercase tracking-wider">Scrutexity Airlock</h3>
              </div>
              <ul className="space-y-3 text-xs text-[#1A1A1A]">
                <li className="flex items-start gap-2"><span className="text-[#6B8576] font-bold">✓</span> Pixels removed from site</li>
                <li className="flex items-start gap-2"><span className="text-[#6B8576] font-bold">✓</span> PHI stripped on our server</li>
                <li className="flex items-start gap-2"><span className="text-[#6B8576] font-bold">✓</span> Anonymized conversions sent</li>
              </ul>
            </div>
 
          </div>
        </div>
 
      </div>
    </div>
  );
}
