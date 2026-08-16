import Link from 'next/link';
import { ArrowRight, Info, HelpCircle } from 'lucide-react';
import { loanProducts, loanSlugs } from '@/config/loans';
import { calculateLoan } from '@/utils/finance';
import TariffTable from '@/components/TariffTable';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Tariffe e condizioni | Monivia',
  description:
    'Confronta TAN e TAEG dei prestiti Monivia. Tabelle trasparenti, esempi pratici e nessun costo nascosto.',
  path: '/tariffe',
  keywords: ['tariffe prestiti', 'TAN TAEG', 'condizioni prestito', 'costi prestito Monivia'],
});

export default function TariffePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.monivia.it' },
      { '@type': 'ListItem', position: 2, name: 'Tariffe', item: 'https://www.monivia.it/tariffe' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Prodotti di prestito Monivia',
            itemListElement: [
              {
                '@type': 'Offer',
                position: 1,
                name: 'Prestito Personale',
                priceSpecification: {
                  '@type': 'QuantitativeValue',
                  value: 2.0,
                  unitText: 'TAN %',
                },
                category: 'Prestito personale',
              },
              {
                '@type': 'Offer',
                position: 2,
                name: 'Prestito Auto',
                priceSpecification: {
                  '@type': 'QuantitativeValue',
                  value: 1.8,
                  unitText: 'TAN %',
                },
                category: 'Prestito auto',
              },
              {
                '@type': 'Offer',
                position: 3,
                name: 'Prestito Immobiliare',
                priceSpecification: {
                  '@type': 'QuantitativeValue',
                  value: 2.5,
                  unitText: 'TAN %',
                },
                category: 'Prestito immobiliare',
              },
              {
                '@type': 'Offer',
                position: 4,
                name: 'Consolidamento Debiti',
                priceSpecification: {
                  '@type': 'QuantitativeValue',
                  value: 2.2,
                  unitText: 'TAN %',
                },
                category: 'Consolidamento debiti',
              },
              {
                '@type': 'Offer',
                position: 5,
                name: 'Prestito Aziendale',
                priceSpecification: {
                  '@type': 'QuantitativeValue',
                  value: 3.0,
                  unitText: 'TAN %',
                },
                category: 'Prestito aziendale',
              },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-secondary/80 to-primary/80 pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-[2.75rem] md:text-5xl">
            Tariffe e condizioni
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Tabelle trasparenti, nessun costo nascosto. Confronta i nostri prodotti e scegli la soluzione più adatta.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <TariffTable />
        </div>
      </section>

      {/* Example cards */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Esempi pratici</h2>
          <p className="mt-2 text-slate-500">Calcoli basati su 30.000€ rimborsati in 48 mesi con assicurazione.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loanSlugs.map((slug) => {
              const p = loanProducts[slug];
              const ex = calculateLoan(30000, 48, true, p.tan, p.insuranceRate);
              return (
                <div key={slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{p.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-400">Rata mensile</p>
                      <p className="text-lg font-black text-primary">
                        {ex.monthly.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Totale rimborsato</p>
                      <p className="text-lg font-black text-slate-900">
                        {ex.totalDue.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">TAN</p>
                      <p className="text-sm font-bold text-secondary">{(p.tan * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">TAEG indicativo</p>
                      <p className="text-sm font-bold text-secondary">{((p.tan + 0.003) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <Link href={`/prestiti/${slug}`} className="btn-cyan mt-4 flex w-full items-center justify-center gap-1">
                    Scopri di più <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <Info size={20} className="mt-0.5 shrink-0 text-amber-600" />
              <div className="text-sm text-amber-800">
                <p className="font-bold">Note importanti</p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li>I tassi indicati sono i TAN minimi applicabili. Il tasso effettivo dipende dalla valutazione del merito creditizio.</li>
                  <li>Il TAEG indicativo include una stima dei costi accessori (spese di istruttoria, assicurazione opzionale).</li>
                  <li>Le rate di esempio sono calcolate su 30.000€ con assicurazione inclusa.</li>
                  <li>Il TAEG è un tasso effettivo che include interessi, spese accessorie e costi del servizio di intermediazione creditizia.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/calcola" className="btn-cyan inline-flex items-center gap-2">
              <HelpCircle size={18} />
              Simula la tua rata
            </Link>
          </div>
        </div>
      </section>

      {/* Pagine correlate */}
      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-black text-slate-900">Pagine correlate</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/calcola" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Calcola la tua rata</h3>
              <p className="mt-2 text-xs text-slate-400">Simulatore gratuito per calcolare rata mensile e costo totale.</p>
            </Link>
            <Link href="/prestito-online" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Prestito Online</h3>
              <p className="mt-2 text-xs text-slate-400">Richiedi un prestito online in 5 minuti, risposta in 48 ore.</p>
            </Link>
            <Link href="/faq" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Domande frequenti</h3>
              <p className="mt-2 text-xs text-slate-400">Risposte a tutti i dubbi su requisiti, costi e tempi.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
