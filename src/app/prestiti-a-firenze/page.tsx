import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitiAFirenzeClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestiti a Firenze | Monivia',
  description: 'Richiedi un prestito a Firenze con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  path: '/prestiti-a-firenze',
  keywords: ['prestito Firenze', 'finanziamento Firenze', 'prestito online Firenze'],
  image: 'https://images.unsplash.com/photo-1543429776-2782f8f3e2b4?w=1200',
});

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Monivia - Prestiti a Firenze',
  description: 'Richiedi un prestito a Firenze con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  url: 'https://www.monivia.it/prestiti-a-firenze',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Savona, 15',
    addressLocality: 'Firenze',
    postalCode: '50100',
    addressCountry: 'IT',
  },
  areaServed: {
    '@type': 'City',
    name: 'Firenze',
  },
  telephone: '+393508533366',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestiti a Firenze', item: 'https://www.monivia.it/prestiti-a-firenze' },
  ],
};

export default function PrestitiAFirenzePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PrestitiAFirenzeClient />
    </>
  );
}
