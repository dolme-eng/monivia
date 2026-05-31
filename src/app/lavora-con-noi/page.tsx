'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function LavoraConNoi() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      <Navbar />
      <section className="pt-40 pb-24 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent rounded-full blur-[120px] -z-10"></div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-4xl md:text-6xl font-black text-primary mb-6"
          >
            Lavora con noi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="text-xl text-slate-500 mb-12"
          >
            Unisciti al team di Monivia e aiutaci a rivoluzionare il mondo del credito.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
            className="bg-white p-8 md:p-16 rounded-[40px] shadow-soft border border-slate-100 hover:shadow-2xl hover:shadow-secondary/10 hover:border-secondary/20 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-primary mb-4">Posizioni aperte</h3>
            <p className="text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto">
              Al momento non ci sono posizioni aperte, ma siamo sempre alla ricerca di talenti creativi e motivati. Inviaci il tuo CV!
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:lavoro@monivia.it" 
              className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-secondary/20"
            >
              Invia Candidatura Spontanea
            </motion.a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
