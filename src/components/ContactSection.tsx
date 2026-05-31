'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TestimonialSlider from '@/components/Testimonials';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export default function ContactSection() {
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error();
      setContactStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setContactStatus('error');
    }
  };

  return (
    <section id="contatti" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image src="/assets/business_bg.png" alt="Background" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Form */}
          <motion.div {...fadeInUp} className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl font-black text-primary mb-2">Hai una domanda?</h3>
            <p className="text-slate-500 mb-8">Il nostro team è a tua completa disposizione.</p>
            
             <form onSubmit={handleContactSubmit} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <input name="nome" type="text" placeholder="Nome Completo" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" required />
                 <input name="email" type="email" placeholder="Indirizzo E-mail" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" required />
               </div>
               <input name="oggetto" type="text" placeholder="Oggetto" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors text-slate-800" required />
               <textarea name="message" placeholder="Il tuo messaggio..." rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors resize-none text-slate-800" required></textarea>
               <button type="submit" disabled={contactStatus === 'loading'} className="w-full btn-primary py-4 text-sm font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform disabled:opacity-50">
                 {contactStatus === 'loading' ? 'Invio in corso...' : contactStatus === 'success' ? 'Messaggio Inviato!' : 'Invia Messaggio'}
               </button>
               {contactStatus === 'error' && <p className="text-red-500 text-xs text-center font-bold">Errore durante l&apos;invio. Riprova più tardi.</p>}
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
  );
}
