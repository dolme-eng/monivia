import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoOnlineClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestito Online Immediate | Monivia',
  description: 'Richiedi un prestito online in 5 minuti. Risposta entro 48 ore, tasso fisso dal 2%, nessuna spesa nascosta.',
  path: '/prestito-online',
  keywords: ['prestito online', 'prestito immediato', 'richiedere prestito online'],
  image: 'https://images.unsplash.com/photo-1556742049-6726b3ff858f?w=1200',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Come funziona il prestito online Monivia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compila il modulo online in 5 minuti, ricevi l\'esito entro 48 ore e firma digitalmente il contratto. I fondi vengono erogati sul tuo conto entro pochi giorni.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quali documenti servono per richiedere un prestito online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Servono un documento d\'identità valido, il Codice Fiscale, l\'ultimo reddito documentato e l\'IBAN del tuo conto corrente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo ci vuole per ricevere i fondi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dall\'invio della richiesta alla ricezione dei fondi passano in media 5-7 giorni lavorativi. L\'esito della valutazione arriva entro 48 ore.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto costa un prestito online Monivia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il tasso fisso parte dal 2% TAN. Non ci sono spese nascoste: il costo totale del prestito è indicato chiaramente nel modulo di informazione pre-contrattuale.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso annullare la richiesta di prestito online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, puoi rinunciare al prestito entro 14 giorni dalla firma del contratto senza alcun costo, come previsto dalla normativa europea.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestito Online', item: 'https://www.monivia.it/prestito-online' },
  ],
};

const loanJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LoanOrCredit',
  name: 'Prestito Online Monivia',
  description: 'Prestito online immediato con tasso fisso dal 2%, erogazione rapida e processo 100% digitale.',
  provider: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  url: 'https://www.monivia.it/prestito-online',
  interestRate: {
    '@type': 'QuantitativeValue',
    value: 2,
    unitText: 'TAN %',
  },
};

export default function PrestitoOnlinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loanJsonLd) }} />
      <PrestitoOnlineClient />
    </>
  );
}
