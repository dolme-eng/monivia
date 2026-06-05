'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Car, Coins, Rocket, UserRound } from 'lucide-react';
import { trackAnalyticsEvent } from '@/lib/analytics-client';
import { fadeInUp } from '@/lib/motion';

const offers = [
  {
    slug: 'personale',
    title: 'Prestito Personale',
    icon: UserRound,
    image: '/assets/hero_lifestyle.png',
    desc: 'Per progetti personali, imprevisti o acquisti importanti con un percorso digitale semplice.',
    points: ['Importi flessibili', 'Rata chiara', 'Richiesta guidata'],
  },
  {
    slug: 'auto',
    title: 'Prestito Auto',
    icon: Car,
    image: '/assets/consultation.png',
    desc: "Per auto e moto nuove o usate, con una rata stimata subito prima dell'invio.",
    points: ['Nuovo o usato', 'Esito rapido', 'Piani su misura'],
  },
  {
    slug: 'immobiliare',
    title: 'Prestito Immobiliare',
    icon: Building2,
    image: '/assets/premium_hero.png',
    desc: 'Per ristrutturare, acquistare o finanziare progetti abitativi più importanti.',
    points: ['Fino a importi elevati', 'Durate lunghe', 'Consulenza dedicata'],
  },
  {
    slug: 'business',
    title: 'Prestito Aziendale',
    icon: Rocket,
    image: '/assets/pro_bg.png',
    desc: 'Per liquidità, attrezzature, crescita aziendale o investimenti professionali.',
    points: ['Per imprese', 'Iter digitale', 'Supporto consulente'],
  },
  {
    slug: 'consolidamento',
    title: 'Consolidamento Debiti',
    icon: Coins,
    image: '/assets/hero_lifestyle_new.png',
    desc: 'Per riunire più finanziamenti in una rata unica più semplice da gestire.',
    points: ['Una rata', 'Più controllo', 'Meno complessità'],
  },
];

export default function OffersTabs() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);
  const activeOffer = offers[activeTab];

  const selectTab = (index: number) => {
    setActiveTab(index);
    trackAnalyticsEvent({
      eventType: 'offer_tab_change',
      page: pathname || '/',
      label: offers[index].title,
      metadata: { slug: offers[index].slug },
    });
  };

  return (
    <section id="prestiti" className="section-pad bg-white">
      <div className="site-container">
        {/* Header — animé au scroll */}
        <motion.div {...fadeInUp} className="mb-12 mx-auto max-w-3xl text-center">
          <div
            className="badge inline-flex mb-4"
            style={{ borderColor: 'rgba(99,102,241,0.25)', backgroundColor: 'rgba(99,102,241,0.08)', color: 'var(--color-accent)' }}
          >
            I nostri prodotti
          </div>
          <h2 className="section-heading">
            Scegli il prestito<br className="hidden sm:block" /> più adatto al tuo obiettivo.
          </h2>
          <p className="section-copy mt-4">
            Simulazione chiara, richiesta digitale, supporto quando serve.
          </p>
        </motion.div>

        {/* Mobile tabs — pill scrollabili */}
        <div className="mb-5 lg:hidden">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide sm:-mx-6 sm:px-6">
            {offers.map((offer, index) => (
              <button
                key={offer.title}
                type="button"
                onClick={() => selectTab(index)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-black transition-all ${
                  activeTab === index
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <offer.icon size={15} aria-hidden />
                {offer.title}
              </button>
            ))}
          </div>
        </div>

        {/* Layout principale */}
        <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr] lg:gap-8">

          {/* Sidebar desktop only */}
          <div className="hidden flex-col gap-3 lg:flex">
            {offers.map((offer, index) => (
              <button
                key={offer.title}
                type="button"
                onClick={() => selectTab(index)}
                className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-all duration-200 ${
                  activeTab === index
                    ? 'border-primary bg-primary text-white shadow-premium'
                    : 'border-slate-200 bg-slate-50 text-primary hover:border-secondary/40 hover:bg-white'
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    activeTab === index ? 'bg-white/10 text-secondary' : 'bg-white text-secondary'
                  }`}
                >
                  <offer.icon size={22} aria-hidden />
                </span>
                <span>
                  <span className="block text-base font-black">{offer.title}</span>
                  <span
                    className={`mt-0.5 block text-xs font-bold ${
                      activeTab === index ? 'text-white/50' : 'text-slate-400'
                    }`}
                  >
                    Scopri dettagli
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOffer.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22 }}
                className="lg:grid lg:grid-cols-2"
              >
                {/* Testo */}
                <div className="p-6 sm:p-8 lg:p-9">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <activeOffer.icon size={28} aria-hidden />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                    {activeOffer.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{activeOffer.desc}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeOffer.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-primary shadow-sm"
                      >
                        {point}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link href="#richiedi" className="btn-primary px-6 py-3.5">
                      Richiedi preventivo
                      <ArrowRight size={15} />
                    </Link>
                    <Link href={`/prestiti/${activeOffer.slug}`} className="btn-secondary px-6 py-3.5">
                      Dettagli prodotto
                    </Link>
                  </div>
                </div>

                {/* Immagine */}
                <div className="relative h-[220px] sm:h-[280px] lg:h-full">
                  <Image
                    src={activeOffer.image}
                    alt={activeOffer.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/50 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
