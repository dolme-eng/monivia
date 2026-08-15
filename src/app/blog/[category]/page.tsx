import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogArticles, BLOG_CATEGORIES, type BlogCategory } from '@/config/blog';
import BlogCard from '@/components/BlogCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    category: category.toLowerCase(),
  }));
}

function isValidCategory(slug: string): slug is BlogCategory {
  return BLOG_CATEGORIES.some((c) => c.toLowerCase() === slug);
}

const CATEGORY_DESCRIPTIONS: Record<BlogCategory, string> = {
  Guida: 'Guide complete per richiedere e gestire il tuo prestito con consapevolezza.',
  Finanze: 'Articoli di educazione finanziaria per capire tassi, costi e strumenti creditizi.',
  Consigli: 'Suggerimenti pratici per ottenere le migliori condizioni sul tuo prestito.',
  Confronto: 'Confronti dettagliati tra diverse soluzioni di finanziamento.',
  Errori: 'Errori comuni da evitare quando si richiede un prestito.',
  Simulatore: 'Guide pratiche per usare al meglio il nostro simulatore prestiti.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  if (!isValidCategory(slug)) return {};
  const category = BLOG_CATEGORIES.find((c) => c.toLowerCase() === slug)!;
  const count = blogArticles.filter((a) => a.category === category).length;
  return {
    title: `${category} — ${count} articoli | Blog Monivia`,
    description: CATEGORY_DESCRIPTIONS[category],
    alternates: { canonical: `https://www.monivia.it/blog/${slug}` },
    openGraph: {
      title: `${category} | Blog Monivia`,
      description: CATEGORY_DESCRIPTIONS[category],
      url: `https://www.monivia.it/blog/${slug}`,
      siteName: 'Monivia',
      locale: 'it_IT',
      type: 'website',
      images: ['/og-default.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category} | Blog Monivia`,
      description: CATEGORY_DESCRIPTIONS[category],
      images: ['/og-default.webp'],
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  if (!isValidCategory(slug)) notFound();

  const category = BLOG_CATEGORIES.find((c) => c.toLowerCase() === slug)!;
  const articles = blogArticles.filter((a) => a.category === category);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.monivia.it/blog' },
      { '@type': 'ListItem', position: 3, name: category, item: `https://www.monivia.it/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <section className="relative overflow-hidden bg-primary pb-16 pt-32 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1200"
            alt=""
            fill
            priority
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> Tutti gli articoli
          </Link>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-secondary">
            Blog Monivia
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {category}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
