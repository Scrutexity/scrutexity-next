import type { Metadata } from "next";

// Title and description preserved verbatim from the tags that were previously
// hand-rolled inside the page JSX, so existing search presentation is
// unchanged. Moved here because two competing description tags were being
// emitted, and the metadata API also supplies canonical and OG.
export const metadata: Metadata = {
  title: "New York & New Jersey Med Spa Claim Audit | AuditGPT by Scrutexity",
  description:
    "Public records and enforcement materials show that websites, brochures, treatment claims, provider credentials, and safety records can become part of the review surface for NY and NJ med spas. AuditGPT reviews your public claims and gives safer rewrite options.",
  alternates: { canonical: "/new-york-med-spa-claim-audit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
