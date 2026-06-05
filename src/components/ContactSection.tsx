'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TestimonialSlider from '@/components/Testimonials';
import { siteConfig } from '@/config/site';
import { fadeInUp } from '@/lib/motion';

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
        body: JSON.stringify({ ...data, sourcePage: '/#contatti' }),
      });
      if (!response.ok) throw new Error();
      setContactStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setContactStatus('error');
    }
  };

  return (
    <section id="contatti" className="section-pad relative overflow-hidden bg-mesh-dark">
      <div className="site-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">

          <motion.div {...fadeInUp} className="rounded-xl bg-white p-6 sm:p-8 lg:p-10" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">Hai una domanda?</h2>
            <p className="mb-7 mt-2 text-slate-500">La nostra squadra è a tua completa disposizione.</p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />
              <div>
                <label htmlFor="contact-nome" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">Nome</label>
                <input id="contact-nome" name="nome" required className="field-shell" placeholder="Il tuo nome" />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">Email</label>
                <input id="contact-email" name="email" type="email" required className="field-shell" placeholder="nome@email.it" />
              </div>
              <div>
                <label htmlFor="contact-oggetto" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">Oggetto</label>
                <input id="contact-oggetto" name="oggetto" required className="field-shell" placeholder="Di cosa hai bisogno?" />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">Messaggio</label>
                <textarea id="contact-message" name="message" required rows={4} className="field-shell min-h-[120px] resize-y" placeholder="Scrivi qui il tuo messaggio..." />
              </div>
              <button type="submit" disabled={contactStatus === 'loading'} className="btn-primary w-full py-4">
                {contactStatus === 'loading' ? 'Invio in corso...' : 'Invia messaggio'}
              </button>
              {contactStatus === 'success' && (
                <p className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700">
                  Messaggio inviato! Ti risponderemo al più presto.
                </p>
              )}
              {contactStatus === 'error' && (
                <p className="rounded-lg border border-red-100 bg-red-50 p-4 text-center text-sm font-bold text-red-500">
                  Errore durante l&apos;invio. Riprova o scrivici a {siteConfig.contact.email}.
                </p>
              )}
            </form>
          </motion.div>

          <motion.div {...fadeInUp} className="lg:pt-4">
            <TestimonialSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
