import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
  image?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noindex = false,
  image = '/og-default.png',
}: SeoOptions): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'it_IT',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
