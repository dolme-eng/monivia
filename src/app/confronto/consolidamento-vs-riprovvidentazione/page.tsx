import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import ConsolidamentoVsRiprovvidentazioneClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Consolidamento Debiti vs Riprovvidentazione | Monivia',
  description: 'Consolidamento debiti o riprovvidentazione? Scopri le differenze, i costi e quale soluzione è più adatta a te.',
  path: '/confronto/consolidamento-vs-riprovvidentazione',
  keywords: ['consolidamento o riprovvidentazione', 'differenze consolidamento', 'unire prestiti'],
  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
});

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Consolidamento Debiti vs Riprovvidentazione',
  description: 'Consolidamento debiti o riprovvidentazione? Scopri le differenze, i costi e quale soluzione è più adatta a te.',
  author: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Monivia',
    url: 'https://www.monivia.it',
  },
  url: 'https://www.monivia.it/confronto/consolidamento-vs-riprovvidentazione',
  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
  datePublished: '2026-01-15',
  dateModified: '2026-08-15',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Confronto', item: 'https://www.monivia.it/confronto' },
    { '@type': 'ListItem', position: 3, name: 'Consolidamento vs Riprovvidentazione', item: 'https://www.monivia.it/confronto/consolidamento-vs-riprovvidentazione' },
  ],
};

export default function ConsolidamentoVsRiprovvidentazionePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ConsolidamentoVsRiprovvidentazioneClient />
    </>
  );
}
