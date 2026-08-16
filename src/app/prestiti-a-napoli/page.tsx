import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitiANapoliClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestiti a Napoli | Monivia',
  description: 'Richiedi un prestito a Napoli con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  path: '/prestiti-a-napoli',
  keywords: ['prestito Napoli', 'finanziamento Napoli', 'prestito online Napoli'],
  image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1200',
});

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Monivia - Prestiti a Napoli',
  description: 'Richiedi un prestito a Napoli con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  url: 'https://www.monivia.it/prestiti-a-napoli',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Savona, 15',
    addressLocality: 'Milano',
    postalCode: '20144',
    addressRegion: 'MI',
    addressCountry: 'IT',
  },
  areaServed: {
    '@type': 'City',
    name: 'Napoli',
  },
  telephone: '+393508533366',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestiti a Napoli', item: 'https://www.monivia.it/prestiti-a-napoli' },
  ],
};

export default function PrestitiANapoliPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PrestitiANapoliClient />
    </>
  );
}
