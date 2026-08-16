import BlogHero from '@/components/BlogHero';
import BlogCard from '@/components/BlogCard';
import { blogArticles } from '@/config/blog';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Blog | Monivia',
  description: 'Guide pratiche, consigli esperti e novità sui prestiti personali, auto, immobiliari e consolidamento debiti.',
  path: '/blog',
  keywords: ['blog prestiti', 'guide finanziarie', 'consigli prestiti', 'news Monivia'],
});

export default function BlogPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.monivia.it/blog' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BlogHero />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogArticles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </main>
    </>
  );
}
