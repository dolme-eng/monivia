'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import consultationImg from '../../public/assets/why_choose_us.png';
import { ArrowRight, CheckCircle2, Clock3, Headphones, LockKeyhole } from 'lucide-react';

const benefits = [
  {
    icon: Clock3,
    title: 'Risposta veloce',
    desc: 'Un processo snello riduce attese, passaggi manuali e documenti inutili.',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    hoverBorder: 'hover:border-secondary/25',
  },
  {
    icon: LockKeyhole,
    title: 'Dati protetti',
    desc: 'La richiesta viene gestita con canali digitali sicuri e informative trasparenti.',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    hoverBorder: 'hover:border-secondary/25',
  },
  {
    icon: Headphones,
    title: 'Supporto umano',
    desc: "Un consulente può accompagnarti prima, durante e dopo l'invio della pratica.",
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    hoverBorder: 'hover:border-accent/25',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="perche-monivia" className="section-pad bg-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Colonna testo — prima su mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="badge inline-flex mb-5">Perché Monivia</div>
            <h2 className="section-heading">
              Meno incertezza,<br />più controllo.
            </h2>
            <p className="section-copy mt-5 max-w-xl">
              Con Monivia parti da una stima immediata, invii i dati essenziali e ricevi
              un orientamento chiaro sui prossimi passi della pratica.
            </p>

            <div className="mt-8 space-y-3">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className={`flex gap-4 rounded-lg border border-slate-100 bg-slate-50/80 p-4 transition-all ${item.hoverBorder} hover:bg-white sm:p-5`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}>
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/#richiedi" className="btn-primary mt-8 inline-flex px-7 py-4">
              Inizia la richiesta
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Colonna immagine — seconda su mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative overflow-hidden rounded-xl bg-primary"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="relative h-[340px] sm:h-[460px] lg:h-[560px]">
              <Image
                src={consultationImg}
                alt="Consulenza finanziaria Monivia"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 bg-primary/90 p-5 sm:p-7">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-xl font-black text-white">Consulenza dedicata</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Una presenza chiara nel momento più importante: prima dell&apos;invio.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
