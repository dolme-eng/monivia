'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoanForm from '@/components/LoanForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Car, Building2, Coins, Rocket, UserRound, ArrowRight, CheckCircle, type LucideIcon } from 'lucide-react';
import TrustStrip from '@/components/TrustStrip';
import { fadeInUpAnimate, staggerChildren } from '@/lib/motion';
import { isLoanSlug, loanProducts, type LoanSlug } from '@/config/loans';

const loanIcons: Record<LoanSlug, LucideIcon> = {
  personale: UserRound,
  auto: Car,
  immobiliare: Building2,
  consolidamento: Coins,
  business: Rocket,
};

function PrestitoDettaglioContent() {
  const params = useParams();
  const slug = params.slug as string;

  if (!isLoanSlug(slug)) {
    notFound();
  }

  const product = loanProducts[slug];
  const Icon = loanIcons[slug];

  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 md:pb-0">
      <Navbar />

      {/* Hero del prodotto */}
      <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 text-white">
        <div className="site-container relative z-10">
          <Breadcrumbs
            className="mb-10 [&_a]:text-white/60 [&_a:hover]:text-secondary [&_span]:text-white/80"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Prestiti', href: '/#prestiti' },
              { label: product.shortTitle },
            ]}
          />

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="mx-auto mb-7 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-xl border border-white/20 bg-[#0f1f35] text-secondary"
            >
              <Icon size={44} strokeWidth={1.75} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-display font-black tracking-tight"
            >
              {product.title}{' '}
              <span className="text-gradient-cyan">Monivia</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-hero-lead mt-5 mx-auto max-w-2xl text-white/75"
            >
              {product.description}
            </motion.p>

            {/* Benefit chips */}
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3"
            >
              {product.benefits.map((benefit) => (
                <motion.div
                  key={benefit}
                  variants={fadeInUpAnimate}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-4 py-2 text-sm font-bold text-white"
                >
                  <CheckCircle size={14} className="text-secondary" />
                  {benefit}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              <Link href="/#calcolatore" className="btn-cyan px-7 py-4">
                Calcola la rata <ArrowRight size={16} />
              </Link>
              <Link href="#richiedi" className="btn-ghost-white px-7 py-4">
                Richiedi ora
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contenuto principale */}
      <section className="section-pad">
        <div className="site-container">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">

            {/* Colonne info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-14"
            >
              {/* Perché sceglierci */}
              <motion.div variants={fadeInUpAnimate}>
                <div className="badge inline-flex mb-5">I vantaggi</div>
                <h2 className="section-heading mb-6">Perché sceglierci?</h2>
                <p className="section-copy mb-8">
                  Con Monivia, il processo è 100% digitale. Non dovrai recarti in filiale né spedire documenti cartacei.
                  Il nostro team analizza la tua richiesta per offrirti un orientamento chiaro e rapido.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { stat: '2%', label: 'Tasso fisso', desc: 'Nessuna sorpresa: la tua rata resta bloccata per tutta la durata.' },
                    { stat: '48h', label: 'Risposta rapida', desc: "Ricevi l'esito della pratica entro due giorni lavorativi." },
                    { stat: '100%', label: 'Digitale', desc: 'Dalla simulazione alla firma, tutto online senza code.' },
                    { stat: '0€', label: 'Costi nascosti', desc: 'Trasparenza totale: vedi sempre il costo reale del prestito.' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="surface-card p-5 sm:p-6 transition-all hover:-translate-y-0.5"
                    >
                      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-sm font-black text-secondary">
                        {item.stat}
                      </div>
                      <h3 className="text-base font-black text-primary">{item.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Documenti richiesti */}
              <motion.div variants={fadeInUpAnimate}>
                <div className="badge inline-flex mb-5">Cosa serve</div>
                <h2 className="section-heading mb-6">Documenti richiesti</h2>
                <div className="space-y-3">
                  {[
                    "Carta d'identità valida",
                    'Codice Fiscale',
                    'Ultima busta paga o Modello Unico',
                    'IBAN del tuo conto corrente',
                  ].map((doc, i) => (
                    <div
                      key={doc}
                      className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4 sm:p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                        {i + 1}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Immagine prodotto (desktop) */}
              <motion.div variants={fadeInUpAnimate} className="relative hidden h-48 overflow-hidden rounded-xl lg:block">
                <Image
                  src={product.ogImage}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent" />
              </motion.div>
            </motion.div>

            {/* Form sticky */}
            <div
              id="richiedi"
              className="scroll-mt-28 rounded-xl border border-slate-200 bg-slate-50/80 p-5 sm:p-7 lg:sticky lg:top-28"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="mb-8 text-center">
                <div className="badge inline-flex mb-3">Inizia ora</div>
                <h2 className="text-2xl font-black text-primary">Richiedi ora</h2>
                <p className="mt-1.5 text-sm text-slate-500">Inizia la tua pratica online in soli 5 minuti.</p>
              </div>
              <LoanForm />
              <TrustStrip className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function PrestitoDettaglio() {
  return (
    <Suspense fallback={null}>
      <PrestitoDettaglioContent />
    </Suspense>
  );
}
