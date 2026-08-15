import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitiARomaClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestiti a Roma | Monivia',
  description: 'Richiedi un prestito a Roma con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  path: '/prestiti-a-roma',
  keywords: ['prestito Roma', 'finanziamento Roma', 'prestito online Roma'],
  image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200',
});

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Monivia - Prestiti a Roma',
  description: 'Richiedi un prestito a Roma con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  url: 'https://www.monivia.it/prestiti-a-roma',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Savona, 15',
    addressLocality: 'Roma',
    postalCode: '00100',
    addressCountry: 'IT',
  },
  areaServed: {
    '@type': 'City',
    name: 'Roma',
  },
  telephone: '+393508533366',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestiti a Roma', item: 'https://www.monivia.it/prestiti-a-roma' },
  ],
};

export default function PrestitiARomaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PrestitiARomaClient />
    </>
  );
}
