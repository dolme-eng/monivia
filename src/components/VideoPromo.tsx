'use client';

import { useRef, useState, KeyboardEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { fadeInUp, useReducedMotion } from '@/lib/motion';
import { trackCtaClick } from '@/lib/analytics-client';

const VIDEO_SRC = '/lv_0_20240529163833.mp4';
const POSTER_SRC = '/assets/business_bg.png';

export default function VideoPromo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const handleVideoPlay = async () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    try {
      await video.play();
    } catch {
      video.muted = true;
      await video.play();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      void handleVideoPlay();
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-primary py-20 sm:py-28"
      aria-labelledby="video-promo-title"
    >
      <div className="site-container relative z-10">
        <motion.div {...fadeInUp} className="mb-12 text-center">
          <div className="badge-dark inline-flex mb-5">
            <span className="inline-flex h-2 w-2 rounded-full bg-secondary" aria-hidden />
            Video di presentazione
          </div>
          <h2
            id="video-promo-title"
            className="text-section-title font-black text-white"
          >
            Il futuro del credito,{' '}
            <br className="hidden sm:block" />
            spiegato in 60 secondi
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/65">
            Guarda come abbiamo semplificato il processo di finanziamento per offrirti
            la migliore esperienza digitale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.15 }}
          className="group relative mx-auto aspect-video max-w-5xl cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-900"
          style={{ boxShadow: 'var(--shadow-card)' }}
          role="button"
          tabIndex={isPlaying ? -1 : 0}
          aria-label="Riproduci il video di presentazione Monivia"
          onClick={() => !isPlaying && void handleVideoPlay()}
          onKeyDown={!isPlaying ? onKeyDown : undefined}
        >
          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 transition-colors duration-300 group-hover:bg-black/30">
              <motion.div
                whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                whileTap={reducedMotion ? undefined : { scale: 0.95 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary pl-1.5 text-primary sm:h-24 sm:w-24 sm:pl-2"
              >
                <Play size={36} fill="currentColor" aria-hidden />
              </motion.div>
            </div>
          )}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            preload="metadata"
            className="h-full w-full object-cover"
            controls={isPlaying}
            loop
            playsInline
            muted
          />
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/#richiedi"
            onClick={() => trackCtaClick('/', 'video_promo_richiedi')}
            className="btn-cyan px-7 py-4"
          >
            Richiedi ora
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/#calcolatore"
            onClick={() => trackCtaClick('/', 'video_promo_calcola')}
            className="btn-ghost-white px-7 py-4"
          >
            Calcola la rata
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
