import { MetadataRoute } from "next";

const siteUrl = "https://www.scrutexity.com";

const staticRoutes = [
  "",
  // Core Product & Value
  "/pricing",
  "/what-we-do",
  "/methodology",
  "/claim-audit",
  "/ai-visibility",
  "/proof",
  "/proof/sealed-audit-trail",
  "/sample-report",
  "/sample-owner-brief",
  "/verify",
  "/agent-audit",

  // Operations & Verticals
  "/company",
  "/for-multi-location",
  "/safety-architecture",
  "/data-handling",
  "/contact",
  "/medical-wellness",
  "/medical-wellness/med-spas",
  "/benchmarks/state-of-medspa-claims",

  // High-Intent Verticals & Use Cases
  "/aesthetic-device-claim-audit",
  "/glp-1-weight-loss-claim-audit",
  "/new-york-med-spa-claim-audit",
  "/regenerative-medicine-claims",
  "/insights/glp-1-claim-audit",
  "/private-equity/claim-diligence",
  "/private-equity/report",

  // Partner & Agency
  "/partners",
  "/partner-os",
  "/agency",
  "/agency/claim-receipt",
  "/claim-receipt",
  "/use-cases/agency-white-label-audits",

  // Legal
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
