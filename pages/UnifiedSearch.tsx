
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { PROVINCES_DATA } from './CulturalMosaic';
import { getAIRecommendation } from '../services/geminiService';

const UnifiedSearch: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const categories = ['Todos', 'Províncias', 'Destinos', 'Comer', 'Dormir', 'Transporte'];

  // Logic for unified filtering
  const results = useMemo(() => {
    if (!query.trim()) return { provinces: [], places: [] };

    const lowerQuery = query.toLowerCase();

    const filteredProvinces = PROVINCES_DATA.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.capital.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );

    const filteredPlaces = DATA.filter(d => 
      d.name.toLowerCase().includes(lowerQuery) || 
      d.location.toLowerCase().includes(lowerQuery) ||
      d.description.toLowerCase().includes(lowerQuery) ||
      d.category.toLowerCase().includes(lowerQuery)
    );

    return {
      provinces: filter === 'Todos' || filter === 'Províncias' ? filteredProvinces : [],
      places: filter === 'Todos' || filter !== 'Províncias' ? filteredPlaces.filter(p => {
        if (filter === 'Todos') return true;
        if (filter === 'Comer') return p.category === 'Restaurantes';
        if (filter === 'Dormir') return p.category === 'Estadias';
        if (filter === 'Transporte') return p.category === 'Transportes';
        if (filter === 'Destinos') return p.category === 'Cultura';
        return true;
      }) : []
    };
  }, [query, filter]);

  const handleAISearch = async () => {
    if (!query.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    try {
      const res = await getAIRecommendation(query);
      setAiResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      {/* Glass Header with Search Input */}
      <header className="sticky top-0 z-50 p-6 bg-background-dark/80 backdrop-blur-2xl border-b border-white/5 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div className="relative flex-1 group">
            <input 
              autoFocus
              type="text" 
              placeholder="Pesquisar em Angola..."
              className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                filter === cat ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-dark border-white/10 text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 space-y-10">
        
        {/* AI Buddy Integration */}
        {query && (
          <button 
            onClick={handleAISearch}
            disabled={aiLoading}
            className="w-full bg-gradient-to-r from-primary/10 to-accent/10 border border-white/10 p-5 rounded-[32px] flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`size-11 rounded-2xl bg-background-dark border border-white/5 flex items-center justify-center text-primary ${aiLoading ? 'animate-spin' : ''}`}>
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-white uppercase tracking-widest">Dica do Guia IA</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Clique para insights personalizados</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        )}

        {aiResponse && (
          <div className="bg-surface-dark/50 border border-primary/20 p-6 rounded-[32px] animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-sm">robot_2</span>
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Sugerido pelo Gemini</span>
             </div>
             <p className="text-xs text-gray-300 leading-relaxed italic">"{aiResponse}"</p>
             <button onClick={() => setAiResponse(null)} className="mt-3 text-[8px] font-black text-gray-600 uppercase tracking-widest">Ocultar Dica</button>
          </div>
        )}

        {/* Results Sections */}
        {query.trim() === '' ? (
          <div className="py-20 flex flex-col items-center opacity-20 text-center">
             <span className="material-symbols-outlined text-8xl mb-4">travel_explore</span>
             <p className="text-xl font-black italic">Descubra Angola</p>
             <p className="text-xs font-bold mt-2 uppercase tracking-widest leading-relaxed">Tente procurar por "Mufete",<br/>"Huíla" ou "Benguela"</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Provinces Results */}
            {results.provinces.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Províncias ({results.provinces.length})</h2>
                <div className="space-y-4">
                  {results.provinces.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => navigate(`/province/${p.id}`)}
                      className="bg-surface-dark/50 border border-white/5 rounded-[32px] p-4 flex gap-4 items-center group active:scale-[0.98] transition-all"
                    >
                      <img src={p.image} className="size-20 rounded-2xl object-cover shadow-xl group-hover:scale-105 transition-transform" alt={p.name} />
                      <div className="flex-1">
                        <h4 className="text-lg font-black text-white italic">{p.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{p.capital}</p>
                        <p className="text-[10px] text-primary font-black uppercase mt-1">{p.ritmo}</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-700">chevron_right</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Places Results */}
            {results.places.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Resultados ({results.places.length})</h2>
                <div className="space-y-4">
                  {results.places.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => navigate(p.category === 'Restaurantes' ? `/restaurant-details/${p.id}` : `/details/${p.id}`)}
                      className="bg-surface-dark/50 border border-white/5 rounded-[32px] p-4 flex gap-4 items-center group active:scale-[0.98] transition-all"
                    >
                      <div className="relative size-20 shrink-0">
                        <img src={p.image} className="w-full h-full rounded-2xl object-cover shadow-xl" alt={p.name} />
                        <div className="absolute -top-2 -right-2 size-7 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                          <span className="text-[8px] font-black text-accent">{p.rating}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-black text-white truncate">{p.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{p.category}</span>
                           <div className="size-1 bg-gray-800 rounded-full" />
                           <span className="text-[8px] font-black text-gray-500 uppercase truncate">{p.location}</span>
                        </div>
                        <p className="text-[10px] font-black text-primary mt-2">
                           {p.priceUnit === 'Kz' ? `Kz ${p.price}` : p.price}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-gray-700">chevron_right</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Results Fallback */}
            {results.provinces.length === 0 && results.places.length === 0 && (
              <div className="py-20 flex flex-col items-center text-center space-y-6">
                 <div className="size-24 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center opacity-30">
                    <span className="material-symbols-outlined text-5xl">search_off</span>
                 </div>
                 <div className="space-y-2">
                    <p className="font-black text-white italic">Não encontramos nada para "{query}"</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Tente usar termos mais simples ou use o Guia IA acima.</p>
                 </div>
                 <button onClick={() => setQuery('')} className="text-primary font-black uppercase text-[10px] tracking-[0.2em] border-b border-primary/20 pb-1">Limpar Busca</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UnifiedSearch;
