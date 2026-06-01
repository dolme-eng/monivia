'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Prestiti', href: '/#prestiti' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Contatti', href: '/contatti' },
    { name: 'Area Riservata', href: '/login', highlight: true },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 will-change-transform ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-glass border-b border-white/50' : 'bg-transparent border-b border-transparent'}`}>
      
      {/* Top Bar - Hidden on scroll and mobile */}
      <div className={`hidden md:block transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100 border-b border-white/10'}`}>
        <div className={`container mx-auto px-6 h-full flex items-center justify-between text-[11px] font-bold tracking-wider uppercase ${scrolled ? 'text-slate-500' : 'text-white/80'}`}>
           <div className="flex items-center space-x-6">
              <a href={`tel:${siteConfig.contact.phone.link}`} className="flex items-center hover:text-secondary transition-colors" aria-label="Phone">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className="ml-2">{siteConfig.contact.phone.display}</span>
              </a>
             <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center hover:text-secondary transition-colors" aria-label="Email">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
               <span className="ml-2">{siteConfig.contact.email}</span>
             </a>
           </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`container mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-4' : 'py-5'}`}>
        <Link href="/" className="relative group flex items-center gap-2 outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-secondary/50 z-[60]" onClick={closeMenu}>
          <div className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isOpen ? 'text-primary' : scrolled ? 'text-primary' : 'text-white'}`}>
            MO<span className="text-secondary">NIVIA</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center relative" onMouseLeave={() => setHoveredLink(null)}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith('/prestiti') && link.href === '/#prestiti');
            const isHovered = hoveredLink === link.href;
            
            if (link.highlight) {
               return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`ml-4 text-[13px] font-bold tracking-tight transition-all duration-300 text-secondary hover:text-secondary/80`}
                >
                  {link.name}
                </Link>
               );
            }

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onMouseEnter={() => setHoveredLink(link.href)}
                className={`relative px-4 py-2 text-[13px] font-bold tracking-tight transition-colors duration-300 outline-none rounded-full focus-visible:ring-2 focus-visible:ring-secondary/50 ${scrolled ? (isActive || isHovered ? 'text-primary' : 'text-slate-500') : (isActive || isHovered ? 'text-white' : 'text-white/70')}`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-slate-100/10 dark:bg-white/10 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-slate-200/50 dark:bg-white/5 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link href="/#calcolatore" className="hidden lg:inline-flex bg-white text-primary px-7 py-3 text-[12px] uppercase tracking-wider font-black rounded-2xl shadow-lg shadow-primary/20 hover:bg-secondary hover:text-white transition-all duration-300">
            Richiedi Ora
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden relative z-[60] p-2.5 focus:outline-none rounded-xl transition-colors duration-300 ${isOpen ? 'text-primary bg-slate-100' : scrolled ? 'text-primary bg-slate-100 hover:bg-slate-200' : 'text-white bg-white/10 hover:bg-white/20'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </motion.svg>
              ) : (
                <motion.svg key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Nav — Full-screen slide-in overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-white flex flex-col"
          >
            {/* Spacer for header */}
            <div className="h-20 shrink-0 border-b border-slate-100" />

            {/* Links */}
            <nav className="flex flex-col px-6 sm:px-8 pt-6 pb-8 gap-0 overflow-y-auto grow">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between py-5 text-2xl font-black border-b border-slate-100 transition-colors ${link.highlight ? 'text-secondary' : 'text-primary hover:text-secondary'}`}
                  >
                    {link.name}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex flex-col gap-4"
              >
                <Link
                  href="/#calcolatore"
                  onClick={closeMenu}
                  className="btn-primary text-center py-5 text-sm uppercase tracking-widest font-black rounded-2xl w-full block"
                >
                  Richiedi Prestito
                </Link>

                {/* Contact info at bottom */}
                <div className="flex flex-col gap-3 pt-2">
                  <a href={`tel:${siteConfig.contact.phone.link}`} className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    {siteConfig.contact.phone.display}
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    {siteConfig.contact.email}
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
