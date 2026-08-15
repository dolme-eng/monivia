import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitiATorinoClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestiti a Torino | Monivia',
  description: 'Richiedi un prestito a Torino con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  path: '/prestiti-a-torino',
  keywords: ['prestito Torino', 'finanziamento Torino', 'prestito online Torino'],
  image: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?w=1200',
});

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Monivia - Prestiti a Torino',
  description: 'Richiedi un prestito a Torino con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  url: 'https://www.monivia.it/prestiti-a-torino',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Savona, 15',
    addressLocality: 'Torino',
    postalCode: '10100',
    addressCountry: 'IT',
  },
  areaServed: {
    '@type': 'City',
    name: 'Torino',
  },
  telephone: '+393508533366',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestiti a Torino', item: 'https://www.monivia.it/prestiti-a-torino' },
  ],
};

export default function PrestitiATorinoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PrestitiATorinoClient />
    </>
  );
}
