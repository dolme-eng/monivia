'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Building2, Coins, Rocket } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export default function OffersTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="prestiti" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">Le Nostre Offerte di Credito</h2>
          <p className="text-lg text-slate-500">Scegli la soluzione più adatta alle tue esigenze finanziarie.</p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tab Navigation */}
          <div className="w-full lg:w-1/3 flex flex-row overflow-x-auto pb-4 lg:pb-0 lg:flex-col gap-3 lg:space-y-3 snap-x scrollbar-hide">
            {[
              { title: "Prestito Personale", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
              { title: "Prestito Auto", icon: <Car size={20} /> },
              { title: "Prestito Immobiliare", icon: <Building2 size={20} /> },
              { title: "Prestito Business", icon: <Rocket size={20} /> },
              { title: "Consolidamento Debiti", icon: <Coins size={20} /> }
            ].map((tab, i) => (
              <button 
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative flex items-center gap-3 md:gap-4 px-5 md:px-6 py-4 md:py-5 rounded-2xl font-bold transition-colors text-left whitespace-nowrap lg:whitespace-normal shrink-0 snap-start z-10 focus-visible:ring-2 focus-visible:ring-secondary/50 outline-none ${activeTab === i ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {activeTab === i && (
                  <motion.div 
                    layoutId="activeTabPill" 
                    className="absolute inset-0 bg-primary rounded-2xl shadow-xl shadow-primary/20 -z-10" 
                    transition={{ type: "spring", stiffness: 300, damping: 25 }} 
                  />
                )}
                {activeTab !== i && (
                  <div className="absolute inset-0 bg-slate-50 hover:bg-slate-100 rounded-2xl -z-10 transition-colors"></div>
                )}
                <div className={`relative z-10 transition-colors ${activeTab === i ? 'text-secondary' : 'text-slate-400'}`}>{tab.icon}</div>
                <span className="text-sm md:text-base relative z-10 transition-colors">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full lg:w-2/3 bg-slate-50 rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-10 items-center h-full"
              >
                <div className="w-full md:w-1/2 z-10">
                  <h3 className="text-3xl font-black text-primary mb-6 leading-tight">
                    {activeTab === 0 && "Prestito Personale"}
                    {activeTab === 1 && "Prestito Auto"}
                    {activeTab === 2 && "Prestito Immobiliare"}
                    {activeTab === 3 && "Prestito Business"}
                    {activeTab === 4 && "Consolidamento Debiti"}
                  </h3>
                  <div className="text-slate-600 space-y-4 mb-10 text-sm md:text-base leading-relaxed">
                    {activeTab === 0 && <><p>Realizza i tuoi sogni con i nostri prestiti personali. Rispondi alle tue esigenze finanziarie con tassi di interesse agevolati.</p><p>Devi finanziare un evento familiare, un viaggio o un acquisto imprevisto? È la soluzione su misura ideale.</p></>}
                    {activeTab === 1 && <><p>La soluzione ideale per il tuo nuovo veicolo. Finanziamento dedicato all&apos;acquisto di auto o moto, nuove o usate.</p><p>Se non disponi del capitale necessario, il nostro credito auto è la scelta più intelligente e veloce.</p></>}
                    {activeTab === 2 && <><p>Trasforma in realtà il sogno di acquistare casa. Perché pagare l&apos;affitto quando puoi comprare?</p><p>Un prestito a lungo termine studiato per l&apos;acquisto della tua prima abitazione con condizioni flessibili e trasparenti.</p></>}
                    {activeTab === 3 && <><p>Investi in nuovi macchinari, espandi la tua attività o rinnova le strutture senza intaccare la liquidità aziendale.</p><p>Supportiamo la crescita della tua impresa con finanziamenti corporate veloci.</p></>}
                    {activeTab === 4 && <><p>Un unico prestito per rimborsare tutti i tuoi debiti in corso. Semplifica la tua vita con una sola rata mensile più leggera.</p><p>Raggruppa i tuoi finanziamenti in pochi clic e riprendi il controllo del tuo budget.</p></>}
                  </div>
                  <Link href="#richiedi" className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-xs font-black uppercase tracking-widest rounded-2xl group shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    Richiedi Preventivo <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
                <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
                  <div className="relative h-full w-full rounded-[30px] overflow-hidden shadow-2xl">
                     {activeTab === 0 && <Image src="/assets/hero_lifestyle.png" alt="Personale" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
                    {activeTab === 1 && <Image src="/assets/consultation.png" alt="Auto" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
                    {activeTab === 2 && <Image src="/assets/premium_hero.png" alt="Immobiliare" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
                    {activeTab === 3 && <Image src="/assets/pro_bg.png" alt="Business" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
                    {activeTab === 4 && <Image src="/assets/hero_lifestyle_new.png" alt="Consolidamento" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
