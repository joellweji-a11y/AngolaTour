
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { Category } from '../types';

const Culture: React.FC = () => {
  const navigate = useNavigate();
  const cultureItems = DATA.filter(d => d.category === Category.CULTURE);

  return (
    <div className="flex-1 pb-24 overflow-y-auto no-scrollbar">
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => navigate('/')} className="size-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex gap-2">
           <button className="size-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10"><span className="material-symbols-outlined">favorite</span></button>
           <button className="size-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10"><span className="material-symbols-outlined">share</span></button>
        </div>
      </header>

      {cultureItems.map(item => (
        <div key={item.id}>
           <div className="relative h-[480px] w-full">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">PROVÍNCIA</span>
                    <span className="text-gray-300 text-xs flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> {item.location}</span>
                 </div>
                 <h1 className="text-4xl font-extrabold mb-2 tracking-tight">{item.name}</h1>
                 <p className="text-gray-300 text-sm leading-relaxed max-w-[90%]">{item.description}</p>
                 <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                       <span className="material-symbols-outlined">play_circle</span> Ver Introdução
                    </button>
                    <button onClick={() => navigate('/map')} className="size-12 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center">
                       <span className="material-symbols-outlined">map</span>
                    </button>
                 </div>
              </div>
           </div>

           <div className="px-6 py-8 space-y-8">
              <div className="grid grid-cols-3 gap-3">
                 {[
                   { val: '1933', lab: 'FUNDAÇÃO' },
                   { val: '97k', lab: 'KM² ÁREA' },
                   { val: '14', lab: 'MUNICÍPIOS' }
                 ].map(s => (
                   <div key={s.lab} className="bg-surface-dark p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-accent font-bold text-lg">{s.val}</p>
                      <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">{s.lab}</p>
                   </div>
                 ))}
              </div>

              <section>
                 <h3 className="text-xl font-bold mb-4">Raízes Históricas</h3>
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="flex flex-col items-center">
                          <div className="size-3 rounded-full bg-accent ring-4 ring-background-dark" />
                          <div className="w-0.5 flex-1 bg-surface-light mt-1" />
                       </div>
                       <div className="pb-4">
                          <p className="text-accent text-[10px] font-bold uppercase tracking-wider mb-1">Século XVII</p>
                          <h4 className="font-bold">Reino do Ndongo</h4>
                          <p className="text-xs text-gray-400 mt-1">Região governada pela Rainha Nzinga Mbandi.</p>
                       </div>
                    </div>
                 </div>
              </section>

              <section>
                 <div className="relative w-full rounded-2xl bg-[#241515] p-5 border border-white/5 shadow-2xl overflow-hidden">
                    <div className="absolute -right-10 -top-10 size-40 bg-primary/10 blur-[60px] rounded-full" />
                    <div className="relative z-10">
                       <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">music_note</span> Ritmos Locais
                       </h3>
                       <div className="flex items-center gap-4">
                          <div className="size-16 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBGBH0O-N_KoiaT_35-hCTrm6--5_9sHGhBbatd9FtTdNroh26WqX7F_oA2b6YLtRMMlFkq9GkUnRMixv0ttyjJ4QBToycj0Itrx_gWy9RCIhmvmU3-PmT6YLY3QHKQUjqkFysn3dLZzE3Ya5yvf_WtOmOnKXkHZ2Ly0gQf4hzjY7g-oIMuz4i7NOUV0Itsg72QbYEuKls_nUnipxXI9ezzCNAh-_blexeLumqnRb2GVs9QOk5lZEKZgVSUCwUlYf9U7LTvsiNKYNGs)' }} />
                          <div className="flex-1">
                             <p className="font-bold">Semba de Malanje</p>
                             <p className="text-xs text-gray-500">Folclore Local</p>
                          </div>
                          <button className="size-10 rounded-full bg-primary flex items-center justify-center shadow-lg"><span className="material-symbols-outlined">play_arrow</span></button>
                       </div>
                    </div>
                 </div>
              </section>
           </div>
        </div>
      ))}
    </div>
  );
};

export default Culture;
