'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { springIn, useReducedMotion } from '@/lib/motion';

type PageHeroProps = {
  badge: string;
  title: string;
  description: string;
  centered?: boolean;
  variant?: 'radial' | 'image';
  imageSrc?: string;
  imageAlt?: string;
};

export default function PageHero({
  badge,
  title,
  description,
  centered = true,
  variant = 'radial',
  imageSrc,
  imageAlt = '',
}: PageHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary pt-24 pb-16 text-white sm:pt-28 sm:pb-20">
      {/* Fond */}
      {variant === 'image' && imageSrc ? (
        <>
          <motion.div
            className="absolute inset-0"
            initial={reducedMotion ? false : { scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.9, ease: 'easeOut' }}
          >
            <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover opacity-15" />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-primary/40 via-primary/75 to-primary" />
        </>
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}

      <div className="site-container relative z-10">
        <motion.div
          {...springIn}
          className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
        >
          <div className="badge-dark inline-flex mb-5">{badge}</div>
          <h1 className="text-section-title font-black tracking-tight text-white">{title}</h1>
          <p className="section-copy mt-5 max-w-2xl text-white/75 mx-auto">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}
