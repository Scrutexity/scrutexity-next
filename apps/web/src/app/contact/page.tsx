import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import ContactIntakeForm from "@/components/scrutexity/contact-intake-form";

export const metadata: Metadata = {
  title: "Contact Scrutexity | Scope an Evidence-Grounded Review",
  description: "Contact Scrutexity about a Claim Support Review, Founder’s Audit, Agency Claim QA pilot, or Agent Evidence Pack.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

const intentCopy: Record<string, { label: string; subject: string; prompt: string }> = {
  "claim-support-review": {
    label: "Claim Support Review · $99",
    subject: "Claim Support Review inquiry",
    prompt: "Send the public page you want reviewed and the claim that matters most.",
  },
  "founders-audit": {
    label: "Founder’s Audit · from $750",
    subject: "Founder’s Audit inquiry",
    prompt: "Share the company URL, current offer, and the business question you need the audit to answer.",
  },
  "agency-claim-qa": {
    label: "Agency Claim QA · pilot from $1,500",
    subject: "Agency Claim QA pilot inquiry",
    prompt: "Share your agency URL, typical client volume, and one representative client page.",
  },
  "agent-evidence-pack": {
    label: "Agent Evidence Pack · pilot from $2,500",
    subject: "Agent Evidence Pack inquiry",
    prompt: "Share the agent’s customer-facing use case and the approximate transcript volume available for review.",
  },
  monitoring: {
    label: "Monitoring pilots · selected customers",
    subject: "Scrutexity monitoring inquiry",
    prompt: "Available after an initial review for selected customers. Contact us to discuss scope.",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; source?: string; checkout?: string }>;
}) {
  const { intent, source, checkout } = await searchParams;
  const selection = intent ? intentCopy[intent] : undefined;
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
              Bring one page, transcript set, or business question.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-mist">
              Nick will confirm the useful scope, expected inputs, price, and turnaround before work begins.
            </p>

            {selection && (
              <div className="mt-8 rounded-lg border border-sage-deep/25 bg-bone p-5">
                <p className="text-sm font-semibold text-espresso">{selection.label}</p>
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
                "The public URL or type of agent output",
                "The claim, launch, or buyer question that matters",
                "Any visible evidence you already rely on",
                "Your desired decision date",
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
