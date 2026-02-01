
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacySettings: React.FC = () => {
  const navigate = useNavigate();

  // Estados de privacidade
  const [locationTracking, setLocationTracking] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [aiPersonalization, setAiPersonalization] = useState(true);
  const [usageStats, setUsageStats] = useState(true);
  const [shareContactGuides, setShareContactGuides] = useState(true);

  const ToggleRow = ({ 
    label, 
    sub, 
    value, 
    onChange, 
    icon, 
    color = 'text-white' 
  }: { 
    label: string, 
    sub: string, 
    value: boolean, 
    onChange: (val: boolean) => void,
    icon: string,
    color?: string
  }) => (
    <div className="flex items-center justify-between p-5">
       <div className="flex items-center gap-4">
          <div className={`size-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center ${color}`}>
             <span className="material-symbols-outlined text-xl">{icon}</span>
          </div>
          <div>
             <h4 className="text-sm font-bold text-white leading-tight">{label}</h4>
             <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5 tracking-tighter max-w-[200px]">{sub}</p>
          </div>
       </div>
       <button 
         onClick={() => onChange(!value)}
         className={`w-12 h-6 rounded-full relative transition-all duration-300 ${value ? 'bg-primary shadow-[0_0_10px_#f20d0d40]' : 'bg-gray-800'}`}
       >
          <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${value ? 'right-1' : 'left-1'}`} />
       </button>
    </div>
  );

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Privacidade</h1>
      </header>

      <main className="p-6 space-y-10">
        
        {/* Localização e Visibilidade */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Visibilidade e Localização</h2>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <ToggleRow 
                label="Localização em Tempo Real" 
                sub="Melhora o mapa e táxis" 
                value={locationTracking} 
                onChange={setLocationTracking}
                icon="location_on"
                color="text-blue-400"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Perfil Público" 
                sub="Visível para outros viajantes" 
                value={publicProfile} 
                onChange={setPublicProfile}
                icon="visibility"
                color="text-accent"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Partilha com Guias" 
                sub="Enviar contacto em reservas" 
                value={shareContactGuides} 
                onChange={setShareContactGuides}
                icon="hail"
                color="text-green-400"
              />
           </div>
        </section>

        {/* IA e Dados */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Experiência e IA</h2>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <ToggleRow 
                label="Personalização IA" 
                sub="Sugestões do Guia Gemini" 
                value={aiPersonalization} 
                onChange={setAiPersonalization}
                icon="auto_awesome"
                color="text-primary"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Estatísticas de Uso" 
                sub="Ajuda a melhorar o App" 
                value={usageStats} 
                onChange={setUsageStats}
                icon="bar_chart"
                color="text-purple-400"
              />
           </div>
        </section>

        {/* Gestão de Dados Físicos */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Gestão de Dados</h2>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden">
              <button className="w-full p-5 flex items-center justify-between group active:bg-white/5">
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center text-gray-400">
                       <span className="material-symbols-outlined">download</span>
                    </div>
                    <span className="text-sm font-bold text-gray-200">Descarregar Meus Dados</span>
                 </div>
                 <span className="material-symbols-outlined text-gray-700">chevron_right</span>
              </button>
              <div className="h-px bg-white/5 mx-5" />
              <button 
                onClick={() => { if(window.confirm('Tem certeza que deseja apagar a sua conta permanentemente? Esta ação não pode ser desfeita.')) navigate('/'); }}
                className="w-full p-5 flex items-center justify-between group active:bg-white/5"
              >
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center text-red-500">
                       <span className="material-symbols-outlined">delete_forever</span>
                    </div>
                    <span className="text-sm font-bold text-red-500">Eliminar Conta</span>
                 </div>
                 <span className="material-symbols-outlined text-gray-700">chevron_right</span>
              </button>
           </div>
        </section>

        <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-[32px] flex items-start gap-4">
           <span className="material-symbols-outlined text-blue-400">gavel</span>
           <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
             O Angola Tour cumpre rigorosamente a Lei de Proteção de Dados Pessoais de Angola. Os seus dados são armazenados de forma encriptada.
           </p>
        </div>

        <div className="text-center opacity-20 pb-10">
           <p className="text-[8px] font-black uppercase tracking-widest">Privacy Engine v4.1 • Luanda</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacySettings;
