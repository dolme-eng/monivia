import { faqItems } from '@/config/faq';
import FaqClient from './client';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Domande frequenti | Monivia',
  description:
    'FAQ prestiti Monivia: requisiti, tempi di erogazione, costi, rimborsi anticipati e supporto clienti. Risposte immediate.',
  path: '/faq',
  keywords: ['FAQ prestiti', 'domande frequenti', 'requisiti prestito', 'costi prestito'],
});

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
