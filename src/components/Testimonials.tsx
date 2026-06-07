'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion';

const testimonials = [
  { quote: 'Ho ottenuto il finanziamento per ristrutturare la mia trattoria in 8 giorni. Servizio impeccabile.', initials: 'AB', name: 'Andrea Bianchi', city: 'Bologna', profession: 'Ristoratore', amount: '€ 75.000' },
  { quote: 'Da freelance, le banche mi davano sempre problemi. Qui ho trovato ascolto e una rata sostenibile.', initials: 'EF', name: 'Elena Ferraro', city: 'Torino', profession: 'Libera professionista', amount: '€ 22.000' },
  { quote: 'Abbiamo usato il capitale per acquistare nuovi macchinari. Tempi rispettati al giorno.', initials: 'DM', name: 'Davide Moretti', city: 'Padova', profession: 'Imprenditore edile', amount: '€ 150.000' },
  { quote: 'Ho consolidato due prestiti precedenti e risparmio € 180 al mese. Consigliatissimo.', initials: 'SC', name: 'Sara Colombo', city: 'Genova', profession: 'Farmacista', amount: '€ 45.000' },
  { quote: 'Ristrutturazione delle camere finanziata al 100%. Documentazione minimale.', initials: 'LM', name: 'Luca Marchetti', city: 'Firenze', profession: 'Titolare di B&B', amount: '€ 60.000' },
  { quote: 'Ho apprezzato la trasparenza: nessuna sorpresa sui costi, tutto chiaro dal primo preventivo.', initials: 'GR', name: 'Giulia Romano', city: 'Verona', profession: 'Avvocato', amount: '€ 35.000' },
  { quote: 'Ho ampliato il mio negozio di elettronica. Il consulente mi ha seguito passo dopo passo.', initials: 'MG', name: 'Matteo Gallo', city: 'Napoli', profession: 'Commerciante', amount: '€ 90.000' },
  { quote: 'Ho aperto il mio studio privato grazie a questo finanziamento. Risposta in 48 ore.', initials: 'CC', name: 'Chiara Costa', city: 'Trieste', profession: 'Fisioterapista', amount: '€ 28.000' },
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
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">{testimonials[index].profession} — {testimonials[index].city}</p>
                <p className="text-[10px] font-medium text-white/60">{testimonials[index].amount}</p>
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
