import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LoanCalculatorFull from '@/components/LoanCalculatorFull';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Calcola la tua rata | Monivia',
  description:
    'Simulatore prestito online: calcola rata mensile, confronta prodotti e scopri il TAEG. Risultato immediato, zero impegno.',
  path: '/calcola',
  keywords: ['calcola rata', 'simulatore prestito', 'calcolo TAEG', 'simulatore finanziamento'],
});

export default function CalcolaPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Calcola', item: 'https://www.monivia.it/calcola' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary/80 to-secondary/60 pt-32 pb-12">
        <div className="pointer-events-none absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-[2.75rem] md:text-5xl">
            Calcola la tua rata
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Personalizza importo, durata e assicurazione. Confronta i prodotti e scopri la soluzione più adatta.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative z-10 -mt-6 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <LoanCalculatorFull />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-slate-500">Hai domande?</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/faq" className="btn-ghost border border-slate-200 bg-white px-6 py-3 text-sm">
              Consulta le FAQ
            </Link>
            <Link href="/contatti" className="btn-cyan px-6 py-3 text-sm">
              Parla con noi <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pagine correlate */}
      <section className="border-t border-slate-100 bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-black text-slate-900">Pagine correlate</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/tariffe" className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Tariffe e condizioni</h3>
              <p className="mt-2 text-xs text-slate-400">Confronta TAN e TAEG di tutti i prodotti Monivia.</p>
            </Link>
            <Link href="/prestito-online" className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Prestito Online</h3>
              <p className="mt-2 text-xs text-slate-400">Richiedi un prestito online in 5 minuti, risposta in 48 ore.</p>
            </Link>
            <Link href="/faq" className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Domande frequenti</h3>
              <p className="mt-2 text-xs text-slate-400">Risposte a tutti i dubbi su requisiti, costi e tempi.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
