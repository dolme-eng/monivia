import { buildPageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import ChiSiamoClient from './client';

export const metadata = buildPageMetadata({
  title: 'Chi siamo | Monivia — La nostra storia e missione',
  description: 'Monivia: istituto finanziario italiano, 38.000+ pratiche finanziate, processo 100% digitale. Scopri la nostra missione.',
  path: '/chi-siamo',
  keywords: ['chi siamo Monivia', 'storia Monivia', 'istituto finanziario italiano'],
});

export default function ChiSiamo() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Chi siamo', item: 'https://www.monivia.it/chi-siamo' },
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: 'Istituto finanziario italiano specializzato in prestiti online, fondato nel 2014 a Milano.',
    foundingDate: '2014',
    foundingLocation: {
      '@type': 'City',
      name: 'Milano',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Milano',
        addressRegion: 'MI',
        addressCountry: 'IT',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Savona, 15',
      addressLocality: 'Milano',
      postalCode: '20144',
      addressCountry: 'IT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone.link,
      email: siteConfig.contact.email,
      contactType: 'customer service',
      availableLanguage: ['it'],
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 50,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Italia',
      },
      {
        '@type': 'State',
        name: 'Lombardia',
      },
      {
        '@type': 'State',
        name: 'Lazio',
      },
      {
        '@type': 'State',
        name: 'Piemonte',
      },
      {
        '@type': 'State',
        name: 'Campania',
      },
      {
        '@type': 'State',
        name: 'Toscana',
      },
    ],
    slogan: 'Il futuro del credito, semplificato.',
    naics: '522310',
    knowsAbout: [
      'Prestiti online',
      'Finanziamento personale',
      'Prestito auto',
      'Prestito immobiliare',
      'Consolidamento debiti',
      'Intermediazione creditizia',
      'Fintech Italia',
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <ChiSiamoClient />
    </>
  );
}
