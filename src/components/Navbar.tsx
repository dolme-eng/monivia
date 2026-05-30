'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Prestiti', href: '/#prestiti' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Contatti', href: '/contatti' },
    { name: 'Area Riservata', href: '/login', highlight: true },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]' : 'bg-transparent'}`}>
      
      {/* Top Bar - Hidden on scroll and mobile */}
      <div className={`hidden md:block transition-all duration-300 overflow-hidden border-b ${scrolled ? 'h-0 opacity-0 border-transparent' : 'h-10 opacity-100 border-white/10'}`}>
        <div className={`container mx-auto px-6 h-full flex items-center justify-between text-[11px] font-bold tracking-wider uppercase ${scrolled ? 'text-slate-500' : 'text-white/80'}`}>
           <div className="flex items-center space-x-6">
              <a href="tel:+393508533366" className="flex items-center hover:text-secondary transition-colors" aria-label="Phone">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
             <a href="mailto:supporto@finora.it" className="flex items-center hover:text-secondary transition-colors" aria-label="Email">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
             </a>
           </div>
           <div className="flex items-center space-x-4">
           </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <Link href="/" className="relative hover:scale-105 transition-transform flex items-center gap-2">
          <div className={`text-2xl font-black tracking-tighter ${scrolled ? 'text-primary' : 'text-white'}`}>
            FI<span className="text-secondary">NORA</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith('/prestiti') && link.href === '/#prestiti');
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[13px] font-bold tracking-tight transition-all duration-300 relative group ${link.highlight || isActive ? 'text-secondary' : (scrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary')}`}
              >
                {link.name}
                {!link.highlight && (
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/#calcolatore" className="hidden lg:inline-flex btn-primary px-7 py-3 text-[12px] uppercase tracking-wider font-black rounded-2xl shadow-lg shadow-primary/20">
            Richiedi Ora
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 focus:outline-none rounded-lg ${scrolled ? 'text-primary bg-slate-50' : 'text-white bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-black ${link.highlight ? 'text-secondary' : 'text-primary'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/#richiedi" 
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center py-5 text-sm uppercase tracking-widest font-black rounded-2xl"
              >
                Richiedi Prestito
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
