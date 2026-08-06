"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const INVENTORY = [
  {
    code: "ART-01",
    title: "Validation Report",
    status: "Preparing",
    statusType: "amber",
    desc: "Third-party regulatory validation study and baseline benchmark dataset.",
    action: "In Development",
  },
  {
    code: "ART-02",
    title: "Anonymized Receipts",
    status: "Available",
    statusType: "sage",
    desc: "Redacted Exhibit A audit records from med-spa and wellness client audits.",
    action: "View Sample Receipts",
    href: "/sample-report",
  },
  {
    code: "ART-03",
    title: "Public Digest",
    status: "Available",
    statusType: "sage",
    desc: "Publicly accessible claim digest registry indexed by SHA-256 hash.",
    action: "Inspect Public Records",
    href: "/verify",
  },
  {
    code: "ART-04",
    title: "Hash-Chain Trail",
    status: "Available",
    statusType: "sage",
    desc: "Cryptographic hash ledger proving point-in-time capture dates and provenance.",
    action: "Verify Hash Ledger",
    href: "/verify",
  },
  {
    code: "ART-05",
    title: "Partner Validation",
    status: "Reserved",
    statusType: "muted",
    desc: "Dedicated white-label partner OS validation framework for agencies and M&A counsel.",
    action: "By Application Only",
    href: "/partner-os",
  },
];

export default function ProofPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      <section className="border-b border-sand-deep bg-paper-light px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-3" style={{ fontFamily: MONO }}>
            PROOF // DOCUMENTARY INVENTORY
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
            Institutional proof &amp; artifact inventory.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-muted">
            Transparent documentation of available evidence artifacts, public digests, and pending validation studies.
          </p>
        </div>
      </section>

      <section className="bg-paper px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="border border-sand-deep bg-paper-light">
            <div className="p-6 border-b border-sand-deep flex justify-between items-center text-xs font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
              <span>ARTIFACT ID &amp; DESCRIPTION</span>
              <span>DOCUMENTARY STATUS</span>
            </div>

            <div className="divide-y divide-sand-deep/60">
              {INVENTORY.map((item) => (
                <div key={item.code} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted" style={{ fontFamily: MONO }}>{item.code}</span>
                      <h3 className="font-display text-xl text-ink font-normal">{item.title}</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted max-w-xl">{item.desc}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 border uppercase font-semibold ${
                        item.statusType === "sage"
                          ? "border-bureau-sage/30 bg-paper text-bureau-sage"
                          : item.statusType === "amber"
                          ? "border-review-amber/30 bg-amber-bg text-review-amber"
                          : "border-sand-deep bg-paper text-muted"
                      }`}
                      style={{ fontFamily: MONO }}
                    >
                      {item.status}
                    </span>

                    {item.href ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-mono text-ink underline hover:text-bureau-sage"
                        style={{ fontFamily: MONO }}
                      >
                        {item.action} <ArrowUpRight size={14} />
                      </Link>
                    ) : (
                      <span className="text-xs font-mono text-muted" style={{ fontFamily: MONO }}>
                        {item.action}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
