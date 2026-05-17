import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const siteUrl = "https://tekup.dk";

export const metadata: Metadata = {
  title: {
    default: "Tekup Digital — AI-agenter, websites & chatbots til danske SMV'er",
    template: "%s — Tekup Digital",
  },
  description:
    "Tekup Digital hjælper danske SMV'er med AI-drevne agenter, moderne hjemmesider og smarte chatbots. Fra support-bots til salgs-automation — få mere gjort for færre penge.",
  keywords: [
    "AI agent", "chatbot", "hjemmeside", "webbureau", "Aarhus",
    "SMV", "digital transformation", "AI support", "salgsautomatik",
    "SEO", "webudvikling", "dansk webbureau",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "Tekup Digital",
    title: "Tekup Digital — AI-agenter, websites & chatbots",
    description:
      "Få mere gjort for færre penge. AI-drevne agenter, moderne hjemmesider og smarte chatbots til danske SMV'er.",
    url: siteUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tekup Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tekup Digital — AI til SMV'er",
    description: "AI-agenter, websites & chatbots til danske virksomheder.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Tekup Digital",
              description:
                "AI-drevne agenter, moderne hjemmesider og smarte chatbots til danske SMV'er.",
              url: siteUrl,
              email: "hej@tekup.dk",
              telephone: "+45 91 72 55 99",
              address: {
                "@type": "PostalAddress",
                addressCountry: "DK",
                addressLocality: "Aarhus C",
                streetAddress: "M.P. Bruuns Gade 36",
                postalCode: "8000",
              },
              foundingDate: "2026",
              knowsAbout: [
                "Artificial Intelligence",
                "Web Development",
                "Chatbot Development",
                "Search Engine Optimization",
                "Digital Strategy",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tekup Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Support Agent",
                      description: "24/7 kundeservice chatbot med AI",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Sales Agent",
                      description: "Automatiseret lead-generering og salg",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Website Starter",
                      description: "Moderne 1-side hjemmeside",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Website Pro",
                      description: "Fuld 5-sides hjemmeside med blog",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
