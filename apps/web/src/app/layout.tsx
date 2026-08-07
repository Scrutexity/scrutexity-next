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
  title: "Scrutexity | Buyer Narrative Alignment Sprint",
  description: "A $1,500 founder-reviewed analysis of what your company claims, what buyers can verify, where the story breaks, and what to change.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  verification: {
    google: "9xUsbtOiH3M_YGMX2Z3bRwAl45Tcs2rtwGTrzYh6mmc",
  },
  openGraph: {
    title: "Scrutexity | Buyer Narrative Alignment Sprint",
    description: "A $1,500 founder-reviewed analysis of claims, visible support, and buyer-narrative gaps.",
    url: siteUrl,
    siteName: "Scrutexity",
    images: [{ url: "/api/og?title=Buyer%20Narrative%20Alignment%20Sprint&type=Scrutexity", width: 1200, height: 630, alt: "Scrutexity Buyer Narrative Alignment Sprint" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrutexity | Buyer Narrative Alignment Sprint",
    description: "A $1,500 founder-reviewed analysis of claims, visible support, and buyer-narrative gaps.",
    images: ["/api/og?title=Buyer%20Narrative%20Alignment%20Sprint&type=Scrutexity"],
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
        "Buyer Narrative Alignment Sprint",
        "AI Answer Capture",
        "Visible Evidence Review",
        "Source Record Comparison"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.scrutexity.com/#service",
      name: "Buyer Narrative Alignment Sprint",
      serviceType: "Evidence-grounded buyer narrative review",
      provider: { "@id": "https://www.scrutexity.com/#organization" },
      areaServed: "US",
      description: "A founder-reviewed analysis of what a company claims, what buyers can verify, where the story breaks, and what to change before the next sales conversation.",
      offers: {
        "@type": "Offer",
        name: "Buyer Narrative Alignment Sprint",
        price: "1500",
        priceCurrency: "USD",
        url: "https://www.scrutexity.com/pricing",
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
