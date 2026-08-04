import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const title = "Nick Altstein | Founder of Scrutexity";
const description = "Meet Nick Altstein, founder and systems architect at Scrutexity, and learn how he leads the Buyer Narrative Alignment Sprint.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    type: "profile",
    url: "https://www.scrutexity.com/about",
    images: ["/api/og?title=Nick%20Altstein&eyebrow=Founder%20of%20Scrutexity"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/api/og?title=Nick%20Altstein&eyebrow=Founder%20of%20Scrutexity"],
  },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-20 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="overflow-hidden border border-sand-deep/45 bg-espresso">
            <Image
              src="/founder.jpg"
              alt="Nick Altstein, founder of Scrutexity"
              width={1024}
              height={1024}
              priority
              className="aspect-[4/5] w-full object-cover object-top grayscale"
            />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Founder</p>
            <h1 className="mt-5 font-display text-5xl leading-tight text-espresso md:text-7xl">Nick Altstein</h1>
            <p className="mt-4 text-sm font-semibold text-espresso">Founder &amp; Systems Architect</p>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-mist">
              <p>
                Nick Altstein founded Scrutexity to create an inspectable record of how companies describe their products, how AI answer engines restate those descriptions, and where material discrepancies appear.
              </p>
              <p>
                He leads every Buyer Narrative Alignment Sprint from question-set design through source review and the 14-day rerun. The work focuses on observable answer behavior and published source material, not claims of access to proprietary ranking or retrieval systems.
              </p>
              <p>
                Nick also maintains Scrutexity’s public methodology and personally reviews every material finding before it is delivered.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?intent=buyer-narrative-alignment&source=about" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">
                Request an Alignment Sprint
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href="mailto:nick@scrutexity.com?subject=Scrutexity%20inquiry" className="inline-flex min-h-12 items-center justify-center rounded-md border border-sand-deep bg-white px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep">
                Email Nick
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Operating standard</p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">The limits are part of the work.</h2>
          </div>
          <ul className="divide-y divide-sand-deep/35 border-y border-sand-deep/45">
            {[
              "Capture exact wording, query conditions, citations, engine, and date.",
              "Describe observed discrepancies without converting them into legal conclusions.",
              "Separate controllable source changes from answer-engine behavior outside company control.",
              "Rerun the same agreed question set before claiming movement.",
            ].map((item) => (
              <li key={item} className="flex gap-3 py-5 text-sm leading-7 text-mist">
                <Check className="mt-1 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
