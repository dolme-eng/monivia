'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { springIn, useReducedMotion } from '@/lib/motion';

type PageHeroSplitProps = {
  badge: string;
  title: string;
  description: string;
  chips?: string[];
  imageSrc: string;
  imageAlt: string;
  imageCaption?: { label: string; text: string };
};

export default function PageHeroSplit({
  badge,
  title,
  description,
  chips = [],
  imageSrc,
  imageAlt,
  imageCaption,
}: PageHeroSplitProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary pb-16 pt-24 text-white sm:pt-28">
      <div className="absolute inset-0" aria-hidden>
        <Image src="/assets/business_bg.png" alt="" fill priority className="object-cover opacity-15" />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/75 to-primary" />

      <div className="site-container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div {...springIn} className="max-w-2xl">
            <div className="badge-dark inline-flex mb-5">{badge}</div>
            <h1 className="text-display font-black tracking-tight">{title}</h1>
            <p className="section-copy mt-5 max-w-xl text-white/75">{description}</p>
            {chips.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {chips.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-[#0f1f35] px-4 py-2 text-xs font-bold text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.12 }}
            className="relative h-[300px] overflow-hidden rounded-xl border border-white/15 bg-[#0f1f35] sm:h-[380px] lg:h-[420px]"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/35 via-transparent to-transparent" />
            {imageCaption && (
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/15 bg-primary/90 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">{imageCaption.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">{imageCaption.text}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
