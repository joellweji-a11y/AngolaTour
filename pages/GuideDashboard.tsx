
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const GuideDashboard: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [userName, setUserName] = useState('Guia');

  useEffect(() => {
    const session = localStorage.getItem('at_user_session');
    if (session) {
      const user = JSON.parse(session);
      setUserName(user.name?.split(' ')[0] || 'Guia');
    }
  }, []);

  const handleAIAdvice = async () => {
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Como um guia turístico em Angola, me dê uma dica rápida de como melhorar a experiência de um grupo de turistas estrangeiros interessados em história colonial em Luanda hoje.",
        config: {
          systemInstruction: "Você é um mentor para guias turísticos em Angola. Dê dicas curtas, práticas e autênticas."
        }
      });
      setAiTip(response.text);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const metrics = [
    { label: 'Turistas', val: '142', icon: 'groups', color: 'text-accent' },
    { label: 'Avaliação', val: '4.9', icon: 'star', color: 'text-yellow-400' },
    { label: 'Ganhos (Kz)', val: '840k', icon: 'payments', color: 'text-green-500' },
  ];

  const upcomingTours = [
    { id: 'T1', tourist: 'Family Smith (UK)', destination: 'Miradouro da Lua', time: 'Amanhã, 08:30', status: 'Confirmado' },
    { id: 'T2', tourist: 'Jean Pierre (FR)', destination: 'Fortaleza S. Miguel', time: '15 Nov, 14:00', status: 'Pendente' }
  ];

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => alert('Foto do guia atualizada!')} />
      
      {/* Header Profissional */}
      <header className="p-6 pt-12 flex flex-col gap-6 bg-surface-dark/40 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="relative">
                <div className="size-12 rounded-2xl border-2 border-accent p-0.5 bg-background-dark overflow-hidden shadow-lg shadow-accent/10">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
                      alt="Guide" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                </div>
                {/* BOTÃO FLUTUANTE DE EDIÇÃO */}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 size-5 rounded-lg bg-accent border-2 border-background-dark flex items-center justify-center z-20 shadow-lg active:scale-90"
                >
                  <span className="material-symbols-outlined text-black text-[10px] font-black">photo_camera</span>
                </button>
             </div>
             <div>
                <h1 className="text-xl font-black text-white italic">Olá, {userName}</h1>
                <p className="text-[9px] text-accent font-black uppercase tracking-widest">Guia Especialista • Luanda</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3 bg-background-dark/80 p-1.5 rounded-2xl border border-white/10">
            <span className={`text-[8px] font-black uppercase tracking-widest ml-3 ${isOnline ? 'text-green-500' : 'text-gray-500'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-11 h-6 rounded-full relative transition-all duration-500 ${isOnline ? 'bg-green-500' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 size-4 bg-white rounded-full transition-all shadow-md ${isOnline ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map(m => (
            <div key={m.label} className="bg-surface-dark/50 border border-white/5 p-4 rounded-[28px] text-center shadow-xl">
               <span className={`material-symbols-outlined ${m.color} text-xl mb-1`}>{m.icon}</span>
               <p className="text-lg font-black text-white">{m.val}</p>
               <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mt-1 leading-tight">{m.label}</p>
            </div>
          ))}
        </div>

        {/* AI Guide Mentor Card */}
        <section className="bg-gradient-to-br from-primary/10 via-background-dark to-background-dark border border-primary/20 p-6 rounded-[32px] relative overflow-hidden group">
           <div className="absolute -right-6 -top-6 size-24 bg-primary/20 blur-2xl rounded-full opacity-50" />
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Mentor IA para Guias</h3>
                 </div>
                 <button 
                   onClick={handleAIAdvice}
                   disabled={aiLoading}
                   className="size-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary active:scale-90 transition-all disabled:opacity-50"
                 >
                    <span className={`material-symbols-outlined text-sm ${aiLoading ? 'animate-spin' : ''}`}>refresh</span>
                 </button>
              </div>
              
              {aiTip ? (
                <p className="text-xs text-gray-300 leading-relaxed font-medium animate-in fade-in slide-in-from-top-2 duration-500 italic">
                  "{aiTip}"
                </p>
              ) : (
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Toque para uma dica rápida de roteiro...</p>
              )}
           </div>
        </section>

        {/* Agenda de Trilhos */}
        <section>
           <div className="flex justify-between items-end mb-4 px-2">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Agenda de Trilhos</h2>
              <span className="text-[10px] font-black text-primary uppercase">Ver Calendário</span>
           </div>
           
           <div className="space-y-4">
              {upcomingTours.map(tour => (
                 <div key={tour.id} className="bg-surface-dark/30 border border-white/5 p-5 rounded-[32px] flex items-center justify-between shadow-xl group hover:bg-surface-dark/50 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="size-12 rounded-2xl bg-background-dark flex items-center justify-center text-gray-500 border border-white/5">
                          <span className="material-symbols-outlined text-2xl group-hover:text-accent transition-colors">hiking</span>
                       </div>
                       <div>
                          <h4 className="text-sm font-black text-white">{tour.destination}</h4>
                          <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">{tour.tourist} • {tour.time}</p>
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className={`text-[7px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${tour.status === 'Confirmado' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                          {tour.status}
                       </span>
                       <span className="material-symbols-outlined text-gray-700 group-hover:text-white transition-colors">chevron_right</span>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* Ferramentas do Guia */}
        <section className="grid grid-cols-2 gap-4">
           <button className="bg-surface-dark/60 border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 shadow-xl hover:border-accent/30 transition-all group">
              <div className="size-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined">explore</span>
              </div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Meus Trilhos</span>
           </button>
           <button className="bg-surface-dark/60 border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 shadow-xl hover:border-blue-400/30 transition-all group">
              <div className="size-12 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined">reviews</span>
              </div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Feedback</span>
           </button>
        </section>

        {/* Compromisso com a Cultura */}
        <section className="bg-surface-dark/20 border border-white/5 p-6 rounded-[32px] flex gap-4 items-center opacity-60">
           <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
              <span className="material-symbols-outlined text-xl">gavel</span>
           </div>
           <p className="text-[9px] text-gray-500 leading-tight uppercase font-bold tracking-widest">
              A sua licença INFOTUR expira em <span className="text-white">45 dias</span>. Considere renovar no portal.
           </p>
        </section>
      </main>

      {/* Navegação de Saída */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40">
        <button 
          onClick={() => navigate('/profile')}
          className="w-full bg-surface-dark border border-white/10 py-4 rounded-2xl font-black text-sm text-gray-400 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-lg">person</span>
          VER MEU PERFIL PÚBLICO
        </button>
      </footer>
    </div>
  );
};

export default GuideDashboard;
