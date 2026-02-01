
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const PromotionsManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [newPromo, setNewPromo] = useState({
    title: '',
    discount: '15',
    validUntil: '',
    description: ''
  });

  const activePromos = [
    { id: 'p1', title: 'Mufete Friday', discount: '20%', status: 'Ativa', usage: 45, color: 'text-orange-400' },
    { id: 'p2', title: 'Happy Hour Marisco', discount: '10%', status: 'Agendada', usage: 0, color: 'text-blue-400' },
  ];

  const handleSuggestWithAI = async () => {
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie um nome criativo e uma descrição curta e impactante para uma promoção de restaurante em Angola com ${newPromo.discount}% de desconto. O contexto é turismo e gastronomia local.`,
      });
      
      const text = response.text || "";
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      setNewPromo(prev => ({
        ...prev,
        title: lines[0]?.replace(/[*#]/g, '').trim() || prev.title,
        description: lines[1]?.replace(/[*#]/g, '').trim() || prev.description
      }));
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-xl z-40 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h2 className="text-lg font-black text-white italic">Promoções</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="size-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-white">add</span>
        </button>
      </header>

      <main className="p-6 space-y-8">
        {/* Analytics Summary */}
        <section className="grid grid-cols-2 gap-4">
           <div className="bg-surface-dark border border-white/5 p-5 rounded-[32px] shadow-xl">
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Resgates Totais</p>
              <p className="text-2xl font-black text-white mt-2">248</p>
              <p className="text-[7px] text-green-500 font-bold uppercase mt-1">+14% este mês</p>
           </div>
           <div className="bg-surface-dark border border-white/5 p-5 rounded-[32px] shadow-xl">
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Impacto em Receita</p>
              <p className="text-2xl font-black text-accent mt-2">1.2M <span className="text-xs">Kz</span></p>
              <p className="text-[7px] text-gray-500 font-bold uppercase mt-1">Est. via promoções</p>
           </div>
        </section>

        {/* Promotion List */}
        <section>
           <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Campanhas Atuais</h3>
           <div className="space-y-4">
              {activePromos.map(p => (
                <div key={p.id} className="bg-surface-dark/50 border border-white/5 p-5 rounded-[28px] flex items-center justify-between group">
                   <div className="flex items-center gap-4">
                      <div className={`size-12 rounded-2xl bg-background-dark border border-white/5 flex items-center justify-center ${p.color}`}>
                         <span className="material-symbols-outlined text-2xl">campaign</span>
                      </div>
                      <div>
                         <h4 className="font-bold text-white text-sm">{p.title}</h4>
                         <p className="text-[10px] text-gray-500 font-bold uppercase">{p.discount} OFF • {p.usage} usados</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className={`text-[7px] font-black px-2 py-1 rounded uppercase tracking-widest ${p.status === 'Ativa' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-400'}`}>
                        {p.status}
                      </span>
                      <span className="material-symbols-outlined text-gray-600 text-sm">more_vert</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* AI Insight Box */}
        <section className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-6 rounded-[32px] relative overflow-hidden">
           <div className="absolute -right-6 -top-6 size-24 bg-primary/20 blur-2xl rounded-full" />
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                 <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                 <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Dica do Angola Tour AI</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                "Notámos que a procura por restaurantes na Ilha de Luanda aumenta às terças. Que tal uma <span className="text-white font-black italic">Terça do Marisco</span> com 15% de desconto?"
              </p>
              <button className="mt-4 text-[9px] font-black text-primary uppercase tracking-widest border border-primary/30 px-4 py-2 rounded-xl">CRIAR AGORA</button>
           </div>
        </section>
      </main>

      {/* Create Promotion Overlay */}
      {isCreating && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-8 flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="w-full max-w-sm space-y-6">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-black text-white italic">Nova Promoção</h2>
                 <button onClick={() => setIsCreating(false)} className="text-gray-500">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>

              <div className="space-y-4">
                 <div className="relative">
                    <input 
                       type="text" 
                       placeholder="Título da Campanha"
                       className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                       value={newPromo.title}
                       onChange={e => setNewPromo({...newPromo, title: e.target.value})}
                    />
                    <button 
                       onClick={handleSuggestWithAI}
                       disabled={aiLoading}
                       className="absolute right-3 top-1/2 -translate-y-1/2 size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/40 transition-all disabled:opacity-50"
                    >
                       <span className={`material-symbols-outlined text-sm ${aiLoading ? 'animate-spin' : ''}`}>auto_awesome</span>
                    </button>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-dark border border-white/10 rounded-2xl px-6 py-4">
                       <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Desconto (%)</label>
                       <input 
                          type="number" 
                          className="bg-transparent border-none p-0 text-xl font-black text-white w-full focus:ring-0"
                          value={newPromo.discount}
                          onChange={e => setNewPromo({...newPromo, discount: e.target.value})}
                       />
                    </div>
                    <div className="bg-surface-dark border border-white/10 rounded-2xl px-6 py-4">
                       <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Validade</label>
                       <input 
                          type="date" 
                          className="bg-transparent border-none p-0 text-[10px] font-bold text-white w-full focus:ring-0"
                          value={newPromo.validUntil}
                          onChange={e => setNewPromo({...newPromo, validUntil: e.target.value})}
                       />
                    </div>
                 </div>

                 <textarea 
                    placeholder="Descrição para os clientes..."
                    className="w-full bg-surface-dark border border-white/10 rounded-2xl p-6 text-sm text-white focus:ring-2 focus:ring-primary outline-none resize-none"
                    rows={4}
                    value={newPromo.description}
                    onChange={e => setNewPromo({...newPromo, description: e.target.value})}
                 />
              </div>

              <button 
                onClick={() => setIsCreating(false)}
                className="w-full bg-primary py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 active:scale-95 transition-all mt-4"
              >
                PUBLICAR OFERTA
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsManagement;
