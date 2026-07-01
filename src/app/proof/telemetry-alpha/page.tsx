import React from "react";
import { ArtifactReceipt } from "@/components/ArtifactReceipt";

export default function TelemetryAlphaPage() {
  return (
    <div className="min-h-screen bg-charcoal text-ivory pt-nav-offset">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-4 mb-16 border-b border-ivory/10 pb-8">
          <div className="data-pill bg-ivory/10 border-ivory/20 text-ivory/80 self-start">MODULE: PROOF/TELEMETRY</div>
          <h1 className="font-display text-5xl">Immutable Audit Trails</h1>
          <p className="font-sans text-xl text-ivory/70 max-w-2xl">
            Sovereign data infrastructure displaying redacted telemetry from active enterprise pilots. Every claim is hashed, time-stamped, and reviewed by the Scrutexity network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArtifactReceipt 
            id="TX-883A"
            timestamp="2026-06-27 14:02:11 UTC"
            hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            metric="NRR Protected (Pilot A)"
            value="$1.2M"
          />
          <ArtifactReceipt 
            id="TX-884B"
            timestamp="2026-06-27 15:45:00 UTC"
            hash="8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4"
            metric="Claims Reviewed (Q2)"
            value="14,209"
          />
          <ArtifactReceipt 
            id="TX-885C"
            timestamp="2026-06-27 16:10:33 UTC"
            hash="a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
            metric="Risk Eliminated"
            value="$4.2M"
          />
        </div>
      </div>
    </div>
  );
}
