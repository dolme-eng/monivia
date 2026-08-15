import type { Metadata } from 'next';
import { faqItems } from '@/config/faq';
import FaqClient from './client';

export const metadata: Metadata = {
  title: 'Domande frequenti | Monivia',
  description:
    'FAQ prestiti Monivia: requisiti, tempi di erogazione, costi, rimborsi anticipati e supporto clienti. Risposte immediate.',
  alternates: { canonical: 'https://www.monivia.it/faq' },
  openGraph: {
    title: 'Domande frequenti | Monivia',
    description: 'Risposte alle domande più comuni sui prestiti Monivia.',
    url: 'https://www.monivia.it/faq',
    siteName: 'Monivia',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.monivia.it/faq' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <FaqClient />
    </>
  );
}
