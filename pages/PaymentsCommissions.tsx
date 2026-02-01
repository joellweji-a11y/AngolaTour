
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentsCommissions: React.FC = () => {
  const navigate = useNavigate();
  const [iban, setIban] = useState('AO06 0040 0000 1234 5678 9012 3');

  return (
    <div className="flex-1 bg-background-dark min-h-screen">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Pagamentos</h1>
      </header>

      <main className="p-6 space-y-10">
        {/* Commissions Card */}
        <section className="bg-gradient-to-br from-accent/20 to-yellow-900/10 border border-accent/20 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-6 -top-6 size-24 bg-accent/20 blur-3xl rounded-full" />
          <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Ganhos em Comissões</p>
          <h2 className="text-4xl font-black text-white">45.000 <span className="text-sm">Kz</span></h2>
          <div className="mt-8 flex gap-3">
             <button className="bg-accent text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Levantar</button>
             <button className="bg-white/10 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Histórico</button>
          </div>
        </section>

        {/* IBAN Management */}
        <section className="space-y-4">
           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Configuração de IBAN (AO06)</label>
           <div className="bg-surface-dark border border-white/5 rounded-[32px] p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                 <div className="size-12 rounded-2xl bg-background-dark flex items-center justify-center border border-white/5 text-accent">
                    <span className="material-symbols-outlined">account_balance</span>
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-white">Banco Angolano de Investimentos</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Principal</p>
                 </div>
              </div>
              <input 
                type="text" 
                className="w-full bg-background-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white font-mono focus:ring-1 focus:ring-accent outline-none"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
              />
              <p className="text-[9px] text-gray-600 font-medium italic">As comissões de serviço serão transferidas para esta conta a cada 15 dias.</p>
           </div>
        </section>

        {/* Active Methods */}
        <section>
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Métodos Ativos</h3>
              <button className="text-[9px] font-black text-primary uppercase">Adicionar</button>
           </div>
           <div className="space-y-3">
              {[
                { name: 'Multicaixa Express', card: '923 XXX 123', icon: 'smartphone' },
                { name: 'Visa Gold', card: '**** **** 8802', icon: 'credit_card' }
              ].map(method => (
                <div key={method.name} className="bg-surface-dark/50 border border-white/5 p-5 rounded-[28px] flex items-center justify-between group">
                   <div className="flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">{method.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{method.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold">{method.card}</p>
                      </div>
                   </div>
                   <button className="size-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/10">
                      <span className="material-symbols-outlined text-sm">delete</span>
                   </button>
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
};

export default PaymentsCommissions;
