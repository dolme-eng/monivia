'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, TrendingUp, Shield, Layers } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';

const comparisonData = [
  { criterio: "Cos'è", consolidamento: 'Unisce più prestiti in uno', riprovvidentazione: 'Riduce la rata esistente' },
  { criterio: 'TAN', consolidamento: 'Dal 2.2%', riprovvidentazione: 'Variabile' },
  { criterio: 'Durata', consolidamento: 'Fino a 120 mesi', riprovvidentazione: 'Fino a 360 mesi' },
  { criterio: 'Importo', consolidamento: 'Fino a 200.000€', riprovvidentazione: 'Variabile' },
  { criterio: 'Effetto', consolidamento: 'Rata unica, meno interessi', riprovvidentazione: 'Rata più bassa, più interessi' },
  { criterio: 'Migliore per', consolidamento: 'Chi ha più prestiti attivi', riprovvidentazione: 'Chi ha una rata troppo alta' },
];

const consolidamentoPros = [
  'Unisce più debiti in una sola rata',
  'Riduce il costo totale degli interessi',
  'Tasso fisso e prevedibile',
  'Semplicità di gestione: un solo bonifico',
];

const consolidamentoCons = [
  'Non riduce la rata mensile se non si allunga la durata',
  'Richiede una valutazione del merito creditizio',
];

const riprovvidentazionePros = [
  'Riduce immediatamente la rata mensile',
  'Flessibilità sulla durata (fino a 360 mesi)',
  'Utile in momenti di difficoltà finanziaria',
];

const riprovvidentazioneCons = [
  'Il costo totale del prestito aumenta',
  'Tasso spesso più alto del consolidamento',
  'Allunga significativamente i tempi di rimborso',
];

export default function ConsolidamentoVsRiprovvidentazioneClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200" alt="" fill priority className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        <div className="site-container relative z-10">
          <Breadcrumbs className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80" items={[{ label: 'Home', href: '/' }, { label: 'Confronto', href: '/confronto' }, { label: 'Consolidamento vs Riprovvidentazione' }]} />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-5 py-2 text-sm font-bold text-secondary">
              Confronto
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-display font-black tracking-tight">
              Consolidamento vs Riprovvidentazione
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75">
              Qual è la soluzione giusta per la tua situazione?
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Tabella comparativa</div>
            <h2 className="section-heading mb-10">Confronto dettagliato</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-6 py-4 font-black text-primary">Criterio</th>
                  <th className="px-6 py-4 font-black text-secondary">Consolidamento</th>
                  <th className="px-6 py-4 font-black text-slate-500">Riprovvidentazione</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.criterio} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-6 py-4 font-bold text-primary">{row.criterio}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" />{row.consolidamento}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{row.riprovvidentazione}</td>
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
            <h2 className="section-heading mb-10">Vantaggi e svantaggi</h2>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUpAnimate} className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-black text-secondary">
                  <Layers size={20} /> Consolidamento
                </h3>
                <div className="space-y-3">
                  {consolidamentoPros.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                  {consolidamentoCons.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUpAnimate} className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-black text-slate-500">
                  <TrendingUp size={20} /> Riprovvidentazione
                </h3>
                <div className="space-y-3">
                  {riprovvidentazionePros.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                  {riprovvidentazioneCons.map((item) => (
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
                <Shield size={22} />
              </div>
              <div>
                <p className="text-base font-bold leading-relaxed text-primary">
                  Il consolidamento è ideale per unire più debiti in una sola rata e risparmiare sugli interessi.
                  La riprovvidentazione invece è utile per ridurre la rata mensile, ma aumenta il costo totale del prestito.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-primary text-white text-center">
        <div className="site-container max-w-2xl">
          <h2 className="text-section-title font-black">Calcola il tuo consolidamento</h2>
          <p className="mt-4 text-white/75">Scopri quanto puoi risparmiare unendo i tuoi prestiti.</p>
          <Link href="/calcola" className="btn-cyan mt-8 inline-flex px-8 py-4">Calcola il tuo consolidamento <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* Pagine correlate */}
      <section className="section-pad border-t border-slate-100 bg-slate-50">
        <div className="site-container">
          <h2 className="text-xl font-black text-slate-900">Pagine correlate</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/prestiti/consolidamento" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Consolidamento Debiti</h3>
              <p className="mt-2 text-xs text-slate-400">Unisci i tuoi prestiti in una sola rata più bassa.</p>
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
