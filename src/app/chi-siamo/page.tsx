'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ChiSiamo() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-primary relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image src="/assets/business_bg.png" alt="Business district background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary"></div>
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black mb-6 drop-shadow-xl"
          >
            Chi Siamo
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.3 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto drop-shadow-md"
          >
            Siamo un attore di primo piano nella concessione di crediti a privati e professionisti.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Il nostro impegno per il tuo futuro</h2>
              <p className="text-slate-600 mb-8 md:mb-6 leading-relaxed">
                Costituita come istituzione finanziaria, siamo oggi un punto di riferimento nel settore del credito.
                Offriamo i nostri migliori servizi ai clienti, che si tratti di un credito a breve, medio o lungo termine.
                Monivia si è prefissata la missione di promuovere il finanziamento ovunque ce ne sia bisogno.
              </p>
              <div className="space-y-8 md:space-y-6">
                <motion.div whileHover={{ x: 10 }} transition={{ type: "spring" }} className="flex flex-col md:flex-row items-center md:items-start gap-4 cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-sm border border-secondary/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1 md:mb-0">10+ Anni di esperienza</h4>
                    <p className="text-slate-500 text-sm">Abbiamo l&apos;esperienza necessaria per offrirti le migliori soluzioni.</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} transition={{ type: "spring" }} className="flex flex-col md:flex-row items-center md:items-start gap-4 cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-sm border border-secondary/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1 md:mb-0">Istituzione di fiducia</h4>
                    <p className="text-slate-500 text-sm">Migliaia di clienti si affidano a noi ogni anno al 100%.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl hover:shadow-secondary/20 transition-shadow duration-500 border border-slate-100"
            >
               <Image src="/assets/premium_hero.png" alt="Chi siamo" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
