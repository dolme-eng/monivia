import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import SkipToContent from "@/components/SkipToContent";
import StickyConversionBar from "@/components/StickyConversionBar";
import { siteConfig } from "@/config/site";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'prestiti personali',
    'prestito online',
    'finanziamento veloce',
    'tasso fisso',
    'credito italia',
    'Monivia',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: 'it_IT',
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/logo.svg',
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
    images: ['/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: 'Prestiti online chiari, veloci e sicuri, con assistenza dedicata e risposta in 48 ore.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Dante, 10',
      addressLocality: 'Milano',
      postalCode: '20121',
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
        <link rel="icon" href="/icon" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" />
        <link rel="canonical" href={siteConfig.url} />
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
      </body>
    </html>
  );
}
