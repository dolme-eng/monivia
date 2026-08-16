'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TestimonialSlider from '@/components/Testimonials';
import { siteConfig } from '@/config/site';
import { fadeInUp } from '@/lib/motion';
import { contactSchema } from '@/lib/validations';
import { getCsrfToken } from '@/lib/csrf-client';
import { ErrorMessage, fieldClass, type ContactFormValues } from '@/components/form-shared';

export default function ContactSection() {
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      nome: '',
      email: '',
      oggetto: '',
      message: '',
      sourcePage: '/#contatti',
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Errore durante l'invio");
      setContactStatus('success');
      reset();
    } catch (err) {
      setContactStatus('error');
      setErrorMessage(err instanceof Error ? err.message : "Errore durante l'invio");
    }
  };

  return (
    <section id="contatti" className="section-pad relative overflow-hidden bg-mesh-dark">
      <div className="site-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <motion.div {...fadeInUp} className="rounded-xl bg-white p-6 sm:p-8 lg:p-10" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">Hai una domanda?</h2>
            <p className="mb-7 mt-2 text-slate-500">La nostra squadra è a tua completa disposizione.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot */}
              <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

              <div>
                <label htmlFor="contact-nome" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Nome *</label>
                <input
                  id="contact-nome"
                  {...register('nome')}
                  className={fieldClass(!!errors.nome)}
                  placeholder="Il tuo nome"
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? 'error-nome' : undefined}
                />
                <ErrorMessage id="error-nome" message={errors.nome?.message} />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  {...register('email')}
                  className={fieldClass(!!errors.email)}
                  placeholder="nome@email.it"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                />
                <ErrorMessage id="error-email" message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="contact-oggetto" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Oggetto *</label>
                <input
                  id="contact-oggetto"
                  {...register('oggetto')}
                  className={fieldClass(!!errors.oggetto)}
                  placeholder="Di cosa hai bisogno?"
                  aria-invalid={!!errors.oggetto}
                  aria-describedby={errors.oggetto ? 'error-oggetto' : undefined}
                />
                <ErrorMessage id="error-oggetto" message={errors.oggetto?.message} />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Messaggio *</label>
                <textarea
                  id="contact-message"
                  {...register('message')}
                  rows={4}
                  className={`min-h-[120px] resize-y ${fieldClass(!!errors.message)}`}
                  placeholder="Scrivi qui il tuo messaggio..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                />
                <ErrorMessage id="error-message" message={errors.message?.message} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4"
              >
                {isSubmitting ? <span role="status" aria-live="polite">Invio in corso...</span> : 'Invia messaggio'}
              </button>

              {contactStatus === 'success' && (
                <p role="status" aria-live="polite" className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700">
                  Messaggio inviato! Ti risponderemo al più presto.
                </p>
              )}
              {contactStatus === 'error' && (
                <p role="alert" aria-live="assertive" className="rounded-lg border border-red-100 bg-red-50 p-4 text-center text-sm font-bold text-red-500">
                  {errorMessage || <>Errore durante l&apos;invio. Riprova o scrivici a {siteConfig.contact.email}.</>}
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
