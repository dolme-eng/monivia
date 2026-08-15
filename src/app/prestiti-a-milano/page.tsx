import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import PrestitiAMilanoClient from './client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Prestiti a Milano | Monivia',
  description: 'Richiedi un prestito a Milano con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  path: '/prestiti-a-milano',
  keywords: ['prestito Milano', 'finanziamento Milano', 'prestito online Milano'],
  image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200',
});

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Monivia - Prestiti a Milano',
  description: 'Richiedi un prestito a Milano con Monivia. Tasso fisso, risposta in 48 ore, assistenza dedicata nella tua città.',
  url: 'https://www.monivia.it/prestiti-a-milano',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Savona, 15',
    addressLocality: 'Milano',
    postalCode: '20144',
    addressCountry: 'IT',
  },
  areaServed: {
    '@type': 'City',
    name: 'Milano',
  },
  telephone: '+393508533366',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
    { '@type': 'ListItem', position: 2, name: 'Prestiti a Milano', item: 'https://www.monivia.it/prestiti-a-milano' },
  ],
};

export default function PrestitiAMilanoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PrestitiAMilanoClient />
    </>
  );
}
