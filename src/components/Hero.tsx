'use client';

import Image from 'next/image';
import premiumHero from '../../public/assets/premium_hero.png';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion';
import { trackCtaClick } from '@/lib/analytics-client';

const steps = ['Simuli la rata', 'Invii la richiesta', "Ricevi l'esito"];

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-svh overflow-hidden bg-primary pt-28 text-white sm:pt-32 lg:min-h-[880px] lg:pt-40">

      <div className="absolute inset-0" aria-hidden>
        <Image
          src={premiumHero}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center opacity-20"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.25) 40%, rgba(10,22,40,0.80) 100%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,22,40,0.70) 0%, rgba(10,22,40,0.20) 55%, transparent 100%)',
        }}
        aria-hidden
      />

      <div className="site-container relative z-10">
        <div className="grid items-center gap-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-28">

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
          >
            <div className="badge-dark inline-flex mb-6">
              <span className="inline-flex h-2 w-2 rounded-full bg-secondary" aria-hidden />
              Oltre 38.000 pratiche finanziate
            </div>

            <h1 className="text-display font-black tracking-tight">
              Prestiti online{' '}
              <span className="text-gradient-cyan">chiari, veloci</span>
              {' '}e guidati.
            </h1>

            <p className="text-hero-lead mx-auto mt-6 max-w-xl text-white/78 lg:mx-0">
              Da 5.000€ a oltre 500.000€ con consulenza dedicata,
              richiesta digitale e risposta entro 48 ore lavorative.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="#calcolatore"
                onClick={() => trackCtaClick('/', 'hero_calcola')}
                className="btn-cyan px-7 py-4 text-sm"
              >
                Calcola la rata
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#richiedi"
                onClick={() => trackCtaClick('/', 'hero_richiedi')}
                className="btn-ghost-white px-7 py-4 text-sm"
              >
                Richiedi ora
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div
              className="rounded-xl border border-slate-200 bg-white p-6 text-primary sm:p-8"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                    Percorso Monivia
                  </p>
                  <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
                    Una richiesta semplice, senza passaggi inutili.
                  </h2>
                </div>
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary sm:flex">
                  <CheckCircle2 size={28} />
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-black text-slate-700">{step}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-primary p-4 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">TAN fisso</p>
                  <p className="mt-1 text-2xl font-black">2%</p>
                </div>
                <div className="rounded-lg bg-secondary/10 p-4 text-primary">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Da</p>
                  <p className="mt-1 text-2xl font-black">5.000€</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
