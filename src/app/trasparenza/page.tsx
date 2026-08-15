import { buildPageMetadata } from '@/lib/seo';
import TrasparenzaClient from './client';

export const metadata = buildPageMetadata({
  title: 'Trasparenza bancaria | Monivia — Documenti e condizioni',
  description: 'Documentazione ufficiale Monivia: fogli informativi, condizioni generali e informazioni Banca d\'Italia.',
  path: '/trasparenza',
  keywords: ['trasparenza bancaria', 'fogli informativi', 'documenti prestito Monivia'],
});

export default function Trasparenza() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Trasparenza', item: 'https://www.monivia.it/trasparenza' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <TrasparenzaClient />
    </>
  );
}
