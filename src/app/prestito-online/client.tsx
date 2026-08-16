'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Shield, FileCheck, Banknote, Smartphone, FileSignature, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';

const features = [
  { icon: Smartphone, title: '100% digitale', desc: 'Niente filiali, niente carta. Tutto online dal tuo smartphone.' },
  { icon: FileCheck, title: 'Nessun documento cartaceo', desc: 'Carica i documenti direttamente dalla app.' },
  { icon: Clock, title: 'Risposta in 48 ore', desc: "Esito della richiesta in due giorni lavorativi." },
  { icon: FileSignature, title: 'Firma elettronica', desc: 'Firma il contratto da remoto, senza spostamenti.' },
];

const benefits = [
  { icon: Shield, title: 'Zero spostamenti', desc: 'Non devi recarti in filiale: il processo è interamente online.' },
  { icon: Banknote, title: 'Processo trasparente', desc: 'Costi chiari fin da subito, senza sorprese.' },
  { icon: Send, title: 'Assistenza dedicata', desc: 'Un consulente ti guida passo dopo passo.' },
];

const steps = [
  { num: '01', title: 'Compila il modulo', desc: 'Inserisci i tuoi dati in pochi minuti. Nessuna documente cartaceo.' },
  { num: '02', title: 'Ricevi l\'esito', desc: 'Il nostro team valuta la tua richiesta entro 48 ore.' },
  { num: '03', title: 'Firma digitale', desc: 'Firma il contratto online con firma elettronica avanzata.' },
  { num: '04', title: 'Ricevi i fondi', desc: 'I soldi arrivano sul tuo conto in pochi giorni.' },
];

const faqItems = [
  { q: 'Come funziona il prestito online Monivia?', a: 'Compila il modulo online in 5 minuti, ricevi l\'esito entro 48 ore e firma digitalmente il contratto. I fondi vengono erogati sul tuo conto entro pochi giorni.' },
  { q: 'Quali documenti servono per richiedere un prestito online?', a: 'Servono un documento d\'identità valido, il Codice Fiscale, l\'ultimo reddito documentato e l\'IBAN del tuo conto corrente.' },
  { q: 'Quanto tempo ci vuole per ricevere i fondi?', a: 'Dall\'invio della richiesta alla ricezione dei fondi passano in media 5-7 giorni lavorativi. L\'esito della valutazione arriva entro 48 ore.' },
  { q: 'Quanto costa un prestito online Monivia?', a: 'Il tasso fisso parte dal 2% TAN. Non ci sono spese nascoste: il costo totale del prestito è indicato chiaramente nel modulo di informazione pre-contrattuale.' },
  { q: 'Posso annullare la richiesta di prestito online?', a: 'Sì, puoi rinunciare al prestito entro 14 giorni dalla firma del contratto senza alcun costo, come previsto dalla normativa europea.' },
];

export default function PrestitoOnlineClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1556742049-6726b3ff858f?w=1200" alt="" fill priority className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        <div className="site-container relative z-10">
          <Breadcrumbs className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80" items={[{ label: 'Home', href: '/' }, { label: 'Prestito Online' }]} />
          <div className="text-center">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-5 py-2 text-sm font-bold text-secondary">
              100% digitale
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-display font-black tracking-tight">
              Prestito Online
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75">
              Richiedi in 5 minuti, ricevi l&apos;esito in 48 ore
            </motion.p>
            <motion.div variants={staggerChildren} initial="initial" animate="animate" className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {['100% digitale', 'Nessun documento cartaceo', 'Risposta in 48 ore', 'Firma elettronica'].map((f) => (
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
            <h2 className="section-heading mb-10">Perché il prestito online Monivia?</h2>
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
            <h2 className="section-heading mb-10">I vantaggi del prestito online</h2>
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
          <h2 className="text-section-title font-black">Pronto a richiedere il tuo prestito online?</h2>
          <p className="mt-4 text-white/75">Compila il modulo in 5 minuti e ricevi l&apos;esito entro 48 ore.</p>
          <Link href="/calcola" className="btn-cyan mt-8 inline-flex px-8 py-4">Calcola la rata <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* Pagine correlate */}
      <section className="section-pad border-t border-slate-100 bg-slate-50">
        <div className="site-container">
          <h2 className="text-xl font-black text-slate-900">Pagine correlate</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/tariffe" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Tariffe e condizioni</h3>
              <p className="mt-2 text-xs text-slate-400">Confronta TAN e TAEG di tutti i prodotti Monivia.</p>
            </Link>
            <Link href="/calcola" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Calcola la tua rata</h3>
              <p className="mt-2 text-xs text-slate-400">Simulatore gratuito per calcolare rata mensile e costo totale.</p>
            </Link>
            <Link href="/prestiti/personale" className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-secondary">Prestito Personale</h3>
              <p className="mt-2 text-xs text-slate-400">Fino a 100.000€, tasso fisso, risposta in 48 ore.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
