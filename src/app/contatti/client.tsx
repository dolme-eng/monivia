'use client';

import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustStrip from '@/components/TrustStrip';
import { siteConfig } from '@/config/site';
import { fadeInUp } from '@/lib/motion';
import { contactSchema } from '@/lib/validations';
import { getCsrfToken } from '@/lib/csrf-client';
import { ErrorMessage, fieldClass, type ContactFormValues } from '@/components/form-shared';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`;

function ContattiContent() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      nome: '',
      email: '',
      oggetto: '',
      message: '',
      sourcePage: pathname || '/contatti',
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
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const contactCards = [
    {
      icon: Phone,
      label: 'Chiamaci',
      value: siteConfig.contact.phone.display,
      href: `tel:${siteConfig.contact.phone.link}`,
      external: false,
    },
    {
      icon: Mail,
      label: 'Scrivici',
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      external: false,
    },
    {
      icon: MapPin,
      label: 'Trovaci',
      value: siteConfig.contact.address,
      href: mapsUrl,
      external: true,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      <PageHero
        badge="Supporto e contatti"
        title="Contattaci"
        description="Hai una domanda? La nostra squadra è a tua disposizione con risposte rapide e un tono chiaro."
        variant="image"
        imageSrc="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200"
        imageAlt="Ufficio moderno con team di supporto"
      />

      <section className="section-pad">
        <div className="site-container">
          <Breadcrumbs
            className="mb-10"
            items={[{ label: 'Home', href: '/' }, { label: 'Contatti' }]}
          />

          {/* Contact cards — 3 columns */}
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            {contactCards.map(({ icon: Icon, label, value, href, external }, index) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="surface-card group flex flex-col items-center gap-4 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-primary">
                  <Icon size={26} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-1.5 text-sm font-black text-primary transition-colors group-hover:text-secondary">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form */}
          <div className="mx-auto max-w-2xl">
            <motion.div {...fadeInUp} className="mb-8 text-center">
              <div className="badge inline-flex mb-4">Scrivici</div>
              <h2 className="section-heading">Invia un messaggio</h2>
              <p className="section-copy mt-3">Ti risponderemo entro 48 ore lavorative.</p>
            </motion.div>

            <motion.div {...fadeInUp} className="surface-card p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot */}
                <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
                <input type="hidden" {...register('sourcePage')} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="page-contact-nome" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                      Nome *
                    </label>
                    <input
                      id="page-contact-nome"
                      {...register('nome')}
                      type="text"
                      autoComplete="name"
                      placeholder="Il tuo nome"
                      className={fieldClass(!!errors.nome)}
                      aria-invalid={!!errors.nome}
                      aria-describedby={errors.nome ? 'error-page-nome' : undefined}
                    />
                    <ErrorMessage id="error-page-nome" message={errors.nome?.message} />
                  </div>
                  <div>
                    <label htmlFor="page-contact-email" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                      Email *
                    </label>
                    <input
                      id="page-contact-email"
                      {...register('email')}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="nome@email.it"
                      className={fieldClass(!!errors.email)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'error-page-email' : undefined}
                    />
                    <ErrorMessage id="error-page-email" message={errors.email?.message} />
                  </div>
                </div>

                <div>
                  <label htmlFor="page-contact-oggetto" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                    Oggetto *
                  </label>
                  <input
                    id="page-contact-oggetto"
                    {...register('oggetto')}
                    type="text"
                    placeholder="Oggetto del messaggio"
                    className={fieldClass(!!errors.oggetto)}
                    aria-invalid={!!errors.oggetto}
                    aria-describedby={errors.oggetto ? 'error-page-oggetto' : undefined}
                  />
                  <ErrorMessage id="error-page-oggetto" message={errors.oggetto?.message} />
                </div>

                <div>
                  <label htmlFor="page-contact-message" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                    Messaggio *
                  </label>
                  <textarea
                    id="page-contact-message"
                    {...register('message')}
                    placeholder="Scrivi il tuo messaggio qui..."
                    rows={5}
                    className={`min-h-[120px] resize-y ${fieldClass(!!errors.message)}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-page-message' : undefined}
                  />
                  <ErrorMessage id="error-page-message" message={errors.message?.message} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-sm uppercase tracking-widest"
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700"
                    >
                      Grazie! Ti ricontatteremo entro 48 ore lavorative.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border border-red-100 bg-red-50 p-4 text-center text-sm font-bold text-red-500"
                    >
                      Errore durante l&apos;invio. Riprova o scrivici a {siteConfig.contact.email}.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              <TrustStrip className="mt-8" variant="light" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function Contatti() {
  return (
    <Suspense fallback={null}>
      <ContattiContent />
    </Suspense>
  );
}
