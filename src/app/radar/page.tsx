import React from "react";
import { ClaimCard } from "@/components/ClaimCard";

export default function RadarPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal pt-nav-offset">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-4 mb-16">
          <div className="data-pill text-charcoal self-start">MODULE: CLAIM MONITORING</div>
          <h1 className="font-display text-5xl">Franchise God View</h1>
          <p className="font-sans text-xl text-charcoal-muted max-w-2xl">
            Monitor compliance, risk scores, and claim drift across your entire portfolio of locations in real-time. Protect your brand equity and operational NRR.
          </p>
        </div>

        <div className="bg-charcoal text-ivory p-6 rounded-sm mb-12 flex justify-between items-center">
          <div>
            <h3 className="font-mono text-sm tracking-widest text-ivory/60 mb-1">PORTFOLIO STATUS</h3>
            <div className="font-display text-3xl">72 Locations Monitored</div>
          </div>
          <div className="text-right">
            <h3 className="font-mono text-sm tracking-widest text-ivory/60 mb-1">SYSTEM RISK LEVEL</h3>
            <div className="font-display text-3xl text-terracotta">ELEVATED</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ClaimCard 
            claim="Miami Location: 'Guaranteed Results in 30 Days'"
            riskScore={92}
            status="Unsupported"
          />
          <ClaimCard 
            claim="Dallas Location: 'Award-Winning Medical Staff'"
            riskScore={15}
            status="Verified"
          />
          <ClaimCard 
            claim="Chicago Location: '#1 Rated in the Midwest'"
            riskScore={85}
            status="Unsupported"
          />
          <ClaimCard 
            claim="NY Location: 'All-Natural Ingredients'"
            riskScore={45}
            status="Reviewing"
          />
        </div>
      </div>
    </div>
  );
}
