'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import CareerForm from '@/components/CareerForm';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function LavoraConNoiClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      <PageHero
        badge="Carriere"
        title="Lavora con noi"
        description="Unisciti alla squadra Monivia e aiutaci a costruire un'esperienza finanziaria più semplice, più chiara e più umana."
      />

      <section className="section-pad">
        <div className="site-container">
          <Breadcrumbs
            className="mb-10"
            items={[{ label: 'Home', href: '/' }, { label: 'Lavora con noi' }]}
          />
          <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="surface-card p-6 sm:p-8 lg:p-10"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Users size={28} aria-hidden />
              </div>
              <h2 className="text-2xl font-black text-primary">Perché Monivia?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Cerchiamo profili capaci di unire precisione, senso del servizio e voglia di far crescere un marchio fintech esigente.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Cultura prodotto', text: 'Una squadra che avanza velocemente, testa, misura e migliora in modo continuo.' },
                  { title: 'Impatto diretto', text: 'Ogni contributo migliora l\u2019esperienza cliente e la conversione.' },
                  { title: 'Spirito di squadra', text: 'Scambi semplici, organizzazione chiara e obiettivi condivisi.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-black text-primary">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.1 }}
              className="surface-card p-6 sm:p-8 lg:p-10"
            >
              <div className="text-center">
                <h3 className="text-2xl font-black text-primary">Posizioni aperte</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Al momento non ci sono posizioni aperte, ma siamo sempre alla ricerca di talenti creativi e motivati. Inviaci il tuo curriculum.
                </p>
              </div>

              <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                  Candidatura spontanea
                </p>
                <p className="mt-3 text-center text-sm leading-7 text-slate-600">
                  Se pensi di poter fare la differenza, inviaci la tua candidatura e raccontaci il tuo percorso.
                </p>
                <CareerForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
