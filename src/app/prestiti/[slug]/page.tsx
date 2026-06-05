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

export default function PrestitoDettaglio() {
  return <PrestitoDettaglioClient />;
}
