import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogArticles, getArticleBySlug } from '@/config/blog';
import BlogCategoryBadge from '@/components/BlogCategoryBadge';
import BlogShareButtons from '@/components/BlogShareButtons';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Blog Monivia`,
    description: article.excerpt,
    alternates: { canonical: `https://www.monivia.it/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.monivia.it/blog/${article.slug}`,
      images: [{ url: article.ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Monivia' },
    publisher: { '@type': 'Organization', name: 'Monivia' },
    image: article.ogImage,
    mainEntityOfPage: `https://www.monivia.it/blog/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 pt-32 pb-24">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary">
          <ArrowLeft size={16} />
          Tutti gli articoli
        </Link>

        <div className="mb-6">
          <BlogCategoryBadge category={article.category} />
        </div>

        <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(article.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {article.readTime} min di lettura
          </span>
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl">
          <Image
            src={article.ogImage}
            alt={article.title}
            width={1200}
            height={630}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <BlogShareButtons title={article.title} slug={article.slug} />

        <div
          className="prose prose-slate max-w-none mt-8
            prose-headings:font-black prose-headings:text-slate-900
            prose-h2:mt-10 prose-h2:text-2xl
            prose-h3:mt-8 prose-h3:text-lg
            prose-p:leading-relaxed prose-p:text-slate-600
            prose-li:text-slate-600
            prose-strong:font-bold prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-16 rounded-2xl bg-primary p-8 text-center text-white">
          <h2 className="text-xl font-black">Hai domande?</h2>
          <p className="mt-2 text-white/60">La nostra squadra è pronta ad aiutarti.</p>
          <Link href="/contatti" className="btn-cyan mt-6 inline-flex">
            Contattaci
          </Link>
        </div>
      </article>
    </>
  );
}
