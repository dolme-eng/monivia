import { buildPageMetadata } from '@/lib/seo';
import ContattiClient from './client';

export const metadata = buildPageMetadata({
  title: 'Contattaci | Monivia — Supporto e assistenza',
  description: 'Contatta Monivia per prestiti, pratiche o assistenza. Team dedicato, risposta entro 48 ore lavorative.',
  path: '/contatti',
  keywords: ['contatti Monivia', 'assistenza prestiti', 'supporto finanziario'],
});

export default function Contatti() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Contatti', item: 'https://www.monivia.it/contatti' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ContattiClient />
    </>
  );
}
