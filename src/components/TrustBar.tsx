'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BadgeCheck, Building2, LockKeyhole, Scale } from 'lucide-react';

const items = [
  { icon: BadgeCheck, label: 'OAM', value: 'Iscritto dal 2019', href: '/trasparenza' },
  { icon: LockKeyhole, label: 'SSL', value: 'Dati protetti 256-bit', href: '/privacy-policy' },
  { icon: Scale, label: 'GDPR', value: 'Privacy europea', href: '/privacy-policy' },
  { icon: Building2, label: 'Italia', value: 'Consulenza dedicata', href: '/contatti' },
] as const;

export default function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-white py-8 sm:py-10" aria-label="Certificazioni e garanzie">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Grille 2×2 sur mobile, 4 colonnes sur desktop */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-3 rounded-lg bg-slate-50 p-4 transition-all duration-200 hover:bg-white hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <item.icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-black text-primary transition-colors group-hover:text-secondary">
                    {item.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
