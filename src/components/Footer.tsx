import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-[#030712] text-slate-400 pt-24 pb-12 relative overflow-hidden">
      {/* Premium glow effect in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/5 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16 text-center md:text-left">
          <div className="space-y-6">
            <div className="text-2xl font-black text-white tracking-tighter">
              MO<span className="text-secondary">NIVIA</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Il tuo prestito, diretto e senza complicazioni. La soluzione fintech leader per il mercato europeo, 
              che combina tecnologia avanzata e trasparenza totale.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href={siteConfig.links.facebook} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Servizi</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/prestiti/auto" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Prestito Auto</Link></li>
              <li><Link href="/prestiti/immobiliare" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Prestito Immobiliare</Link></li>
              <li><Link href="/prestiti/consolidamento" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Consolidamento Debiti</Link></li>
              <li><Link href="/prestiti/business" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Prestito Business</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Azienda</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/chi-siamo" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Chi Siamo</Link></li>
              <li><Link href="/#prestiti" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Come Funziona</Link></li>
              <li><Link href="/trasparenza" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Trasparenza</Link></li>
              <li><Link href="/lavora-con-noi" className="group flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span> Lavora con noi</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6 tracking-wide">Contattaci</h4>
            <div className="flex items-center md:items-start justify-center md:justify-start space-x-3 text-sm group hover:text-white transition-colors cursor-pointer">
              <Mail size={18} className="text-secondary mt-0 md:mt-1 group-hover:scale-110 transition-transform" />
              <span>{siteConfig.contact.email}</span>
            </div>
            <div className="flex items-center md:items-start justify-center md:justify-start space-x-3 text-sm group hover:text-white transition-colors cursor-pointer">
              <Phone size={18} className="text-secondary mt-0 md:mt-1 group-hover:scale-110 transition-transform" />
              <span>{siteConfig.contact.phone.display}</span>
            </div>
            <div className="flex items-center md:items-start justify-center md:justify-start space-x-3 text-sm group hover:text-white transition-colors cursor-pointer">
              <MapPin size={18} className="text-secondary mt-0 md:mt-1 group-hover:scale-110 transition-transform" />
              <span>{siteConfig.contact.address}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
            © {new Date().getFullYear()} Monivia - Messaggio pubblicitario con finalità promozionale.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] font-bold uppercase tracking-wider">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/note-legali" className="hover:text-white transition-colors">Note Legali</Link>
          </div>
        </div>
        
        <div className="mt-8 text-[9px] text-slate-600/60 max-w-4xl leading-relaxed">
           Monivia è un marchio registrato. Tutte le operazioni di finanziamento sono soggette ad approvazione da parte degli istituti eroganti.
           OAM n. M123456. Prima di sottoscrivere il contratto, si prega di leggere attentamente il modulo SECCI e le Informazioni Europee di Base sul Credito ai Consumatori.
           Esempio: Prestito di 10.000€, TAN fisso 2%, TAEG 2.73%, in 48 rate mensili da 216,83€. Totale dovuto 10.407,84€.
        </div>
      </div>
    </footer>
  );
}
