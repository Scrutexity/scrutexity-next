import type { Metadata } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import Footer from "@/components/sections/footer";
import { MobileStickyCTA } from "@/components/scrutexity/mobile-sticky-cta";

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
  title: "Scrutexity | Evidence-Grounded Claim and AI Output Audits",
  description: "Scrutexity reviews public business claims and customer-facing AI outputs, maps them to visible evidence, and prioritizes what to fix first. Powered by AuditGPT.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  verification: {
    google: "9xUsbtOiH3M_YGMX2Z3bRwAl45Tcs2rtwGTrzYh6mmc",
  },
  openGraph: {
    title: "Scrutexity | Evidence-Grounded Claim and AI Output Audits",
    description: "Evidence-grounded audits for the claims and AI outputs your buyers rely on. Powered by AuditGPT.",
    url: siteUrl,
    siteName: "Scrutexity",
    images: [{ url: "/api/og?title=Evidence-Grounded%20Claim%20and%20AI%20Output%20Audits&type=Scrutexity", width: 1200, height: 630, alt: "Scrutexity evidence-grounded business review" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrutexity | Evidence-Grounded Claim and AI Output Audits",
    description: "Evidence-grounded audits for the claims and AI outputs your buyers rely on. Powered by AuditGPT.",
    images: ["/api/og?title=Evidence-Grounded%20Claim%20and%20AI%20Output%20Audits&type=Scrutexity"],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.scrutexity.com/#organization",
      name: "Scrutexity",
      url: "https://www.scrutexity.com",
      logo: "https://www.scrutexity.com/logo-icon.png",
      description: "Evidence-grounded business review for public claims and customer-facing AI outputs. Powered by AuditGPT.",
      email: "nick@scrutexity.com",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
      knowsAbout: [
        "Public Claim Review",
        "Visible Evidence Review",
        "Customer-Facing AI Output Review",
        "Agency Claim Quality Assurance"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.scrutexity.com/#service",
      name: "Scrutexity Evidence-Grounded Business Review",
      serviceType: "Business claim and customer-facing AI output review",
      provider: { "@id": "https://www.scrutexity.com/#organization" },
      areaServed: "US",
      description: "Review of public business claims and supplied customer-facing AI outputs against visible evidence, with prioritized findings and safer framing drafts.",
      offers: {
        "@type": "OfferCatalog",
        name: "Scrutexity review services",
        itemListElement: [
          { "@type": "Offer", name: "Claim Support Review", price: "99", priceCurrency: "USD" },
          { "@type": "Offer", name: "Founder’s Audit", price: "750", priceCurrency: "USD" },
          { "@type": "Offer", name: "Agency Claim QA Pilot", price: "1500", priceCurrency: "USD" },
          { "@type": "Offer", name: "Agent Evidence Pack", price: "2500", priceCurrency: "USD" }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.scrutexity.com/#website",
      url: "https://www.scrutexity.com",
      name: "Scrutexity",
      publisher: { "@id": "https://www.scrutexity.com/#organization" }
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
        <MobileStickyCTA />
        <Analytics />
        <GoogleAnalytics gaId="G-XGF7WH36MG" />
      </body>
    </html>
  );
}
