import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Scrutexity | Evidence-Grounded Claim Review",
  description: "Scrutexity reviews public claims and customer-facing AI outputs against visible evidence, then returns precise findings and prioritized next actions.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  verification: {
    google: "9xUsbtOiH3M_YGMX2Z3bRwAl45Tcs2rtwGTrzYh6mmc",
  },
  openGraph: {
    title: "Scrutexity | Evidence-Grounded Claim Review",
    description: "Review public claims and customer-facing AI outputs against evidence buyers can inspect.",
    url: siteUrl,
    siteName: "Scrutexity",
    images: [{ url: "/api/og?title=Evidence-Grounded%20Claim%20and%20AI%20Output%20Audits&type=Scrutexity", width: 1200, height: 630, alt: "Scrutexity evidence-grounded business review" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrutexity | Evidence-Grounded Claim Review",
    description: "Review public claims and customer-facing AI outputs against evidence buyers can inspect.",
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
      description: "Evidence-grounded review of public claims and customer-facing AI outputs.",
      email: "nick@scrutexity.com",
      address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
      knowsAbout: [
        "Claim Support Review",
        "AI Answer Capture",
        "Visible Evidence Review",
        "Source Record Comparison"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.scrutexity.com/#service",
      name: "Scrutexity Claim Review",
      serviceType: "Evidence-grounded claim and AI output review",
      provider: { "@id": "https://www.scrutexity.com/#organization" },
      areaServed: "US",
      description: "Defined reviews that compare public claims or supplied customer-facing AI outputs with visible evidence and document prioritized next actions.",
      offers: {
        "@type": "OfferCatalog",
        name: "Scrutexity public offers",
        itemListElement: [
          { "@type": "Offer", name: "Claim Support Review", price: "99", priceCurrency: "USD" },
          { "@type": "Offer", name: "Founder’s Audit", price: "750", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", minPrice: "750", priceCurrency: "USD" } },
          { "@type": "Offer", name: "Agency Claim QA", price: "1500", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", minPrice: "1500", priceCurrency: "USD" } },
          { "@type": "Offer", name: "Agent Evidence Pack", price: "2500", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", minPrice: "2500", priceCurrency: "USD" } }
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
        className={`${instrumentSerif.variable} ${geistSans.variable} ${jetBrainsMono.variable} font-sans bg-cream text-bark antialiased overflow-x-hidden selection:bg-sage/20 selection:text-espresso`}
      >
        <div className="fixed left-3 top-3 z-[100] flex -translate-y-24 gap-2 focus-within:translate-y-0">
          <Link href="#main-content" className="bg-white px-4 py-2 text-sm font-semibold text-espresso shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep">
            Skip to main content
          </Link>
          <Link href="/#sample-report" className="bg-white px-4 py-2 text-sm font-semibold text-espresso shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep">
            Skip to sample report
          </Link>
        </div>
        <SmoothScrollProvider>
          <SiteNav />
          <main id="main-content" className="pt-nav-offset">
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
