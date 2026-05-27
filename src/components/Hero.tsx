'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Image - Professional */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/pro_bg.png" 
          alt="Distretto Finanziario - Prestiti Professionali" 
          fill 
          className="object-cover"
          priority
        />
        {/* Dark overlay to make white text pop while keeping image visible and sharp */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center"
          >
            {/* Clean Eyebrow Text (No Background) */}
            <motion.div variants={fadeInUp} className="relative flex md:inline-flex items-center justify-center gap-4 mb-10 group text-center w-full md:w-auto">
              <div className="hidden md:flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <div className="h-px w-8 bg-secondary/50"></div>
              </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-black text-white uppercase tracking-[0.25em] drop-shadow-md px-4 md:px-0">
                  Finanziamenti Corporate & Privati <span className="mx-2 sm:mx-3 text-secondary/50">|</span> Fino a 100.000€
                </span>
              <div className="h-px w-8 bg-secondary/50 hidden md:block"></div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[90px] font-black text-white leading-none mb-6 md:mb-8 tracking-tighter drop-shadow-xl">
              Il tuo partner <br/>
              <span className="text-secondary">finanziario.</span>
            </motion.h1>
            
               <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-200 font-medium mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md px-4 md:px-0">
                 Soluzioni di credito flessibili e trasparenti per realizzare i tuoi progetti più importanti. Tassi fissi dal 2%.
               </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md mx-auto sm:max-w-none">
               <Link href="#calcolatore" className="btn-primary px-12 py-5 text-sm uppercase tracking-widest font-black rounded-3xl shadow-xl hover:-translate-y-1 transition-transform w-full sm:w-auto text-center">
                 Calcola Rata
               </Link>
               <Link href="#richiedi" className="bg-transparent text-white border-2 border-white px-12 py-5 text-sm uppercase tracking-widest font-black rounded-3xl hover:bg-white hover:text-primary transition-all shadow-lg w-full sm:w-auto text-center">
                 Richiedi Ora
               </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70"
            >
               {[
                 { label: "Sicurezza", sub: "Bancaria" },
                 { label: "Approvazione", sub: "48 Ore" },
                 { label: "Firma", sub: "Digitale" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-secondary mb-2"></div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-white">{item.label}</span>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{item.sub}</span>
                 </div>
               ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
