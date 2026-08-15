import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import BlogCategoryBadge from '@/components/BlogCategoryBadge';
import type { BlogArticle } from '@/config/blog';

export default function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-secondary/30 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.ogImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <BlogCategoryBadge category={article.category} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(article.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {article.readTime} min
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-secondary transition-colors">
          {article.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-slate-500">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-1 text-sm font-bold text-secondary opacity-0 transition-opacity group-hover:opacity-100">
          Leggi l&apos;articolo
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
