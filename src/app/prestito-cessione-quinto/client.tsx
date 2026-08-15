'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Shield, FileCheck, Banknote, Percent, CreditCard, HandCoins, FileSignature } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';

const features = [
  { icon: CreditCard, title: 'Rata trattenuta automaticamente', desc: 'La rata viene detratta direttamente dalla busta paga o dalla pensione.' },
  { icon: Shield, title: 'Nessun garante', desc: 'Non servono garanti né ipoteche aggiuntive.' },
  { icon: Banknote, title: 'Importo basato sullo stipendio', desc: "L'importo dipende dal tuo reddito e dalla trattenuta massima del 20%." },
  { icon: Clock, title: 'Durata fino a 120 mesi', desc: 'Piano di rimborso fino a 10 anni con rata fissa.' },
];

const benefits = [
  { icon: HandCoins, title: 'Rata gestita', desc: 'Niente bonifici da ricordare: la rata parte automaticamente.' },
  { icon: Shield, title: 'Nessuna garanzia', desc: 'La trattenuta in busta paga è già la garanzia sufficiente.' },
  { icon: Percent, title: 'Tasso fisso', desc: 'La rata resta invariata per tutta la durata del prestito.' },
];

const steps = [
  { num: '01', title: 'Compila il modulo', desc: 'Inserisci i tuoi dati e il tuo reddito in pochi minuti.' },
  { num: '02', title: 'Carica i documenti', desc: 'Busta paga e documento d\'identità, direttamente online.' },
  { num: '03', title: 'Ricevi l\'esito', desc: 'Valutazione rapida entro 48 ore lavorative.' },
  { num: '04', title: 'Firma e ricevi i fondi', desc: 'Firma digitale e i soldi sul conto in pochi giorni.' },
];

const faqItems = [
  { q: "Cos'è la cessione del quinto?", a: "La cessione del quinto è un prestito che prevede la trattenuta di massimo il 20% dello stipendio o della pensione in busta paga. La rata viene detratta automaticamente." },
  { q: 'Chi può richiedere la cessione del quinto?', a: 'Possono richiederla tutti i dipendenti a tempo indeterminato e i pensionati, con almeno 6 mesi di servizio o di pensionamento.' },
  { q: "Qual è l'importo massimo della trattenuta?", a: "La trattenuta non può superare il 20% dello stipendio o della pensione netta. Questo garantisce che la rata sia sostenibile." },
  { q: 'Qual è la durata massima del prestito?', a: 'La durata massima è di 120 mesi (10 anni). La rata è fissa e rimane invariata per tutta la durata del prestito.' },
  { q: 'Serve una garanzia per la cessione del quinto?', a: 'No, la cessione del quinto non richiede garanzie aggiuntive. La trattenuta in busta paga funge già da garanzia per la banca.' },
];

export default function PrestitoCessioneQuintoClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200" alt="" fill priority className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        <div className="site-container relative z-10">
          <Breadcrumbs className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80" items={[{ label: 'Home', href: '/' }, { label: 'Cessione del Quinto' }]} />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-5 py-2 text-sm font-bold text-secondary">
              Cessione del Quinto
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-display font-black tracking-tight">
              Cessione del Quinto
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75">
              La rata direttamente dalla busta paga
            </motion.p>
            <motion.div variants={staggerChildren} initial="initial" animate="animate" className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {['Rata trattenuta automaticamente', 'Nessun garante', 'Importo basato sullo stipendio', 'Durata fino a 120 mesi'].map((f) => (
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
            <h2 className="section-heading mb-10">La cessione del quinto</h2>
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
            <h2 className="section-heading mb-10">I vantaggi della cessione del quinto</h2>
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
          <h2 className="text-section-title font-black">Richiedi la cessione del quinto ora</h2>
          <p className="mt-4 text-white/75">La rata direttamente dalla tua busta paga. Nessun garante, nessuna complicazione.</p>
          <Link href="/calcola" className="btn-cyan mt-8 inline-flex px-8 py-4">Calcola la rata <ArrowRight size={16} /></Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
