'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BadgeCheck, LockKeyhole, Scale, Building2 } from 'lucide-react';

const items = [
  { Icon: BadgeCheck,  label: 'OAM',    value: 'Intermediario registrato', href: '/trasparenza',    accent: false },
  { Icon: LockKeyhole, label: 'SSL',    value: 'Dati protetti 256-bit',    href: '/privacy-policy', accent: false },
  { Icon: Scale,       label: 'GDPR',   value: 'Privacy europea',          href: '/privacy-policy', accent: true  },
  { Icon: Building2,   label: 'Italia', value: 'Consulenza dedicata',      href: '/contatti',       accent: false },
] as const;

type TrustStripProps = {
  className?: string;
  variant?: 'light' | 'muted';
};

export default function TrustStrip({ className = '', variant = 'muted' }: TrustStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${className}`}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.07 }}
        >
          <Link
            href={item.href}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
              item.accent
                ? variant === 'light'
                  ? 'bg-accent/10 text-accent border border-accent/20 hover:border-accent/40'
                  : 'bg-accent/8 text-accent border border-accent/20 hover:border-accent/40'
                : variant === 'light'
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-secondary/30'
            }`}
          >
            <item.Icon size={12} aria-hidden className={item.accent ? 'text-accent' : ''} />
            <span>{item.value}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

