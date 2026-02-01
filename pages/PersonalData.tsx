
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalData: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '', emergencyContact: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('at_user_session');
    if (session) {
      const parsed = JSON.parse(session);
      setUser({
        name: parsed.name || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        emergencyContact: parsed.emergencyContact || ''
      });
    }
  }, []);

  const handleSave = () => {
    const session = localStorage.getItem('at_user_session');
    if (session) {
      const currentData = JSON.parse(session);
      const updatedData = { ...currentData, ...user };
      localStorage.setItem('at_user_session', JSON.stringify(updatedData));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Dados Pessoais</h1>
      </header>

      <main className="p-6 space-y-10">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="size-28 rounded-[40px] bg-surface-dark border-4 border-primary/20 overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" className="w-full h-full" />
            </div>
            <button className="absolute -bottom-2 -right-2 size-10 rounded-2xl bg-primary border-4 border-background-dark flex items-center justify-center shadow-xl">
              <span className="material-symbols-outlined text-white text-lg">photo_camera</span>
            </button>
          </div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-6">Atualizar foto de perfil</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome Completo</label>
            <input
              type="text"
              className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email</label>
            <input
              type="email"
              className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Telemóvel</label>
            <input
              type="tel"
              className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>

          {/* Contacto de Emergência */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <span className="material-symbols-outlined text-red-500 text-sm">sos</span>
              <label className="text-[10px] font-black text-red-400 uppercase tracking-widest">Contacto de Emergência</label>
            </div>
            <input
              type="tel"
              placeholder="+244 9XX XXX XXX"
              className="w-full bg-red-500/5 border border-red-500/20 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-gray-600"
              value={user.emergencyContact}
              onChange={(e) => setUser({ ...user, emergencyContact: e.target.value })}
            />
            <p className="text-[9px] text-gray-500 ml-1">
              Este número receberá a sua localização em caso de emergência SOS
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all mt-8 ${saved
              ? 'bg-green-500 shadow-green-500/20'
              : 'bg-primary shadow-primary/20'
            }`}
        >
          {saved ? '✓ ALTERAÇÕES SALVAS' : 'SALVAR ALTERAÇÕES'}
        </button>
      </main>
    </div>
  );
};

export default PersonalData;

