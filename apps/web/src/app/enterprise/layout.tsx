import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Claim Exposure Assessment | Scrutexity",
  description:
    "A structured review of public claim exposure across a multi-brand or multi-location footprint, delivered as evidence counsel and deal teams can work from.",
  alternates: { canonical: "/enterprise" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
