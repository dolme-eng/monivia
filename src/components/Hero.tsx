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
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/40 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-white/80 via-transparent to-transparent"></div>
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
            <motion.div variants={fadeInUp} className="relative inline-flex items-center gap-4 mb-10 group">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <div className="h-px w-8 bg-secondary/50"></div>
              </div>
              <span className="text-xs md:text-sm font-black text-primary uppercase tracking-[0.25em] drop-shadow-sm">
                Finanziamenti Corporate & Privati <span className="mx-3 text-secondary/50">|</span> Fino a 700k€
              </span>
              <div className="h-px w-8 bg-secondary/50 hidden md:block"></div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-[90px] font-black text-primary leading-none mb-8 tracking-tighter drop-shadow-sm">
              Il tuo partner <br/>
              <span className="text-gradient">finanziario.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-700 font-medium mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              Soluzioni di credito flessibili e trasparenti per realizzare i tuoi progetti più importanti. Tassi fissi dal 1.99%.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md mx-auto sm:max-w-none">
               <Link href="#calcolatore" className="btn-primary px-12 py-5 text-sm uppercase tracking-widest font-black rounded-3xl shadow-xl shadow-primary/10 hover:-translate-y-1 transition-transform w-full sm:w-auto text-center">
                 Calcola Rata
               </Link>
               <Link href="#richiedi" className="bg-white/90 backdrop-blur-md text-primary border-2 border-primary px-12 py-5 text-sm uppercase tracking-widest font-black rounded-3xl hover:bg-slate-50 transition-colors shadow-lg shadow-black/5 w-full sm:w-auto text-center">
                 Richiedi Ora
               </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp}
              className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70"
            >
               {[
                 { label: "Sicurezza", sub: "Bancaria" },
                 { label: "Approvazione", sub: "48 Ore" },
                 { label: "Firma", sub: "Digitale" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-secondary mb-2"></div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-primary">{item.label}</span>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{item.sub}</span>
                 </div>
               ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
