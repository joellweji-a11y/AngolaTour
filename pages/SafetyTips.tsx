
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAIRecommendation } from '../services/geminiService';

interface Tip {
  title: string;
  content: string;
  icon: string;
  color: string;
}

const SafetyTips: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Saúde');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const categories = [
    { id: 'Saúde', icon: 'medical_services', color: 'text-green-400' },
    { id: 'Segurança', icon: 'security', color: 'text-primary' },
    { id: 'Dinheiro', icon: 'payments', color: 'text-accent' },
    { id: 'Cultura', icon: 'festival', color: 'text-blue-400' },
    { id: 'Transporte', icon: 'commute', color: 'text-orange-400' },
  ];

  const tipsData: Record<string, Tip[]> = {
    'Saúde': [
      { title: 'Vacinação', content: 'A vacina contra a Febre Amarela é obrigatória para entrar em Angola. Mantenha o seu certificado internacional sempre consigo.', icon: 'vaccines', color: 'text-green-500' },
      { title: 'Água Potável', content: 'Beba apenas água engarrafada ou filtrada. Evite gelo em locais não verificados pelo app.', icon: 'water_drop', color: 'text-blue-500' },
      { title: 'Malária', content: 'Use repelente e durma com rede mosquiteira, especialmente nas zonas mais húmidas e ao entardecer.', icon: 'pest_control', color: 'text-yellow-600' }
    ],
    'Segurança': [
      { title: 'Atenção Situacional', content: 'Evite exibir objetos de valor em locais muito movimentados ou circular a pé à noite em zonas desconhecidas.', icon: 'visibility', color: 'text-red-500' },
      { title: 'Documentos', content: 'Tenha sempre uma cópia digital do seu passaporte e visto no telemóvel. Deixe o original no cofre do hotel.', icon: 'description', color: 'text-gray-400' },
      { title: 'Números Úteis', content: 'Polícia: 113 | Emergência Médica: 112 | Bombeiros: 115. Salve estes números no seu telemóvel.', icon: 'phone_in_talk', color: 'text-primary' }
    ],
    'Dinheiro': [
      { title: 'Câmbio', content: 'Efetue o câmbio apenas em bancos oficiais ou casas de câmbio autorizadas. O Kwanza (AOA) é a moeda oficial.', icon: 'currency_exchange', color: 'text-accent' },
      { title: 'Multicaixa', content: 'O Multicaixa Express é a forma mais segura e comum de pagamento. Verifique sempre o visor antes de inserir o PIN.', icon: 'smartphone', color: 'text-blue-400' },
      { title: 'Dinheiro Vivo', content: 'Mantenha pequenas quantias de Kwanzas em numerário para mercados locais e gorjetas.', icon: 'payments', color: 'text-green-600' }
    ],
    'Cultura': [
      { title: 'Fotografia', content: 'Peça sempre permissão antes de fotografar pessoas locais. É proibido fotografar edifícios governamentais ou militares.', icon: 'photo_camera', color: 'text-purple-400' },
      { title: 'Saudações', content: 'Os angolanos valorizam a cortesia. Comece sempre conversas com "Bom dia" ou "Boa tarde".', icon: 'handshake', color: 'text-blue-200' },
      { title: 'Termos Locais', content: '"Mambo" (coisa/situação), "Bwe" (muito), "Mandar vir" (pedir/reclamar). Aprenda alguns termos para facilitar a interação.', icon: 'translate', color: 'text-accent' }
    ],
    'Transporte': [
      { title: 'Táxis Verificados', content: 'Use apenas os serviços de transporte listados no Angola Tour para garantir que o veículo e condutor são certificados.', icon: 'verified', color: 'text-primary' },
      { title: 'Condução Noturna', content: 'Evite conduzir entre províncias durante a noite devido à visibilidade reduzida e possíveis obstáculos na via.', icon: 'nightlight', color: 'text-gray-500' },
      { title: 'Cinto de Segurança', content: 'O uso do cinto de segurança é obrigatório em todos os assentos e rigorosamente fiscalizado.', icon: 'health_and_safety', color: 'text-green-500' }
    ]
  };

  const handleAISafetyAdvice = async () => {
    setAiLoading(true);
    setAiAdvice(null);
    try {
      const response = await getAIRecommendation("Dê-me 3 conselhos de segurança essenciais para um turista que vai viajar de Luanda para o Lubango por estrada pela primeira vez.");
      setAiAdvice(response);
    } catch (e) {
      setAiAdvice("Não consegui ligar ao Guia IA. Verifique a sua conexão.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Dicas & Segurança</h1>
      </header>

      <main className="p-6 space-y-10">
        {/* AI Safety Expert Button */}
        <section>
          <button 
            onClick={handleAISafetyAdvice}
            disabled={aiLoading}
            className="w-full bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10 p-6 rounded-[32px] flex items-center justify-between group active:scale-[0.98] transition-all"
          >
             <div className="flex items-center gap-4">
                <div className={`size-12 rounded-2xl bg-background-dark flex items-center justify-center text-primary shadow-lg ${aiLoading ? 'animate-spin' : ''}`}>
                   <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                </div>
                <div className="text-left">
                   <h3 className="text-sm font-black text-white uppercase tracking-widest">Analisar meu Roteiro</h3>
                   <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Conselhos personalizados com IA</p>
                </div>
             </div>
             <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>

          {aiAdvice && (
            <div className="mt-4 bg-surface-dark/50 border border-primary/20 p-6 rounded-[32px] animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm">security</span>
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Parecer do Guia IA</span>
               </div>
               <p className="text-xs text-gray-300 leading-relaxed italic">"{aiAdvice}"</p>
               <button onClick={() => setAiAdvice(null)} className="mt-3 text-[8px] font-black text-gray-600 uppercase tracking-widest">Ocultar Análise</button>
            </div>
          )}
        </section>

        {/* Categories Tabs */}
        <section className="space-y-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-surface-dark border-white/5 text-gray-500 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{cat.id}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
             <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Recomendações: {activeCategory}</h2>
             {tipsData[activeCategory].map((tip, index) => (
                <div 
                  key={index}
                  className="bg-surface-dark/30 border border-white/5 rounded-[32px] p-6 space-y-4 animate-in fade-in slide-in-from-right duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                   <div className="flex items-center gap-4">
                      <div className={`size-11 rounded-2xl bg-background-dark border border-white/5 flex items-center justify-center ${tip.color}`}>
                         <span className="material-symbols-outlined">{tip.icon}</span>
                      </div>
                      <h3 className="text-sm font-black text-white italic">{tip.title}</h3>
                   </div>
                   <p className="text-xs text-gray-400 leading-relaxed">
                      {tip.content}
                   </p>
                </div>
             ))}
          </div>
        </section>

        {/* SOS Quick Contact */}
        <section className="bg-red-500/10 border border-red-500/20 p-8 rounded-[40px] text-center space-y-4">
           <span className="material-symbols-outlined text-primary text-5xl mb-2">emergency</span>
           <h2 className="text-xl font-black text-white italic">Precisa de Ajuda Imediata?</h2>
           <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[200px] mx-auto">
              Se estiver em perigo ou necessitar de assistência médica urgente, ligue para a nossa central de emergência 24/7.
           </p>
           <button 
             className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3"
           >
              LIGAR SOS ANGOLA
              <span className="material-symbols-outlined text-sm">call</span>
           </button>
        </section>

        <div className="text-center opacity-20 pt-10">
           <p className="text-[9px] font-black uppercase tracking-widest">Protocolo de Segurança Ativo</p>
           <p className="text-[8px] text-gray-500 mt-1 uppercase">Atualizado em tempo real</p>
        </div>
      </main>
    </div>
  );
};

export default SafetyTips;
