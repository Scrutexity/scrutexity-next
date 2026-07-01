import type { Metadata } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import SiteNav from "@/components/sections/site-nav";
import Footer from "@/components/sections/footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://www.scrutexity.com";

export const metadata: Metadata = {
  title: "Scrutexity | The Claim Intelligence Platform",
  description: "Every business makes claims. Scrutexity runs a Claim Audit to find the unsupported, overstated, and risky ones — then shows you how to fix them. AuditGPT is the front door.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  verification: {
    google: "9xUsbtOiH3M_YGMX2Z3bRwAl45Tcs2rtwGTrzYh6mmc",
  },
  openGraph: {
    title: "Scrutexity | The Claim Intelligence Platform",
    description: "Every business makes claims. Scrutexity runs a Claim Audit to find the unsupported, overstated, and risky ones — then shows you how to fix them. AuditGPT is the front door.",
    url: siteUrl,
    siteName: "Scrutexity",
    images: [{ url: "/logo-icon.png", width: 320, height: 365, alt: "Scrutexity" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrutexity | The Claim Intelligence Platform",
    description: "Every business makes claims. Scrutexity runs a Claim Audit to find the unsupported, overstated, and risky ones — then shows you how to fix them. AuditGPT is the front door.",
    images: ["/logo-icon.png"],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://scrutexity.com/#application",
      name: "Scrutexity",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Claim intelligence platform for reviewing public marketing claims, evidence gaps, AI answer surfaces, and agent transcript risks before they become buyer, regulator, or brand-trust problems.",
      applicationSubCategory: "Claim Intelligence, AI Answer Reality, and Agent Guardrail Audits",
      audience: { "@type": "Audience", audienceType: "Marketing teams, agency operators, medical and wellness businesses, local-service founders, and compliance-adjacent teams" },
      featureList: [
        "Public-facing claim extraction and review",
        "Evidence-gap mapping for unsupported or overstated claims",
        "AI Answer Reality receipts across answer engines",
        "Agent transcript and guardrail audit workflows",
        "SHA-256 sealed review records",
        "Proof-backed rewrite and remediation plans",
        "BAA available on request for eligible healthcare-adjacent reviews"
      ],
      offers: { "@type": "AggregateOffer", priceCurrency: "USD", offerCount: 3 },
      provider: { "@id": "https://scrutexity.com/#organization" },
      knowsAbout: [
        "Claim Intelligence",
        "Advertising Claim Substantiation",
        "AI Answer Visibility",
        "Agent Guardrail Audits",
        "Marketing Compliance Workflows",
        "Proof-Backed Content"
      ],
      softwareRequirements: "Web browser"
    },
    {
      "@type": "Organization",
      "@id": "https://scrutexity.com/#organization",
      name: "Scrutexity",
      url: "https://scrutexity.com",
      logo: "https://scrutexity.com/logo-icon.png",
      description: "Claim intelligence company behind AuditGPT and Contento.",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
      knowsAbout: [
        "Claim Intelligence",
        "Advertising Claim Substantiation",
        "AI Answer Reality",
        "Agent Guardrail Audits",
        "Proof-Backed Content"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://scrutexity.com/#webpage",
      url: "https://scrutexity.com",
      name: "Scrutexity | The Claim Intelligence Platform",
      isPartOf: { "@id": "https://scrutexity.com/#website" },
      about: { "@id": "https://scrutexity.com/#application" },
      description: "Scrutexity runs claim audits, AI answer reality reviews, and proof-backed remediation workflows for businesses where public claims need evidence."
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
      </head>
      <body
        className={`${instrumentSerif.variable} ${geistSans.variable} ${jetBrainsMono.variable} font-sans tracking-tight bg-cream text-bark antialiased overflow-x-hidden selection:bg-sage/20 selection:text-espresso`}
      >
        <SmoothScrollProvider>
          <SiteNav />
          <main className="pt-nav-offset">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-XGF7WH36MG" />
      </body>
    </html>
  );
}
