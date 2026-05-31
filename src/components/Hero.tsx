'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 200, damping: 20 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-44 md:pb-56 overflow-hidden">
      {/* Background Image - Professional with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform origin-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Image
            src="/assets/pro_bg.png"
            alt="Distretto Finanziario - Prestiti Professionali"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-primary/20"></div>
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
            <motion.div variants={fadeInUp} className="relative flex md:inline-flex items-center justify-center gap-4 mb-8 group text-center w-full md:w-auto">
              <div className="hidden md:flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <div className="h-px w-8 bg-secondary/50"></div>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-white/90 uppercase tracking-[0.25em] drop-shadow-md px-4 md:px-0">
                Finanziamenti Corporate & Privati <span className="mx-2 sm:mx-3 text-secondary/50">|</span> da 5.000€ a più di 500.000€
              </span>
              <div className="h-px w-8 bg-secondary/50 hidden md:block"></div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[100px] font-black text-white leading-[0.95] mb-8 tracking-tighter drop-shadow-2xl">
              Il tuo partner <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-blue-400">finanziario.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-300 font-medium mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md px-4 md:px-0">
              Soluzioni di credito flessibili e trasparenti per realizzare i tuoi progetti più importanti. Tassi fissi dal <span className="text-white font-black">2%</span>.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md mx-auto sm:max-w-none">
              <Link href="#calcolatore" className="btn-primary px-12 py-5 text-sm uppercase tracking-widest font-black rounded-2xl shadow-glow transition-all w-full sm:w-auto text-center">
                Calcola Rata
              </Link>
              <Link href="#richiedi" className="bg-white text-primary px-12 py-5 text-sm uppercase tracking-widest font-black rounded-2xl hover:bg-secondary hover:text-white transition-all duration-300 shadow-glass w-full sm:w-auto text-center hover:scale-105 active:scale-95">
                Richiedi Ora
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex flex-wrap justify-center gap-10 md:gap-20 opacity-80"
            >
              {[
                { label: "Sicurezza", sub: "Bancaria" },
                { label: "Approvazione", sub: "48 Ore" },
                { label: "Firma", sub: "Digitale" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  whileHover={{ y: -5, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mb-3 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">{item.label}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{item.sub}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
