import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import SkipToContent from "@/components/SkipToContent";
import { siteConfig } from "@/config/site";
import { Inter } from "next/font/google";
import GoogleAnalyticsWrapper from "@/components/GoogleAnalyticsWrapper";
import { headers } from "next/headers";

const ExitIntentModal = dynamic(() => import("@/components/ExitIntentModal"), { ssr: false });
const StickyConversionBar = dynamic(() => import("@/components/StickyConversionBar"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'it': siteConfig.url,
    },
  },
  keywords: [
    'prestiti personali',
    'prestito online',
    'finanziamento veloce',
    'tasso fisso',
    'credito italia',
    'Monivia',
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: 'it_IT',
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-default.webp',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-default.webp'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: 'Prestiti online chiari, veloci e sicuri, con assistenza dedicata e risposta in 48 ore.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Savona, 15',
      addressLocality: 'Milano',
      postalCode: '20144',
      addressCountry: 'IT',
    },
    telephone: siteConfig.contact.phone.link,
    email: siteConfig.contact.email,
    priceRange: '€€',
    areaServed: 'IT',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: siteConfig.contact.phone.link,
        email: siteConfig.contact.email,
        availableLanguage: ['it'],
      },
    ],
  };

  return (
    <html lang="it" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased relative`}>
        <SkipToContent />
        <div id="site-content" tabIndex={-1}>
          {children}
        </div>
        <CookieBanner />
        <StickyConversionBar />
        <WhatsAppButton />
        <BackToTop />
        <ExitIntentModal />
        <GoogleAnalyticsWrapper gaId={process.env.NEXT_PUBLIC_GA_ID || ""} nonce={nonce} />
      </body>
    </html>
  );
}
