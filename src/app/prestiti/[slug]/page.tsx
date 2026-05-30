'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoanForm from '@/components/LoanForm';
import { motion } from 'framer-motion';
import { Car, Building2, Coins, Rocket } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

interface LoanInfo {
  title: string;
  icon: React.ReactNode;
  desc: string;
  benefits: string[];
}

const loanData: Record<string, LoanInfo> = {
  'auto': {
    title: 'Prestito Auto',
    icon: <Car size={48} />,
    desc: 'Finanzia la tua nuova auto, nuova o usata, con tassi agevolati.',
    benefits: ['Fino a 50.000€', 'Erogazione rapida', 'Assicurazione inclusa opzionale']
  },
   'immobiliare': {
     title: 'Prestito Immobiliare',
     icon: <Building2 size={48} />,
     desc: 'Ristruttura la tua casa o acquista il tuo primo immobile.',
     benefits: ['Fino a più di 500.000€', 'Piani fino a 120 mesi', 'Perizia gratuita']
   },
  'consolidamento': {
    title: 'Consolidamento Debiti',
    icon: <Coins size={48} />,
    desc: 'Raggruppa tutti i tuoi prestiti in un\'unica rata mensile più bassa.',
    benefits: ['Rata unica', 'Minori interessi totali', 'Gestione semplificata']
  },
  'business': {
    title: 'Prestito Business',
    icon: <Rocket size={48} />,
    desc: 'Supporto concreto per la crescita della tua impresa o startup.',
    benefits: ['Liquidità immediata', 'Piani ammortamento flessibili', 'Consulenza dedicata']
  }
};

export default function PrestitoDettaglio() {
  const params = useParams();
  const slug = params.slug as string;
  const data = loanData[slug];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Product Hero */}
      <section className="pt-40 pb-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] z-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 text-secondary"
          >
            {data.icon}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-primary mb-6"
          >
            {data.title} <span className="text-secondary">Finora</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-slate-500 mb-10 leading-relaxed"
          >
            {data.desc}
          </motion.p>
          
          <motion.div 
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-wrap justify-center gap-6"
          >
            {data.benefits.map((benefit: string, i: number) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-200 text-sm font-bold text-primary shadow-sm hover:border-secondary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                {benefit}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Product Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-16"
            >
              <motion.div variants={fadeInUp} className="text-center md:text-left">
                <h3 className="text-3xl font-black text-primary mb-8">Perché sceglierci?</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Con Finora, il processo è 100% digitale. Non dovrai recarti in filiale né spedire documenti cartacei. 
                  Il nostro algoritmo analizza la tua richiesta in tempo reale per offrirti l&apos;approvazione più veloce sul mercato.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <h5 className="font-black text-primary mb-3">Tasso Fisso 2%</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">Nessuna sorpresa, la tua rata rimane bloccata per tutta la durata.</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <h5 className="font-black text-primary mb-3">Risposta 48h</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">Ricevi l&apos;esito della tua pratique entro due giorni lavorativi.</p>
                  </div>
                </div>
              </motion.div>
      
              <motion.div variants={fadeInUp} className="text-center md:text-left">
                <h3 className="text-3xl font-black text-primary mb-8">Documenti richiesti</h3>
                <div className="space-y-4">
                  {['Carta d&apos;identità valida', 'Codice Fiscale', 'Ultima busta paga o Modello Unico', 'IBAN del tuo conto corrente'].map((doc, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeInUp}
                      className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5 p-6 rounded-[24px] bg-white border border-slate-100 hover:border-secondary/20 transition-all shadow-sm text-center md:text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black text-sm shrink-0">{i+1}</div>
                      <span className="font-bold text-slate-700">{doc}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
      
            {/* Form Integration */}
            <div id="richiedi" className="bg-slate-50 p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-inner sticky top-32">
               <div className="text-center mb-10">
                 <h4 className="text-3xl font-black text-primary mb-2">Richiedi ora</h4>
                 <p className="text-sm text-slate-500">Inizia la tua pratica online in soli 5 minuti.</p>
               </div>
               <LoanForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
