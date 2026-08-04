import Image from "next/image";

const columns = [
  {
    title: "Product",
    links: [
      ["What we do", "/what-we-do"],
      ["Sample report", "/sample-report"],
      ["Pricing", "/pricing"],
      ["Alignment Sprint", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Methodology", "/methodology"],
      ["About Nick", "/about"],
      ["For agencies", "/agency"],
      ["Home", "/"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Engagement",
    links: [
      ["What is included", "/pricing"],
      ["Request a sprint", "/contact?intent=buyer-narrative-alignment&source=footer"],
      ["For agencies", "/agency"],
      ["Sample report", "/sample-report"],
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
              Evidence-grounded comparison of your published record and the AI-generated narratives buyers encounter.
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
          <p className="mt-5 font-mono text-[11px] leading-5 text-cream/45">
            Method v1.0 · Published Aug. 4, 2026 · Last methodology update Aug. 4, 2026
          </p>
          <p className="mt-5 text-xs text-cream/35">
            &copy; {new Date().getFullYear()} Scrutexity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
