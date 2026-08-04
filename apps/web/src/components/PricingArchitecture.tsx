'use client';
 
import { Phone, Calendar, Search, Shield } from 'lucide-react';
import Link from 'next/link';
 
const icons = [Phone, Calendar, Search, Shield];
const outcomes = ['Avg $18.4K/mo recovered', 'Avg 24% booking lift', '90% citation rate', 'Privacy-First Ad Workflows'];
 
export default function PricingArchitecture() {
  const modules = [
    {
      id: '01',
      title: 'Consultation Recovery',
      price: '$1,200',
      description: 'Our BAA-supported, HIPAA-conscious workflow can re-engage patients who called or inquired but didn\'t book after appropriate authorization — in your clinic\'s approved voice.',
      features: ['Automated text rescue for missed calls', 'Clinical protocol guardrails', 'Real-time ledger syncing'],
      featured: true
    },
    {
      id: '02',
      title: 'Treatment Booking Funnel',
      price: '$1,100',
      description: 'Specialized booking experience for high-value treatments like Morpheus8 with dynamic pricing and seamless e-signatures.',
      features: ['Dynamic quoting for high-ticket procedures', 'Frictionless mobile checkout', 'E-signature integration'],
      featured: false
    },
    {
      id: '03',
      title: 'AI Search Visibility',
      price: '$800',
      description: 'Get featured in AI answers (ChatGPT, Perplexity, Siri) with proper medical schema and licensed provider signals.',
      features: ['AI-optimized schema deployment', 'Licensing signals and citations', 'Perplexity + ChatGPT visibility'],
      featured: false
    },
    {
      id: '04',
      title: 'Pixel Privacy Shield',
      price: '$1,500',
      description: 'Server-side privacy layer that protects you from FTC issues while keeping your Meta and Google ads performing.',
      features: ['Meta/Google pixel sanitization', 'SHA-256 identity protection', 'Audit log generation'],
      featured: false
    }
  ];
 
  return (
    <section id="pricing" className="relative py-28 w-full max-w-7xl mx-auto px-6 font-sans bg-[#FBFBFA]">
      <div className="text-center mb-16">
        <span className="text-[#6B8576] font-mono tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">
          INFRASTRUCTURE PRICING STRUCTURE
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-espresso mb-6">
          Clinical Revenue Modules
        </h2>
        <p className="text-lg text-[#6E6E6C] max-w-2xl mx-auto leading-relaxed">
          Deploy your revenue recovery system module by module. Each is installed into your existing stack with zero disruption. Backed by a 14-day performance pilot.
        </p>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((mod, idx) => {
          const Icon = icons[idx];
          return (
            <div 
              key={mod.id} 
              className={`group relative flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-300 border ${
                mod.featured 
                  ? 'bg-[#6B8576] text-white border-[#6B8576] shadow-lg shadow-[#6B8576]/10' 
                  : 'bg-[#F7F5F0] border-[#E5E3DF] text-espresso hover:bg-[#F0EEEA] hover:border-[#D0CECA]'
              }`}
            >
              {/* Outcome badge */}
              <div className={`absolute top-6 right-6 text-[9px] font-mono tracking-wider px-3 py-1 rounded-full border ${
                mod.featured 
                  ? 'bg-white/10 text-white border-white/20' 
                  : 'bg-white text-[#6B8576] border-[#E5E3DF] shadow-sm'
              }`}>
                {outcomes[idx]}
              </div>
 
              {/* Icon */}
              <div className={`mb-6 h-14 w-14 rounded-2xl flex items-center justify-center ${
                mod.featured ? 'bg-white/10 border border-white/20 text-white' : 'bg-[#6B8576]/10 border border-[#6B8576]/15 text-[#6B8576]'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
 
              <span className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
                mod.featured ? 'text-white/70' : 'text-gray-500'
              }`}>
                MODULE {mod.id}
              </span>
              
              <h3 className={`text-xl font-display font-bold mb-3 ${
                mod.featured ? 'text-white' : 'text-espresso'
              }`}>
                {mod.title}
              </h3>
 
              <p className={`text-xs leading-relaxed mb-8 flex-1 ${
                mod.featured ? 'text-white/85' : 'text-[#6E6E6C]'
              }`}>
                {mod.description}
              </p>
 
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-3xl font-bold ${mod.featured ? 'text-white' : 'text-espresso'}`}>{mod.price}</span>
                <span className={`text-xs ${mod.featured ? 'text-white/70' : 'text-gray-500'}`}>/mo</span>
              </div>
 
              <ul className="space-y-3 mb-8 flex-1">
                {mod.features.map((feature, f_idx) => (
                  <li key={f_idx} className="flex items-start gap-2.5 text-xs">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                      mod.featured ? 'bg-white' : 'bg-[#6B8576]'
                    }`} />
                    <span className={mod.featured ? 'text-white/95' : 'text-[#6E6E6C]'}>{feature}</span>
                  </li>
                ))}
              </ul>
 
              <Link 
                href="/pilot" 
                className={`w-full py-3.5 rounded-xl text-center font-bold text-xs uppercase tracking-wider font-mono transition-all duration-300 ${
                  mod.featured 
                    ? 'bg-white text-[#6B8576] hover:bg-[#FBFBFA] shadow-md shadow-[#6B8576]/10' 
                    : 'bg-[#6B8576] text-white hover:bg-[#5A7365]'
                }`}
              >
                Get Your Free Audit
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
