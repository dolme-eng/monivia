'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, FileCheck2, Landmark, UsersRound, ShieldAlert } from 'lucide-react';
import { fadeInUp } from '@/lib/motion';

const profiles = [
  {
    icon: BriefcaseBusiness,
    title: 'Sei dipendente o pensionato?',
    desc: 'Percorsi guidati per chi cerca una rata prevedibile e documenti facili da inviare.',
    iconBg: 'bg-primary',
    iconText: 'text-white',
    hoverBorder: 'hover:border-secondary/30',
    linkColor: 'text-secondary hover:text-primary',
  },
  {
    icon: UsersRound,
    title: 'Sei autonomo o professionista?',
    desc: 'Valutazione più flessibile per redditi non standard, con supporto nella raccolta documenti.',
    iconBg: 'bg-secondary/15',
    iconText: 'text-secondary',
    hoverBorder: 'hover:border-secondary/30',
    linkColor: 'text-secondary hover:text-primary',
  },
  {
    icon: Landmark,
    title: "Rappresenti una famiglia o un'impresa?",
    desc: "Soluzioni per acquisti importanti, liquidità, consolidamento o investimenti professionali.",
    iconBg: 'bg-accent/12',
    iconText: 'text-accent',
    hoverBorder: 'hover:border-accent/30',
    linkColor: 'text-accent hover:text-primary',
  },
  {
    icon: ShieldAlert,
    title: 'Segnalato in CRIF?',
    desc: 'Soluzioni dedicate (es. Cessione del Quinto) anche per segnalati in banche dati o cattivi pagatori.',
    iconBg: 'bg-red-500/10',
    iconText: 'text-red-600',
    hoverBorder: 'hover:border-red-500/30',
    linkColor: 'text-red-600 hover:text-primary',
  },
];

export default function CreditAccessibility() {
  return (
    <section className="section-pad bg-surface">
      <div className="site-container">
        {/* Header centré avec animation au scroll */}
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center"
        >
          <div className="badge inline-flex mb-4">
            <FileCheck2 size={13} />
            Per ogni profilo
          </div>
          <h2 className="section-heading">
            Un percorso chiaro<br className="hidden sm:block" /> per profili diversi.
          </h2>
          <p className="section-copy mt-4 mx-auto max-w-xl">
            Monivia aiuta a capire quale soluzione di credito può essere più adatta,
            con una richiesta digitale semplice e consulenza umana quando serve.
          </p>
        </motion.div>

        {/* Cards : 1 col mobile, 2 col sm, 4 col xl */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`surface-card p-6 transition-all duration-300 hover:-translate-y-1 ${profile.hoverBorder} sm:p-7`}
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-lg ${profile.iconBg} ${profile.iconText}`}>
                <profile.icon size={26} />
              </div>
              <h3 className="text-lg font-black leading-tight text-primary">{profile.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{profile.desc}</p>
              <Link
                href="/#richiedi"
                className={`mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-colors ${profile.linkColor}`}
              >
                Scopri
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

