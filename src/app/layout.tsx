import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Finora | Il tuo prestito online, diretto e sicuro",
    description: "Richiedi il tuo prestito online da 5.000€ a più di 500.000€ con Finora. Tasso fisso al 2%, processo 100% digitale e risposta in 48 ore.",
    keywords: "prestiti personali, prestito online, finanziamento veloce, tasso fisso, prestiti oltre 500000 euro, credito italia",
    openGraph: {
      title: "Finora | Prestiti Online Veloci",
      description: "Finanziamenti a più di 500.000€ con tasso fisso al 2%. Richiedi ora online.",
      locale: "it_IT",
      type: "website",
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
    "name": "Finora",
    "url": "https://finora.it",
    "logo": "https://finora.it/logo.svg",
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
      <body className={`${inter.variable} antialiased relative`}>
        {children}
        <CookieBanner />
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/393508533366" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 flex items-center justify-center group"
          aria-label="Contattaci su WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.383-.043c.108-.116.477-.549.607-.737.128-.188.256-.159.419-.101l1.048.491c.173.087.289.13.332.202.043.073.043.423-.101.827z"></path><path d="M11.994 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.238c-1.554 0-3.04-.407-4.364-1.157l-4.52 1.189 1.211-4.41A8.223 8.223 0 0 1 3.766 11.99a8.233 8.233 0 1 1 8.228 8.248z"></path></svg>
          <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chatta con noi
          </span>
        </a>
      </body>
    </html>
  );
}
