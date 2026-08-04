import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import ContactIntakeForm from "@/components/scrutexity/contact-intake-form";
import { INQUIRY_OFFERS, isPublicInquiryOffer } from "@/lib/inquiry-offers";

export const metadata: Metadata = {
  title: "Contact Scrutexity | Buyer Narrative Alignment Sprint",
  description: "Request a $1,500 Buyer Narrative Alignment Sprint or discuss an agency engagement with Scrutexity.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; source?: string; checkout?: string }>;
}) {
  const { intent, source, checkout } = await searchParams;
  const selection = isPublicInquiryOffer(intent) ? INQUIRY_OFFERS[intent] : INQUIRY_OFFERS["buyer-narrative-alignment"];
  const subject = selection?.subject ?? "Scrutexity review inquiry";

  return (
    <div className="min-h-screen bg-cream px-5 pb-20 pt-28 text-bark sm:px-8 md:pb-28 md:pt-40">
      <main className="mx-auto max-w-5xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep">
          Contact Scrutexity
        </p>
        <div className="mt-6 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className="font-display text-5xl leading-tight text-espresso md:text-6xl">
              Bring the buyer questions that matter.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-mist">
              Nick will confirm the engines, questions, source surfaces, expected inputs, and timing before work begins.
            </p>

            {selection && (
              <div className="mt-8 rounded-lg border border-sage-deep/25 bg-bone p-5">
                <p className="text-sm font-semibold text-espresso">{selection.formLabel}</p>
                <p className="mt-2 text-sm leading-6 text-mist">{selection.prompt}</p>
              </div>
            )}

            {checkout === "cancelled" && (
              <p className="mt-6 rounded-md border border-clay/35 bg-bone p-4 text-sm text-bark" role="status">
                Checkout was cancelled. Your saved request is still available, and no payment was taken.
              </p>
            )}
          </div>

          <div>
            <ContactIntakeForm initialOffer={intent} source={source} focusOnLoad={Boolean(selection)} />
          </div>
        </div>

        <aside className="mt-12 rounded-lg border border-sand-deep/45 bg-white p-7 md:flex md:items-start md:justify-between md:gap-10">
          <div>
            <h2 className="font-display text-3xl text-espresso">What to include</h2>
            <ol className="mt-6 divide-y divide-sand-deep/30">
              {[
                "The company and product URLs buyers rely on",
                "The buyer-intent questions that matter",
                "Any AI answer discrepancy you have already captured",
                "Your target decision or launch date",
              ].map((item, index) => (
                <li key={item} className="grid grid-cols-[28px_1fr] gap-3 py-4 text-sm leading-6 text-mist">
                  <span className="font-semibold text-sage-deep">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-7 shrink-0 md:mt-0 md:max-w-xs">
            <p className="text-sm leading-6 text-mist">Prefer email? The form is the reliable intake path, with email available as a fallback.</p>
            <a href={`mailto:nick@scrutexity.com?subject=${encodeURIComponent(subject)}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso">
              <Mail size={15} aria-hidden="true" />
              Email Nick
            </a>
            <Link href="/pricing" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso">
              Review pricing
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
