import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Receipt | Scrutexity",
  description:
    "The claim receipt records a single reviewed claim: the text as published, the evidence found, the gap identified, and safer replacement wording.",
  alternates: { canonical: "/claim-receipt" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
