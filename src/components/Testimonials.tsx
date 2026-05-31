'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Ho richiesto un prestito per ristrutturare casa. In 48 ore avevo i soldi sul conto. Il servizio clienti è stato impeccabile e la piattaforma è facilissima da usare.",
    initials: "MR",
    name: "Marco Rossi"
  },
  {
    quote: "Avevo bisogno di liquidità per espandere la mia attività. Monivia mi ha offerto un tasso eccellente e un'assistenza personalizzata. Consigliatissimo!",
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
    quote: "Da libero professionista spesso trovo ostacoli nei finanziamenti. Monivia invece ha capito subito le mie esigenze. Ottimo partner.",
    initials: "GP",
    name: "Giovanni P."
  },
  {
    quote: "Sito intuitivo, supporto veloce su WhatsApp e tassi super competitivi. Senza dubbio il miglior servizio di credito online in Italia.",
    initials: "EC",
    name: "Elena C."
  }
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative bg-white/5 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 border border-white/10 shadow-glass overflow-hidden flex flex-col justify-between min-h-[350px]">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-6 opacity-80 shrink-0 md:w-10 md:h-10"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
      
      <div className="grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                setIndex((prev) => (prev + 1) % testimonials.length);
              } else if (swipe > swipeConfidenceThreshold) {
                setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }
            }}
            className="cursor-grab active:cursor-grabbing w-full"
          >
            <div className="flex gap-1 md:gap-1.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] md:w-[18px] md:h-[18px]">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-lg md:text-xl lg:text-2xl italic font-medium leading-relaxed mb-8 text-white/90">
              &quot;{testimonials[index].quote}&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-secondary to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-secondary/40">
                {testimonials[index].initials}
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">{testimonials[index].name}</h4>
                <p className="text-[10px] text-secondary uppercase tracking-[0.2em] font-black">Cliente Verificato</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center md:justify-end md:absolute md:bottom-10 md:right-10 mt-8 md:mt-0 gap-3 relative z-10">
        {testimonials.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`relative h-2 rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${i === index ? 'w-8' : 'w-2'}`}
            aria-label={`Vai alla slide ${i + 1}`}
          >
            <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${i === index ? 'bg-secondary' : 'bg-white/20 hover:bg-white/40'}`}></span>
          </button>
        ))}
      </div>
    </div>
  );
}
