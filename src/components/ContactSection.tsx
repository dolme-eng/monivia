'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import TestimonialSlider from '@/components/Testimonials';
import { getAnalyticsSessionId, trackAnalyticsEvent } from '@/lib/analytics-client';
import { siteConfig } from '@/config/site';
import { fadeInUp } from '@/lib/motion';

export default function ContactSection() {
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const pathname = usePathname();

  useEffect(() => {
    trackAnalyticsEvent({ eventType: 'contact_form_view', page: pathname || '/' });
  }, [pathname]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue | string> = Object.fromEntries(formData.entries());
    data.analyticsSessionId = getAnalyticsSessionId();
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
    <section id="contatti" className="section-pad relative overflow-hidden bg-mesh-dark">
      <div className="site-container relative z-10">
        {/* Mobile: form first, testimonials below. Desktop: side by side */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">

          {/* Formulaire — premier sur mobile */}
          <motion.div {...fadeInUp} className="rounded-xl bg-white p-6 sm:p-8 lg:p-10" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">Hai una domanda?</h2>
            <p className="mb-7 mt-2 text-slate-500">La nostra squadra è a tua completa disposizione.</p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
              <input type="hidden" name="sourcePage" value={pathname || '/'} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cs-nome" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Nome completo</label>
                  <input id="cs-nome" name="nome" type="text" autoComplete="name" placeholder="Il tuo nome" className="field-shell" required />
                </div>
                <div>
                  <label htmlFor="cs-email" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Email</label>
                  <input id="cs-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="nome@email.it" className="field-shell" required />
                </div>
              </div>

              <div>
                <label htmlFor="cs-oggetto" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Oggetto</label>
                <input id="cs-oggetto" name="oggetto" type="text" placeholder="Oggetto del messaggio" className="field-shell" required />
              </div>

              <div>
                <label htmlFor="cs-message" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">Messaggio</label>
                <textarea id="cs-message" name="message" placeholder="Scrivi qui..." rows={4} className="field-shell resize-none" required />
              </div>

              <button type="submit" disabled={contactStatus === 'loading'} className="btn-primary w-full py-4 text-sm uppercase tracking-widest">
                {contactStatus === 'loading' ? 'Invio in corso...' : contactStatus === 'success' ? 'Messaggio inviato ✓' : 'Invia messaggio'}
              </button>

              {contactStatus === 'success' && (
                <p className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700">
                  Grazie! Ti ricontatteremo entro 48 ore lavorative. Oppure scrivici su{' '}
                  <a href={siteConfig.contact.whatsapp.link} className="text-secondary underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                </p>
              )}
              {contactStatus === 'error' && (
                <p className="text-center text-sm font-bold text-red-400">Errore durante l&apos;invio. Riprova più tardi.</p>
              )}
            </form>
          </motion.div>

          {/* Testimonials — secondo su mobile */}
          <motion.div {...fadeInUp} className="text-white">
            <div className="mb-8">
              <div className="badge-dark inline-flex mb-4">Recensioni</div>
              <h2 className="text-section-title font-black text-white">Cosa dicono i<br />nostri clienti</h2>
              <p className="mt-4 text-base text-white/65">La trasparenza e la velocità sono i nostri punti di forza.</p>
            </div>
            <TestimonialSlider />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
