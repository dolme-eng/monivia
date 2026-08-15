'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Shield, FileCheck, Banknote, Bike, Zap, Percent, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';

const features = [
  { icon: Percent, title: 'Tasso fisso dal 1,8%', desc: 'Un dei tassi più bassi del mercato per il finanziamento moto.' },
  { icon: Banknote, title: 'Importi fino a 25.000€', desc: 'Acquista la moto che desideri senza limiti.' },
  { icon: Calendar, title: 'Durata fino a 84 mesi', desc: 'Piano di rimborso comodo e personalizzabile.' },
  { icon: Clock, title: 'Risposta in 48 ore', desc: 'Esito della richiesta in due giorni lavorativi.' },
];

const benefits = [
  { icon: Bike, title: 'Nuova o usata', desc: 'Finanzia sia moto nuove che usate, da concessionari o privati.' },
  { icon: Zap, title: 'Erogazione rapida', desc: 'I fondi arrivano sul tuo conto in pochi giorni.' },
  { icon: Shield, title: 'Rata fissa', desc: 'Nessuna sorpresa: la rata resta bloccata per tutta la durata.' },
];

const steps = [
  { num: '01', title: 'Compila il modulo', desc: 'Inserisci i dati della moto e il tuo reddito.' },
  { num: '02', title: 'Carica i documenti', desc: 'Documento d\'identità e reddito, direttamente online.' },
  { num: '03', title: 'Ricevi l\'esito', desc: 'Valutazione rapida entro 48 ore lavorative.' },
  { num: '04', title: 'Firma e ricevi i fondi', desc: 'Firma digitale e i soldi sul conto in pochi giorni.' },
];

const faqItems = [
  { q: 'Posso acquistare una moto usata con il prestito?', a: 'Sì, il prestito può essere utilizzato per acquistare sia moto nuove che usate, da concessionari o da privati.' },
  { q: 'Serve una polizza assicurativa?', a: "Non è obbligatoria, ma consigliamo di sottoscrivere un'assicurazione RC per la tua tutela e quella degli altri." },
  { q: "Qual è l'importo massimo ottenibile?", a: "L'importo massimo è di 25.000€, sufficiente per acquistare la maggior parte delle moto e scooter nuovi." },
  { q: 'Qual è la durata massima del prestito?', a: 'La durata massima è di 84 mesi (7 anni). La rata è fissa e rimane invariata per tutta la durata.' },
  { q: 'Posso estinguere anticipatamente il prestito?', a: 'Sì, puoi estinguere il prestito in qualsiasi momento con una penale ridotta, come previsto dalla normativa italiana.' },
];

export default function PrestitoMotoClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200" alt="" fill priority className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        <div className="site-container relative z-10">
          <Breadcrumbs className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80" items={[{ label: 'Home', href: '/' }, { label: 'Prestito Moto' }]} />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-5 py-2 text-sm font-bold text-secondary">
              Moto
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-display font-black tracking-tight">
              Prestito Moto
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75">
              La tua moto a rate fisse
            </motion.p>
            <motion.div variants={staggerChildren} initial="initial" animate="animate" className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {['Tasso fisso dal 1,8%', 'Importi fino a 25.000€', 'Durata fino a 84 mesi', 'Risposta in 48 ore'].map((f) => (
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
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Caratteristiche</div>
            <h2 className="section-heading mb-10">Il prestito moto</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeInUpAnimate} className="surface-card p-6 transition-all hover:-translate-y-0.5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><f.icon size={22} /></div>
                <h3 className="text-base font-black text-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="site-container">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Vantaggi</div>
            <h2 className="section-heading mb-10">I vantaggi del prestito moto</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-3">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeInUpAnimate} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><b.icon size={22} /></div>
                <div>
                  <h3 className="text-base font-black text-primary">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Processo</div>
            <h2 className="section-heading mb-10">Come funziona</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <motion.div key={s.num} variants={fadeInUpAnimate} className="relative rounded-xl border border-slate-100 bg-white p-6">
                <div className="mb-4 text-3xl font-black text-secondary/30">{s.num}</div>
                <h3 className="text-base font-black text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="site-container max-w-3xl">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerChildren}>
            <div className="badge inline-flex mb-5">Domande frequenti</div>
            <h2 className="section-heading mb-10">FAQ</h2>
          </motion.div>
          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="space-y-4">
            {faqItems.map((item) => (
              <motion.details key={item.q} variants={fadeInUpAnimate} className="group rounded-xl border border-slate-100 bg-white p-5 sm:p-6">
                <summary className="cursor-pointer text-sm font-bold text-primary list-none flex items-center justify-between">
                  {item.q}
                  <ArrowRight size={16} className="text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.a}</p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-primary text-white text-center">
        <div className="site-container max-w-2xl">
          <h2 className="text-section-title font-black">Acquista la tua moto con Monivia</h2>
          <p className="mt-4 text-white/75">Tasso fisso dal 1,8%, importi fino a 25.000€, risposta in 48 ore.</p>
          <Link href="/calcola" className="btn-cyan mt-8 inline-flex px-8 py-4">Calcola la rata <ArrowRight size={16} /></Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
