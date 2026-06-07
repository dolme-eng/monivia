'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

const navLinks = [
  { name: 'Prestiti', href: '/#prestiti' },
  { name: 'Simulatore', href: '/#calcolatore' },
  { name: 'Chi siamo', href: '/chi-siamo' },
  { name: 'Contatti', href: '/contatti' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const menuVisible = isOpen && openPathname === pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Verrouille le scroll du body quand le menu est ouvert */
  useEffect(() => {
    document.body.style.overflow = menuVisible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuVisible]);

  const openMenu = () => {
    setOpenPathname(pathname);
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
    setOpenPathname(null);
  };
  const transparent = pathname === '/' && !scrolled && !menuVisible;

  const isActive = (href: string) => !href.includes('#') && pathname === href;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        transparent
          ? 'text-white'
          : 'border-b border-slate-200/70 bg-white text-primary shadow-sm'
      }`}
    >
      {/* ── Barre utilitaire desktop uniquement ── */}
      <div
        className={`hidden border-b text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300 md:block ${
          transparent ? 'border-white/10 text-white/65' : 'border-slate-100 text-slate-400'
        }`}
      >
        <div className="site-container flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.contact.phone.link}`}
              className="flex items-center gap-1.5 transition-colors hover:text-secondary"
            >
              <Phone size={12} />
              {siteConfig.contact.phone.display}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-secondary"
            >
              <Mail size={12} />
              {siteConfig.contact.email}
            </a>
          </div>
          <span className="hidden lg:block">Risposta entro 48 ore lavorative</span>
        </div>
      </div>

      {/* ── Barre principale ── */}
      <div className="site-container flex h-[68px] items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-50 flex items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
        >
          <span className={`text-2xl font-black tracking-tight ${transparent ? 'text-white' : 'text-primary'}`}>
            MO<span className="text-secondary">NIVIA</span>
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${transparent ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800'}`}>
            Iscritto all'Albo OAM dal 2019
          </span>
        </Link>

        {/* Liens desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-black transition-colors outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                isActive(link.href)
                  ? transparent
                    ? 'bg-white/10 text-white'
                    : 'bg-secondary/10 text-secondary'
                  : transparent
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Côté droit */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CTA mobile — masquée quand le menu est ouvert */}
          {!menuVisible && (
            <Link
              href="/#richiedi"
              className="inline-flex rounded-lg bg-secondary px-3 py-2.5 text-[11px] font-black uppercase tracking-widest text-primary transition-all md:hidden"
            >
              Richiedi
            </Link>
          )}

          {/* CTA desktop */}
          <Link
            href="/#richiedi"
            className={`hidden items-center gap-2 rounded-lg px-5 py-3 text-xs font-black uppercase tracking-widest transition-all lg:inline-flex ${
              transparent
                ? 'bg-white text-primary shadow-lg hover:bg-secondary hover:text-primary'
                : 'bg-primary text-white hover:-translate-y-0.5 hover:bg-slate-800'
            }`}
          >
            Richiedi prestito
            <ArrowRight size={14} />
          </Link>

          {/* Bouton hamburger */}
          <button
            type="button"
            onClick={() => (menuVisible ? closeMenu() : openMenu())}
            className={`relative z-50 rounded-lg p-3 transition-colors md:hidden ${
              menuVisible
                ? 'bg-slate-100 text-primary hover:bg-slate-200'
                : transparent
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-primary hover:bg-slate-200'
            }`}
            aria-label={menuVisible ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuVisible}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuVisible ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {menuVisible ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Drawer mobile ── */}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principale"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-primary md:hidden"
          >
            {/* Spacer égal à la hauteur du header fixe (68px) */}
            <div className="h-[68px] shrink-0" aria-hidden />

            {/* Liens de navigation */}
            <nav className="flex-1 overflow-y-auto px-4 pt-3">
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center justify-between rounded-lg border px-5 py-4 text-lg font-black text-white transition-colors ${
                        isActive(link.href)
                          ? 'border-secondary/40 bg-secondary/10'
                          : 'border-white/15 bg-[#0f1f35] hover:bg-[#152a45]'
                      }`}
                    >
                      {link.name}
                      <ArrowRight size={18} className={isActive(link.href) ? 'text-secondary' : 'text-white/30'} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Carte de contact en bas */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="m-4 mt-3 rounded-xl border border-white/15 bg-[#0f1f35] p-5"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">Contatto rapido</p>
              <a
                href={`tel:${siteConfig.contact.phone.link}`}
                className="mt-3 flex items-center gap-3 text-lg font-black text-white"
              >
                <Phone size={18} className="text-secondary" />
                {siteConfig.contact.phone.display}
              </a>
              <Link
                href="/#richiedi"
                onClick={closeMenu}
                className="btn-cyan mt-4 flex w-full items-center justify-center text-sm uppercase tracking-widest"
              >
                Richiedi ora
                <ArrowRight size={15} className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
