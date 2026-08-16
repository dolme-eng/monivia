import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitoOnlineVsBancaClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestito Online vs Banca: Quali Differenze? | Monivia',
  description: 'Confronto completo tra prestito online e prestito in banca. Tasso, tempi, costi e comodità a confronto.',
  path: '/confronto/prestito-online-vs-banca',
  keywords: ['prestito online o banca', 'confronto prestiti', 'quale prestito scegliere'],
  image: 'https://images.unsplash.com/photo-1556742049-6726b3ff858f?w=1200',
});

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Prestito Online vs Banca: Quali Differenze?',
  description: 'Confronto completo tra prestito online e prestito in banca. Tasso, tempi, costi e comodità a confronto.',
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
  url: 'https://www.monivia.it/confronto/prestito-online-vs-banca',
  image: 'https://images.unsplash.com/photo-1556742049-6726b3ff858f?w=1200',
  datePublished: '2026-01-15',
  dateModified: '2026-08-15',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Confronto', item: 'https://www.monivia.it/confronto' },
    { '@type': 'ListItem', position: 3, name: 'Prestito Online vs Banca', item: 'https://www.monivia.it/confronto/prestito-online-vs-banca' },
  ],
};

export default function PrestitoOnlineVsBancaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Confronto Prestito Online vs Banca',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Prestito Online Monivia' },
              { '@type': 'ListItem', position: 2, name: 'Prestito in Banca Tradizionale' },
            ],
          }),
        }}
      />
      <PrestitoOnlineVsBancaClient />
    </>
  );
}
