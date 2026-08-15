import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoMotoClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestito Moto | Monivia',
  description: 'Prestito per acquisto moto o scooter. Tasso fisso dal 1,8%, erogazione rapida.',
  path: '/prestito-moto',
  keywords: ['prestito moto', 'finanziamento moto', 'prestito scooter'],
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Posso acquistare una moto usata con il prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, il prestito può essere utilizzato per acquistare sia moto nuove che usate, da concessionari o da privati.',
      },
    },
    {
      '@type': 'Question',
      name: 'Serve una polizza assicurativa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non è obbligatoria, ma consigliamo di sottoscrivere un'assicurazione RC per la tua tutela e quella degli altri.",
      },
    },
    {
      '@type': 'Question',
      name: "Qual è l'importo massimo ottenibile?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'importo massimo è di 25.000€, sufficiente per acquistare la maggior parte delle moto e scooter nuovi.",
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è la durata massima del prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La durata massima è di 84 mesi (7 anni). La rata è fissa e rimane invariata per tutta la durata.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso estinguere anticipatamente il prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, puoi estinguere il prestito in qualsiasi momento con una penale ridotta, come previsto dalla normativa italiana.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestito Moto', item: 'https://www.monivia.it/prestito-moto' },
  ],
};

const loanJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LoanOrCredit',
  name: 'Prestito Moto Monivia',
  description: 'Prestito per acquisto moto o scooter con tasso fisso dal 1,8%.',
  provider: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  url: 'https://www.monivia.it/prestito-moto',
  interestRate: {
    '@type': 'QuantitativeValue',
    value: 1.8,
    unitText: 'TAN %',
  },
};

export default function PrestitoMotoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loanJsonLd) }} />
      <PrestitoMotoClient />
    </>
  );
}
