import { siteConfig } from '@/config/site';
import type { LoanProduct } from '@/config/loans';

type ProductJsonLdProps = {
  product: LoanProduct;
};

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.title,
    description: product.seoDescription,
    provider: {
      '@type': 'FinancialService',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Italy',
    },
    url: `${siteConfig.url}/prestiti/${product.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
