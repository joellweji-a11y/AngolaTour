
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { Category } from '../types';

const Transport: React.FC = () => {
  const navigate = useNavigate();
  const transportItems = DATA.filter(d => d.category === Category.TRANSPORT);

  return (
    <div className="flex-1 pb-24 overflow-y-auto no-scrollbar">
      <header className="p-6 pt-12 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="size-10 rounded-full bg-surface-dark flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold">Transportes</h2>
        <div className="size-10" />
      </header>

      <div className="px-6 space-y-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['Todos', 'Táxis', 'Autocarros', 'Aluguel'].map((cat, i) => (
            <button key={cat} className={`px-5 py-2 rounded-full text-sm font-bold border ${i === 0 ? 'bg-primary border-primary' : 'bg-surface-dark border-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>

        {transportItems.map((item) => (
          <div key={item.id} className="bg-surface-dark rounded-2xl overflow-hidden border border-white/5">
            <div
              className="h-44 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {item.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-accent font-bold text-lg">Kz {item.price}</p>
                  <p className="text-xs text-gray-500">preço est.</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/details/${item.id}`)}
                className="w-full bg-primary py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
              >
                Chamar Agora
              </button>
            </div>
          </div>
        ))}

        {/* Example static card for UI variety */}
        <div className="bg-surface-dark rounded-2xl p-4 flex items-center gap-4 border border-white/5">
          <div className="size-14 rounded-full bg-surface-light flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-3xl">flight_land</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold">Transfer Aeroporto</h4>
            <p className="text-xs text-gray-400">4 de Fevereiro {"->"} Hotel</p>
          </div>
          <button className="bg-surface-light px-3 py-2 rounded-lg text-xs font-bold">Agendar</button>
        </div>
      </div>
    </div>
  );
};

export default Transport;
