import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import ContactIntakeForm from "@/components/scrutexity/contact-intake-form";
import * as motion from "framer-motion/client";

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
    label: "Monitoring · later option",
    subject: "Scrutexity monitoring inquiry",
    prompt: "Share the surfaces that change most often and the review cadence you need.",
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const riseIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
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
    <div className="min-h-screen bg-paper px-5 pb-20 pt-28 text-ink font-sans sm:px-8 md:pb-28 md:pt-40">
      <main className="mx-auto max-w-5xl">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={riseIn} className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-muted">
            Contact Scrutexity
          </motion.p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <motion.h1 variants={riseIn} className="font-display text-4xl font-medium leading-tight text-ink sm:text-5xl md:text-6xl text-balance">
                Bring one page, transcript set, or business question.
              </motion.h1>
              <motion.p variants={riseIn} className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                Nick will confirm the useful scope, expected inputs, price, and turnaround before work begins.
              </motion.p>

              {selection && (
                <motion.div variants={riseIn} className="mt-8 rounded-lg border border-hairline bg-paper-light p-5">
                  <p className="text-sm font-semibold text-ink">{selection.label}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{selection.prompt}</p>
                </motion.div>
              )}

              {checkout === "cancelled" && (
                <motion.p variants={riseIn} className="mt-6 rounded-md border border-exposure-red/35 bg-paper-light p-4 text-sm text-ink-soft" role="status">
                  Checkout was cancelled. Your saved request is still available, and no payment was taken.
                </motion.p>
              )}
            </div>

            <motion.div variants={riseIn}>
              <ContactIntakeForm initialOffer={intent} source={source} />
            </motion.div>
          </div>
        </motion.div>

        <motion.aside 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-12 rounded-xl border border-hairline bg-raised p-8 md:flex md:items-start md:justify-between md:gap-10 shadow-[var(--shadow-card)]"
        >
          <div className="flex-1">
            <h2 className="font-display text-2xl font-medium text-ink">What to include</h2>
            <ol className="mt-6 divide-y divide-hairline">
              {[
                "The public URL or type of agent output",
                "The claim, launch, or buyer question that matters",
                "Any visible evidence you already rely on",
                "Your desired decision date",
              ].map((item, index) => (
                <li key={item} className="grid grid-cols-[28px_1fr] gap-3 py-4 text-sm leading-6 text-ink-soft">
                  <span className="font-mono font-semibold text-accent-text">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8 shrink-0 md:mt-0 md:max-w-xs">
            <p className="text-sm leading-6 text-ink-soft">Prefer email? The form is the reliable intake path, with email available as a fallback.</p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <a href={`mailto:nick@scrutexity.com?subject=${encodeURIComponent(subject)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent-text transition-colors hover:text-accent-bright">
                <Mail size={15} aria-hidden="true" />
                Email Nick
              </a>
              <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-text transition-colors hover:text-accent-bright">
                Review pricing
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.aside>
      </main>
    </div>
  );
}
