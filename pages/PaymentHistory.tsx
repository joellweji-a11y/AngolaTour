
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: string;
  item: string;
  date: string;
  amount: string;
  status: 'Concluído' | 'Pendente' | 'Cancelado';
  method: 'Multicaixa' | 'Cartão' | 'BAI Directo';
  icon: string;
  category: 'Hotel' | 'Transporte' | 'Gastronomia';
}

const PaymentHistory: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');

  const transactions: Transaction[] = [
    {
      id: 'TX-9901',
      item: 'Resort da Huíla',
      date: '12 Nov 2024',
      amount: '137.000 Kz',
      status: 'Concluído',
      method: 'Multicaixa',
      icon: 'bed',
      category: 'Hotel'
    },
    {
      id: 'TX-9842',
      item: 'Táxi Luanda Express',
      date: '10 Nov 2024',
      amount: '4.500 Kz',
      status: 'Concluído',
      method: 'BAI Directo',
      icon: 'commute',
      category: 'Transporte'
    },
    {
      id: 'TX-9721',
      item: 'O Quintal da Tia Maria',
      date: '08 Nov 2024',
      amount: '12.400 Kz',
      status: 'Pendente',
      method: 'Multicaixa',
      icon: 'restaurant',
      category: 'Gastronomia'
    },
    {
      id: 'TX-9610',
      item: 'Hotel Epic Sana',
      date: '05 Nov 2024',
      amount: '85.000 Kz',
      status: 'Cancelado',
      method: 'Cartão',
      icon: 'hotel',
      category: 'Hotel'
    }
  ];

  const filtered = filter === 'Todos' 
    ? transactions 
    : transactions.filter(t => t.category === filter || t.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Pendente': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Cancelado': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      {/* Header */}
      <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md z-30">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Minhas Transações</h2>
        <button className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
          <span className="material-symbols-outlined text-sm">download</span>
        </button>
      </header>

      {/* Wallet Summary Card */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-red-900 rounded-[32px] p-8 shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 blur-[50px] rounded-full" />
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Gasto em Nov</p>
          <h3 className="text-4xl font-black text-white mb-6">153.900 <span className="text-lg font-bold opacity-80 text-accent">Kz</span></h3>
          
          <div className="flex justify-between items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="size-8 rounded-full border-2 border-primary bg-surface-dark overflow-hidden shadow-lg">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=tour${i}`} alt="user" />
                </div>
              ))}
              <div className="size-8 rounded-full border-2 border-primary bg-accent flex items-center justify-center text-[10px] font-black text-black shadow-lg">
                +12
              </div>
            </div>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
              Status Platinum
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 flex gap-2 overflow-x-auto no-scrollbar mb-6">
        {['Todos', 'Hotel', 'Transporte', 'Gastronomia', 'Concluído'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-5 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
              filter === f ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-dark border-white/5 text-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="px-6 space-y-4">
        {filtered.map((t) => (
          <div key={t.id} className="bg-surface-dark/50 backdrop-blur-sm rounded-3xl p-5 border border-white/5 flex items-center gap-4 group hover:border-primary/30 transition-all cursor-pointer">
            <div className="size-14 rounded-2xl bg-background-dark flex items-center justify-center text-primary border border-white/5 shadow-inner">
              <span className="material-symbols-outlined text-3xl">{t.icon}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-sm text-white">{t.item}</h4>
                <p className="font-black text-sm text-white">{t.amount}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-medium">{t.date}</span>
                  <div className="size-1 bg-gray-700 rounded-full" />
                  <span className="text-[10px] text-gray-500 font-medium">{t.method}</span>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusColor(t.status)}`}>
                  {t.status}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State Mockup */}
        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center opacity-30 text-center">
             <span className="material-symbols-outlined text-6xl mb-4">receipt_long</span>
             <p className="font-bold">Nenhuma transação encontrada</p>
             <p className="text-xs">Tente mudar o filtro aplicado</p>
          </div>
        )}
      </div>

      {/* Security Info */}
      <div className="mt-12 mb-20 flex flex-col items-center gap-4 opacity-50">
        <div className="flex items-center gap-2">
           <span className="material-symbols-outlined text-sm">verified_user</span>
           <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pagamentos Seguros SSL</span>
        </div>
        <div className="flex gap-4">
           <span className="material-symbols-outlined text-lg">credit_card</span>
           <span className="material-symbols-outlined text-lg">account_balance</span>
           <span className="material-symbols-outlined text-lg">smartphone</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
