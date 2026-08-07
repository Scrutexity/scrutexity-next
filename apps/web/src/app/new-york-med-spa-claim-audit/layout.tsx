import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New York & New Jersey Med Spa Claim Audit | Scrutexity",
  description:
    "A claim review for New York and New Jersey med spas: which public treatment claims your evidence does not support, safer replacement wording, and a dated review record.",
  alternates: { canonical: "/new-york-med-spa-claim-audit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
