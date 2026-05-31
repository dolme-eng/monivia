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
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} key="dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: "Richiesta in corso", value: "50.000 €", status: "In Lavorazione", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
                { label: "Rata mensile", value: "1.085 €", status: "TAN 2.00%", color: "text-secondary", bg: "bg-cyan-50", border: "border-cyan-100", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { label: "Esito previsto", value: "10 Maggio", status: "Entro 48 ore", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm cursor-default"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-primary mb-3">{stat.value}</h3>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${stat.bg} ${stat.border} ${stat.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-current`}></span>
                    {stat.status}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Progress Timeline */}
              <div className="lg:col-span-2 bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <h3 className="text-xl font-black text-primary mb-8">Progresso della pratica <span className="text-secondary">#PD-842910</span></h3>
                <div className="space-y-10 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-linear-to-b from-secondary via-amber-400 to-slate-100"></div>
                  {[
                    { title: "Richiesta inviata", time: "08 Maggio, 18:45", desc: "Abbiamo ricevuto la tua richiesta di prestito.", status: "done" },
                    { title: "Documenti caricati", time: "08 Maggio, 18:50", desc: "La documentazione è stata caricata correttamente.", status: "done" },
                    { title: "Analisi in corso", time: "In tempo reale", desc: "Il nostro team sta valutando il merito creditizio.", status: "active" },
                    { title: "Esito finale", time: "In attesa", desc: "Riceverai l&apos;esito finale tramite i nostri canali ufficiali.", status: "pending" }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 + i * 0.1 }}
                      className="flex gap-6 relative"
                    >
                      <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 z-10 ${
                        step.status === 'done' ? 'bg-secondary' : step.status === 'active' ? 'bg-amber-400 animate-pulse ring-4 ring-amber-400/20' : 'bg-slate-200'
                      }`}></div>
                      <div className={step.status === 'pending' ? 'opacity-30' : ''}>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-black text-primary">{step.title}</h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase bg-slate-50 px-2 py-0.5 rounded-full">{step.time}</span>
                        </div>
                        <p className="text-sm text-slate-500">{step.desc}</p>
                      </div>
                    </motion.div>
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
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} key="richieste" className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
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
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} key="documenti" className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
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
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} key="messaggi" className="bg-white rounded-[32px] border border-slate-100 shadow-sm flex overflow-hidden min-h-[500px]">
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
                <input aria-label="Messaggio" title="Messaggio" type="text" placeholder="Scrivi un messaggio..." className="grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
                <button className="btn-primary px-6 py-3 rounded-xl">Invia</button>
              </div>
            </div>
          </motion.div>
        );
      case 'impostazioni':
        return (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} key="impostazioni" className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm max-w-2xl">
            <h3 className="text-xl font-bold text-primary mb-8">Impostazioni Profilo</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="profilo-nome" className="block text-xs font-bold text-slate-500 uppercase mb-2">Nome</label>
                  <input id="profilo-nome" title="Nome" placeholder="Nome" type="text" defaultValue="Mario" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
                </div>
                <div>
                  <label htmlFor="profilo-cognome" className="block text-xs font-bold text-slate-500 uppercase mb-2">Cognome</label>
                  <input id="profilo-cognome" title="Cognome" placeholder="Cognome" type="text" defaultValue="Rossi" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
                </div>
              </div>
              <div>
                <label htmlFor="profilo-email" className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                <input id="profilo-email" title="Email" placeholder="Email" type="email" defaultValue="mario.rossi@email.it" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary" />
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
          MO<span className="text-secondary">NIVIA</span>
        </Link>
        <button onClick={() => window.location.href = '/'} className="text-xs font-bold text-white/70">Esci</button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="w-72 bg-primary text-white hidden md:flex flex-col fixed h-full z-50">
        <div className="p-8">
          <Link href="/" className="block w-fit">
            <div className="text-3xl font-black text-white tracking-tighter">
              MO<span className="text-secondary">NIVIA</span>
            </div>
          </Link>
        </div>
        
        <nav className="grow px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors duration-200 font-bold relative ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="sidebar-pill"
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-4">
                {item.icon}
                {item.label}
              </span>
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
            <h1 className="text-3xl font-black text-primary mb-1">
              {activeTab === 'dashboard' ? 'Bentornato, Mario 👋' : navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              {activeTab === 'dashboard' ? 'Stato attuale della tua pratica di finanziamento.' : 'Gestisci i tuoi dati e le tue pratiche in sicurezza.'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = '/#richiedi'}
            className="btn-primary shadow-xl shadow-secondary/20"
          >
            Nuova Richiesta
          </motion.button>
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
