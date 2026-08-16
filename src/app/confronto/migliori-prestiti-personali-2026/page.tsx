import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import MiglioriPrestitiPersonali2026Client from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Migliori Prestiti Personali 2026: Confronto | Monivia',
  description: 'Confronto dei migliori prestiti personali del 2026. TAN, TAEG, condizioni e recensioni a confronto.',
  path: '/confronto/migliori-prestiti-personali-2026',
  keywords: ['miglior prestito personale 2026', 'confronto prestiti personali', 'prestito personale migliore'],
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
});

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Migliori Prestiti Personali 2026: Confronto',
  description: 'Confronto dei migliori prestiti personali del 2026. TAN, TAEG, condizioni e recensioni a confronto.',
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
  url: 'https://www.monivia.it/confronto/migliori-prestiti-personali-2026',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
  datePublished: '2026-01-15',
  dateModified: '2026-08-15',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Confronto', item: 'https://www.monivia.it/confronto' },
    { '@type': 'ListItem', position: 3, name: 'Migliori Prestiti Personali 2026', item: 'https://www.monivia.it/confronto/migliori-prestiti-personali-2026' },
  ],
};

export default function MiglioriPrestitiPersonali2026Page() {
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
            name: 'Confronto Migliori Prestiti Personali 2026',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Monivia — Prestito Personale' },
              { '@type': 'ListItem', position: 2, name: 'Banca Tradizionale A' },
              { '@type': 'ListItem', position: 3, name: 'Fintech B' },
            ],
          }),
        }}
      />
      <MiglioriPrestitiPersonali2026Client />
    </>
  );
}
