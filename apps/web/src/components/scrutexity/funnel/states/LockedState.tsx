"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { ForensicHeader } from "../ui/ForensicHeader";
import { SecureRedactBlock } from "../ui/SecureRedactBlock";
import { ExhibitCard } from "../ui/ExhibitCard";
import { RedactedScanResult } from "../types";

interface LockedStateProps {
  data: RedactedScanResult;
  onEmailCaptured: (email: string) => void;
}

export function LockedState({ data, onEmailCaptured }: LockedStateProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // TODO: Call real API to capture email and exchange token
    // await fetch('/api/funnel/capture-email', ...)
    setTimeout(() => {
      onEmailCaptured(email);
    }, 800);
  };

  return (
    <div className="bg-paper-light border border-sand-deep/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md relative">
      <ForensicHeader targetUrl={data.targetUrl} scannedAt={data.scannedAt} />
      
      <div className="p-6 sm:p-8 relative">
        <div className="mb-4 text-xs font-mono uppercase tracking-widest text-muted">
          Exhibit A: Highest Risk Claim
        </div>
        
        {/* The Skeletal Blur */}
        <div className="relative">
          <ExhibitCard 
            exhibit={{
              id: "locked-exhibit",
              originalClaimText: null,
              remediatedClaimText: null,
              vector: { id: data.exhibitAStructure?.vectorId || "UNKNOWN", name: "REDACTED", description: "", severity: "HIGH" },
              missingSupportReason: null
            }}
          />
          
          {/* Email Capture Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-paper/30 backdrop-blur-sm rounded-xl border border-sand-deep/20 shadow-2xl">
            <h4 className="text-xl font-display text-ink font-medium mb-1">
              Scan Complete. {data.totalGapsFound} Regulatory Gaps Found.
            </h4>
            <p className="text-sm text-ink mb-6 text-center max-w-sm">
              This domain contains unsubstantiated claims. Enter your email to decrypt Exhibit A.
            </p>
            
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
              <input 
                type="email"
                required
                placeholder="Enter work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-paper border border-sand-deep/60 focus:border-bureau-sage focus:outline-none text-ink text-sm"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-ink text-paper-light font-semibold text-sm rounded-lg hover:bg-clay-deep transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Decrypting..." : "Decrypt Audit Record"}
              </button>
            </form>
            
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted uppercase">
              <Lock size={12} />
              <span>AES-256 Encryption • Confidential Default</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
