'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';
import {
  ArrowRight,
  Award,
  Shield,
  Users,
  TrendingUp,
  Clock,
  Target,
  Heart,
  Handshake,
  Calendar,
} from 'lucide-react';

const PageHeroSplit = dynamic(() => import('@/components/PageHeroSplit'), { ssr: false });

const stats = [
  { value: '38.000+', label: 'Pratiche finanziate', Icon: TrendingUp },
  { value: '3.400+', label: 'Imprese italiane', Icon: Users },
  { value: '48h', label: 'Tempo medio di esito', Icon: Clock },
  { value: '98%', label: 'Clienti soddisfatti', Icon: Heart },
];

const values = [
  {
    icon: Shield,
    title: 'Trasparenza',
    description: 'Nessun costo nascosto. Ogni condizione è chiara e accessibile prima della firma.',
  },
  {
    icon: Target,
    title: 'Semplicità',
    description: 'Un processo 100% digitale, guidato passo dopo passo, senza burocrazia inutile.',
  },
  {
    icon: Handshake,
    title: 'Affidabilità',
    description: 'Istituzione finanziaria regolamentata con oltre 10 anni di esperienza nel credito.',
  },
  {
    icon: Heart,
    title: 'Vicinanza',
    description: 'Un team dedicato che ti accompagna dalla richiesta all\'erogazione del prestito.',
  },
];

const timeline = [
  {
    year: '2014',
    title: 'La nascita',
    description: 'Monivia nasce a Milano con l\'obiettivo di semplificare l\'accesso al credito per privati e imprese italiane.',
  },
  {
    year: '2017',
    title: 'Crescita digitale',
    description: 'Lanciamo la prima piattaforma 100% online per la richiesta di prestiti, riducendo i tempi dell\'80%.',
  },
  {
    year: '2020',
    title: 'Espansione',
    description: 'Oltre 20.000 pratiche gestite. Apriamo nuove partnership con istituti di credito principali.',
  },
  {
    year: '2023',
    title: 'Consolidamento',
    description: 'Raggiungiamo 38.000+ pratiche finanziate e ci confermiamo tra i leader del fintech italiano.',
  },
  {
    year: 'Oggi',
    title: 'Il futuro',
    description: 'Continuiamo a innovare con nuovi prodotti, AI per la valutazione del merito creditizio e un\'esperienza sempre più personalizzata.',
  },
];

export default function ChiSiamoClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <PageHeroSplit
        badge="Chi è Monivia"
        title="Chi siamo"
        description="Siamo un attore di primo piano nella concessione di crediti a privati e professionisti, con un approccio digitale, chiaro e orientato al cliente."
        chips={['Processo digitale', 'Trasparenza totale', 'Assistenza dedicata']}
        imageSrc="/assets/about_hero_1.webp"
        imageAlt="Consulenza finanziaria Monivia"
        imageCaption={{
          label: 'Guida fintech',
          text: 'Una piattaforma pensata per rendere la richiesta più semplice e rassicurante.',
        }}
      />

      {/* Stats */}
      <section className="py-16 sm:py-20">
        <div className="site-container">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} {...fadeInUp} className="surface-card p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <stat.Icon size={22} aria-hidden />
                </div>
                <p className="text-3xl font-black tracking-tight text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Image */}
      <section className="section-pad">
        <div className="site-container">
          <Breadcrumbs
            className="mb-10"
            items={[{ label: 'Home', href: '/' }, { label: 'Chi siamo' }]}
          />

          <div className="grid gap-8 lg:grid-cols-2">
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

            <div className="flex flex-col gap-6">
              <motion.div {...fadeInUp} className="surface-card overflow-hidden p-3">
                <div className="relative h-[260px] overflow-hidden rounded-lg sm:h-[320px]">
                  <Image
                    src="/assets/about_hero_2.webp"
                    alt="Team Monivia"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="site-container">
          <div className="text-center">
            <div className="badge inline-flex mb-5">I nostri valori</div>
            <h2 className="text-section-title font-black text-slate-900">Cosa ci guida</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              I principi alla base di ogni nostra decisione e di ogni interazione con i clienti.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="surface-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <value.icon size={26} aria-hidden />
                </div>
                <h3 className="text-lg font-black text-slate-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20">
        <div className="site-container">
          <div className="text-center">
            <div className="badge inline-flex mb-5">La nostra storia</div>
            <h2 className="text-section-title font-black text-slate-900">Il nostro percorso</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Dalla fondazione a oggi, un viaggio di crescita costante nell\'innovazione finanziaria.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent sm:left-1/2" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className={`relative mb-12 flex items-start gap-6 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div className={`hidden sm:block sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`} />
                <div className="absolute left-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-secondary text-white shadow-lg sm:left-1/2 sm:-translate-x-1/2">
                  <Calendar size={16} aria-hidden />
                </div>
                <div className="ml-12 flex-1 sm:ml-0 sm:w-1/2 sm:pl-12">
                  <div className="surface-card p-5">
                    <span className="text-xs font-black uppercase tracking-wider text-secondary">{item.year}</span>
                    <h3 className="mt-2 text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
    </main>
  );
}
