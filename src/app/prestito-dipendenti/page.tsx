import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoDipendentiClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestito per Dipendenti | Monivia',
  description: 'Prestito personale per dipendenti pubblici e privati. Tasso fisso, rate fisse, approvazione rapida.',
  path: '/prestito-dipendenti',
  keywords: ['prestito dipendenti', 'prestito dipendenti pubblici', 'finanziamento stipendio'],
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Chi può richiedere un prestito per dipendenti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Possono richiederlo tutti i dipendenti a tempo indeterminato, pubblici e privati, con almeno 6 mesi di anzianità aziendale.',
      },
    },
    {
      '@type': 'Question',
      name: 'Serve una busta paga per richiedere il prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, serve l\'ultima busta paga e un estratto conto degli ultimi 3 mesi per dimostrare la stabilità del reddito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è l\'importo massimo ottenibile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'importo massimo dipende dal tuo reddito e dalla durata del prestito. In generale è possibile ottenere fino a 7 volte lo stipendio mensile netto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è la durata massima del prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La durata massima è di 120 mesi (10 anni). La rata mensile è fissa e non cambia per tutta la durata del prestito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Serve un garante per il prestito dipendenti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, il prestito per dipendenti non richiede garanti né ipoteche. La garanzia principale è la trattenuta in busta paga (cessione del quinto) oppure la valutazione del merito creditizio.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestito Dipendenti', item: 'https://www.monivia.it/prestito-dipendenti' },
  ],
};

const loanJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LoanOrCredit',
  name: 'Prestito per Dipendenti Monivia',
  description: 'Prestito personale per dipendenti pubblici e privati con tasso fisso e rate fisse.',
  provider: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  url: 'https://www.monivia.it/prestito-dipendenti',
  interestRate: {
    '@type': 'QuantitativeValue',
    value: 2,
    unitText: 'TAN %',
  },
};

export default function PrestitoDipendentiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loanJsonLd) }} />
      <PrestitoDipendentiClient />
    </>
  );
}
