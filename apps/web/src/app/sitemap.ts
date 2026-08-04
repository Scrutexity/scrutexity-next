import { MetadataRoute } from "next";

const siteUrl = "https://www.scrutexity.com";

const staticRoutes = [
  "",
  // Core product and conversion path
  "/pricing",
  "/what-we-do",
  "/methodology",
  "/methodology/v1",
  "/sample-report",
  "/contact",
  "/agency",
  "/about",

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
