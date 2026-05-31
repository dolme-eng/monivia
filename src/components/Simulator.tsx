'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateLoan } from '@/utils/finance';

export default function Simulator() {
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(48);
  const [insurance, setInsurance] = useState(true);

  const { monthly, totalDue, totalInterest, taeg, tan } = calculateLoan(amount, months, insurance);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="glass p-8 rounded-[32px] w-full max-w-md mx-auto relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <h3 className="text-2xl font-black text-primary mb-8 flex items-center gap-2">
        <span className="w-2 h-8 bg-secondary rounded-full"></span>
        Calcola il tuo prestito
      </h3>
      
      <div className="space-y-8">
        {/* Amount Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Importo</label>
            <div className="text-2xl font-black text-primary leading-none">
              {amount.toLocaleString('it-IT')} <span className="text-secondary text-sm">€</span>
            </div>
          </div>
          <input 
            type="range" 
            min="5000" 
            max="1000000" 
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-secondary"
            aria-label="Importo del prestito"
            title="Importo del prestito"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
             <span>5.000€</span>
             <span>1.000.000€</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Durata</label>
            <div className="text-2xl font-black text-primary leading-none">
              {months} <span className="text-secondary text-sm">mesi</span>
            </div>
          </div>
          <input 
            type="range" 
            min="12" 
            max="120" 
            step="6"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-secondary"
            aria-label="Durata del prestito in mesi"
            title="Durata del prestito in mesi"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>12m</span>
            <span>120m</span>
          </div>
        </div>

        {/* Insurance Toggle */}
        <div 
          onClick={() => setInsurance(!insurance)}
          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:border-secondary/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${insurance ? 'bg-secondary text-white' : 'bg-white text-slate-300 border border-slate-100'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div>
              <div className="text-xs font-black text-primary uppercase">Assicurazione Credito</div>
              <div className="text-[10px] text-slate-400 font-bold">Proteggi il tuo prestito</div>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full relative transition-all ${insurance ? 'bg-secondary' : 'bg-slate-200'}`}>
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${insurance ? 'left-7' : 'left-1'}`}></div>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="mt-10 p-8 rounded-[24px] bg-primary text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
        
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50">Rata Mensile</span>
          <div className="text-5xl font-black mt-2">
            {monthly.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span className="text-xl ml-1 text-secondary">€</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-white/40 font-black mb-1">TAEG</div>
            <div className="text-lg font-black">{(taeg * 100).toFixed(2)}%</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-widest text-white/40 font-black mb-1">Totale dovuto</div>
            <div className="text-lg font-black">{totalDue.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€</div>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 bg-white text-primary border-2 border-primary py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
        Richiedi in 5 minuti
      </button>
      
      <div className="mt-6 flex items-center justify-between px-2">
        <div className="text-[9px] font-bold text-slate-400 uppercase">TAN FISSO {(tan*100).toFixed(2)}%</div>
        <div className="text-[9px] font-bold text-slate-400 uppercase">Interessi Totali: {totalInterest.toLocaleString('it-IT', {maximumFractionDigits:0})}€</div>
      </div>
    </motion.div>
  );
}
