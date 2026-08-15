import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoCessioneQuintoClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cessione del Quinto | Monivia',
  description: 'Cessione del quinto dello stipendio o della pensione. Rata trattenuta in busta paga, nessuna garanzia extra.',
  path: '/prestito-cessione-quinto',
  keywords: ['cessione del quinto', 'prestito cessione quinto', 'quinto stipendio'],
  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Cos'è la cessione del quinto?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La cessione del quinto è un prestito che prevede la trattenuta di massimo il 20% dello stipendio o della pensione in busta paga. La rata viene detratta automaticamente.",
      },
    },
    {
      '@type': 'Question',
      name: 'Chi può richiedere la cessione del quinto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Possono richiederla tutti i dipendenti a tempo indeterminato e i pensionati, con almeno 6 mesi di servizio o di pensionamento.',
      },
    },
    {
      '@type': 'Question',
      name: "Qual è l'importo massimo della trattenuta?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La trattenuta non può superare il 20% dello stipendio o della pensione netta. Questo garantisce che la rata sia sostenibile.",
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è la durata massima del prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La durata massima è di 120 mesi (10 anni). La rata è fissa e rimane invariata per tutta la durata del prestito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Serve una garanzia per la cessione del quinto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, la cessione del quinto non richiede garanzie aggiuntive. La trattenuta in busta paga funge già da garanzia per la banca.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Cessione del Quinto', item: 'https://www.monivia.it/prestito-cessione-quinto' },
  ],
};

const loanJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LoanOrCredit',
  name: 'Cessione del Quinto Monivia',
  description: 'Cessione del quinto dello stipendio o della pensione con rata trattenuta in busta paga.',
  provider: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  url: 'https://www.monivia.it/prestito-cessione-quinto',
  interestRate: {
    '@type': 'QuantitativeValue',
    value: 2.3,
    unitText: 'TAN %',
  },
};

export default function PrestitoCessioneQuintoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loanJsonLd) }} />
      <PrestitoCessioneQuintoClient />
    </>
  );
}
