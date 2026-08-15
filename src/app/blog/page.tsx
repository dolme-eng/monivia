import type { Metadata } from 'next';
import BlogHero from '@/components/BlogHero';
import BlogCard from '@/components/BlogCard';
import { blogArticles } from '@/config/blog';

export const metadata: Metadata = {
  title: 'Blog | Monivia',
  description: 'Consigli, guide e aggiornamenti sui prestiti personali, auto, immobiliari e consolidamento debiti.',
  alternates: { canonical: 'https://www.monivia.it/blog' },
  openGraph: {
    title: 'Blog Monivia',
    description: 'Consigli, guide e aggiornamenti sui prestiti.',
    url: 'https://www.monivia.it/blog',
    siteName: 'Monivia',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <>
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
