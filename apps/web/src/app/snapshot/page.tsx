"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Kicker } from "@/components/scrutexity/intel-kit";
import { SnapshotLoader } from "@/components/scrutexity/motion/snapshot-loader";

export default function SnapshotIntakePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate processing time for the animation sequence (5 stages * ~600ms)
    setTimeout(() => {
      router.push("/snapshot/result");
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-cream text-bark flex flex-col items-center justify-center px-5 py-24 sm:px-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <Kicker>Free Snapshot</Kicker>
          <h1 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">
            See what your site claims—and what&apos;s missing to back it up.
          </h1>
          <p className="mt-4 text-lg text-mist">
            Paste a public URL. We&apos;ll generate a 3-point snapshot.
          </p>
        </div>

        {loading ? (
          <SnapshotLoader />
        ) : (
          <form onSubmit={handleSubmit} className="bg-bone rounded-2xl border border-sand-deep/60 p-8 md:p-10 shadow-sm space-y-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-semibold text-espresso mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  required
                  placeholder="https://yourbrand.com/landing-page"
                  className="w-full rounded-full border border-sand-deep bg-cream px-5 py-3.5 text-sm focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20"
                />
                <p className="mt-2 text-xs text-mist font-mono">
                  <span className="text-teal-deep font-semibold">e.g.</span> https://yourbrand.com/landing-page
                </p>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-espresso mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-full border border-sand-deep bg-cream px-5 py-3.5 text-sm focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20"
                />
                <p className="mt-3 flex items-center gap-1.5 text-xs text-mist font-medium">
                  <span aria-hidden="true">🔒</span> Confidential by default. Results are never published or indexed.
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-teal-deep/90 shadow-md"
                >
                  Run Free Snapshot
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className="mt-4 text-center text-xs text-mist leading-relaxed">
                  Your 3-point snapshot will be generated in ~3 minutes.<br />Results will be delivered directly to your inbox.
                </p>
              </div>
            </div>

            {/* Inline Sample Output Preview Card */}
            <div className="mt-6 rounded-xl border border-sand-deep/40 bg-cream p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-mist font-mono">
                  Sample Findings Preview
                </span>
                <span className="rounded-full bg-amber-bg text-amber-badge border border-amber-badge/20 px-2.5 py-0.5 text-[10px] font-bold font-mono">
                  [FLAGGED]
                </span>
              </div>
              <p className="text-xs font-mono text-espresso leading-relaxed">
                <span className="text-amber-badge font-bold">&ldquo;Reverses aging at cellular level&rdquo;</span>
                {" → "}
                <span className="text-bark">FTC enforcement pattern match: <span className="text-mist font-normal">Unsubstantiated biological mechanism claim.</span></span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
