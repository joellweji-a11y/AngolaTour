
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { Category } from '../types';

const Stay: React.FC = () => {
  const navigate = useNavigate();
  const stayItems = DATA.filter(d => d.category === Category.STAY);

  return (
    <div className="flex-1 pb-24 overflow-y-auto no-scrollbar">
      <header className="p-6 pt-12 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="size-10 rounded-full bg-surface-dark flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold">Hospedagens</h2>
        <div className="size-10" />
      </header>

      <div className="px-6 space-y-6">
        {stayItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/details/${item.id}`)}
            className="bg-surface-dark rounded-2xl overflow-hidden border border-white/5 cursor-pointer group"
          >
            <div className="relative h-56 overflow-hidden">
               <div 
                className="h-full bg-cover bg-center transition-transform group-hover:scale-105 duration-700" 
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-1.5 rounded-full">
                <span className="material-symbols-outlined outline text-white text-[20px]">favorite</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {item.location}
                  </p>
                </div>
                <div className="text-right">
                   <div className="flex items-center gap-1 text-accent font-bold">
                    <span>{item.rating}</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">({item.reviews} avaliações)</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400">Preço por noite</p>
                  <p className="text-primary font-bold text-xl">{item.priceUnit === 'Kz' ? `Kz ${item.price}` : item.price}</p>
                </div>
                <button className="bg-primary px-6 py-2 rounded-xl text-sm font-bold">Reservar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stay;
