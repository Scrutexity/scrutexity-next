import Image from "next/image";

const columns = [
  {
    title: "Product",
    links: [
      ["What we do", "/what-we-do"],
      ["Sample report", "/sample-report"],
      ["Pricing", "/pricing"],
      ["AuditGPT snapshot", "https://auditgpt.ai/snapshot?source=scrutexity-footer"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Methodology", "/methodology"],
      ["For agencies", "/agency"],
      ["Home", "/"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Agent review", "/contact?intent=agent-evidence-pack"],
      ["Medical & wellness", "/medical-wellness"],
      ["Med spas", "/medical-wellness/med-spas"],
      ["GLP-1 claims", "/glp-1-weight-loss-claim-audit"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Data handling", "/data-handling"],
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
        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Image
              src="/logo-wordmark-green.png"
              alt="Scrutexity"
              width={180}
              height={38}
              className="h-7 w-auto"
            />
            <p className="mt-5 max-w-xs text-xs leading-5 text-cream/65">
              Evidence-grounded audits for the claims and AI outputs your buyers rely on. Powered by AuditGPT.
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
            Scrutexity provides evidence-grounded business review. It does not provide legal advice, clinical advice, certification, or guaranteed outcomes. Findings are based on reviewed public material, supplied transcripts, and visible support.
          </p>
          <p className="mt-5 text-xs text-cream/35">
            &copy; {new Date().getFullYear()} Scrutexity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
