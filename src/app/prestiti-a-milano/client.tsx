'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MapPin, Clock, Users, TrendingUp, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';

const localStats = [
  { icon: TrendingUp, value: '12.500+', label: 'pratiche elaborate' },
  { icon: Users, value: '4.200+', label: 'clienti a Milano' },
  { icon: Clock, value: '48h', label: 'tempo medio risposta' },
];

const services = [
  { title: 'Prestito personale', desc: 'Fondi per le tue esigenze personali con rata fissa e condizioni trasparenti.' },
  { title: 'Prestito auto', desc: 'Finanzia l\'acquisto della tua auto nuova o usata con un tasso competitivo.' },
  { title: 'Prestito immobiliare', desc: 'Supporto per acquisti, ristrutturazioni e investimenti immobiliari.' },
  { title: 'Consolidamento debiti', desc: 'Unifica i tuoi debiti in un\'unica rata mensile più bassa.' },
];

export default function PrestitiAMilanoClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200" alt="" fill priority className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        <div className="site-container relative z-10">
          <Breadcrumbs className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80" items={[{ label: 'Home', href: '/' }, { label: 'Prestiti a Milano' }]} />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-5 py-2 text-sm font-bold text-secondary">
              <MapPin size={14} /> Milano
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-display font-black tracking-tight">
              Prestiti a Milano
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75">
              La tua soluzione finanziaria nella capitale della finanza
            </motion.p>
            <motion.div variants={staggerChildren} initial="initial" animate="animate" className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {['Tasso fisso', 'Risposta in 48 ore', 'Assistenza dedicata'].map((f) => (
                <motion.div key={f} variants={fadeInUpAnimate} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-4 py-2 text-sm font-bold text-white">
                  <CheckCircle size={14} className="text-secondary" />
                  {f}
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/calcola" className="btn-cyan px-7 py-4">Calcola la rata <ArrowRight size={16} /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-3">
            {localStats.map((s) => (
              <motion.div key={s.label} variants={fadeInUpAnimate} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><s.icon size={24} /></div>
                <div>
                  <div className="text-2xl font-black text-primary">{s.value}</div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="site-container">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Servizi</div>
            <h2 className="section-heading mb-10">I nostri servizi a Milano</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <motion.div key={s.title} variants={fadeInUpAnimate} className="surface-card p-6 transition-all hover:-translate-y-0.5">
                <h3 className="text-base font-black text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container max-w-3xl">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Testimonianze</div>
            <h2 className="section-heading mb-10">Cosa dicono i nostri clienti a Milano</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <motion.div variants={fadeInUpAnimate} className="rounded-xl border border-slate-100 bg-white p-6 sm:p-8">
              <div className="flex gap-1 text-secondary mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 leading-relaxed">&ldquo;A Milano ho trovato Monivia e ho risparmiato 300€ sulla rata rispetto alla mia banca.&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">AP</div>
                <div>
                  <div className="text-sm font-bold text-primary">Alessandro P.</div>
                  <div className="text-xs text-slate-400">34 anni</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-primary text-white text-center">
        <div className="site-container max-w-2xl">
          <h2 className="text-section-title font-black">Pronto a richiedere il tuo prestito a Milano?</h2>
          <p className="mt-4 text-white/75">Compila il modulo in 5 minuti e ricevi l&apos;esito entro 48 ore.</p>
          <Link href="/calcola" className="btn-cyan mt-8 inline-flex px-8 py-4">Calcola la rata <ArrowRight size={16} /></Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
