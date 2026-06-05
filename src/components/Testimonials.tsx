'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion';

const testimonials = [
  { quote: 'Ho richiesto un prestito per ristrutturare casa. In 48 ore avevo i soldi sul conto. Il servizio clienti è stato impeccabile e la piattaforma è facilissima da usare.', initials: 'MR', name: 'Marco Rossi' },
  { quote: 'Avevo bisogno di liquidità per espandere la mia attività. Monivia mi ha offerto un tasso eccellente e un\'assistenza personalizzata. Consigliatissimo!', initials: 'GL', name: 'Giulia L.' },
  { quote: 'Processo 100% online, zero scartoffie e nessuna perdita di tempo. Esattamente quello che cercavo per il mio nuovo veicolo commerciale.', initials: 'FB', name: 'Francesco B.' },
  { quote: 'Professionalità e cortesia. Hanno risposto a tutte le mie domande e mi hanno guidato verso la soluzione migliore per il mio budget.', initials: 'AV', name: 'Alessia V.' },
  { quote: 'La trasparenza delle condizioni mi ha convinto subito. Niente costi nascosti e tasso fisso. Un\'esperienza di credito finalmente serena.', initials: 'LD', name: 'Luca D.' },
  { quote: 'Non pensavo fosse così veloce ottenere un prestito importante. In due giorni la somma era disponibile per l\'acquisto del mio studio.', initials: 'SM', name: 'Sara M.' },
  { quote: 'Da libero professionista spesso trovo ostacoli nei finanziamenti. Monivia invece ha capito subito le mie esigenze. Ottimo partner.', initials: 'GP', name: 'Giovanni P.' },
  { quote: 'Sito intuitivo, supporto veloce su WhatsApp e tassi super competitivi. Senza dubbio il miglior servizio di credito online in Italia.', initials: 'EC', name: 'Elena C.' },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const goPrev = useCallback(
    () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length),
    []
  );
  const goNext = useCallback(
    () => setIndex((prev) => (prev + 1) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <div
      className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-[#0f1f35] p-6 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
    >
      {/* Quote icon */}
      <Quote size={28} className="mb-5 shrink-0 text-accent opacity-80" aria-hidden />

      <div className="relative grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -30 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) goNext();
              else if (swipe > swipeConfidenceThreshold) goPrev();
            }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            {/* Stars — last star uses accent color */}
            <div className="mb-4 flex gap-1" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i === 4 ? 'var(--color-accent)' : '#FACC15'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="mb-6 text-base font-medium italic leading-relaxed text-white/88 sm:text-lg">
              &quot;{testimonials[index].quote}&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-base font-black text-primary">
                {testimonials[index].initials}
              </div>
              <div>
                <p className="text-base font-bold text-white">{testimonials[index].name}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Cliente verificato</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button type="button" onClick={goPrev} aria-label="Recensione precedente"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-primary text-white transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={goNext} aria-label="Recensione successiva"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-primary text-white transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex gap-1.5" role="tablist" aria-label="Seleziona recensione">
          {testimonials.map((_, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === index}
              onClick={() => setIndex(i)}
              aria-label={`Recensione ${i + 1} di ${testimonials.length}`}
              className={`h-1.5 rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-secondary ${i === index ? 'w-7 bg-secondary' : 'w-1.5 bg-white/25 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
