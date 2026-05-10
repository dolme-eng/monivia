import Link from 'next/link';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1d] text-slate-400 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-2xl font-black text-white tracking-tighter">
              FI<span className="text-secondary">NORA</span>
            </div>
            <p className="text-sm leading-relaxed">
              Il tuo prestito, diretto e senza complicazioni. La soluzione fintech leader per il mercato europeo, 
              che combina tecnologia avanzata e trasparenza totale.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-secondary transition-all opacity-70 hover:opacity-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Link>
              <Link href="#" className="hover:text-secondary transition-all opacity-70 hover:opacity-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link href="#" className="hover:text-secondary transition-all opacity-70 hover:opacity-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Servizi</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/prestiti/personale" className="hover:text-white transition-colors">Prestito Personale</Link></li>
              <li><Link href="/prestiti/auto" className="hover:text-white transition-colors">Prestito Auto</Link></li>
              <li><Link href="/prestiti/consolidamento" className="hover:text-white transition-colors">Consolidamento Debiti</Link></li>
              <li><Link href="/prestiti/business" className="hover:text-white transition-colors">Prestito Business</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Azienda</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link></li>
              <li><Link href="/#prestiti" className="hover:text-white transition-colors">Come Funziona</Link></li>
              <li><Link href="/trasparenza" className="hover:text-white transition-colors">Trasparenza</Link></li>
              <li><Link href="/lavora-con-noi" className="hover:text-white transition-colors">Lavora con noi</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6">Contattaci</h4>
            <div className="flex items-start space-x-3 text-sm">
              <Mail size={18} className="text-secondary mt-1" />
              <span>supporto@finora.it</span>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <Phone size={18} className="text-secondary mt-1" />
              <span>+39 02 1234567</span>
            </div>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin size={18} className="text-secondary mt-1" />
              <span>Via Dante, 10 - 20121 Milano (MI)</span>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-wider font-bold">
            © 2024 Finora - Messaggio pubblicitario con finalità promozionale.
          </div>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-wider">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/note-legali" className="hover:text-white transition-colors">Note Legali</Link>
          </div>
        </div>
        
        <div className="mt-8 text-[9px] text-slate-600 max-w-4xl leading-relaxed">
          Finora è un marchio registrato. Tutte le operazioni di finanziamento sono soggette ad approvazione da parte degli istituti eroganti. 
          OAM n. M123456. Prima di sottoscrivere il contratto, si prega di leggere attentamente il modulo SECCI e le Informazioni Europee di Base sul Credito ai Consumatori.
          Esempio: Prestito di 10.000€, TAN fisso 2%, TAEG 2.05%, in 48 rate mensili da 216,95€. Totale dovuto 10.413,60€.
        </div>
      </div>
    </footer>
  );
}
