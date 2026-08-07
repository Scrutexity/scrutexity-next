import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLP-1 & Medical Weight Loss Claim Audit | AuditGPT by Scrutexity",
  description:
    "AuditGPT reviews public-facing GLP-1 and medical weight loss claims, covering medication language, outcome promises, testimonial framing, FDA wording, and AI answer surfaces, so clinics can see what is supported, what is overstated, and what should be rewritten.",
  alternates: { canonical: "/glp-1-weight-loss-claim-audit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
