import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LoanCalculatorFull from '@/components/LoanCalculatorFull';

export const metadata: Metadata = {
  title: 'Calcola la tua rata | Monivia',
  description:
    'Simula il tuo prestito personalizzando importo, durata e assicurazione. Confronta i prodotti Monivia e richiedi online.',
  alternates: { canonical: 'https://www.monivia.it/calcola' },
  openGraph: {
    title: 'Calcola la tua rata | Monivia',
    description: 'Simulatore prestito Monivia — calcolo immediato.',
    url: 'https://www.monivia.it/calcola',
    siteName: 'Monivia',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function CalcolaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary/80 to-secondary/60 pt-32 pb-12">
        <div className="pointer-events-none absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
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
    </>
  );
}
