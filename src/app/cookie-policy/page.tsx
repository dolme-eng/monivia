'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      <Navbar />
      <section className="pt-40 pb-24 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent rounded-full blur-[120px] -z-10"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-4xl md:text-5xl font-black text-primary mb-8"
          >
            Cookie Policy
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-soft border border-slate-100 prose prose-slate max-w-none hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
          >
            <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>
            <h3>1. Cosa sono i cookie?</h3>
            <p>I cookie sono piccoli file di testo che i siti visitati inviano al tuo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.</p>
            <h3>2. Come utilizziamo i cookie</h3>
            <p>Monivia utilizza cookie tecnici necessari per il corretto funzionamento del sito e cookie analitici per comprendere come gli utenti interagiscono con la nostra piattaforma.</p>
            <h3>3. Gestione dei cookie</h3>
             <p>Puoi gestire le tue preferenze sui cookie direttamente dalle impostazioni del tuo browser, impedendone ad esempio l&apos;installazione o cancellando quelli già salvati.</p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
