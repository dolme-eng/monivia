'use client';

import { useState } from 'react';

export default function SimulatorHorizontal() {
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(48);
  const [insurance, setInsurance] = useState(true);

  // Financial constants
  const tan = 0.02; 
  const monthlyRate = tan / 12;
  const insuranceRate = 0.0005; 
  
  const x = Math.pow(1 + monthlyRate, months);
  const baseMonthly = (amount * x * monthlyRate) / (x - 1);
  const insuranceCost = insurance ? amount * insuranceRate : 0;
  const totalMonthly = baseMonthly + insuranceCost;
  
  const monthly = isFinite(totalMonthly) ? totalMonthly : 0;
  const taeg = insurance ? (tan + (insuranceRate * 12)) * 1.05 : tan;

  return (
    <div className="w-full bg-secondary shadow-2xl shadow-secondary/30 rounded-[40px] p-3 md:p-4">
      <div className="flex flex-col lg:flex-row items-stretch gap-3 md:gap-4">
        
        {/* Amount */}
        <div className="flex-1 bg-white p-5 md:p-6 rounded-[28px] hover:bg-slate-50 transition-all group">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Importo Prestito</span>
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
                  let val = Number(e.target.value);
                  if (val < 5000) setAmount(5000);
                  else if (val > 500000) setAmount(500000);
                }}
                className="bg-transparent text-2xl font-black text-primary group-hover:text-secondary transition-colors w-32 outline-none border-b-2 border-transparent focus:border-secondary"
              />
              <span className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">€</span>
            </div>
          </div>
           <input 
             type="range" 
             min="5000" 
             max="500000" 
             step="1000"
             value={amount}
             onChange={(e) => setAmount(Number(e.target.value))}
             className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-secondary shadow-sm"
           />
            <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
              <span>5 000 €</span>
              <span>500 000 €+</span>
            </div>
        </div>

        {/* Duration */}
        <div className="flex-1 bg-white p-5 md:p-6 rounded-[28px] hover:bg-slate-50 transition-all group">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Durata Mesi</span>
            </div>
            <span className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">
              {months} <span className="text-sm font-bold opacity-40 uppercase">mesi</span>
            </span>
          </div>
          <input 
            type="range" 
            min="12" 
            max="120" 
            step="12"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-secondary shadow-sm"
          />
          <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
            <span>12m</span>
            <span>120m</span>
          </div>
        </div>

        {/* Insurance Toggle - Vertical in horizontal bar */}
        <div 
          onClick={() => setInsurance(!insurance)}
          className="lg:w-48 bg-white p-5 rounded-[28px] flex flex-col justify-center items-center cursor-pointer hover:bg-slate-50 transition-all select-none"
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 transition-all ${insurance ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <span className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-tighter">Assicurazione</span>
          <div className={`w-10 h-5 rounded-full relative transition-all ${insurance ? 'bg-secondary' : 'bg-slate-200'}`}>
             <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${insurance ? 'left-6' : 'left-1'}`}></div>
          </div>
        </div>

        {/* Results & CTA */}
        <div className="lg:w-[28%] w-full bg-primary p-5 md:p-6 rounded-[28px] flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-4 group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 w-full sm:w-auto text-center sm:text-left lg:text-center xl:text-left">
            <span className="text-[9px] font-black uppercase text-white/40 tracking-[0.2em]">Rata Mensile</span>
            <div className="text-3xl md:text-4xl font-black text-white leading-none mt-1">
              {monthly.toLocaleString('it-IT', { maximumFractionDigits: 0 })}<span className="text-secondary text-sm ml-1">€</span>
            </div>
            <div className="text-[9px] font-bold text-white/30 uppercase mt-2">TAEG {(taeg*100).toFixed(2)}% • TAN {(tan*100).toFixed(2)}%</div>
          </div>
          <a href="#richiedi" className="w-full sm:w-auto xl:w-auto text-center bg-white text-primary px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 relative z-10">
            Avanti
          </a>
        </div>
      </div>
    </div>
  );
}
