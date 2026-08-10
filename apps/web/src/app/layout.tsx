import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import "./construction.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import Footer from "@/components/sections/footer";
import { MobileStickyCTA } from "@/components/scrutexity/mobile-sticky-cta";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-jetbrains-mono" });
const siteUrl = "https://www.scrutexity.com";
const title = "Scrutexity — Contractor-Side Production Control";
const description = "Know what was actually observed before you move the crew. Scrutexity preserves planned starts, observed field evidence, contractor decisions, actual execution, and sealed lineage.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: ["contractor production control", "specialty contractor observed site state", "crew deployment decision record", "construction production control", "prospective field record"],
  openGraph: { title, description, url: siteUrl, siteName: "Scrutexity", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Scrutexity", url: siteUrl, slogan: "Contractor-side production control", description, email: "hello@scrutexity.com" },
    { "@type": "Service", "@id": `${siteUrl}/#diagnostic`, name: "5-Day Production Control Diagnostic", serviceType: "Contractor-side production control diagnostic", provider: { "@id": `${siteUrl}/#organization` }, description: "A bounded five-working-day diagnostic that preserves planned deployment, observed prerequisite state, source evidence, contractor decisions, actual execution where available, unresolved verification gaps, and sealed lineage." },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "Scrutexity", publisher: { "@id": `${siteUrl}/#organization` } }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} /></head>
      <body>
        <a className="sx-skip" href="#main-content">Skip to content</a>
        <SmoothScrollProvider>
          <SiteNav />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <MobileStickyCTA />
        <Analytics />
        <GoogleAnalytics gaId="G-XGF7WH36MG" />
      </body>
    </html>
  );
}
