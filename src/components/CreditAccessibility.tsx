'use client';

import { motion } from 'framer-motion';

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

export default function CreditAccessibility() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full mb-6 border border-secondary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Accessibilità Totale
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 leading-tight">
              Il credito per tutti, <br className="hidden md:block"/> senza barriere
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Offriamo soluzioni di finanziamento da <span className="text-primary font-black">5.000€ a più di 1.000.000€</span>, 
              progettate per dare a tutti la possibilità di realizzare i propri progetti.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: "Segnalati CRIF", 
                desc: "Analizziamo la tua situazione attuale per trovare la soluzione più adatta, superando i limiti dei sistemi automatici.",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg> 
              },
              { 
                title: "Senza Busta Paga", 
                desc: "Lavoratori autonomi, freelance o senza contratto fisso? Valutiamo il tuo merito creditizio in modo flessibile.",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              },
              { 
                title: "Pensionati", 
                desc: "Soluzioni dedicate a chi è in pensione, per integrare il budget mensile o aiutare la propria famiglia.",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-soft hover:shadow-2xl hover:shadow-secondary/10 hover:border-secondary/20 transition-all duration-500 group text-center md:text-left relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto md:mx-0 mb-6 group-hover:bg-secondary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm relative z-10">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-primary mb-3 relative z-10 group-hover:text-secondary transition-colors duration-300">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
