import { Shield, Lock, Activity, CheckCircle } from 'lucide-react';

export const COPY = {
  hero: {
    badge: "PRIVATE CLINICAL INFRASTRUCTURE // EST. 2026",
    h1: "Recover $25K–$50K in lost revenue every month",
    sub: "Permanent revenue infrastructure for premium NYC medspas. 14-day pilot — visible results or you pay $0.",
    trustGates: [
      { label: "FULLY COMPLIANT", desc: "Insured liability indemnification", icon: <Lock size={18} className="text-terracotta" /> },
      { label: "PRIVACY FIRST", desc: "Impenetrable patient data protection", icon: <Shield size={18} className="text-terracotta" /> },
      { label: "EXCEPTIONAL CARE", desc: "Validated by premier aesthetic boards", icon: <Activity size={18} className="text-terracotta" /> },
      { label: "SEAMLESS INTEGRATION", desc: "Zero-friction operational flow", icon: <CheckCircle size={18} className="text-terracotta" /> }
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
    { number: "05", problem: "Compliance Risk", outcome: "Protect patient data while preserving attribution.", name: "Pixel Compliance Shield", price: "$1,500/mo", desc: "Server-side proxy that strips PHI from tracker cookies and hashes identity signals — protecting your paid acquisition from FTC exposure." }
  ],
  caseStudy: {
    client: "Upper East Side Medical Aesthetics · NYC",
    author: "Practice Director",
    location: "Upper East Side, NY",
    metric1: "$28,400",
    metric1Label: "Recovered MRR in 30 Days",
    metric2: "2.4x",
    metric2Label: "Rebooking Rate Increase",
    metric3: "14",
    metric3Label: "Days to ROI",
    quote: "The infrastructure paid for itself on day three. We had no idea how many $2,500 consultations were slipping through."
  },
  founder: {
    name: "Nicholas",
    title: "LEAD ARCHITECT — NEW YORK CITY",
    quote: "We don't build websites. We build the operational revenue infrastructure that premium aesthetics clinics use to permanently solve their pipeline leakage. Our systems are engineered for absolute compliance, discretion, and measurable recovery."
  }
};
