import { buildPageMetadata } from '@/lib/seo';
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ChiSiamoClient />
    </>
  );
}
