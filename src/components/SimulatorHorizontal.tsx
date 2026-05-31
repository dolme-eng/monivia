'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { calculateLoan } from '@/utils/finance';

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString('it-IT'));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function SimulatorHorizontal() {
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(48);
  const [insurance, setInsurance] = useState(true);

  const { monthly, taeg, tan } = calculateLoan(amount, months, insurance);

  return (
    <div className="w-full glass-dark rounded-[40px] p-3 md:p-4">
      <div className="flex flex-col lg:flex-row items-stretch gap-3 md:gap-4">
        
        {/* Amount */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-[28px] hover:bg-white/10 transition-all duration-300 group">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Importo Prestito</span>
            </div>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0 && val <= 1000000) setAmount(val);
                }}
                onBlur={(e) => {
                  const val = Number(e.target.value);
                  if (val < 5000) setAmount(5000);
                  else if (val > 1000000) setAmount(1000000);
                }}
                className="bg-transparent text-2xl font-black text-white group-hover:text-secondary transition-colors w-32 outline-none border-b-2 border-transparent focus:border-secondary/50 text-right"
                aria-label="Importo prestito"
              />
              <span className="text-2xl font-black text-white group-hover:text-secondary transition-colors">€</span>
            </div>
          </div>
            <input 
              type="range" 
              min="5000" 
              max="1000000" 
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-secondary shadow-inner"
              aria-label="Importo prestito slider"
            />
             <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
               <span>5.000 €</span>
               <span>1.000.000 €+</span>
             </div>
        </div>

        {/* Duration */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-[28px] hover:bg-white/10 transition-all duration-300 group">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Durata Mesi</span>
            </div>
            <span className="text-2xl font-black text-white group-hover:text-secondary transition-colors">
              {months} <span className="text-sm font-bold opacity-50 uppercase">mesi</span>
            </span>
          </div>
          <input 
            type="range" 
            min="12" 
            max="120" 
            step="12"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-secondary shadow-inner"
            aria-label="Durata prestito in mesi"
          />
          <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
            <span>12m</span>
            <span>120m</span>
          </div>
        </div>

        {/* Insurance Toggle */}
        <motion.div 
          onClick={() => setInsurance(!insurance)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="lg:w-48 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[28px] flex flex-col justify-center items-center cursor-pointer hover:bg-white/10 transition-colors select-none"
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 ${insurance ? 'bg-secondary text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <span className="text-[9px] font-black uppercase text-slate-300 mb-2 tracking-tighter">Assicurazione</span>
          <div className={`w-10 h-5 rounded-full relative transition-all duration-300 ${insurance ? 'bg-secondary shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-slate-700'}`}>
             <motion.div 
               layout
               className="absolute top-1 w-3 h-3 bg-white rounded-full"
               initial={false}
               animate={{ x: insurance ? 20 : 4 }}
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
             />
          </div>
        </motion.div>

        {/* Results & CTA */}
        <div className="lg:w-[28%] w-full bg-linear-to-br from-secondary to-blue-500 p-5 md:p-6 rounded-[28px] flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-4 group overflow-hidden relative shadow-lg shadow-secondary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-[2] transition-transform duration-700 ease-out"></div>
          <div className="relative z-10 w-full sm:w-auto text-center sm:text-left lg:text-center xl:text-left">
            <span className="text-[9px] font-black uppercase text-white/70 tracking-[0.2em] drop-shadow-md">Rata Mensile</span>
            <div className="text-3xl md:text-4xl font-black text-white leading-none mt-1 drop-shadow-lg">
              <AnimatedNumber value={monthly} /><span className="text-white/80 text-lg ml-1">€</span>
            </div>
            <div className="text-[9px] font-bold text-white/70 uppercase mt-2 drop-shadow-md">TAEG {(taeg*100).toFixed(2)}% • TAN {(tan*100).toFixed(2)}%</div>
          </div>
          <motion.a 
            href="#richiedi" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto xl:w-auto text-center bg-white text-primary px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-black/20 relative z-10"
          >
            Avanti
          </motion.a>
        </div>
      </div>
    </div>
  );
}
