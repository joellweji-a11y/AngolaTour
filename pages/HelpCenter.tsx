
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const categories = [
    { label: 'Reservas', icon: 'calendar_month', color: 'text-primary' },
    { label: 'Pagamentos', icon: 'payments', color: 'text-accent' },
    { label: 'Minha Conta', icon: 'person', color: 'text-blue-400' },
    { label: 'Segurança', icon: 'security', color: 'text-green-400' },
  ];

  const faqs = [
    { q: 'Como cancelar uma reserva?', a: 'Pode cancelar qualquer reserva até 24h antes do check-in através da aba "Minhas Reservas" no menu inferior.' },
    { q: 'Quais os métodos de pagamento?', a: 'Aceitamos Multicaixa Express, Cartões Visa/Mastercard, BAI Directo e PayPal para transações internacionais.' },
    { q: 'É seguro viajar entre províncias?', a: 'Sim, as estradas principais são seguras. Recomendamos viajar durante o dia e usar os transportes verificados pelo App.' },
    { q: 'Como entrar em contacto com o guia?', a: 'Após a reserva confirmada, o chat direto com o guia fica disponível na página de detalhes da reserva.' },
  ];

  const handleAskAI = async () => {
    if (!search.trim()) return;
    setAiLoading(true);
    setAiAnswer(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `O usuário tem uma dúvida sobre o app de turismo Angola Tour: "${search}". Responda de forma curta, prestativa e como se fosse um agente de suporte angolano.`,
      });
      setAiAnswer(response.text || "Desculpe, não consegui processar a sua dúvida agora. Tente os nossos canais diretos.");
    } catch (e) {
      console.error(e);
      setAiAnswer("Erro na conexão com a IA. Ligue para a nossa central.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Centro de Ajuda</h1>
      </header>

      <main className="p-6 space-y-10">
        
        {/* Search & AI Support */}
        <section className="space-y-4">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Qual é a sua dúvida?"
                className="w-full bg-surface-dark border border-white/10 rounded-3xl py-4 px-12 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
              <button 
                onClick={handleAskAI}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-2xl bg-primary/20 flex items-center justify-center text-primary"
              >
                <span className={`material-symbols-outlined text-lg ${aiLoading ? 'animate-spin' : ''}`}>auto_awesome</span>
              </button>
           </div>

           {aiAnswer && (
             <div className="bg-primary/5 border border-primary/20 p-5 rounded-[28px] animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-2">
                   <span className="material-symbols-outlined text-primary text-sm">robot_2</span>
                   <span className="text-[9px] font-black text-primary uppercase tracking-widest">Resposta Automática</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed italic">"{aiAnswer}"</p>
                <button 
                   onClick={() => setAiAnswer(null)}
                   className="mt-3 text-[8px] font-black text-gray-600 uppercase tracking-widest"
                >
                   Limpar Resposta
                </button>
             </div>
           )}
        </section>

        {/* Categories Grid */}
        <section className="grid grid-cols-2 gap-4">
           {categories.map(cat => (
             <button key={cat.label} className="bg-surface-dark/50 border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 active:scale-95 transition-all group">
                <div className={`size-12 rounded-2xl bg-background-dark border border-white/5 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                   <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.label}</span>
             </button>
           ))}
        </section>

        {/* FAQs Section */}
        <section className="space-y-6">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Perguntas Frequentes</h2>
           <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-surface-dark border border-white/5 p-5 rounded-[28px]">
                   <h4 className="text-sm font-bold text-white mb-2">{f.q}</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">{f.a}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Direct Contact Cards */}
        <section className="space-y-4 pt-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Canais Diretos</h2>
           <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between p-5 bg-[#25D366]/5 border border-[#25D366]/20 rounded-[28px] group">
                 <div className="flex items-center gap-4">
                    <div className="size-11 rounded-2xl bg-[#25D366] flex items-center justify-center text-white">
                       <span className="material-symbols-outlined">chat</span>
                    </div>
                    <div className="text-left">
                       <p className="text-sm font-bold text-white">WhatsApp Suporte</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase">Resposta em 5 minutos</p>
                    </div>
                 </div>
                 <span className="material-symbols-outlined text-gray-700 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              <button className="flex items-center justify-between p-5 bg-blue-500/5 border border-blue-500/20 rounded-[28px] group">
                 <div className="flex items-center gap-4">
                    <div className="size-11 rounded-2xl bg-blue-500 flex items-center justify-center text-white">
                       <span className="material-symbols-outlined">call</span>
                    </div>
                    <div className="text-left">
                       <p className="text-sm font-bold text-white">Ligar para a Central</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase">Disponível 24/7</p>
                    </div>
                 </div>
                 <span className="material-symbols-outlined text-gray-700 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              <button className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-[28px] group">
                 <div className="flex items-center gap-4">
                    <div className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center text-gray-400 border border-white/10">
                       <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div className="text-left">
                       <p className="text-sm font-bold text-white">Enviar Email</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase">Suporte@angolatour.ao</p>
                    </div>
                 </div>
                 <span className="material-symbols-outlined text-gray-700 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
           </div>
        </section>

        <div className="text-center pt-6 opacity-30">
           <p className="text-[9px] font-black uppercase tracking-widest">Angola Tour Apoio ao Cliente</p>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
