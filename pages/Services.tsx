
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { Category } from '../types';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  
  const serviceItems = DATA.filter(d => d.category === Category.SERVICES);
  const filteredItems = filter === 'Todos' 
    ? serviceItems 
    : serviceItems.filter(item => item.type === filter || item.tags?.includes(filter));

  const filters = ['Todos', 'Público', 'Privado', 'Saúde', 'Finanças', 'Emergência'];

  return (
    <div className="flex-1 pb-24 overflow-y-auto no-scrollbar">
      <header className="p-6 pt-12 flex items-center justify-between bg-background-dark/80 backdrop-blur sticky top-0 z-20">
        <button onClick={() => navigate('/')} className="size-10 rounded-full bg-surface-dark flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold">Serviços</h2>
        <div className="size-10" />
      </header>

      <div className="px-6 space-y-6">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                filter === f ? 'bg-primary border-primary text-white' : 'bg-surface-dark border-white/10 text-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/details/${item.id}`)}
              className="bg-surface-dark rounded-2xl p-4 border border-white/5 flex gap-4 items-center cursor-pointer hover:border-primary/30 transition-all"
            >
              <div className={`size-14 rounded-2xl flex items-center justify-center ${
                item.tags?.includes('Emergência') ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
              }`}>
                <span className="material-symbols-outlined text-3xl">
                  {item.tags?.includes('Saúde') ? 'medical_services' : 
                   item.tags?.includes('Finanças') ? 'account_balance' : 
                   item.tags?.includes('Segurança') ? 'local_police' : 'settings_input_antenna'}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <h4 className="font-bold text-base leading-tight">{item.name}</h4>
                   <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                     item.type === 'Público' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                   }`}>
                     {item.type}
                   </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.location}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">call</span> {item.phone}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Card */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-8">
           <div className="flex items-center gap-3 text-red-500 mb-3">
              <span className="material-symbols-outlined">emergency</span>
              <h3 className="font-bold">Contactos de Emergência</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-dark/50 p-3 rounded-xl">
                 <p className="text-[10px] text-gray-500 font-bold">POLÍCIA</p>
                 <p className="text-xl font-bold text-white">113</p>
              </div>
              <div className="bg-background-dark/50 p-3 rounded-xl">
                 <p className="text-[10px] text-gray-500 font-bold">AMBULÂNCIA</p>
                 <p className="text-xl font-bold text-white">112</p>
              </div>
              <div className="bg-background-dark/50 p-3 rounded-xl">
                 <p className="text-[10px] text-gray-500 font-bold">BOMBEIROS</p>
                 <p className="text-xl font-bold text-white">115</p>
              </div>
              <div className="bg-background-dark/50 p-3 rounded-xl">
                 <p className="text-[10px] text-gray-500 font-bold">PROTEÇÃO CIVIL</p>
                 <p className="text-xl font-bold text-white">116</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
