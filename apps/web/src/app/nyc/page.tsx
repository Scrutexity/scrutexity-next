import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New York | Scrutexity — Public Claim Intelligence",
  description:
    "Scrutexity for New York operators: a pattern map of public claims against the city, state, and federal enforcement stack — DCWP, DOHMH, DFS, and FTC Section 5 — before a buyer, regulator, or AI answer system prices them against you.",
  alternates: { canonical: "/nyc" },
  keywords: [
    "NYC claim audit",
    "med spa compliance New York",
    "FTC Section 5",
    "DCWP",
    "DOHMH",
    "AI narrative integrity",
    "claim diligence New York",
  ],
  openGraph: {
    title: "New York | Scrutexity",
    description:
      "Dated, source-linked evidence infrastructure for what New York businesses claim in public — and what the machines repeat for them.",
    url: "/nyc",
    type: "website",
  },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const VECTORS = [
  {
    id: "01",
    agency: "DCWP — City",
    claim: "“Clinically proven” on a storefront with no published study on file.",
    read: "The sentence a city consumer-protection review reads first.",
  },
  {
    id: "02",
    agency: "DOHMH — City Health",
    claim: "A procedure described as medical when the provider mix and licensure don't match.",
    read: "The sentence a health-code inspection reads first.",
  },
  {
    id: "03",
    agency: "DFS — State Finance",
    claim: "“Insurance accepted” or financing language detached from the product actually sold.",
    read: "The sentence a financial-services review reads first.",
  },
  {
    id: "04",
    agency: "FTC — Federal",
    claim: "A qualified claim restated by an AI answer system without the qualifier.",
    read: "The sentence a Section 5 substantiation review reads first.",
  },
];

const OFFERINGS = [
  { name: "Public Claim Intelligence", href: "/claim-audit", note: "The dated, source-linked claim record." },
  { name: "AI Narrative Integrity", href: "/ai-narrative-integrity", note: "What answer systems say about you, unprompted." },
  { name: "NY Med-Spa Claim Audit", href: "/new-york-med-spa-claim-audit", note: "NYC enforcement pattern data, claim by claim." },
  { name: "Location Signal Audit", href: "/enterprise", note: "The same claim compared across every location you run." },
  { name: "Pre-Transaction Diligence", href: "/diligence", note: "A fixed-scope record for deal teams, before LOI." },
];

export default function NycPage() {
  return (
    <main className="min-h-screen bg-cream text-bark">
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pt-36 sm:px-8 md:pt-44">
        <div className="border-b border-sand-deep pb-14 md:pb-20">
          <p className="text-[11px] font-medium tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>
            01 — Public Claim Intelligence · New York
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-espresso lg:text-[4.6rem]">
            New York runs on claims.{" "}
            <em className="font-display italic text-clay">We date them.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-mist md:text-lg md:leading-8">
            The densest media market in the country, where a single weakly-supported claim lives simultaneously on your
            storefront, your Instagram, your hiring page, and inside every AI answer system that summarizes you to a
            buyer, a regulator, or a counterparty who never visits your site. City, state, and federal regulators
            enforce separately on the same sentence.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-mist">
            Scrutexity doesn&apos;t certify you. It shows you the sentence that will get read first.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/snapshot"
              className="inline-flex min-h-12 items-center justify-center bg-espresso px-8 py-3 text-[11px] font-semibold tracking-[0.08em] text-cream uppercase transition-colors hover:bg-clay-deep"
              style={{ fontFamily: MONO }}
            >
              Run your free snapshot
            </Link>
            <Link
              href="/new-york-med-spa-claim-audit"
              className="inline-flex min-h-12 items-center justify-center border border-sand-deep bg-bone px-8 py-3 text-[11px] font-semibold tracking-[0.08em] text-espresso uppercase transition-colors hover:border-clay"
              style={{ fontFamily: MONO }}
            >
              View the NY med-spa audit
            </Link>
          </div>
        </div>
      </section>

      {/* Vectors */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20">
        <p className="text-[11px] font-medium tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>
          02 — The enforcement stack
        </p>
        <div className="mt-8 grid gap-px border border-sand-deep bg-sand-deep md:grid-cols-2">
          {VECTORS.map((v) => (
            <div key={v.id} className="bg-bone p-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[10px] tracking-[0.14em] text-teal-deep uppercase" style={{ fontFamily: MONO }}>
                  {v.agency}
                </span>
                <span className="text-[10px] tracking-[0.1em] text-mist" style={{ fontFamily: MONO }}>
                  {v.id} / 04
                </span>
              </div>
              <p className="mt-5 font-display text-[1.35rem] leading-[1.15] tracking-[-0.02em] text-espresso">
                “{v.claim}”
              </p>
              <p className="mt-3 text-[13px] leading-6 text-mist">{v.read}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-[13px] leading-6 text-mist">
          Pattern match, not legal advice. Scrutexity maps where your language overlaps prior enforcement language —
          it does not opine on compliance.
        </p>
      </section>

      {/* Offerings */}
      <section className="border-t border-sand-deep bg-bone">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20">
          <p className="text-[11px] font-medium tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>
            03 — Built for New York buyers
          </p>
          <div className="mt-8 grid gap-px border border-sand-deep bg-sand-deep md:grid-cols-2">
            {OFFERINGS.map((o) => (
              <Link
                key={o.name}
                href={o.href}
                className="group bg-bone p-7 transition-colors hover:bg-cream"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-xl tracking-[-0.01em] text-espresso">{o.name}</span>
                  <span aria-hidden className="text-clay transition-transform group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-mist">{o.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>
            04 — The throughline
          </p>
          <h2 className="mt-6 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-espresso md:text-[2.8rem]">
            In New York, that is not a nice-to-have. It is infrastructure.
          </h2>
          <p className="mt-6 text-base leading-7 text-mist">
            Every month, Watch delivers one dated update: claim drift, AI narrative drift, evidence changes — a diff vs.
            the prior record. Evidence first, negotiated second.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center justify-center bg-espresso px-8 py-3 text-[11px] font-semibold tracking-[0.08em] text-cream uppercase transition-colors hover:bg-clay-deep"
              style={{ fontFamily: MONO }}
            >
              See pricing
            </Link>
            <Link
              href="/methodology"
              className="inline-flex min-h-12 items-center justify-center border border-sand-deep bg-bone px-8 py-3 text-[11px] font-semibold tracking-[0.08em] text-espresso uppercase transition-colors hover:border-clay"
              style={{ fontFamily: MONO }}
            >
              Read the methodology
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
