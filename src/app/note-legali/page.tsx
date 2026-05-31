'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function NoteLegali() {
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
            Note Legali
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-soft border border-slate-100 prose prose-slate max-w-none hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
          >
            <p><strong>Informazioni Societarie</strong></p>
            <p>Monivia S.p.A.</p>
            <p>Sede Legale: Via Dante, 10 - 20121 Milano (MI)</p>
            <p>P.IVA: 01234567890</p>
            <p>Iscrizione OAM n. M123456</p>
            
            <h3>Messaggio pubblicitario con finalità promozionale</h3>
            <p>Tutte le operazioni di finanziamento sono soggette ad approvazione da parte degli istituti eroganti. Prima di sottoscrivere il contratto, si prega di leggere attentamente il modulo SECCI e le Informazioni Europee di Base sul Credito ai Consumatori.</p>
            <p>Le condizioni riportate sul sito sono a titolo di esempio e possono variare in base al profilo finanziario del richiedente.</p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
