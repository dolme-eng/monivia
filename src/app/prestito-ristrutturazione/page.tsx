import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoRistrutturazioneClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestito Ristrutturazione Casa | Monivia',
  description: 'Prestito per ristrutturazione casa. Finanzia i lavori con un tasso fisso e rate fisse.',
  path: '/prestito-ristrutturazione',
  keywords: ['prestito ristrutturazione', 'finanziamento ristrutturazione casa', 'prestito lavori'],
  image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Posso usare il prestito per ristrutturare casa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, il prestito può essere utilizzato per qualsiasi tipo di ristrutturazione: bagno, cucina, impianti, infissi, tetto e molto altro.',
      },
    },
    {
      '@type': 'Question',
      name: 'Serve un preventivo dei lavori?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Consigliamo di allegare i preventivi dei lavori per ottenere condizioni migliori, ma non è strettamente obbligatorio per la richiesta.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto posso ottenere per la ristrutturazione?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "È possibile ottenere importi fino a 200.000€, in base al valore dei lavori e alla tua capacità di rimborso.",
      },
    },
    {
      '@type': 'Question',
      name: 'La rata del prestito è fissa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, la rata è fissa e non cambia per tutta la durata del prestito. Puoi scegliere la durata più adatta alle tue esigenze.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso includere anche i mobili nel prestito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, puoi includere nell\'importo richiesto anche l\'arredamento e i mobili collegati alla ristrutturazione.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestito Ristrutturazione', item: 'https://www.monivia.it/prestito-ristrutturazione' },
  ],
};

const loanJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LoanOrCredit',
  name: 'Prestito Ristrutturazione Monivia',
  description: 'Prestito per ristrutturazione casa con tasso fisso, rate fisse e importi fino a 200.000€.',
  provider: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  url: 'https://www.monivia.it/prestito-ristrutturazione',
  interestRate: {
    '@type': 'QuantitativeValue',
    value: 2.5,
    unitText: 'TAN %',
  },
};

export default function PrestitoRistrutturazionePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loanJsonLd) }} />
      <PrestitoRistrutturazioneClient />
    </>
  );
}
