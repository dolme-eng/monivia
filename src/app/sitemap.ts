import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { blogArticles } from '@/config/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/chi-siamo`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contatti`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/lavora-con-noi`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tariffe`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/calcola`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/note-legali`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/trasparenza`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/prestiti/personale`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prestiti/auto`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prestiti/immobiliare`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prestiti/consolidamento`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prestiti/business`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prestito-online`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prestito-dipendenti`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/prestito-pensionati`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/prestito-cessione-quinto`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/prestito-ristrutturazione`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/prestito-moto`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/confronto/prestito-online-vs-banca`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/confronto/consolidamento-vs-riprovvidentazione`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/confronto/migliori-prestiti-personali-2026`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/confronto/prestito-personale-vs-revolving`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/prestiti-a-milano`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/prestiti-a-roma`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/prestiti-a-torino`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/prestiti-a-napoli`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/prestiti-a-firenze`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
