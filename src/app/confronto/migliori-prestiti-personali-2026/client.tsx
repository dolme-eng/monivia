'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, TrendingUp, Shield, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';

const products = [
  {
    name: 'Monivia',
    tan: '2.0%',
    importo: '100.000€',
    durata: '120 mesi',
    puntiDiForza: ['Tasso fisso', 'Zero spese nascoste', 'Processo 100% digitale'],
    recommended: true,
  },
  {
    name: 'Banca A',
    tan: '2.8%',
    importo: '50.000€',
    durata: '84 mesi',
    puntiDiForza: ['Filiale fisica'],
    recommended: false,
  },
  {
    name: 'Banca B',
    tan: '3.1%',
    importo: '30.000€',
    durata: '60 mesi',
    puntiDiForza: ['Approvazione rapida'],
    recommended: false,
  },
  {
    name: 'Fintech C',
    tan: '2.5%',
    importo: '75.000€',
    durata: '96 mesi',
    puntiDiForza: ['100% online'],
    recommended: false,
  },
];

const moniviaPros = [
  'TAN più basso del mercato (2.0%)',
  'Importo massimo elevato (100.000€)',
  'Durata fino a 120 mesi',
  'Nessuna spesa nascosta',
  'Processo completamente digitale',
  'Firma elettronica da remoto',
];

const moniviaCons = [
  'Consulenza telefonica/digitale (non in filiale)',
];

export default function MiglioriPrestitiPersonali2026Client() {
  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200" alt="" fill priority className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        <div className="site-container relative z-10">
          <Breadcrumbs className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80" items={[{ label: 'Home', href: '/' }, { label: 'Confronto', href: '/confronto' }, { label: 'Migliori Prestiti Personali 2026' }]} />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-5 py-2 text-sm font-bold text-secondary">
              Guida 2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-display font-black tracking-tight">
              Migliori Prestiti Personali 2026
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75">
              Confronto completo dei migliori prestiti personali dell&apos;anno
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Tabella comparativa</div>
            <h2 className="section-heading mb-10">Confronto prodotti</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-6 py-4 font-black text-primary">Prodotto</th>
                  <th className="px-6 py-4 font-black text-primary">TAN</th>
                  <th className="px-6 py-4 font-black text-primary">Importo max</th>
                  <th className="px-6 py-4 font-black text-primary">Durata</th>
                  <th className="px-6 py-4 font-black text-primary">Punti di forza</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={product.name} className={`border-b border-slate-50 ${product.recommended ? 'bg-secondary/5' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-6 py-4 font-bold text-primary">
                      <span className="inline-flex items-center gap-2">
                        {product.recommended && <Award size={16} className="text-secondary" />}
                        {product.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5 font-bold text-secondary">{product.tan}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{product.importo}</td>
                    <td className="px-6 py-4 text-slate-600">{product.durata}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {product.puntiDiForza.map((p) => (
                          <span key={p} className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2.5 py-1 text-xs font-bold text-primary">
                            <CheckCircle size={11} className="text-emerald-500" />{p}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="site-container">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Pro e Contro</div>
            <h2 className="section-heading mb-10">Analisi di Monivia</h2>
          </motion.div>
          <div className="mx-auto max-w-2xl">
            <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUpAnimate} className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-black text-secondary">
                  <Award size={20} /> Monivia
                </h3>
                <div className="space-y-3">
                  {moniviaPros.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                  {moniviaCons.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container max-w-3xl">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Verdetto</div>
            <h2 className="section-heading mb-6">La nostra conclusione</h2>
          </motion.div>
          <motion.div variants={fadeInUpAnimate} initial="initial" whileInView="animate" viewport={{ once: true }} className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <TrendingUp size={22} />
              </div>
              <div>
                <p className="text-base font-bold leading-relaxed text-primary">
                  Monivia offre il TAN più basso e le condizioni più trasparenti tra i prestiti personali del 2026.
                  Con un tasso fisso dal 2.0%, zero spese nascoste e un processo 100% digitale, rappresenta
                  la scelta migliore per chi cerca risparmio e comodità.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-primary text-white text-center">
        <div className="site-container max-w-2xl">
          <h2 className="text-section-title font-black">Richiedi il tuo prestito</h2>
          <p className="mt-4 text-white/75">Compila il modulo in 5 minuti e ricevi l&apos;esito entro 48 ore.</p>
          <Link href="/calcola" className="btn-cyan mt-8 inline-flex px-8 py-4">Richiedi il tuo prestito <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* Pagine correlate */}
      <section className="section-pad border-t border-slate-100 bg-slate-50">
        <div className="site-container">
          <h2 className="text-xl font-black text-slate-900">Pagine correlate</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/prestiti/personale" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Prestito Personale</h3>
              <p className="mt-2 text-xs text-slate-400">Fino a 100.000€, tasso fisso, risposta in 48 ore.</p>
            </Link>
            <Link href="/tariffe" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Tariffe e condizioni</h3>
              <p className="mt-2 text-xs text-slate-400">Confronta TAN e TAEG di tutti i prodotti Monivia.</p>
            </Link>
            <Link href="/calcola" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Calcola la tua rata</h3>
              <p className="mt-2 text-xs text-slate-400">Simulatore gratuito per calcolare rata mensile e costo totale.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
