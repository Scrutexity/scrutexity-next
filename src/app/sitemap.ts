import { MetadataRoute } from "next";

const siteUrl = "https://www.scrutexity.com";

const staticRoutes = [
  "",
  "/platform",
  "/pricing",
  "/modules",
  "/for-pe",
  "/sample-owner-brief",
  "/snapshot",
  "/sample-snapshot",
  "/demo",
  "/pilot",
  "/contact",
  "/roi",
  "/trust",
  "/security",
  "/compliance",
  "/baa",
  "/compliance-attestation",
  "/company",
  "/mri",
  "/proof",
  "/lite",
  "/terms",
  "/privacy",
  "/terms-of-pilot",
  "/revenue-leak-audit",
  "/medspa-revenue-benchmarks",
  "/intelligence",
  "/intelligence/ai-search-visibility",
  "/intelligence/medspa-revenue-recovery",
  "/intelligence/ftc-pixel-compliance",
  "/intelligence/morpheus8-consult-conversion",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
