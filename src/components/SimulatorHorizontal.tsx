'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateLoan } from '@/utils/finance';
import { saveLoanPrefill } from '@/lib/loan-prefill';

const MIN_AMOUNT = 5000;
const MAX_AMOUNT = 1000000;
const MIN_MONTHS = 12;
const MAX_MONTHS = 360;

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString('it-IT')
  );
  useEffect(() => { spring.set(value); }, [value, spring]);
  return <motion.span>{display}</motion.span>;
}

export default function SimulatorHorizontal() {
  const router = useRouter();
  const [amount, setAmount]       = useState(50000);
  const [amountInput, setAmountInput] = useState('50000');
  const [months, setMonths]       = useState(48);
  const [insurance, setInsurance] = useState(true);

  const { monthly, totalDue, taeg, tan } = calculateLoan(amount, months, insurance);

  const handleContinue = () => {
    saveLoanPrefill({
      importo: Math.max(MIN_AMOUNT, Math.min(MAX_AMOUNT, amount)),
      durata: months,
      insurance,
      monthlyEstimate: monthly,
      source: 'simulator',
    });
    const target = document.getElementById('richiedi');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    router.push('/#richiedi');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setAmountInput(raw);
    const value = Number(raw);
    if (!Number.isNaN(value) && raw !== '' && value <= MAX_AMOUNT) {
      setAmount(Math.max(0, value));
    }
  };

  const handleAmountBlur = () => {
    const value   = Number(amountInput);
    const clamped = Number.isNaN(value)
      ? MIN_AMOUNT
      : Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, value));
    setAmount(clamped);
    setAmountInput(String(clamped));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);
    setAmountInput(String(value));
  };

  /* ─────────────────────────────────────────────────────────────
     LAYOUT
     Mobile  : résultat bandeau bas + sliders empilés
     Tablette (sm–lg) : grille 2×2
     Desktop (lg+) : 4 colonnes
  ───────────────────────────────────────────────────────────── */
  return (
    <div
      className="rounded-xl border border-slate-200 bg-white"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >

      {/* ─── Zone contrôles ─── */}
      <div className="p-3 sm:p-4">

        {/* Desktop 4-col / Tablette 2-col / Mobile 1-col */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.85fr_1fr]">

          {/* ── Importo ── */}
          <div className="rounded-lg bg-slate-50 p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Importo</p>
                <p className="mt-0.5 text-sm font-medium text-slate-500">Scegli quanto ti serve</p>
              </div>
              <div className="flex items-baseline gap-0.5 shrink-0">
                <input
                  type="number"
                  value={amountInput}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  step={1000}
                  onChange={handleAmountChange}
                  onBlur={handleAmountBlur}
                  className="w-20 bg-transparent text-right text-xl font-black tabular-nums text-primary outline-none sm:w-24 sm:text-2xl"
                  aria-label="Importo prestito in euro"
                />
                <span className="text-xl font-black text-secondary sm:text-2xl">€</span>
              </div>
            </div>
            <input
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={1000}
              value={Math.max(MIN_AMOUNT, Math.min(MAX_AMOUNT, amount))}
              onChange={handleSliderChange}
              aria-label="Seleziona importo prestito"
            />
            <div className="mt-2.5 flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
              <span>5.000€</span>
              <span>1.000.000€</span>
            </div>
          </div>

          {/* ── Durata ── */}
          <div className="rounded-lg bg-slate-50 p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Durata</p>
                <p className="mt-0.5 text-sm font-medium text-slate-500">Adatta la rata</p>
              </div>
              <p className="text-xl font-black text-primary shrink-0 sm:text-2xl">
                {months}
                <span className="ml-1 text-sm font-bold text-slate-400">mesi</span>
              </p>
            </div>
            <input
              type="range"
              min={MIN_MONTHS}
              max={MAX_MONTHS}
              step={12}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              aria-label="Seleziona durata prestito in mesi"
            />
            <div className="mt-2.5 flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
              <span>12 mesi</span>
              <span>360 mesi</span>
            </div>
          </div>

          {/* ── Assicurazione toggle ── */}
          <button
            type="button"
            onClick={() => setInsurance((v) => !v)}
            className="rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-secondary/40 hover:shadow-md sm:p-6"
            aria-pressed={insurance}
          >
            {/* Icône + label */}
            <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors sm:mb-4 ${
                  insurance ? 'bg-secondary text-primary' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <ShieldCheck size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Assicurazione</p>
                <p className="mt-1 text-sm font-black text-primary">
                  {insurance ? 'Inclusa' : 'Non inclusa'}
                </p>
              </div>
              {/* Toggle pill */}
              <span
                className={`flex h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
                  insurance ? 'bg-secondary' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    insurance ? 'translate-x-5' : ''
                  }`}
                />
              </span>
            </div>
          </button>

          {/* ── Risultato ──
              Desktop : colonna destra
              Tablette : span-2 (occupe toute la largeur de la 2e ligne)
              Mobile  : masqué ici, affiché dans le bandeau bas
          */}
          <div className="relative hidden overflow-hidden rounded-lg bg-primary p-5 text-white sm:block sm:p-6 lg:block">
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/40">
                  Rata stimata
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black tracking-tight sm:text-4xl">
                    <AnimatedNumber value={monthly} />
                  </span>
                  <span className="text-lg font-black text-secondary">€</span>
                  <span className="ml-1 text-sm text-white/45">/mese</span>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-white/45">
                  TAEG {(taeg * 100).toFixed(2)}% · TAN {(tan * 100).toFixed(2)}%
                  <br />
                  Totale {totalDue.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€
                </p>
              </div>
              <motion.button
                type="button"
                onClick={handleContinue}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-cyan w-full text-sm"
              >
                Continua
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bandeau résultat mobile (< sm) ──
          Affiché uniquement sur téléphone, collé en bas du widget.
      */}
      <div className="flex items-center justify-between gap-3 rounded-b-[32px] bg-primary px-5 py-4 sm:hidden">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/40">Rata stimata</p>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span className="text-2xl font-black tabular-nums text-white">
              <AnimatedNumber value={monthly} />
            </span>
            <span className="text-base font-black text-secondary">€</span>
            <span className="text-xs text-white/40">/mese</span>
          </div>
          <p className="text-[10px] text-white/35">
            TAEG {(taeg * 100).toFixed(2)}% · {totalDue.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€
          </p>
        </div>
        <motion.button
          type="button"
          onClick={handleContinue}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn-cyan shrink-0 px-5 py-3 text-xs"
        >
          Continua
          <ArrowRight size={13} />
        </motion.button>
      </div>

    </div>
  );
}
