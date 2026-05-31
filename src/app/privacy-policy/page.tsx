'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
            Privacy Policy
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-soft border border-slate-100 prose prose-slate max-w-none hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
          >
            <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>
            <h3>1. Titolare del Trattamento</h3>
            <p>Monivia agisce come titolare del trattamento dei dati personali raccolti tramite questo sito web.</p>
            <h3>2. Dati raccolti</h3>
            <p>Raccogliamo i dati necessari per fornirti i nostri servizi finanziari, inclusi ma non limitati a: nome, email, numero di telefono, e informazioni finanziarie per la valutazione del credito.</p>
            <h3>3. Finalità del trattamento</h3>
             <p>I tuoi dati vengono utilizzati esclusivamente per l&apos;analisi della tua richiesta di prestito, per contattarti in merito ai nostri servizi e per adempiere agli obblighi di legge.</p>
            <h3>4. I tuoi diritti</h3>
             <p>Hai il diritto di accedere ai tuoi dati, chiederne la rettifica, la cancellazione o opporti al loro trattamento contattandoci all&apos;indirizzo supporto@monivia.it.</p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
