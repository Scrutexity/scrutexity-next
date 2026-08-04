import type { Metadata } from "next";
import MethodologyV1Content from "@/components/scrutexity/methodology-v1-content";

const title = "Scrutexity Method v1.0 | Published Methodology";
const description = "The frozen Aug. 4, 2026 publication of Scrutexity's evidence-grounded business review method.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/methodology/v1" },
  openGraph: { title, description, type: "article", url: "https://www.scrutexity.com/methodology/v1", images: ["/api/og?title=Scrutexity%20Method%20v1.0&eyebrow=Published%20Aug.%204%2C%202026"] },
  twitter: { card: "summary_large_image", title, description, images: ["/api/og?title=Scrutexity%20Method%20v1.0&eyebrow=Published%20Aug.%204%2C%202026"] },
};

export default function MethodologyV1Page() {
  return <MethodologyV1Content canonicalPath="/methodology/v1" />;
}
