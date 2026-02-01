
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { Category } from '../types';
import { GoogleGenAI } from "@google/genai";

const Food: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Filtros de base
  const categories = ['Todos', 'Tradicional', 'Marisco', 'Gourmet', 'Mufete', 'Internacional'];
  const prices = [
    { id: '1', label: 'Kz', desc: 'Económico' },
    { id: '2', label: 'Kz Kz', desc: 'Médio' },
    { id: '3', label: 'Kz Kz Kz', desc: 'Premium' }
  ];
  const features = ['Aberto Agora', 'Música ao Vivo', 'Esplanada', 'Wi-Fi', 'Estacionamento'];

  const foodItems = DATA.filter(d => d.category === Category.FOOD);

  // Lógica de filtragem
  const filteredItems = foodItems.filter(item => {
    const matchesCategory = activeCategory === 'Todos' || item.tags?.includes(activeCategory);
    const matchesRating = !minRating || item.rating >= minRating;
    // Simulação de preço baseado no valor em string (Kz 6.500)
    const priceVal = parseInt(item.price.replace(/\D/g, ''));
    const matchesPrice = !activePrice || (
      activePrice === '1' ? priceVal < 5000 :
      activePrice === '2' ? (priceVal >= 5000 && priceVal < 15000) :
      priceVal >= 15000
    );
    return matchesCategory && matchesRating && matchesPrice;
  });

  const toggleFeature = (feature: string) => {
    setActiveFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleAISuggestion = async () => {
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Sugira filtros de preço (1, 2 ou 3) e categoria para alguém que quer 'uma experiência de luxo com marisco em Luanda'. Responda apenas o número do preço e o nome da categoria separados por vírgula.",
      });
      const parts = response.text?.split(',') || [];
      if (parts.length >= 2) {
        setActivePrice(parts[0].trim());
        setActiveCategory(parts[1].trim());
        setShowFilters(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const resetFilters = () => {
    setActiveCategory('Todos');
    setActivePrice(null);
    setMinRating(null);
    setActiveFeatures([]);
  };

  return (
    <div className="flex-1 pb-24 overflow-y-auto no-scrollbar bg-background-dark">
      {/* Header Fixo */}
      <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-xl z-40 border-b border-white/5">
        <button onClick={() => navigate('/home')} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h2 className="text-xl font-black text-white italic">Restaurantes</h2>
        <button 
          onClick={() => setShowFilters(true)}
          className={`size-11 rounded-2xl flex items-center justify-center border transition-all ${
            activePrice || minRating || activeFeatures.length > 0 
              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
              : 'bg-surface-dark border-white/10 text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined">tune</span>
        </button>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Categorias Rápidas */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {categories.map((c) => (
            <button 
              key={c} 
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                activeCategory === c 
                  ? 'bg-accent border-accent text-black shadow-lg shadow-accent/20' 
                  : 'bg-surface-dark border-white/5 text-gray-500 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Listagem de Resultados */}
        <div className="flex justify-between items-center mb-2 px-1">
           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Mostrando {filteredItems.length} estabelecimentos
           </p>
           {(activePrice || minRating || activeFeatures.length > 0) && (
              <button onClick={resetFilters} className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                 Limpar <span className="material-symbols-outlined text-xs">close</span>
              </button>
           )}
        </div>

        <div className="space-y-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/restaurant-details/${item.id}`)}
              className="group relative flex flex-col rounded-[32px] bg-surface-dark border border-white/5 overflow-hidden transition-all hover:border-primary/30 shadow-2xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-xl bg-accent text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {item.tags?.[0] || 'Destaque'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <span className="flex items-center gap-1 rounded-xl bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-black text-white border border-white/10">
                    {item.rating} <span className="material-symbols-outlined text-accent text-xs">star</span>
                  </span>
                  <button className="size-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 transition-transform active:scale-90">
                    <span className="material-symbols-outlined outline text-white text-lg">favorite</span>
                  </button>
                </div>
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black text-white leading-tight mb-1">{item.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">restaurant</span>
                    Cozinha Local • {item.location}
                  </p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">Preço Médio</span>
                    <span className="text-sm font-black text-primary uppercase">{item.price}</span>
                  </div>
                  <div className="h-8 w-px bg-white/5" />
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Aberto</span>
                  </div>
                </div>
                <button className="bg-white text-black px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:bg-accent active:scale-95">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-20 flex flex-col items-center opacity-30 text-center animate-in fade-in duration-500">
               <span className="material-symbols-outlined text-7xl mb-4">no_meals</span>
               <p className="font-black text-lg uppercase tracking-widest">Sem resultados</p>
               <p className="text-xs font-bold mt-1">Tente ajustar os filtros avançados</p>
               <button onClick={resetFilters} className="mt-6 text-primary font-black underline uppercase text-[10px] tracking-widest">Limpar Filtros</button>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-300">
          <div className="bg-surface-dark rounded-t-[48px] p-8 space-y-8 animate-in slide-in-from-bottom duration-500 max-h-[85vh] overflow-y-auto no-scrollbar border-t border-white/10">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black text-white italic">Filtros Avançados</h3>
               <button onClick={() => setShowFilters(false)} className="size-10 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-400">close</span>
               </button>
            </div>

            {/* AI Recommendation Button */}
            <button 
              onClick={handleAISuggestion}
              disabled={aiLoading}
              className="w-full bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10 p-5 rounded-[32px] flex items-center justify-between group active:scale-95 transition-all"
            >
               <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-accent text-2xl ${aiLoading ? 'animate-spin' : ''}`}>auto_awesome</span>
                  <div className="text-left">
                     <p className="text-xs font-black text-white uppercase tracking-widest leading-none">Sugerir com IA</p>
                     <p className="text-[8px] text-gray-500 font-bold uppercase mt-1">Deixe o Gemini escolher o lugar ideal</p>
                  </div>
               </div>
               <span className="material-symbols-outlined text-accent group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>

            {/* Price Filter */}
            <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Faixa de Preço</label>
              <div className="grid grid-cols-3 gap-3">
                {prices.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePrice(activePrice === p.id ? null : p.id)}
                    className={`p-4 rounded-3xl border text-center transition-all ${
                      activePrice === p.id ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-background-dark border-white/5'
                    }`}
                  >
                    <p className={`text-sm font-black ${activePrice === p.id ? 'text-white' : 'text-gray-400'}`}>{p.label}</p>
                    <p className={`text-[8px] font-bold uppercase mt-1 ${activePrice === p.id ? 'text-white/70' : 'text-gray-600'}`}>{p.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Rating Filter */}
            <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Classificação Mínima</label>
              <div className="flex gap-3">
                {[4.5, 4.0, 3.5].map(r => (
                  <button
                    key={r}
                    onClick={() => setMinRating(minRating === r ? null : r)}
                    className={`flex-1 py-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                      minRating === r ? 'bg-accent border-accent text-black shadow-lg shadow-accent/20' : 'bg-background-dark border-white/5 text-gray-500'
                    }`}
                  >
                    <span className="text-xs font-black">{r}+</span>
                    <span className="material-symbols-outlined text-xs">star</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Features Filter */}
            <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Ambiente & Funcionalidades</label>
              <div className="flex flex-wrap gap-2">
                {features.map(f => (
                  <button
                    key={f}
                    onClick={() => toggleFeature(f)}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                      activeFeatures.includes(f) ? 'bg-blue-500 border-blue-500 text-white' : 'bg-background-dark border-white/5 text-gray-500'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* Modal Actions */}
            <div className="flex gap-4 pt-4">
               <button 
                 onClick={resetFilters}
                 className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest active:scale-95 transition-all"
               >
                  Limpar
               </button>
               <button 
                 onClick={() => setShowFilters(false)}
                 className="flex-[2] py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-95 transition-all"
               >
                  Aplicar Filtros
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Food;
