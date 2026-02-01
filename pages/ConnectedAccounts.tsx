
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConnectedAccount {
  id: string;
  name: string;
  icon: string;
  sub: string;
  isConnected: boolean;
  type: 'social' | 'fintech';
  color: string;
}

const ConnectedAccounts: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    { id: 'google', name: 'Google', icon: 'google', sub: 'joao.manuel@gmail.com', isConnected: true, type: 'social', color: 'text-red-400' },
    { id: 'apple', name: 'Apple ID', icon: 'apple', sub: 'Não vinculado', isConnected: false, type: 'social', color: 'text-white' },
    { id: 'facebook', name: 'Facebook', icon: 'facebook', sub: 'João Manuel', isConnected: true, type: 'social', color: 'text-blue-500' },
    { id: 'unitel', name: 'Unitel Money', icon: 'smartphone', sub: '923 XXX 123', isConnected: true, type: 'fintech', color: 'text-orange-500' },
    { id: 'africell', name: 'Afrimoney', icon: 'payments', sub: 'Não vinculado', isConnected: false, type: 'fintech', color: 'text-purple-500' },
  ]);

  const toggleConnection = (id: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        return { ...acc, isConnected: !acc.isConnected, sub: !acc.isConnected ? 'Vinculando...' : 'Não vinculado' };
      }
      return acc;
    }));
  };

  // Fix: Explicitly use React.FC to handle special props like 'key' correctly during list rendering
  const AccountCard: React.FC<{ acc: ConnectedAccount }> = ({ acc }) => (
    <div className={`p-5 rounded-[32px] border transition-all flex items-center justify-between ${
      acc.isConnected ? 'bg-surface-dark/80 border-primary/20' : 'bg-surface-dark/30 border-white/5 opacity-60'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`size-12 rounded-2xl bg-background-dark border border-white/5 flex items-center justify-center ${acc.color}`}>
          {acc.id === 'google' || acc.id === 'facebook' || acc.id === 'apple' ? (
             <span className="material-symbols-outlined text-2xl">
               {acc.id === 'apple' ? 'potted_plant' : acc.icon}
             </span>
          ) : (
            <span className="material-symbols-outlined text-2xl">{acc.icon}</span>
          )}
        </div>
        <div className="text-left">
           <h4 className="text-sm font-black text-white">{acc.name}</h4>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{acc.sub}</p>
        </div>
      </div>
      <button 
        onClick={() => toggleConnection(acc.id)}
        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
          acc.isConnected 
            ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
            : 'bg-primary text-white shadow-lg shadow-primary/20'
        }`}
      >
        {acc.isConnected ? 'Desligar' : 'Vincular'}
      </button>
    </div>
  );

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Contas Conectadas</h1>
      </header>

      <main className="p-6 space-y-10">
        <section className="bg-primary/5 border border-primary/20 p-6 rounded-[32px] flex items-start gap-4">
           <span className="material-symbols-outlined text-primary">security</span>
           <div>
              <p className="text-xs font-black text-white uppercase tracking-widest mb-1">Segurança de Dados</p>
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                Vincular as suas contas facilita o login e acelera os pagamentos via serviços locais como o Unitel Money. Os seus dados são protegidos por encriptação ponta-a-ponta.
              </p>
           </div>
        </section>

        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Redes Sociais</h2>
           <div className="space-y-3">
              {accounts.filter(a => a.type === 'social').map(acc => (
                <AccountCard key={acc.id} acc={acc} />
              ))}
           </div>
        </section>

        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Pagamentos Digitais</h2>
           <div className="space-y-3">
              {accounts.filter(a => a.type === 'fintech').map(acc => (
                <AccountCard key={acc.id} acc={acc} />
              ))}
           </div>
        </section>

        <div className="pt-10 text-center opacity-30">
           <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest">
             Sincronização em tempo real ativada
           </p>
        </div>
      </main>
    </div>
  );
};

export default ConnectedAccounts;
