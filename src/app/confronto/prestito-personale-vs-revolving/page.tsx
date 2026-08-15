import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoPersonaleVsRevolvingClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestito Personale vs Revolving: Quali Differenze? | Monivia',
  description: 'Prestito personale o revolving? Confronto completo su tasso, costi, durata e migliori utilizzi.',
  path: '/confronto/prestito-personale-vs-revolving',
  keywords: ['prestito personale o revolving', 'differenze prestito revolving', 'quale prestito scegliere'],
  image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
});

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Prestito Personale vs Revolving: Quali Differenze?',
  description: 'Prestito personale o revolving? Confronto completo su tasso, costi, durata e migliori utilizzi.',
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
  url: 'https://www.monivia.it/confronto/prestito-personale-vs-revolving',
  image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
  datePublished: '2026-01-15',
  dateModified: '2026-08-15',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Confronto', item: 'https://www.monivia.it/confronto' },
    { '@type': 'ListItem', position: 3, name: 'Prestito Personale vs Revolving', item: 'https://www.monivia.it/confronto/prestito-personale-vs-revolving' },
  ],
};

export default function PrestitoPersonaleVsRevolvingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PrestitoPersonaleVsRevolvingClient />
    </>
  );
}
