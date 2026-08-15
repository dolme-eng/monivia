import { buildPageMetadata } from '@/lib/seo';
import LavoraConNoiClient from './client';

export const metadata = buildPageMetadata({
  title: 'Lavora con noi | Monivia — Carriere fintech',
  description: "Entra nel team Monivia: cerchiamo talenti per innovare il credito al consumo in Italia.",
  path: '/lavora-con-noi',
  keywords: ['lavora con noi Monivia', 'carriere fintech', 'offerte di lavoro'],
});

export default function LavoraConNoi() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Lavora con noi', item: 'https://www.monivia.it/lavora-con-noi' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <LavoraConNoiClient />
    </>
  );
}
