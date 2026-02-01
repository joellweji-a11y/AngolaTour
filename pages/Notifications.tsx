
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'booking' | 'payment' | 'offer' | 'system';
  icon: string;
}

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todas');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Reserva Confirmada',
      message: 'A sua estadia no Resort da Huíla foi confirmada com sucesso. Prepare-se para o Lubango!',
      time: '15 min atrás',
      isRead: false,
      type: 'booking',
      icon: 'bed'
    },
    {
      id: '2',
      title: 'Pagamento Recebido',
      message: 'Recebemos o pagamento de 137.000 Kz referente à fatura #TX-9901.',
      time: '2 horas atrás',
      isRead: false,
      type: 'payment',
      icon: 'check_circle'
    },
    {
      id: '3',
      title: 'OFERTA: Mufete Especial',
      message: 'O Quintal da Tia Maria tem mufete com 20% de desconto hoje para membros Gold.',
      time: '5 horas atrás',
      isRead: true,
      type: 'offer',
      icon: 'restaurant'
    },
    {
      id: '4',
      title: 'Lembrete de Viagem',
      message: 'O seu táxi Luanda Express chegará em 10 minutos à sua localização atual.',
      time: 'Ontem',
      isRead: true,
      type: 'booking',
      icon: 'commute'
    },
    {
      id: '5',
      title: 'Segurança da Conta',
      message: 'Um novo login foi detetado num dispositivo iPhone 15 Pro em Luanda.',
      time: 'Ontem',
      isRead: true,
      type: 'system',
      icon: 'security'
    }
  ]);

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'payment': return 'bg-green-500/10 text-green-400 border-green-400/20';
      case 'offer': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const filtered = filter === 'Todas' 
    ? notifications 
    : notifications.filter(n => n.type === filter.toLowerCase() || (filter === 'Não Lidas' && !n.isRead));

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      {/* Sticky Header */}
      <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-lg z-30 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-black text-white">Notificações</h2>
        <button 
          onClick={markAllAsRead}
          className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5 text-primary"
          title="Marcar todas como lidas"
        >
          <span className="material-symbols-outlined text-sm">done_all</span>
        </button>
      </header>

      {/* Filters Bar */}
      <div className="px-6 flex gap-2 overflow-x-auto no-scrollbar py-6">
        {['Todas', 'Não Lidas', 'Booking', 'Offer', 'Payment'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              filter === f ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-surface-dark border-white/5 text-gray-500'
            }`}
          >
            {f === 'Booking' ? 'Reservas' : f === 'Offer' ? 'Promoções' : f === 'Payment' ? 'Pagamentos' : f}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="px-6 space-y-4">
        {filtered.map((n) => (
          <div 
            key={n.id} 
            className={`relative p-5 rounded-3xl border transition-all duration-300 ${
              n.isRead ? 'bg-surface-dark/40 border-white/5 grayscale-[0.5]' : 'bg-surface-dark border-primary/20 shadow-xl'
            }`}
          >
            {!n.isRead && (
              <div className="absolute top-5 right-5 size-2 bg-primary rounded-full shadow-[0_0_8px_#f20d0d]" />
            )}
            
            <div className="flex gap-4">
              <div className={`size-12 rounded-2xl flex items-center justify-center border shrink-0 ${getTypeStyles(n.type)}`}>
                <span className="material-symbols-outlined text-2xl">{n.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm font-bold ${n.isRead ? 'text-gray-400' : 'text-white'}`}>{n.title}</h3>
                  <span className="text-[9px] font-bold text-gray-600 uppercase">{n.time}</span>
                </div>
                <p className={`text-xs leading-relaxed ${n.isRead ? 'text-gray-500' : 'text-gray-400'}`}>
                  {n.message}
                </p>
                {!n.isRead && (
                  <div className="mt-3 flex gap-2">
                    <button className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">Ver Detalhes</button>
                    <button className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-3 py-1.5">Ignorar</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center opacity-30 text-center animate-in fade-in zoom-in duration-500">
             <div className="size-24 rounded-full bg-surface-dark flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl">notifications_off</span>
             </div>
             <p className="font-black text-white">Tudo em dia!</p>
             <p className="text-xs text-gray-400 mt-2">Você não tem novas notificações<br/>nesta categoria.</p>
          </div>
        )}
      </div>

      {/* Footer Support */}
      <div className="mt-12 mb-24 px-8 text-center">
         <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-[32px] border border-white/5">
            <span className="material-symbols-outlined text-primary text-3xl mb-3">support_agent</span>
            <p className="text-sm font-bold text-white mb-1">Precisa de ajuda?</p>
            <p className="text-[10px] text-gray-500 mb-4">A nossa equipa de suporte está disponível 24/7 para lhe auxiliar em qualquer questão.</p>
            <button className="bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Contactar Suporte</button>
         </div>
      </div>
    </div>
  );
};

export default Notifications;
