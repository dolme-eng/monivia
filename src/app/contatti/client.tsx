'use client';

import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { siteConfig } from '@/config/site';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustStrip from '@/components/TrustStrip';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getAnalyticsSessionId, trackAnalyticsEvent } from '@/lib/analytics-client';
import { Phone, Mail, MapPin } from 'lucide-react';
import { fadeInUp } from '@/lib/motion';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`;

export const dynamic = 'force-dynamic';

function ContattiContent() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const pathname = usePathname();

  useEffect(() => {
    trackAnalyticsEvent({
      eventType: 'contact_form_view',
      page: pathname || '/contatti',
    });
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
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
      setStatus('success');
      (e.target as HTMLFormElement).reset();
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
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
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
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="sr-only"
                />
                <input type="hidden" name="sourcePage" value={pathname || '/contatti'} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-nome" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                      Nome completo
                    </label>
                    <input
                      id="contact-nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      placeholder="Il tuo nome"
                      className="field-shell"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="nome@email.it"
                      className="field-shell"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-oggetto" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                    Oggetto
                  </label>
                  <input
                    id="contact-oggetto"
                    name="oggetto"
                    type="text"
                    placeholder="Oggetto del messaggio"
                    className="field-shell"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-slate-400">
                    Messaggio
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Scrivi il tuo messaggio qui..."
                    rows={5}
                    className="field-shell resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full py-4 text-sm uppercase tracking-widest"
                >
                  {status === 'loading'
                    ? 'Invio in corso...'
                    : status === 'success'
                      ? 'Messaggio inviato ✓'
                      : 'Invia messaggio'}
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
                      Errore durante l&apos;invio. Riprova più tardi.
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
