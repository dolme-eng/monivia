'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, TrendingUp, Shield, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';

const comparisonData = [
  { criterio: 'Tempi di risposta', online: '48 ore', banca: '5-15 giorni' },
  { criterio: 'Documenti', online: 'Digitali', banca: 'Cartacei' },
  { criterio: 'TAN', online: 'Dal 1.8%', banca: 'Dal 2.5%' },
  { criterio: 'Spese istruttoria', online: '0€', banca: '150-500€' },
  { criterio: 'Firma', online: 'Elettronica', banca: 'In filiale' },
  { criterio: 'Consulenza', online: 'Telefonica/digitale', banca: 'In filiale' },
];

const onlinePros = [
  'Processo 100% digitale, niente spostamenti',
  'Tempi di risposta molto più rapidi',
  'Tasso generalmente più basso',
  'Nessuna spesa istruttoria',
  'Firma elettronica da remoto',
];

const onlineCons = [
  'Consulenza non in presenza',
  'Richiede familiarità con la tecnologia',
];

const bancaPros = [
  'Consulenza faccia a faccia',
  'Fiducia per chi preferisce il contatto umano',
];

const bancaCons = [
  'Tempi di approvazione più lunghi',
  'Spese istruttoria elevata',
  'Documentazione cartacea',
  'Tasso generalmente più alto',
  'Obbligo di recarsi in filiale',
];

export default function PrestitoOnlineVsBancaClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1556742049-6726b3ff858f?w=1200" alt="" fill priority className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        <div className="site-container relative z-10">
          <Breadcrumbs className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80" items={[{ label: 'Home', href: '/' }, { label: 'Confronto', href: '/confronto' }, { label: 'Prestito Online vs Banca' }]} />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-5 py-2 text-sm font-bold text-secondary">
              Confronto
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-display font-black tracking-tight">
              Prestito Online vs Banca
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75">
              Scopri le differenze e scegli la soluzione migliore per te
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
                  <th className="px-6 py-4 font-black text-secondary">Prestito Online</th>
                  <th className="px-6 py-4 font-black text-slate-500">Prestito in Banca</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.criterio} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-6 py-4 font-bold text-primary">{row.criterio}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" />{row.online}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{row.banca}</td>
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
                  <TrendingUp size={20} /> Prestito Online
                </h3>
                <div className="space-y-3">
                  {onlinePros.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                  {onlineCons.map((item) => (
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
                  <Shield size={20} /> Prestito in Banca
                </h3>
                <div className="space-y-3">
                  {bancaPros.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                  {bancaCons.map((item) => (
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
                <Clock size={22} />
              </div>
              <div>
                <p className="text-base font-bold leading-relaxed text-primary">
                  Il prestito online è più veloce, trasparente e spesso più conveniente rispetto a quello in banca.
                  Con tempi di risposta di 48 ore, zero spese istruttoria e tassi più competitivi, rappresenta la scelta
                  moderna per chi cerca comodità e risparmio.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-primary text-white text-center">
        <div className="site-container max-w-2xl">
          <h2 className="text-section-title font-black">Scopri le nostre tariffe</h2>
          <p className="mt-4 text-white/75">Confronta i nostri tassi e calcola la rata più adatta a te.</p>
          <Link href="/tariffe" className="btn-cyan mt-8 inline-flex px-8 py-4">Scopri le nostre tariffe <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* Pagine correlate */}
      <section className="section-pad border-t border-slate-100 bg-slate-50">
        <div className="site-container">
          <h2 className="text-xl font-black text-slate-900">Pagine correlate</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/confronto/prestito-personale-vs-revolving" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Prestito Personale vs Revolving</h3>
              <p className="mt-2 text-xs text-slate-400">Confronto completo su tasso, costi e migliori utilizzi.</p>
            </Link>
            <Link href="/tariffe" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Tariffe e condizioni</h3>
              <p className="mt-2 text-xs text-slate-400">Confronta TAN e TAEG di tutti i prodotti Monivia.</p>
            </Link>
            <Link href="/prestito-online" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Prestito Online</h3>
              <p className="mt-2 text-xs text-slate-400">Richiedi un prestito online in 5 minuti, risposta in 48 ore.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
