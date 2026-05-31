'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Trasparenza() {
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
            Trasparenza Bancaria
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-soft border border-slate-100 prose prose-slate max-w-none hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
          >
             <p>In ottemperanza alle disposizioni della Banca d&apos;Italia in materia di &quot;Trasparenza delle operazioni e dei servizi bancari e finanziari&quot;, mettiamo a disposizione del pubblico i fogli informativi dei nostri prodotti.</p>
            
            <div className="mt-8 space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center bg-slate-50 hover:border-secondary/30 transition-all cursor-pointer">
                <span className="font-bold">Guida al Credito ai Consumatori</span>
                <button className="text-secondary font-bold text-sm uppercase">Scarica PDF</button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center bg-slate-50 hover:border-secondary/30 transition-all cursor-pointer">
                <span className="font-bold">Guida Arbitro Bancario Finanziario (ABF)</span>
                <button className="text-secondary font-bold text-sm uppercase">Scarica PDF</button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center bg-slate-50 hover:border-secondary/30 transition-all cursor-pointer">
                <span className="font-bold">Tassi Effettivi Globali Medi (TEGM)</span>
                <button className="text-secondary font-bold text-sm uppercase">Scarica PDF</button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
