import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoPensionatiClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestito per Pensionati | Monivia',
  description: 'Prestito pensionati over 60. Condizioni speciali, tasso fisso, rimborso flessibile.',
  path: '/prestito-pensionati',
  keywords: ['prestito pensionati', 'prestito over 60', 'finanziamento pensionati'],
  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qual è l\'età massima per richiedere un prestito pensionati?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'È possibile richiedere il prestito fino a 85 anni di età, con rimborso che termina entro i 90 anni.',
      },
    },
    {
      '@type': 'Question',
      name: 'Serve la certificazione pensionistica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, serve l\'ultima certificazione della pensione (modello O1 o certificato INPS) e un estratto conto degli ultimi 3 mesi.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è l\'importo massimo ottenibile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'importo dipende dall\'ammontare della pensione e dalla durata del prestito. In generale è possibile ottenere fino a 5 volte la pensione mensile netta.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è la durata massima del prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La durata massima è di 120 mesi (10 anni), compatibilmente con l\'età del richiedente. La rata è fissa e rimane invariata.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso includere un coobbligato nella richiesta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, è possibile inserire un coobbligato (coniuge o familiare) per aumentare la possibilità di approvazione e l\'importo erogabile.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestito Pensionati', item: 'https://www.monivia.it/prestito-pensionati' },
  ],
};

const loanJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LoanOrCredit',
  name: 'Prestito per Pensionati Monivia',
  description: 'Prestito pensionati over 60 con condizioni speciali, tasso fisso e rimborso flessibile.',
  provider: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  url: 'https://www.monivia.it/prestito-pensionati',
  interestRate: {
    '@type': 'QuantitativeValue',
    value: 2.5,
    unitText: 'TAN %',
  },
};

export default function PrestitoPensionatiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loanJsonLd) }} />
      <PrestitoPensionatiClient />
    </>
  );
}
