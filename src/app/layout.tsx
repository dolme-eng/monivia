import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: `${siteConfig.name} | ${siteConfig.description}`,
    description: "Richiedi il tuo prestito online da 5.000€ a più di 500.000€ con Monivia. Tasso fisso al 2%, processo 100% digitale e risposta in 48 ore.",
    keywords: "prestiti personali, prestito online, finanziamento veloce, tasso fisso, prestiti oltre 500000 euro, credito italia",
    openGraph: {
      title: `${siteConfig.name} | Prestiti Online Veloci`,
      description: "Finanziamenti a più di 500.000€ con tasso fisso al 2%. Richiedi ora online.",
      locale: "it_IT",
      type: "website",
      url: siteConfig.url,
    },
   icons: {
     icon: "/favicon.svg",
   },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.svg`,
    "description": "Prestiti online veloci e sicuri. Da 5.000€ a più di 500.000€ con tasso fisso al 2%.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Dante, 10",
      "addressLocality": "Milano",
      "postalCode": "20121",
      "addressCountry": "IT"
    },
    "priceRange": "€€",
    "feesAndCommissionsSpecification": "Tasso Annuo Nominale (TAN) fisso 2%. TAEG variabile in base all'assicurazione.",
    "areaServed": "IT",
        "offers": {
          "@type": "Offer",
          "name": "Prestito Personale Online",
          "price": "2",
          "priceCurrency": "Percentage"
        }
  };

  return (
    <html lang="it" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased relative`}>
        {children}
        <CookieBanner />
        <WhatsAppButton />
      </body>
    </html>
  );
}
