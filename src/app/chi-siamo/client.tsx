'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';
import { ArrowRight, Award } from 'lucide-react';

const PageHeroSplit = dynamic(() => import('@/components/PageHeroSplit'), { ssr: false });

export default function ChiSiamoClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      <PageHeroSplit
        badge="Chi è Monivia"
        title="Chi siamo"
        description="Siamo un attore di primo piano nella concessione di crediti a privati e professionisti, con un approccio digitale, chiaro e orientato al cliente."
        chips={['Processo digitale', 'Trasparenza totale', 'Assistenza dedicata']}
        imageSrc="/assets/about_hero_1.png"
        imageAlt="Consulenza finanziaria Monivia"
        imageCaption={{
          label: 'Guida fintech',
          text: 'Una piattaforma pensata per rendere la richiesta più semplice e rassicurante.',
        }}
      />

      <section className="section-pad">
        <div className="site-container">
          <Breadcrumbs
            className="mb-10"
            items={[{ label: 'Home', href: '/' }, { label: 'Chi siamo' }]}
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Colonna testo */}
            <motion.div {...fadeInUp} className="surface-card p-6 sm:p-8 lg:p-10">
              <div className="badge inline-flex mb-5">La nostra missione</div>
              <h2 className="text-2xl font-black tracking-tight text-primary sm:text-3xl lg:text-4xl">
                Il nostro impegno per il tuo futuro
              </h2>
              <p className="section-copy mt-5">
                Costituita come istituzione finanziaria, siamo oggi un punto di riferimento nel settore del
                credito. Offriamo i nostri migliori servizi ai clienti, che si tratti di un credito a breve,
                medio o lungo termine. Monivia si è prefissata la missione di promuovere il finanziamento
                ovunque ce ne sia bisogno.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { title: '10+ anni di esperienza', desc: "Abbiamo l'esperienza necessaria per offrirti le migliori soluzioni." },
                  { title: 'Istituzione di fiducia', desc: 'Migliaia di clienti si affidano a noi ogni anno.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Award size={22} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-primary">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Colonna immagine + stats */}
            <div className="flex flex-col gap-6">
              <motion.div {...fadeInUp} className="surface-card overflow-hidden p-3">
                <div className="relative h-[260px] overflow-hidden rounded-lg sm:h-[320px]">
                  <Image
                    src="/assets/about_hero_2.png"
                    alt="Team Monivia"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '3.400+', label: 'Imprese italiane' },
                  { value: '48h', label: 'Tempo medio di esito' },
                ].map((item) => (
                  <div key={item.label} className="surface-card p-5 sm:p-6">
                    <p className="text-3xl font-black tracking-tight text-primary sm:text-4xl">{item.value}</p>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA dark */}
      <section className="bg-mesh-dark py-16 sm:py-20">
        <div className="site-container text-center">
          <div className="badge-dark inline-flex mb-5">Inizia ora</div>
          <h2 className="text-section-title font-black text-white">Pronto a iniziare?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Calcola la tua rata o invia una richiesta in pochi minuti, senza impegno.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#calcolatore" className="btn-ghost-white px-7 py-4">
              Calcola la rata
            </Link>
            <Link href="/#richiedi" className="btn-cyan px-7 py-4">
              Richiedi ora
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
