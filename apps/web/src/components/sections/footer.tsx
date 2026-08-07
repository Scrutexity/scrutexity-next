import Image from "next/image";

const columns = [
  {
    title: "Intelligence",
    links: [
      ["AI & Regulatory Diligence", "/diligence"],
      ["For Counsel", "/counsel"],
      ["Enterprise Exposure Assessment", "/enterprise"],
      ["AI Narrative Integrity", "/ai-narrative-integrity"],
      ["Scrutexity Watch", "/watch"],
    ],
  },
  {
    title: "Engage",
    links: [
      ["Request a Private Assessment", "/private-assessment"],
      ["Claim Exposure Diagnostic", "/claim-exposure-diagnostic"],
      ["Pricing", "/pricing"],
      ["Sample Report", "/sample-report"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Evidence",
    links: [
      ["Methodology", "/methodology"],
      ["Proof", "/proof"],
      ["Verify a Record", "/verify"],
      ["Safety Architecture", "/safety-architecture"],
      ["Sealed Audit Trail", "/proof/sealed-audit-trail"],
      ["Sample Owner Brief", "/sample-owner-brief"],
      ["How It Works", "/how-it-works"],
      ["About", "/about"],
    ],
  },
  {
    // These vertical pages carry the site's deepest long-form content but had
    // zero inbound links, so neither crawlers nor readers could reach them.
    title: "Industries",
    links: [
      ["Med Spas", "/medical-wellness/med-spas"],
      ["GLP-1 & Weight Loss", "/glp-1-weight-loss-claim-audit"],
      ["Aesthetic Devices", "/aesthetic-device-claim-audit"],
      ["Regenerative Medicine", "/regenerative-medicine-claims"],
      ["New York & New Jersey", "/new-york-med-spa-claim-audit"],
      ["Agencies", "/use-cases/agency-white-label-audits"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Data Handling", "/data-handling"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Email Nick", "mailto:nick@scrutexity.com?subject=Scrutexity%20inquiry"],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-espresso px-5 py-14 text-cream sm:px-8 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div>
            <Image
              src="/logo-wordmark-green.png"
              alt="Scrutexity"
              width={180}
              height={38}
              className="h-7 w-auto"
            />
            <p className="mt-5 max-w-xs text-xs leading-5 text-cream/70">
              Forensic Intelligence for AI, Claims &amp; Regulatory Risk.
            </p>
            <p className="mt-3 max-w-xs text-xs leading-5 text-cream/55">
              Scrutexity documents the gap between what a company claims, what its evidence
              supports, and what AI systems and the public say about it.
            </p>
            <p className="mt-5 max-w-xs text-xs leading-5 text-cream/45">
              AuditGPT is the public-claim diagnostic instrument powered by Scrutexity.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold text-cream/45">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-xs text-cream/70 transition-colors hover:text-sage-soft">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-cream/10 pt-7">
          <p id="disclaimer" className="max-w-4xl text-xs leading-5 text-cream/55">
            Scrutexity is an intelligence and evidence company. It is not a law firm and does not
            provide legal advice, clinical advice, certification, or guaranteed outcomes. Findings
            are observations drawn from publicly available material and AI answer-system outputs,
            recorded with their sources and capture dates. Nothing on this site is a legal opinion,
            a valuation opinion, or a determination of liability or non-compliance.
          </p>
          <p className="mt-5 text-xs text-cream/35">
            &copy; {new Date().getFullYear()} Scrutexity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
