import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-slate-500">
      <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      <p className="text-sm font-bold uppercase tracking-widest">Caricamento dati...</p>
    </div>
  );
}
