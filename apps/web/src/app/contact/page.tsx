import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import ContactIntakeForm from "@/components/scrutexity/contact-intake-form";

export const metadata: Metadata = { title: "Request a 5-Day Production Control Diagnostic | Scrutexity", description: "Bring one active workfront and an upcoming crew deployment. Receive a contractor-controlled record of planned start, observed state, evidence, decision, actual execution where available, and verification gaps." };
export const dynamic = "force-dynamic";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string; source?: string }> }) {
  const { source } = await searchParams;
  const outline = ["Monday · Select deployment", "Tuesday–Thursday · Build record", "Friday · Deliver sealed lineage", "Verification gaps disclosed"];
  return <div className="min-h-screen bg-sx-bg px-0 pb-24 pt-28"><div className="sx-container"><Link href="/" className="inline-flex items-center gap-2 text-xs text-sx-muted hover:text-sx-ink"><ArrowLeft size={14}/>Back to Scrutexity</Link><div className="mt-12 grid gap-16 lg:grid-cols-[.9fr_1.1fr]"><div><p className="sx-eyebrow">5-DAY DIAGNOSTIC</p><h1 className="sx-h2 mt-8">Bring us one active workfront.</h1><p className="sx-body mt-6 max-w-[520px]">Select an upcoming crew deployment. Scrutexity builds the prospective record from evidence available through your existing workflow.</p><div className="mt-10 divide-y divide-sx-border border-y border-sx-border">{outline.map((item, index) => <div className="flex items-center justify-between gap-6 py-4" key={item}><span className="sx-mono text-sx-muted">0{index + 1}</span><span className="text-right text-sm font-medium">{item}</span></div>)}</div><div className="mt-8 flex items-start gap-3 text-xs leading-5 text-sx-muted"><ShieldCheck size={17} className="mt-0.5 shrink-0"/><p>Do not submit confidential project records through this form. Scope, commercial terms, and a secure exchange path are confirmed before work begins.</p></div></div><ContactIntakeForm initialOffer="construction-diagnostic" source={source ?? "construction-contact"}/></div></div></div>;
}
