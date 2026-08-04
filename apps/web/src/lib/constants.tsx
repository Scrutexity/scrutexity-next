import { Shield, Lock, Activity, CheckCircle } from 'lucide-react';

export const COPY = {
  hero: {
    badge: "PRIVATE CLINICAL INFRASTRUCTURE // EST. 2026",
    h1: "The inquiries your practice never sees are the revenue you already paid for.",
    sub: "14-day pilot on top of your existing systems. You decide with the ledger in hand.",
    trustGates: [
      { label: "FULLY COMPLIANT", desc: "Insured liability indemnification", icon: <Lock size={18} className="text-clay" /> },
      { label: "PRIVACY FIRST", desc: "Impenetrable patient data protection", icon: <Shield size={18} className="text-clay" /> },
      { label: "EXCEPTIONAL CARE", desc: "Validated by premier aesthetic boards", icon: <Activity size={18} className="text-clay" /> },
      { label: "SEAMLESS INTEGRATION", desc: "Zero-friction operational flow", icon: <CheckCircle size={18} className="text-clay" /> }
    ]
  },
  problem: {
    title: "Most medspa revenue leaks before the consult is ever booked.",
    text: "You deliver unparalleled aesthetic results, but standard booking systems and fragmented agencies cheapen the patient journey. When your infrastructure is generic, your brand equity bleeds. We build sophisticated, permanent systems directly into your clinic's ecosystem. You own the experience. You own the data. You own the standard of care."
  },
  modules: [
    { number: "01", problem: "Missed Consultations", outcome: "Recover high-value prospects before they disappear.", name: "Consultation Recovery", price: "$1,200/mo", desc: "Reactivates high-intent consult dropoffs within 12 hours using compliant outbound workflows — so your team recovers revenue that would otherwise disappear after the first inquiry." },
    { number: "02", problem: "Incomplete Treatment Inquiries", outcome: "Convert research traffic into qualified consultations.", name: "Treatment Booking Funnel", price: "$1,100/mo", desc: "Converts research-phase visitors into booked consultations with dynamic pricing and frictionless checkout." },
    { number: "04", problem: "Invisible in AI Search", outcome: "Appear when patients ask AI assistants where to go.", name: "AI Search Visibility", price: "$800/mo", desc: "Engineered for strong citation presence in ChatGPT, Perplexity, and Siri — so patients find you before they find competitors." },
    { number: "05", problem: "Public Claim Risk", outcome: "Identify unsupported claims across marketing surfaces.", name: "Claim Exposure Review", price: "$497", desc: "Extracts and scores public claims against active enforcement patterns, delivering safer rewrites and a dated review record." }
  ],
  founder: {
    name: "Nick Altstein",
    title: "FOUNDER & SYSTEMS ARCHITECT",
    quote: "Every missed call or unanswered 11 PM message is revenue you already paid for. I built Scrutexity to catch those leaks without disrupting your clinic. The system is entirely rules-based — it never improvises medical advice and immediately hands off clinical questions to your licensed staff. We strip all patient identifiers at the ingress layer, figure out what the lead wants, and book the deposit through a read-only connection to your calendar. No guesswork, just a verifiable ledger of recovered appointments."
  }
};
