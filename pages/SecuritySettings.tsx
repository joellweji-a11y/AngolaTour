
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecuritySettings: React.FC = () => {
  const navigate = useNavigate();
  const [biometrics, setBiometrics] = useState(true);

  return (
    <div className="flex-1 bg-background-dark min-h-screen">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Segurança</h1>
      </header>

      <main className="p-6 space-y-10">
        <section className="space-y-6">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Autenticação</h2>
           <div className="bg-surface-dark border border-white/5 rounded-[32px] p-6 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-background-dark flex items-center justify-center text-blue-400">
                       <span className="material-symbols-outlined">fingerprint</span>
                    </div>
                    <div>
                       <p className="text-sm font-bold text-white">Biometria / Face ID</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase">Acesso rápido ao App</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setBiometrics(!biometrics)}
                   className={`w-12 h-6 rounded-full relative transition-all duration-300 ${biometrics ? 'bg-primary' : 'bg-gray-800'}`}
                 >
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${biometrics ? 'right-1' : 'left-1'}`} />
                 </button>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-background-dark flex items-center justify-center text-accent">
                       <span className="material-symbols-outlined">phonelink_lock</span>
                    </div>
                    <div>
                       <p className="text-sm font-bold text-white">2 Fatores (2FA)</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase">Segurança via SMS</p>
                    </div>
                 </div>
                 <span className="text-[8px] font-black text-primary uppercase border border-primary/30 px-2 py-1 rounded">Desativado</span>
              </div>
           </div>
        </section>

        <section className="space-y-6">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Alterar Palavra-passe</h2>
           <div className="space-y-4">
              <div className="relative">
                 <input 
                   type="password" 
                   className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-12 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                   placeholder="Senha Atual"
                 />
                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">lock_open</span>
              </div>
              <div className="relative">
                 <input 
                   type="password" 
                   className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-12 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                   placeholder="Nova Senha"
                 />
                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">lock</span>
              </div>
              <div className="relative">
                 <input 
                   type="password" 
                   className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-12 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                   placeholder="Confirmar Nova Senha"
                 />
                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">verified_user</span>
              </div>
           </div>
           <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              ATUALIZAR SENHA
           </button>
        </section>
      </main>
    </div>
  );
};

export default SecuritySettings;
