
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [adminData, setAdminData] = useState({
    name: 'Super Admin AngolaTour',
    email: 'direcao@angolatour.ao',
    role: 'Root Administrator',
    lastLogin: 'Há 12 minutos',
    ip: '197.231.0.42 (Luanda)'
  });

  const systemStats = [
    { label: 'Uptime', val: '99.9%', color: 'text-green-500' },
    { label: 'Servidores', val: 'Ativos', color: 'text-blue-400' },
    { label: 'Erros 24h', val: '0', color: 'text-gray-500' }
  ];

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32 overflow-y-auto no-scrollbar">
      {/* Admin Identity Header */}
      <header className="p-6 pt-12 bg-gradient-to-b from-primary/20 to-transparent border-b border-white/5 sticky top-0 backdrop-blur-xl z-50">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/admin')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div className="text-center">
             <h1 className="text-sm font-black text-white uppercase tracking-[0.4em] italic">Perfil do Administrador</h1>
             <p className="text-[8px] text-primary font-black uppercase mt-1">Acesso Nível 5 • Encriptado</p>
          </div>
          <button className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">security</span>
          </button>
        </div>

        <div className="flex flex-col items-center">
           <div className="relative">
              <div className="size-24 rounded-[40px] bg-background-dark border-4 border-primary p-1 shadow-[0_0_40px_#f20d0d30] overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AdminRoot" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 size-8 rounded-2xl border-4 border-background-dark flex items-center justify-center">
                 <span className="material-symbols-outlined text-white text-xs">verified</span>
              </div>
           </div>
           <h2 className="text-xl font-black text-white mt-4 italic">{adminData.name}</h2>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{adminData.role}</p>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* System Health Summary */}
        <section className="grid grid-cols-3 gap-3">
           {systemStats.map(s => (
             <div key={s.label} className="bg-surface-dark/50 border border-white/5 p-4 rounded-3xl text-center">
                <p className={`text-sm font-black ${s.color}`}>{s.val}</p>
                <p className="text-[7px] font-bold text-gray-600 uppercase tracking-widest mt-1">{s.label}</p>
             </div>
           ))}
        </section>

        {/* Global Controls */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Controlo Global do Ecossistema</h3>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center text-red-500">
                       <span className="material-symbols-outlined">construction</span>
                    </div>
                    <div>
                       <p className="text-sm font-bold text-white">Modo Manutenção</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase">Bloqueia acesso a viajantes</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                   className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isMaintenanceMode ? 'bg-primary' : 'bg-gray-800'}`}
                 >
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${isMaintenanceMode ? 'right-1' : 'left-1'}`} />
                 </button>
              </div>

              <button className="w-full p-5 flex items-center justify-between group">
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-background-dark border border-white/5 flex items-center justify-center text-accent">
                       <span className="material-symbols-outlined">database</span>
                    </div>
                    <span className="text-sm font-bold text-gray-200">Exportar Base de Dados (JSON/CSV)</span>
                 </div>
                 <span className="material-symbols-outlined text-gray-700">download</span>
              </button>
           </div>
        </section>

        {/* Security Logs */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Logs de Auditoria</h3>
              <span className="text-[8px] font-black text-primary uppercase">Ver Full Log</span>
           </div>
           <div className="space-y-3">
              {[
                { event: 'Nova Empresa Registada', user: 'Hotel Ritz', time: 'Há 5m', status: 'pendente' },
                { event: 'Pagamento Confirmado', user: 'User #882', time: 'Há 12m', status: 'ok' },
                { event: 'Acesso Administrativo', user: 'IP 197.231.x', time: 'Há 15m', status: 'auth' },
              ].map((log, i) => (
                <div key={i} className="bg-surface-dark/30 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className={`size-2 rounded-full ${log.status === 'pendente' ? 'bg-accent' : log.status === 'ok' ? 'bg-green-500' : 'bg-blue-400'}`} />
                      <div>
                         <p className="text-[10px] font-black text-white">{log.event}</p>
                         <p className="text-[8px] text-gray-500 font-bold uppercase">{log.user}</p>
                      </div>
                   </div>
                   <span className="text-[8px] text-gray-600 font-black">{log.time}</span>
                </div>
              ))}
           </div>
        </section>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
           <button className="bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              Alterar Credenciais
           </button>
           <button 
             onClick={() => { localStorage.removeItem('at_user_session'); navigate('/login'); }}
             className="bg-red-500/10 border border-red-500/20 text-red-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
           >
              Encerrar Sessão Root
           </button>
        </div>

        <div className="text-center pt-8 opacity-20">
           <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Angola Tour System Administration</p>
           <p className="text-[7px] text-gray-500 mt-2">Versão do Kernel: 5.0.2-stable-luanda</p>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
