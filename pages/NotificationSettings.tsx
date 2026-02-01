
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  
  // States para cada tipo de notificação
  const [masterToggle, setMasterToggle] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  
  const [reminders, setReminders] = useState(true);
  const [guideMessages, setGuideMessages] = useState(true);
  const [transportChanges, setTransportChanges] = useState(true);
  
  const [promotions, setPromotions] = useState(true);
  const [culturalEvents, setCulturalEvents] = useState(false);
  
  const [appSounds, setAppSounds] = useState(true);
  const [vibration, setVibration] = useState(true);

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
    <div className={`flex items-center justify-between p-5 ${!masterToggle && label !== 'Todas Notificações' ? 'opacity-30 pointer-events-none' : ''}`}>
       <div className="flex items-center gap-4">
          <div className={`size-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center ${color}`}>
             <span className="material-symbols-outlined text-xl">{icon}</span>
          </div>
          <div>
             <h4 className="text-sm font-bold text-white leading-tight">{label}</h4>
             <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5 tracking-tighter">{sub}</p>
          </div>
       </div>
       <button 
         onClick={() => onChange(!value)}
         className={`w-12 h-6 rounded-full relative transition-all duration-300 ${value ? 'bg-primary' : 'bg-gray-800'}`}
       >
          <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${value ? 'right-1' : 'left-1'}`} />
       </button>
    </div>
  );

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Notificações</h1>
      </header>

      <main className="p-6 space-y-10">
        
        {/* Controle Mestre */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Geral</h2>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <ToggleRow 
                label="Todas Notificações" 
                sub="Ativar alertas globais" 
                value={masterToggle} 
                onChange={setMasterToggle}
                icon="notifications_active"
                color="text-primary"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Sons de Notificação" 
                sub="Tocar som ao receber alertas" 
                value={soundsEnabled} 
                onChange={setSoundsEnabled}
                icon="volume_up"
                color="text-blue-400"
              />
           </div>
        </section>

        {/* Viagens e Reservas */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Viagens e Reservas</h2>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <ToggleRow 
                label="Lembrete de Reserva" 
                sub="Avisos 24h antes da estadia" 
                value={reminders} 
                onChange={setReminders}
                icon="event_note"
                color="text-accent"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Mensagens de Guias" 
                sub="Chats diretos de especialistas" 
                value={guideMessages} 
                onChange={setGuideMessages}
                icon="forum"
                color="text-green-400"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Alterações de Transporte" 
                sub="Status de vôos e táxis" 
                value={transportChanges} 
                onChange={setTransportChanges}
                icon="commute"
                color="text-red-400"
              />
           </div>
        </section>

        {/* Ofertas e Cultura */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Ofertas e Cultura</h2>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <ToggleRow 
                label="Novas Promoções" 
                sub="Descontos exclusivos no App" 
                value={promotions} 
                onChange={setPromotions}
                icon="local_offer"
                color="text-orange-400"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Eventos Culturais" 
                sub="Festivais e roteiros históricos" 
                value={culturalEvents} 
                onChange={setCulturalEvents}
                icon="festival"
                color="text-purple-400"
              />
           </div>
        </section>

        {/* Sistema */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Sistema</h2>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <ToggleRow 
                label="Sons no App" 
                sub="Cliques e feedback de UI" 
                value={appSounds} 
                onChange={setAppSounds}
                icon="music_note"
                color="text-gray-400"
              />
              <div className="h-px bg-white/5 mx-5" />
              <ToggleRow 
                label="Vibração" 
                sub="Feedback tátil para acções" 
                value={vibration} 
                onChange={setVibration}
                icon="vibration"
                color="text-gray-400"
              />
           </div>
        </section>

        <div className="bg-primary/5 border border-primary/20 p-6 rounded-[32px] flex items-start gap-4">
           <span className="material-symbols-outlined text-primary">info</span>
           <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
             Alertas críticos de segurança e transações financeiras <span className="text-white font-bold underline">não podem ser desativados</span> para sua proteção.
           </p>
        </div>

      </main>
    </div>
  );
};

export default NotificationSettings;
