import type { Metadata } from "next";
import MethodologyV1Content from "@/components/scrutexity/methodology-v1-content";

const title = "Scrutexity Methodology | Evidence-Grounded Business Review";
const description = "How Scrutexity captures public claims or supplied AI outputs, matches visible evidence, classifies support gaps, and prioritizes safer framing and next actions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/methodology" },
  openGraph: { title, description, type: "article", url: "https://www.scrutexity.com/methodology", images: ["/api/og?title=Scrutexity%20Methodology&eyebrow=Method%20v1.0"] },
  twitter: { card: "summary_large_image", title, description, images: ["/api/og?title=Scrutexity%20Methodology&eyebrow=Method%20v1.0"] },
};

export default function MethodologyPage() {
  return <MethodologyV1Content />;
}
