import { MetadataRoute } from "next";

const siteUrl = "https://www.scrutexity.com";

const staticRoutes = [
  "",
  // Platform
  "/governance",
  "/proof",
  "/proof/telemetry-alpha",
  "/proof/sealed-audit-trail",
  "/benchmarks/state-of-medspa-claims",
  "/pricing",
  // Intelligence
  "/intelligence",
  "/intelligence/ai-search-visibility",
  // Architecture & diagnostic
  // Company
  "/company",
  "/for-multi-location",
  "/roadmap",
  "/contact",
  "/sample-owner-brief",
  "/infrastructure-brief",
  // Conversion
  // Trust & legal
  "/trust",
  "/what-we-do",
  "/security",
  "/verify",
  "/terms",
  "/privacy",
  // Core Services
  "/auditgpt",
  "/partners",
  "/partner-os",
  "/partners/agency-console",
  "/medical-wellness",
  "/claim-audit",
  // New Use Cases & SEO
  "/use-cases/agency-white-label-audits",
  "/medical-wellness/med-spas",
  "/personal-brand-audit",
  "/new-york-med-spa-claim-audit",
  "/glp-1-weight-loss-claim-audit",
  "/sample-report",
  "/agency/claim-intelligence-receipt",
  "/aesthetic-device-claim-audit",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
