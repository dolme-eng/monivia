'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true }
};

export default function WhyChooseUs() {
  return (
    <section id="chi-siamo" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <motion.div variants={fadeInUp} className="text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-4 md:mb-6 leading-tight">
              Perché scegliere <span className="text-gradient">Monivia</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-8">
              La trasparenza e la velocità al servizio del tuo successo finanziario. 
              Siamo l&apos;intermediario digitale numero uno per affidabilità e sicurezza dei processi.
            </p>
            <div className="space-y-4">
              {["Processo 100% Online", "Risposta in 48 ore", "Tassi fissi e trasparenti"].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="flex items-center justify-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="font-bold text-slate-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl group"
          >
            <Image 
              src="/assets/consultation.png" 
              alt="Consulenza finanziaria professionale" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            {/* Nuance / Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent"></div>
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-lg shadow-secondary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                Supporto Premium
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                I nostri esperti <br/> sempre al tuo fianco
              </h3>
              <p className="text-slate-200 text-sm font-medium">
                Consulenza dedicata per guidarti in ogni fase.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { 
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>, 
              title: "Rapido", 
              desc: "Risposta garantita entro 48 ore lavorative dalla richiesta completa." 
            },
            { 
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>, 
              title: "Sicuro", 
              desc: "Dati crittografati end-to-end e processi conformi alle normative europee." 
            },
            { 
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>, 
              title: "Trasparente", 
              desc: "Nessun costo nascosto o commissione occulta. Tutto è chiaro fin da subito." 
            }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              className="p-8 md:p-10 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl hover:border-secondary/20 transition-all group"
            >
              <div className="mb-6 p-5 rounded-2xl bg-slate-50 w-fit group-hover:bg-secondary/10 group-hover:text-secondary transition-all">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
