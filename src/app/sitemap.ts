import { MetadataRoute } from "next";

const siteUrl = "https://www.scrutexity.com";

const staticRoutes = [
  "",
  // Platform
  "/platform",
  "/governance",
  "/proof",
  "/proof/telemetry-alpha",
  "/proof/sealed-audit-trail",
  "/radar-pilot",
  "/radar-pilot/dashboard",
  "/benchmarks/state-of-medspa-claims",
  "/demo",
  "/compare",
  "/zenoti",
  "/compare/booker",
  "/compare/mindbody",
  "/compare/vagaro",
  "/vs-boulevard-billie",
  "/vs-mangomint-connect",
  "/revenue-leak-audit",
  "/boulevard-lead-recovery",
  "/mangomint-lead-recovery",
  "/yield",
  "/triage",
  "/pricing",
  // Intelligence
  "/intelligence",
  "/intelligence/medspa-revenue-recovery",
  "/intelligence/ftc-pixel-compliance",
  "/intelligence/morpheus8-consult-conversion",
  "/intelligence/ai-search-visibility",
  "/medspa-revenue-benchmarks",
  "/case-studies/weekend-recovery",
  "/integrations/boulevard",
  // Architecture & diagnostic
  "/architecture-visual",
  "/diagnostic",
  "/flow",
  // Company
  "/company",
  "/for-multi-location",
  "/roadmap",
  "/contact",
  "/sample-owner-brief",
  "/sample-snapshot",
  "/infrastructure-brief",
  "/roi",
  // Conversion
  "/pilot",
  // Trust & legal
  "/trust",
  "/what-we-do",
  "/security",
  "/compliance",
  "/verify",
  "/baa",
  "/terms",
  "/privacy",
  "/terms-of-pilot",
  // New Core Services
  "/auditgpt",
  "/contento",
  "/ai-visibility",
  "/recovery",
  "/partners",
  "/partner-os",
  "/partners/agency-console",
  "/medical-wellness",
  "/claim-audit",
  // New Use Cases & SEO
  "/use-cases/agency-white-label-audits",
  "/medical-wellness/med-spas",
  "/insights/what-is-governed-marketing-demand-recovery",
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
