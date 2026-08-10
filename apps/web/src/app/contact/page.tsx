import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import ContactIntakeForm from "@/components/scrutexity/contact-intake-form";

export const metadata: Metadata = { title: "Request a 5-Day Production Control Diagnostic | Scrutexity", description: "Give Scrutexity one active project and a bounded set of upcoming crew deployments. Request a contractor-controlled prospective Decision Record." };
export const dynamic = "force-dynamic";

export default async function ContactPage({searchParams}:{searchParams:Promise<{intent?:string;source?:string}>}){
  const {source}=await searchParams;
  return <div className="min-h-screen bg-sx-bg px-0 pb-24 pt-28"><div className="sx-container"><Link href="/" className="inline-flex items-center gap-2 text-xs text-sx-muted hover:text-sx-ink"><ArrowLeft size={14}/>Back to Decision Record</Link><div className="mt-12 grid gap-16 lg:grid-cols-[.9fr_1.1fr]"><div><span className="sx-kicker"><span className="sx-kicker-dot"/>5-Day Diagnostic</span><h1 className="sx-h2 mt-8">Start with one active project.</h1><p className="sx-body mt-6 max-w-[520px]">For five working days, Scrutexity follows a bounded set of upcoming crew deployments and builds the prospective record before mobilization.</p><div className="mt-10 divide-y divide-sx-border border-y border-sx-border">{["One active project","Bounded workfronts","Existing field communication","Friday production record"].map((item,i)=><div className="flex items-center justify-between py-4" key={item}><span className="sx-mono text-sx-muted">0{i+1}</span><span className="text-sm font-medium">{item}</span></div>)}</div><div className="mt-8 flex items-start gap-3 text-xs leading-5 text-sx-muted"><ShieldCheck size={17} className="mt-0.5 shrink-0"/><p>Do not submit confidential project records through this form. Nick will confirm scope and a secure exchange path before work begins.</p></div></div><ContactIntakeForm initialOffer="construction-diagnostic" source={source??"construction-contact"}/></div></div></div>
}
