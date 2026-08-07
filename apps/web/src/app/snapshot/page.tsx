import type { Metadata } from "next";
import SnapshotClient from "./snapshot-client";

export const metadata: Metadata = {
  title: "Run a Free Claim Snapshot | Scrutexity",
  description:
    "Paste any public marketing URL. Scrutexity reviews the claims on the page, flags what the evidence does not support, and returns a dated, hash-chained record.",
  alternates: { canonical: "/snapshot" },
  openGraph: {
    title: "Run a Free Claim Snapshot | Scrutexity",
    description:
      "Paste any public marketing URL and see which claims your evidence does not currently support.",
    url: "/snapshot",
    type: "website",
  },
};

export default function SnapshotPage() {
  return <SnapshotClient />;
}
