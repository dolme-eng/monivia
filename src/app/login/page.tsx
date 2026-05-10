'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] z-0"></div>
      
      <Link href="/" className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
        ← Torna alla Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[32px] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="mx-auto mb-8 w-fit text-center">
            <div className="text-4xl font-black text-white tracking-tighter">
              FI<span className="text-secondary">NORA</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Area Riservata</h2>
          <p className="text-white/50 text-sm">Accedi per gestire le tue richieste.</p>
        </div>

        <form action="/dashboard" className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" 
              placeholder="mario.rossi@email.it" 
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-secondary focus:bg-white/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-secondary focus:bg-white/10 transition-all"
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="accent-secondary" /> Ricordami
            </label>
            <Link href="#" className="text-xs text-secondary font-bold hover:underline">Password dimenticata?</Link>
          </div>

          <button type="submit" className="w-full bg-secondary text-white py-4 rounded-2xl font-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Accedi
          </button>
        </form>

        <div className="text-center mt-10">
          <p className="text-sm text-white/40">
            Non hai ancora una pratica? <br/>
            <Link href="/#richiedi" className="text-secondary font-bold hover:underline">Richiedi un prestito ora</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
