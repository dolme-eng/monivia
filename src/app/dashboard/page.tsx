'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
    { id: 'richieste', label: 'Le mie richieste', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
    { id: 'documenti', label: 'Documenti', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> },
    { id: 'messaggi', label: 'Messaggi', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
    { id: 'impostazioni', label: 'Impostazioni', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { label: "Richiesta in corso", value: "50.000 €", status: "In Lavorazione", color: "text-amber-500", bg: "bg-amber-50" },
                { label: "Rata mensile", value: "1.085 €", status: "TAN 2.00%", color: "text-secondary", bg: "bg-cyan-50" },
                { label: "Esito previsto", value: "10 Maggio", status: "Entro 48 ore", color: "text-emerald-500", bg: "bg-emerald-50" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  <h3 className="text-3xl font-black text-primary my-2">{stat.value}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${stat.bg} ${stat.color}`}>
                    {stat.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Progress Timeline */}
              <div className="lg:col-span-2 bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-8">Progresso della pratica #PD-842910</h3>
                <div className="space-y-10 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                  {[
                    { title: "Richiesta inviata", time: "08 Maggio, 18:45", desc: "Abbiamo ricevuto la tua richiesta di prestito.", status: "done" },
                    { title: "Documenti caricati", time: "08 Maggio, 18:50", desc: "La documentazione è stata caricata correttamente.", status: "done" },
                    { title: "Analisi in corso", time: "In tempo reale", desc: "Il nostro team sta valutando il merito creditizio.", status: "active" },
                    { title: "Esito finale", time: "In attesa", desc: "Riceverai l&apos;esito finale tramite i nostri canali ufficiali.", status: "pending" }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 z-10 ${
                        step.status === 'done' ? 'bg-secondary' : step.status === 'active' ? 'bg-amber-400 animate-pulse' : 'bg-slate-200'
                      }`}></div>
                      <div className={step.status === 'pending' ? 'opacity-40' : ''}>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-primary">{step.title}</h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{step.time}</span>
                        </div>
                        <p className="text-sm text-slate-500">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Snippet */}
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2">I tuoi documenti</h3>
                <p className="text-xs text-slate-400 mb-8">Ultimi file caricati.</p>
                <div className="space-y-4">
                  {[
                    { name: "Carta d'Identità", type: "PDF", status: "Verificato" },
                    { name: "Ultima Busta Paga", type: "JPG", status: "Verificato" }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line></svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{doc.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('documenti')} className="w-full mt-8 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:border-secondary hover:text-secondary transition-all">
                  Vedi tutti i documenti
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 'richieste':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="richieste" className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-8">Storico Richieste</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4 font-bold">ID Pratica</th>
                  <th className="pb-4 font-bold">Importo</th>
                  <th className="pb-4 font-bold">Data</th>
                  <th className="pb-4 font-bold">Stato</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="py-6 font-bold text-primary">#PD-842910</td>
                  <td className="py-6 text-slate-600">50.000 €</td>
                  <td className="py-6 text-slate-600">08 Maggio 2024</td>
                  <td className="py-6"><span className="px-3 py-1 bg-amber-50 text-amber-500 rounded-full text-xs font-bold uppercase">In Lavorazione</span></td>
                </tr>
                <tr>
                  <td className="py-6 font-bold text-primary">#PD-329101</td>
                  <td className="py-6 text-slate-600">15.000 €</td>
                  <td className="py-6 text-slate-600">12 Gennaio 2023</td>
                  <td className="py-6"><span className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full text-xs font-bold uppercase">Approvata</span></td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        );
      case 'documenti':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="documenti" className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-primary">Gestione Documenti</h3>
              <button className="btn-primary py-3 px-6 text-xs">Carica Nuovo</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Carta d'Identità", date: "08/05/2024", status: "Verificato" },
                { name: "Ultima Busta Paga", date: "08/05/2024", status: "Verificato" },
                { name: "Codice Fiscale", date: "08/05/2024", status: "Verificato" },
                { name: "Contratto Firmato", date: "-", status: "Da Caricare" }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${doc.status === 'Da Caricare' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line></svg>
                    </div>
                    <div>
                      <p className="font-bold text-primary">{doc.name}</p>
                      <p className="text-xs text-slate-400">Caricato il: {doc.date}</p>
                    </div>
                  </div>
                  {doc.status === 'Da Caricare' ? (
                    <button className="text-xs font-bold text-secondary hover:underline">Carica ora</button>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-500 uppercase">{doc.status}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'messaggi':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="messaggi" className="bg-white rounded-[32px] border border-slate-100 shadow-sm flex overflow-hidden min-h-[500px]">
            <div className="w-1/3 border-r border-slate-100 p-6 bg-slate-50/50">
              <h3 className="font-bold text-primary mb-6 px-2">Conversazioni</h3>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-secondary/20 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-primary">Supporto Clienti</span>
                  <span className="text-[10px] text-slate-400">18:55</span>
                </div>
                <p className="text-xs text-slate-500 truncate">La tua pratica è in fase di analisi. Ti preghiamo di...</p>
              </div>
            </div>
            <div className="w-2/3 p-8 flex flex-col">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h4 className="font-bold text-primary">Supporto Clienti</h4>
                <p className="text-xs text-secondary">Online</p>
              </div>
              <div className="grow space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none w-fit max-w-[80%]">
                  <p className="text-sm text-slate-600">Salve Mario, abbiamo ricevuto correttamente tutti i documenti per la pratica #PD-842910. L&apos;analisi richiederà circa 48 ore.</p>
                  <span className="text-[10px] text-slate-400 mt-2 block">Oggi, 18:55</span>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <input type="text" placeholder="Scrivi un messaggio..." className="grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
                <button className="btn-primary px-6 py-3 rounded-xl">Invia</button>
              </div>
            </div>
          </motion.div>
        );
      case 'impostazioni':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="impostazioni" className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm max-w-2xl">
            <h3 className="text-xl font-bold text-primary mb-8">Impostazioni Profilo</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nome</label>
                  <input type="text" defaultValue="Mario" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cognome</label>
                  <input type="text" defaultValue="Rossi" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                <input type="email" defaultValue="mario.rossi@email.it" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
              </div>
              <div className="pt-6 border-t border-slate-100">
                <button type="button" className="btn-primary py-4 px-8 text-xs">Salva Modifiche</button>
              </div>
            </form>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-xl font-black tracking-tighter">
          FI<span className="text-secondary">NORA</span>
        </Link>
        <button onClick={() => window.location.href = '/'} className="text-xs font-bold text-white/70">Esci</button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="w-72 bg-primary text-white hidden md:flex flex-col fixed h-full z-50">
        <div className="p-8">
          <Link href="/" className="block w-fit">
            <div className="text-3xl font-black text-white tracking-tighter">
              FI<span className="text-secondary">NORA</span>
            </div>
          </Link>
        </div>
        
        <nav className="grow px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${
                activeTab === item.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-secondary/30">MR</div>
            <div>
              <p className="text-sm font-bold">Mario Rossi</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Premium Client</p>
            </div>
          </div>
          <Link href="/login" className="flex items-center gap-3 text-red-400 text-xs font-bold hover:text-red-300 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Esci dalla sessione
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-72 grow p-6 md:p-12 overflow-y-auto h-screen pb-24 md:pb-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">
              {activeTab === 'dashboard' ? 'Bentornato, Mario' : navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-slate-500">
              {activeTab === 'dashboard' ? 'Stato attuale della tua pratica di finanziamento.' : 'Gestisci i tuoi dati e le tue pratiche in sicurezza.'}
            </p>
          </div>
          <button onClick={() => window.location.href = '/#richiedi'} className="btn-primary">Nuova Richiesta</button>
        </header>

        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around p-3 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 4).map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === item.id ? 'text-secondary' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[9px] font-bold truncate max-w-[60px]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
