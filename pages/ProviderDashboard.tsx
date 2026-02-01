import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ActivityEvent {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'system';
  title: string;
  desc: string;
  time: string;
  unit: string;
  icon: string;
  color: string;
}

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'units' | 'feed'>('overview');

  const metrics = [
    { label: 'Receita Total', val: '4.8M Kz', trend: '+12%', icon: 'payments', color: 'text-green-400' },
    { label: 'Ocupação Média', val: '78%', trend: '+5%', icon: 'analytics', color: 'text-blue-400' },
    { label: 'Novos Clientes', val: '124', trend: '+18%', icon: 'group_add', color: 'text-accent' },
  ];

  const units = [
    { id: '1', name: 'Mufete da Ilha', cat: 'Restaurante', status: 'Operacional', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400', rating: 4.9 },
    { id: '2', name: 'Resort Tundavala', cat: 'Estadia', status: 'Manutenção', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400', rating: 4.7 },
  ];

  const activities: ActivityEvent[] = [
    { id: 'a1', type: 'booking', title: 'Nova Reserva', desc: 'Família Santos (4 pessoas)', time: 'Há 5 min', unit: 'Mufete da Ilha', icon: 'calendar_today', color: 'text-blue-400' },
    { id: 'a2', type: 'payment', title: 'Pagamento Recebido', desc: '15.000 Kz via MCX Express', time: 'Há 12 min', unit: 'Mufete da Ilha', icon: 'check_circle', color: 'text-green-400' },
    { id: 'a3', type: 'review', title: 'Novo Comentário', desc: '5 estrelas: "Comida incrível!"', time: 'Há 1h', unit: 'Resort Tundavala', icon: 'star', color: 'text-accent' },
    { id: 'a4', type: 'system', title: 'Alerta de Licença', desc: 'Renovar em 15 dias', time: 'Há 3h', unit: 'Empresa', icon: 'warning', color: 'text-primary' },
  ];

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      {/* Header Corporativo */}
      <header className="p-6 pt-12 bg-surface-dark/40 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-white italic">Business Hub</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Gestão Angola Tour</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/home')}
              className="size-11 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-white">home</span>
            </button>
            <button
              onClick={() => navigate('/company-profile')}
              className="size-11 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">business</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="size-11 rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-background-dark/80 p-1.5 rounded-2xl border border-white/5 shadow-inner">
          {[
            { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
            { id: 'units', label: 'Unidades', icon: 'account_tree' },
            { id: 'feed', label: 'Fluxo (Feed)', icon: 'dynamic_feed' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-primary text-white font-black shadow-lg shadow-primary/20' : 'text-gray-500'
                }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span className="text-[9px] uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 space-y-10">

        {/* SECTION: OVERVIEW / DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 gap-4">
              {metrics.map(m => (
                <div key={m.label} className="bg-surface-dark border border-white/5 p-6 rounded-[32px] flex items-center justify-between shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 size-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/5 transition-all" />
                  <div className="flex items-center gap-5">
                    <div className={`size-14 rounded-2xl bg-background-dark flex items-center justify-center border border-white/5 ${m.color}`}>
                      <span className="material-symbols-outlined text-3xl">{m.icon}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{m.label}</p>
                      <h2 className="text-2xl font-black text-white mt-0.5">{m.val}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-black ${m.trend.includes('+') ? 'text-green-500' : 'text-primary'}`}>{m.trend}</p>
                    <p className="text-[8px] text-gray-600 font-bold uppercase">Este mês</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Business Insight */}
            <section className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-6 rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-symbols-outlined text-primary text-4xl opacity-20">auto_awesome</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Insight de Crescimento</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                A sua unidade <span className="text-white font-bold">Mufete da Ilha</span> tem tido 30% mais cliques às Quintas-feiras. Que tal uma promoção de happy hour para este dia?
              </p>
              <button className="mt-4 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">Ver Sugestões de Campanhas</button>
            </section>
          </div>
        )}

        {/* SECTION: UNITS / PROJECTS LIST */}
        {activeTab === 'units' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Minhas Unidades</h3>
              <button
                onClick={() => navigate('/register-service')}
                className="bg-primary px-4 py-2 rounded-xl text-[9px] font-black text-white uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                + Nova Unidade
              </button>
            </div>

            <div className="space-y-4">
              {units.map(unit => (
                <div
                  key={unit.id}
                  onClick={() => navigate(`/establishment-dashboard/${unit.id}`)}
                  className="bg-surface-dark border border-white/5 p-4 rounded-[32px] flex gap-4 items-center group active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="relative size-20 shrink-0">
                    <img src={unit.img} className="w-full h-full rounded-2xl object-cover shadow-xl" alt={unit.name} />
                    <div className="absolute -top-2 -right-2 size-7 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <span className="text-[8px] font-black text-accent">{unit.rating}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-black text-white italic">{unit.name}</h4>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{unit.cat}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`size-2 rounded-full ${unit.status === 'Operacional' ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className={`text-[9px] font-black uppercase ${unit.status === 'Operacional' ? 'text-green-500' : 'text-orange-500'}`}>{unit.status}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-gray-700 group-hover:text-white transition-colors">chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: WORKFLOW FEED (REAL-TIME) */}
        {activeTab === 'feed' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Fluxo de Trabalho</h3>
              <span className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.2em]">Tempo Real</span>
            </div>

            <div className="space-y-4 relative">
              {/* Visual Timeline line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/5 z-0" />

              {activities.map(act => (
                <div key={act.id} className="relative z-10 flex gap-4 group">
                  <div className="size-14 rounded-[22px] bg-background-dark border border-white/5 flex items-center justify-center shrink-0 shadow-xl">
                    <span className={`material-symbols-outlined text-2xl ${act.color}`}>{act.icon}</span>
                  </div>
                  <div className="flex-1 bg-surface-dark/40 border border-white/5 p-5 rounded-[28px] group-hover:bg-surface-dark transition-all">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-white leading-none">{act.title}</h4>
                      <span className="text-[8px] font-bold text-gray-600 uppercase">{act.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">{act.desc}</p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[8px] font-black text-primary uppercase tracking-widest">{act.unit}</span>
                      <button className="text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                        AÇÃO <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer Support */}
      <div className="mt-12 mb-20 px-8 text-center opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white">Angola Tour Enterprise Hub</p>
        <p className="text-[8px] mt-1 text-gray-500 uppercase font-bold">Protocolo de Segurança Ativo • SSL Encrypted</p>
      </div>
    </div>
  );
};

export default ProviderDashboard;