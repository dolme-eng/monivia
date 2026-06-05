import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';
import { isLoanSlug, loanProducts } from '@/config/loans';
import ProductJsonLd from '@/components/ProductJsonLd';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (!isLoanSlug(slug)) {
    return buildPageMetadata({
      title: 'Prestiti | Monivia',
      description: 'Scopri le soluzioni di prestito Monivia e scegli la formula più adatta alle tue esigenze.',
      path: '/prestiti',
      noindex: true,
    });
  }

  const loan = loanProducts[slug];

  return buildPageMetadata({
    title: `${loan.title} | Monivia`,
    description: loan.seoDescription,
    path: `/prestiti/${slug}`,
    keywords: loan.keywords,
    image: loan.ogImage,
  });
}

export default async function PrestitiSlugLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = isLoanSlug(slug) ? loanProducts[slug] : null;

  return (
    <>
      {product && <ProductJsonLd product={product} />}
      {children}
    </>
  );
}
