import Link from 'next/link';

type RelatedPage = {
  href: string;
  title: string;
  description: string;
};

export default function RelatedPages({ pages }: { pages: RelatedPage[] }) {
  if (!pages.length) return null;
  return (
    <section className="mt-16 rounded-2xl bg-slate-50 p-8">
      <h2 className="text-lg font-black text-primary mb-4">Pagine correlate</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-sm hover:border-secondary/30"
          >
            <p className="font-bold text-primary group-hover:text-secondary transition-colors">{page.title}</p>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{page.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
