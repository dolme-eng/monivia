import { buildPageMetadata } from '@/lib/seo';
import { isLoanSlug, loanProducts } from '@/config/loans';
import type { Metadata } from 'next';
import PrestitoDettaglioClient from './client';

export function generateStaticParams() {
  return Object.keys(loanProducts).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isLoanSlug(slug)) {
    return buildPageMetadata({
      title: 'Prestito | Monivia',
      description: 'Scopri le soluzioni di prestito Monivia: personale, auto, immobiliare, business e consolidamento debiti.',
      path: '/prestiti',
    });
  }
  const product = loanProducts[slug];
  return buildPageMetadata({
    title: `${product.title} | Monivia`,
    description: product.seoDescription,
    path: `/prestiti/${slug}`,
    keywords: product.keywords,
    image: product.ogImage,
  });
}

export default async function PrestitoDettaglio({ params }: Props) {
  const { slug } = await params;
  const product = isLoanSlug(slug) ? loanProducts[slug] : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Prestiti', item: 'https://www.monivia.it/prestiti' },
      ...(product
        ? [{ '@type': 'ListItem', position: 3, name: product.shortTitle, item: `https://www.monivia.it/prestiti/${slug}` }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PrestitoDettaglioClient />
    </>
  );
}
