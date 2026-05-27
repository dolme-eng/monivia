'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import LoanForm from '@/components/LoanForm';
import SimulatorHorizontal from '@/components/SimulatorHorizontal';
import { Car, Building2, Coins, Rocket } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

function AnimatedCounter({ end, duration = 2.5, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        setCount(Math.floor(easeProgress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString('it-IT')}{suffix}</span>;
}

const testimonials = [
  {
    quote: "Ho richiesto un prestito per ristrutturare casa. In 48 ore avevo i soldi sul conto. Il servizio clienti è stato impeccabile e la piattaforma è facilissima da usare.",
    initials: "MR",
    name: "Marco Rossi"
  },
  {
    quote: "Avevo bisogno di liquidità per espandere la mia attività. Finora mi ha offerto un tasso eccellente e un'assistenza personalizzata. Consigliatissimo!",
    initials: "GL",
    name: "Giulia L."
  },
  {
    quote: "Processo 100% online, zero scartoffie e nessuna perdita di tempo. Esattamente quello che cercavo per il mio nuovo veicolo commerciale.",
    initials: "FB",
    name: "Francesco B."
  },
  {
    quote: "Professionalità e cortesia. Hanno risposto a tutte le mie domande e mi hanno guidato verso la soluzione migliore per il mio budget.",
    initials: "AV",
    name: "Alessia V."
  },
  {
    quote: "La trasparenza delle condizioni mi ha convinto subito. Niente costi nascosti e tasso fisso. Un'esperienza di credito finalmente serena.",
    initials: "LD",
    name: "Luca D."
  },
  {
    quote: "Non pensavo fosse così veloce ottenere un prestito importante. In due giorni la somma era disponibile per l'acquisto del mio studio.",
    initials: "SM",
    name: "Sara M."
  },
  {
    quote: "Da libero professionista spesso trovo ostacoli nei finanziamenti. Finora invece ha capito subito le mie esigenze. Ottimo partner.",
    initials: "GP",
    name: "Giovanni P."
  },
  {
    quote: "Sito intuitivo, supporto veloce su WhatsApp e tassi super competitivi. Senza dubbio il miglior servizio di credito online in Italia.",
    initials: "EC",
    name: "Elena C."
  }
];

function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-[30px] p-8 md:p-10 border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between min-h-[350px]">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-6 opacity-80 shrink-0"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
      
      <div className="grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-1.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" className="text-yellow-400 drop-shadow-sm">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-xl italic font-medium leading-relaxed mb-8">
              &quot;{testimonials[index].quote}&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-secondary/30">
                {testimonials[index].initials}
              </div>
              <div>
                <h4 className="font-bold text-lg">{testimonials[index].name}</h4>
                <p className="text-xs text-slate-300 uppercase tracking-widest font-bold">Cliente Verificato</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-10 flex gap-2">
        {testimonials.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-secondary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            aria-label={`Vai alla slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Simulator Section - Horizontal Floating */}
      <section id="calcolatore" className="relative z-20 mt-8 md:-mt-16 px-4 md:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SimulatorHorizontal />
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <motion.section 
        {...fadeInUp}
        className="py-16 relative overflow-hidden"
      >
        <Image src="/assets/business_bg.png" alt="Trust Background" fill className="object-cover object-center z-[-2]" />
        <div className="absolute inset-0 bg-slate-900/85 z-[-1]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <p className="text-center text-xs md:text-sm uppercase tracking-tighter font-black text-slate-400 mb-10">
            Partner di fiducia e certificazioni istituzionali
          </p>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500"
          >
             {["OAM CERTIFICATO", "GDPR COMPLIANT", "SSL SECURE", "BANCA D'ITALIA"].map((text, i) => (
               <motion.div 
                key={i}
                variants={fadeInUp}
                className={`text-xl md:text-2xl font-black text-white tracking-tighter italic ${i % 2 === 0 ? 'underline decoration-secondary decoration-4 underline-offset-4' : ''}`}
               >
                 {text}
               </motion.div>
             ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
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
                Perché scegliere <span className="text-gradient">Finora</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-8">
                La trasparenza e la velocità al servizio del tuo successo finanziario. 
                Siamo l&apos;intermediario digitale numero uno per affidabilité e sicurezza dei processi.
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

      {/* Video Promo Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <Image src="/assets/business_bg.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full mb-6 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Video Presentazione
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Il futuro del credito, <br className="hidden md:block"/> spiegato in 60 secondi
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Guarda come abbiamo semplificato il processo di finanziamento per offrirti la migliore esperienza digitale sul mercato.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto relative rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group aspect-video bg-slate-900 cursor-pointer"
          >
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-24 h-24 bg-secondary text-white rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-secondary/40 pl-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
            
            {/* Fake Video Player UI */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden mb-4">
                <div className="h-full w-1/3 bg-secondary"></div>
              </div>
              <div className="flex justify-between text-white/80 text-xs font-bold">
                <span>0:24</span>
                <span>1:00</span>
              </div>
            </div>

            {/* Video Poster Image */}
            <Image 
              src="/assets/premium_hero.png" 
              alt="Video Promo Poster" 
              fill 
              className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105" 
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 38226, label: "Dossier Finanziati", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-3 text-secondary"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
              { num: 45761, label: "Clienti Soddisfatti", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-3 text-secondary"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg> },
              { num: 10, suffix: "+", label: "Anni d'Esperienza", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-3 text-secondary"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> },
              { num: 12, label: "Premi Vinti", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-3 text-secondary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-6">
                {stat.icon}
                <h4 className="text-4xl md:text-5xl font-black text-primary mb-2">
                  <AnimatedCounter end={stat.num} suffix={stat.suffix} />
                </h4>
                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Tabs Section (Nos Offres) */}
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
                  className={`flex items-center gap-3 md:gap-4 px-5 md:px-6 py-4 md:py-5 rounded-2xl font-bold transition-all text-left whitespace-nowrap lg:whitespace-normal shrink-0 snap-start ${activeTab === i ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02] z-10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:scale-[1.01]'}`}
                >
                  <div className={`${activeTab === i ? 'text-secondary' : 'text-slate-400'}`}>{tab.icon}</div>
                  <span className="text-sm md:text-base">{tab.title}</span>
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
                      {activeTab === 0 && <Image src="/assets/hero_lifestyle.png" alt="Personale" fill className="object-cover" />}
                      {activeTab === 1 && <Image src="/assets/consultation.png" alt="Auto" fill className="object-cover" />}
                      {activeTab === 2 && <Image src="/assets/premium_hero.png" alt="Immobiliare" fill className="object-cover" />}
                      {activeTab === 3 && <Image src="/assets/pro_bg.png" alt="Business" fill className="object-cover" />}
                      {activeTab === 4 && <Image src="/assets/hero_lifestyle_new.png" alt="Consolidamento" fill className="object-cover" />}
                      <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-step Form Section */}
       <section id="richiedi" className="py-24 bg-white">
         <div className="container mx-auto px-6">
           <motion.div 
             {...fadeInUp}
             className="text-center mb-16"
           >
             <div className="inline-block bg-secondary/10 text-secondary px-6 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-widest mb-6 border border-secondary/20 shadow-sm">
               PUOI OTTENERE UN PRESTITO A PARTIRE DA 5.000€ ANCHE SE SEI SEGNALATO CRIF O SE NON HAI UNA BUSTA PAGA
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">Richiedi il tuo prestito online</h2>
             <p className="text-lg text-slate-500">Pochi minuti per una risposta garantita in 48 ore lavorative.</p>
           </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LoanForm />
          </motion.div>
        </div>
      </section>
      {/* Contact & Testimonials Section */}
      <section id="contatti" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/assets/business_bg.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contact Form */}
            <motion.div {...fadeInUp} className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl font-black text-primary mb-2">Hai una domanda?</h3>
              <p className="text-slate-500 mb-8">Il nostro team è a tua completa disposizione.</p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Nome Completo" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" />
                  <input type="email" placeholder="Indirizzo E-mail" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" />
                </div>
                <input type="text" placeholder="Oggetto" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" />
                <textarea placeholder="Il tuo messaggio..." rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors resize-none text-slate-800"></textarea>
                <button type="button" className="w-full btn-primary py-4 text-sm font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform">Invia Messaggio</button>
              </form>
            </motion.div>

            {/* Testimonials */}
            <motion.div {...fadeInUp} className="text-white">
              <div className="mb-12">
                <h3 className="text-4xl md:text-5xl font-black mb-4">Cosa dicono i nostri clienti</h3>
                <p className="text-lg text-slate-300">La trasparenza e la velocità sono i nostri punti di forza. Ecco l&apos;esperienza di chi ci ha già scelto.</p>
              </div>
              
              <TestimonialSlider />
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
