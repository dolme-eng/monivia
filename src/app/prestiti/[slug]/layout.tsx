import type { ReactNode } from 'react';
import { isLoanSlug, loanProducts } from '@/config/loans';
import ProductJsonLd from '@/components/ProductJsonLd';

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
