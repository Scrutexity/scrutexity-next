import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety Architecture | Scrutexity",
  description:
    "How Scrutexity constrains its review process: public pages only, source-linked findings, human-reviewable records, and explicit limits on what the system will assert.",
  alternates: { canonical: "/safety-architecture" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
