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
    dateModified: article.date,
    articleSection: article.category,
    author: {
      '@type': 'Person',
      name: 'Redazione Monivia',
      url: 'https://www.monivia.it/chi-siamo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Monivia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.monivia.it/logo.svg',
      },
    },
    image: article.ogImage,
    mainEntityOfPage: `https://www.monivia.it/blog/${article.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.monivia.it/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.monivia.it/blog/${article.slug}` },
    ],
  };

  const howToSteps: Record<string, { name: string; steps: string[] }> = {
    'come-richiedere-prestito-online': {
      name: 'Come richiedere un prestito online con Monivia',
      steps: [
        'Compila il modulo di richiesta sulla homepage con i tuoi dati personali e finanziari.',
        'Seleziona il tipo di prestito desiderato, l\'importo e la durata del piano di rimborso.',
        'Ricevi l\'esito della valutazione entro 48 ore lavorative via email.',
        'Firma il contratto digitale con firma elettronica qualificata.',
        'Ricevi i fondi sul tuo conto corrente entro 3-5 giorni lavorativi.',
      ],
    },
    'simulare-rata-prestito-guida': {
      name: 'Come simulare la rata di un prestito',
      steps: [
        'Utilizza il simulatore nella homepage selezionando il tipo di prestito.',
        'Inserisci l\'importo desiderato e la durata del piano di rimborso.',
        'Scegli se includere o meno l\'assicurazione opzionale.',
        'Visualizza la rata mensile stimata, il TAEG e il costo totale del prestito.',
        'Invia la richiesta formale per ottenere un preventivo personalizzato.',
      ],
    },
    'guida-prestito-personale-completa': {
      name: 'Come ottenere un prestito personale',
      steps: [
        'Verifica di possedere i requisiti: maggiore età, residenza in Italia, reddito documentabile.',
        'Raccogli i documenti: documento d\'identità, codice fiscale, ultime buste paga o dichiarazione dei redditi.',
        'Usa il simulatore per calcolare la rata ideale in base a importo e durata.',
        'Compila il modulo di richiesta online con i tuoi dati personali e finanziari.',
        'Ricevi l\'esito entro 48 ore e firma il contratto digitale.',
        'Ricevi i fondi sul tuo conto corrente entro 3-5 giorni lavorativi.',
      ],
    },
    'guida-prestito-auto': {
      name: 'Come ottenere un prestito auto',
      steps: [
        'Scegli il veicolo: nuovo, usato, concessionario o privato.',
        'Calcola la rata con il simulatore Monivia inserendo importo e durata.',
        'Raccogli i documenti: documento, codice fiscale, proforma del veicolo, buste paga.',
        'Compila il modulo online e invia la richiesta.',
        'Ricevi l\'esito entro 48 ore e firma il contratto digitale.',
        'Ricevi i fondi e acquista la tua auto.',
      ],
    },
    'come-scegliere-durata-prestito': {
      name: 'Come scegliere la durata del prestito',
      steps: [
        'Determina il tuo budget mensile: quanto puoi permetterti di pagare ogni mese.',
        'Calcola il costo totale con diverse durate usando il simulatore.',
        'Confronta: durata breve = rata alta ma pochi interessi; durata lunga = rata bassa ma molti interessi.',
        'Scegli la durata che bilancia rata sostenibile e costo totale accettabile.',
      ],
    },
    'come-calcolare-taeg': {
      name: 'Come calcolare il TAEG di un prestito',
      steps: [
        'Verifica che il TAEG sia indicato nella proposta di prestito (obbligo di legge).',
        'Confronta il TAEG di diverse offerte: più basso è, più conveniente è il prestito.',
        'Considera che il TAEG include interessi, spese di istruttoria e assicurazione.',
        'Usa il TAEG come indicatore principale per la tua decisione.',
      ],
    },
  };

  const howTo = howToSteps[article.slug];
  const howToJsonLd = howTo
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howTo.name,
        description: article.excerpt,
        step: howTo.steps.map((text, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: text.split('.')[0],
          text,
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {howToJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />}

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

        {/* Articoli correlati */}
        <div className="mt-16">
          <h2 className="text-xl font-black text-slate-900">Continua a leggere</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {blogArticles
              .filter((a) => a.slug !== article.slug)
              .sort((a, b) => (a.category === article.category ? -1 : 1))
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-xl border border-slate-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md"
                >
                  <BlogCategoryBadge category={related.category} />
                  <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900 group-hover:text-secondary">
                    {related.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400">{related.readTime} min di lettura</p>
                </Link>
              ))}
          </div>
        </div>

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
