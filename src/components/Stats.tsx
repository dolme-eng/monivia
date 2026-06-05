'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, Users, Award, Star } from 'lucide-react';
import { useReducedMotion, fadeInUp } from '@/lib/motion';

function AnimatedStat({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        if (reducedMotion) {
          setValue(end);
          observer.disconnect();
          return;
        }

        const duration = 1300;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, reducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString('it-IT')}
      {suffix}
    </span>
  );
}

const stats = [
  {
    num: 38226,
    label: 'Pratiche finanziate',
    Icon: FileText,
    iconBg: 'bg-secondary/15',
    iconColor: 'text-secondary',
  },
  {
    num: 45761,
    label: 'Clienti soddisfatti',
    Icon: Users,
    iconBg: 'bg-secondary/15',
    iconColor: 'text-secondary',
  },
  {
    num: 10,
    suffix: '+',
    label: 'Anni di esperienza',
    Icon: Award,
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
  },
  {
    num: 12,
    label: 'Premi ricevuti',
    Icon: Star,
    iconBg: 'bg-secondary/15',
    iconColor: 'text-secondary',
  },
];

export default function Stats() {
  return (
    <section className="bg-mesh-dark py-20 sm:py-24">
      <div className="site-container">
        <motion.div {...fadeInUp} className="mb-14 text-center">
          <div className="badge-dark inline-flex mb-5">I nostri numeri</div>
          <h2 className="text-section-title font-black text-white">
            Risultati che parlano da soli
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="rounded-xl border border-white/15 bg-[#0f1f35] p-5 text-center sm:p-7"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor}`}>
                <stat.Icon size={26} aria-hidden />
              </div>
              <div className="text-4xl font-black text-white sm:text-5xl">
                <AnimatedStat end={stat.num} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-white/45 sm:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/#richiedi" className="btn-cyan px-8 py-4">
            Unisciti ai nostri clienti
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
