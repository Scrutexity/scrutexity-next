'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Check, FileText, BarChart3, Mail, ArrowRight, Loader2, Globe } from 'lucide-react';
import Image from 'next/image';

const EASE = [0.16, 1, 0.3, 1] as const;

const negatives = [
  {
    dont: "We do not sell, share, or monetize patient data.",
    do: "→ Your incentives stay aligned. We generate revenue strictly from software subscriptions, never data commercialization."
  },
  {
    dont: "We do not train AI models on your clinic’s communications.",
    do: "→ Your practice intelligence is isolated. Conversations are processed in secure enclaves and discarded post-seal."
  },
  {
    dont: "We do not generate autonomous medical advice or treatment plans.",
    do: "→ Clinical oversight remains strictly human. Medical questions route instantly to your licensed human staff."
  },
  {
    dont: "We do not store raw PHI in request logs or error traces.",
    do: "→ Your compliance liability is eliminated. A zero-knowledge boundary hashes patient IDs before archiving."
  },
  {
    dont: "We do not use ad tracking pixels on patient-facing booking paths.",
    do: "→ Zero HIPAA pixel exposure. Patients encounter a pure, compliance-certified, tracker-free utility layer."
  }
];

export default function AntiPositioning() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAuditRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) return;
    setLoading(true);
    
    // Simulate API lead submission
    try {
      await fetch('/api/pilot-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Website Audit Request',
          email: 'audit-request@scrutexity-incoming.com',
          clinicName: websiteUrl,
          currentPms: 'Other'
        }),
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-espresso text-cream relative z-10 overflow-hidden border-t border-cream/10">
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/95 to-[#151210] -z-10" />
      <div className="absolute -top-40 right-0 w-[40rem] h-[40rem] bg-sage/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* 1. OBJECTION SLAYER: WHAT WE DON'T DO */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-soft block mb-4">
              Anti-Positioning
            </span>
            <h2 className="font-display text-3xl md:text-5xl leading-tight tracking-tight text-cream">
              What we do — <span className="italic text-sage-soft">and what we don&rsquo;t.</span>
            </h2>
            <p className="mt-4 text-cream/70 text-sm md:text-base leading-relaxed">
              We run a security-first utility engine. Our business model is software subscriptions, 
              not marketing, ad optimization, or data commercialization. Here are our structural constraints.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            {negatives.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                className="grid md:grid-cols-12 items-center gap-4 p-5 rounded-xl border border-cream/10 bg-white/[0.02] hover:bg-white/[0.06] hover:scale-[1.01] hover:border-sage/30 transition-all duration-300 cursor-default shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <div className="md:col-span-5 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-clay-deep shrink-0 mt-0.5" />
                  <span className="text-sm font-sans font-semibold text-cream/90">{item.dont}</span>
                </div>
                <div className="hidden md:block md:col-span-1 text-center text-cream/20 font-mono text-xs">
                  &rarr;
                </div>
                <div className="md:col-span-6 flex items-start gap-2.5 pl-8 md:pl-0">
                  <Check className="w-4 h-4 text-sage shrink-0 mt-1" />
                  <span className="text-xs text-cream/70 leading-relaxed font-sans">{item.do}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. SAMPLE PREVIEWS & URL CAPTURE */}
        <div className="grid md:grid-cols-12 gap-12 items-center border-t border-cream/10 pt-20 mb-24">
          <div className="md:col-span-6 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-soft block">
              Credibility Proof
            </span>
            <h3 className="font-display text-2.5xl md:text-3.5xl text-cream leading-tight">
              See what we compile <br />for your practice.
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              We construct two key diagnostics: the <strong>Sample Snapshot</strong> (an interactive leak detection dashboard) 
              and the <strong>Sample Brief</strong> (an executive summary detailing leak channels and verified recovery paths).
            </p>

            {/* PREVIEW THUMBNAILS CAROUSEL */}
            <div className="grid grid-cols-2 gap-4">
              {/* Snapshot thumbnail */}
              <div className="group relative rounded-xl border border-cream/10 bg-white/5 p-3 hover:bg-white/10 transition-colors duration-300 cursor-pointer overflow-hidden">
                <div className="aspect-[4/3] rounded bg-espresso border border-cream/10 overflow-hidden relative">
                  <Image src="/leak_map_dashboard.png" alt="Leak Map Dashboard Preview" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-espresso/40 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-500" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded" />
                </div>
                <div className="mt-2.5 text-center">
                  <span className="text-[10px] font-mono uppercase text-cream/75 flex items-center justify-center gap-1">
                    <BarChart3 className="w-3 h-3 text-sage" /> Sample Snapshot
                  </span>
                </div>
              </div>

              {/* Brief thumbnail */}
              <div className="group relative rounded-xl border border-cream/10 bg-white/5 p-3 hover:bg-white/10 transition-colors duration-300 cursor-pointer overflow-hidden">
                <div className="aspect-[4/3] rounded bg-espresso border border-cream/10 overflow-hidden relative">
                  <Image src="/owner_brief_doc.png" alt="Owner Brief Document Preview" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-espresso/40 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-500" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded" />
                </div>
                <div className="mt-2.5 text-center">
                  <span className="text-[10px] font-mono uppercase text-cream/75 flex items-center justify-center gap-1">
                    <FileText className="w-3 h-3 text-sage" /> Sample Brief
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* URL CAPTURE CARD */}
          <div className="md:col-span-6">
            <div className="p-6 rounded-2xl border border-cream/10 bg-white/[0.03] backdrop-blur-xl">
              <h4 className="font-sans font-bold text-base text-cream">
                Get a sample of YOUR practice
              </h4>
              <p className="mt-2 text-xs text-cream/60 leading-relaxed">
                Provide your clinic’s website domain below. We will run an outside-in check 
                on your inbound connection speed and schedule routing to map your exposure level.
              </p>

              {success ? (
                <div className="mt-5 p-4 rounded-lg bg-sage/10 border border-sage/20 text-center">
                  <Check className="w-6 h-6 text-sage mx-auto mb-2" />
                  <p className="text-xs text-cream font-bold">Audit Request Received</p>
                  <p className="text-[10px] text-cream/60 mt-1">We will contact you with your diagnostic snapshot shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleAuditRequest} className="mt-5 space-y-3">
                  <div className="relative rounded-xl border border-cream/10 bg-espresso overflow-hidden flex items-center">
                    <div className="pl-3 text-cream/40">
                      <Globe size={14} />
                    </div>
                    <input 
                      type="text"
                      required
                      placeholder="practice-website.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="bg-transparent border-0 outline-none text-xs text-cream px-3 py-3.5 w-full placeholder-cream/35 focus:ring-0"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !websiteUrl}
                    className="w-full bg-[#D4AF37] hover:bg-[#C5A059] text-espresso font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(212,175,55,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Generating
                      </>
                    ) : (
                      <>
                        Free leak audit
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3. FOUNDER BIO LAYOUT UPDATE */}
        <div className="border-t border-cream/10 pt-20">
          <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
            
            {/* HEADSHOT/PHOTO SLOT OF NICK WITH WIRING ANIMATIONS */}
            <div className="relative w-40 h-40 md:w-44 md:h-44 flex items-center justify-center">
              {/* Expanding pulse wave */}
              <div className="absolute inset-4 rounded-full border border-sage/15 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
              
              {/* Rotating outer dashed gold/sage ring */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  fill="none"
                  stroke="rgba(216, 177, 122, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="6 8"
                />
              </svg>

              {/* Reverse-rotating inner track with a traveling pulse dot */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite_reverse]" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  fill="none"
                  stroke="rgba(127, 143, 120, 0.2)"
                  strokeWidth="1.5"
                  strokeDasharray="40 120"
                  strokeLinecap="round"
                />
                <circle
                  cx="144"
                  cy="80"
                  r="3"
                  fill="#7f8f78"
                  className="shadow-[0_0_8px_#7f8f78]"
                />
              </svg>

              {/* Left-right horizontal data wires (circuit styled) */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[260px] h-[40px] overflow-visible pointer-events-none" viewBox="0 0 260 40">
                <path
                  d="M 0 20 L 50 20 L 65 35 L 75 35 L 85 20 L 105 20"
                  fill="none"
                  stroke="url(#wireGradientLeft)"
                  strokeWidth="1"
                />
                <path
                  d="M 260 20 L 210 20 L 195 5 L 185 5 L 175 20 L 155 20"
                  fill="none"
                  stroke="url(#wireGradientRight)"
                  strokeWidth="1"
                />
                <defs>
                  <linearGradient id="wireGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7f8f78" stopOpacity="0" />
                    <stop offset="70%" stopColor="#7f8f78" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7f8f78" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="wireGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#d8b17a" stopOpacity="0" />
                    <stop offset="70%" stopColor="#d8b17a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#d8b17a" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Centered Profile Photo Container */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-cream/20 overflow-hidden shadow-2xl z-10 bg-espresso">
                <Image
                  src="/founder.jpg"
                  alt="Nick Altstein, Founder of Scrutexity"
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Overlapping badge */}
              <div className="absolute bottom-0 flex flex-col items-center justify-center rounded-xl bg-espresso/95 border border-cream/10 px-4 py-1.5 text-center backdrop-blur-sm z-20 shadow-md min-w-[96px]">
                <div className="text-[9px] font-sans font-bold uppercase tracking-wider text-cream">
                  Nick Altstein
                </div>
                <div className="text-[7.5px] font-mono uppercase tracking-[0.16em] text-sage-soft mt-0.5">
                  Founder
                </div>
              </div>
            </div>

            {/* BIO DETAILS */}
            <div className="space-y-4 max-w-xl flex flex-col items-center">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-soft block">
                The Operator
              </span>
              <h3 className="font-display text-2.5xl md:text-3xl leading-tight text-cream">
                Why I built a focused recovery product.
              </h3>
              <p className="text-cream/70 text-xs md:text-sm leading-relaxed">
                I spent years watching premium clinics invest thousands into marketing acquisition, 
                only to lose the highly valuable bookings they&rsquo;d already earned due to delayed after-hours responses, 
                dead form links, or scheduling gaps.
              </p>
              <p className="text-cream/70 text-xs md:text-sm leading-relaxed">
                I built Scrutexity as a non-invasive, read-only transaction settlement layer that works beside Boulevard, 
                Zenoti, or Mangomint. No change to your operations. Verified by cryptographic proof.
              </p>
              
              <div className="pt-2 flex items-center gap-1.5 text-xs text-cream font-mono font-bold">
                <Mail size={12} className="text-sage-soft" />
                <span>Direct contact:</span>
                <a href="mailto:nick@scrutexity.com" className="text-sage-soft hover:underline">
                  nick@scrutexity.com
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
