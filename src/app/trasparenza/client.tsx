'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { transparencyDocuments } from '@/config/loans';
import { siteConfig } from '@/config/site';

export default function TrasparenzaClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      <PageHero
        badge="Documenti e trasparenza"
        title="Trasparenza bancaria"
        description="Tutti i riferimenti utili per comprendere condizioni, guide e documentazione del servizio."
      />

      <section className="section-pad">
        <div className="site-container">
          <Breadcrumbs
            className="mb-10"
            items={[{ label: 'Home', href: '/' }, { label: 'Trasparenza' }]}
          />

          <motion.div {...fadeInUp} className="surface-card p-6 sm:p-8 lg:p-10">
            <p className="text-base leading-7 text-slate-600">
              In ottemperanza alle disposizioni della Banca d&apos;Italia in materia di &quot;Trasparenza delle
              operazioni e dei servizi bancari e finanziari&quot;, mettiamo a disposizione del pubblico i fogli
              informativi dei nostri prodotti.
            </p>

            <div className="mt-8 space-y-4">
              {transparencyDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-secondary/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <FileDown size={22} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                    <span className="font-bold text-slate-700">{doc.title}</span>
                  </div>
                  {doc.available ? (
                    <a
                      href={doc.file}
                      download
                      className="text-sm font-black uppercase text-secondary transition-colors hover:text-primary"
                    >
                      Scarica PDF
                    </a>
                  ) : (
                    <a
                      href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Richiesta documento: ${doc.title}`)}`}
                      className="text-sm font-black uppercase text-secondary transition-colors hover:text-primary"
                    >
                      Richiedi documento
                    </a>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-slate-500">
              I PDF saranno pubblicati in questa sezione non appena disponibili. Puoi richiederli via email nel frattempo.
            </p>

            <div className="mt-10 rounded-lg border border-secondary/20 bg-secondary/5 p-6 text-center sm:text-left">
              <p className="text-lg font-black text-primary">Hai domande su condizioni o documenti?</p>
              <p className="mt-2 text-sm text-slate-600">Il nostro team è disponibile per chiarimenti.</p>
              <Link href="/contatti" className="btn-primary mt-5 inline-flex px-6 py-3.5">
                Contattaci
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
