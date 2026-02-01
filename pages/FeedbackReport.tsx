
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAIRecommendation } from '../services/geminiService';

const FeedbackReport: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Bug Técnico');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const categories = [
    { label: 'Bug Técnico', icon: 'code', color: 'text-red-400' },
    { label: 'Pagamento', icon: 'payments', color: 'text-accent' },
    { label: 'Segurança', icon: 'security', color: 'text-blue-400' },
    { label: 'Sugestão', icon: 'lightbulb', color: 'text-green-400' },
    { label: 'Elogio', icon: 'favorite', color: 'text-primary' },
  ];

  const handleAskAI = async () => {
    if (description.length < 10) return;
    setAiLoading(true);
    try {
      const response = await getAIRecommendation(`Um usuário do Angola Tour está relatando o seguinte problema: "${description}". Se for algo comum, dê uma dica rápida de solução, senão diga que a equipa vai analisar.`);
      setAiTip(response);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background-dark text-center animate-in fade-in duration-500">
         <div className="size-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_#22c55e20]">
            <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
         </div>
         <h1 className="text-2xl font-black text-white italic mb-2">Feedback Recebido!</h1>
         <p className="text-xs text-gray-500 leading-relaxed mb-10 max-w-[240px]">
            Obrigado por ajudar a tornar o <span className="text-white">Angola Tour</span> melhor. A nossa equipa irá analisar o seu relato em breve.
         </p>
         <button 
           onClick={() => navigate('/home')}
           className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
         >
           VOLTAR AO INÍCIO
         </button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Feedback</h1>
      </header>

      <main className="p-6 space-y-10">
        {/* Intro */}
        <section>
           <h2 className="text-2xl font-black text-white italic leading-tight">Como podemos<br/>ajudar?</h2>
           <p className="text-xs text-gray-500 font-medium mt-2">Relate erros ou envie sugestões para a nossa equipa.</p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
           {/* Category Selection */}
           <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-4 block">Categoria do Relato</label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                 {categories.map((cat) => (
                   <button
                     key={cat.label}
                     type="button"
                     onClick={() => setCategory(cat.label)}
                     className={`shrink-0 flex flex-col items-center gap-2 p-4 rounded-3xl border transition-all ${
                       category === cat.label 
                         ? 'bg-surface-dark border-primary shadow-lg shadow-primary/10' 
                         : 'bg-surface-dark/40 border-white/5 opacity-60'
                     }`}
                   >
                      <span className={`material-symbols-outlined ${cat.color}`}>{cat.icon}</span>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">{cat.label}</span>
                   </button>
                 ))}
              </div>
           </section>

           {/* AI Help Widget */}
           {description.length > 15 && (
             <section className="bg-primary/5 border border-primary/20 p-5 rounded-[32px] animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest">Angola Tour AI Assistant</span>
                   </div>
                   <button 
                     type="button"
                     onClick={handleAskAI}
                     disabled={aiLoading}
                     className="text-[8px] font-black text-white uppercase bg-primary px-3 py-1 rounded-lg"
                   >
                      {aiLoading ? 'A analisar...' : 'Consultar Solução'}
                   </button>
                </div>
                {aiTip && (
                  <p className="text-[11px] text-gray-300 leading-relaxed italic border-t border-primary/10 pt-3">
                    "{aiTip}"
                  </p>
                )}
             </section>
           )}

           {/* Input Area */}
           <section className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 block">Descrição Detalhada</label>
              <textarea 
                required
                className="w-full bg-surface-dark border border-white/10 rounded-[32px] p-6 text-sm text-white focus:ring-2 focus:ring-primary outline-none resize-none min-h-[160px]"
                placeholder="Explique o que aconteceu ou o que gostaria de ver no App..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
           </section>

           {/* Attachments */}
           <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-4 block">Evidências (Opcional)</label>
              <div className="h-28 w-full border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center group cursor-pointer hover:border-primary/40 transition-colors">
                 <span className="material-symbols-outlined text-gray-600 text-3xl group-hover:scale-110 transition-transform">add_a_photo</span>
                 <span className="text-[9px] font-black text-gray-600 uppercase mt-2">Adicionar Screenshot</span>
              </div>
           </section>

           {/* Submit Button */}
           <button 
             disabled={isSubmitting}
             type="submit"
             className="w-full bg-primary py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
           >
             {isSubmitting ? (
               <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
             ) : (
               <>
                 ENVIAR RELATÓRIO
                 <span className="material-symbols-outlined text-sm font-black">send</span>
               </>
             )}
           </button>
        </form>

        <div className="text-center opacity-20 pt-10">
           <p className="text-[8px] font-black uppercase tracking-widest">Sessão: #AO-BETA-772 • Versão 3.2.0</p>
        </div>
      </main>
    </div>
  );
};

export default FeedbackReport;
