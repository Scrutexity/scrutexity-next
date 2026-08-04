import { MetadataRoute } from "next";

const siteUrl = "https://www.scrutexity.com";

const staticRoutes = [
  "",
  // Core product and conversion path
  "/pricing",
  "/what-we-do",
  "/methodology",
  "/sample-report",
  "/contact",
  "/agency",

  // Preserved vertical solutions
  "/medical-wellness",
  "/medical-wellness/med-spas",
  "/aesthetic-device-claim-audit",
  "/glp-1-weight-loss-claim-audit",
  "/regenerative-medicine-claims",

  // Company and legal
  "/data-handling",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
