
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  role?: string;
  phone?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = localStorage.getItem('at_user_session');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('at_user_session');
    navigate('/login');
  };

  const triggerImageUpdate = () => fileInputRef.current?.click();

  const isAdmin = user?.role === 'admin' || user?.email === 'admin@angolatour.ao';

  const badges = [
    { name: 'Pioneiro', icon: 'auto_awesome', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { name: 'Kalandula', icon: 'waterfall_chart', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Huíla Pro', icon: 'landscape', color: 'text-green-400', bg: 'bg-green-400/10' },
    { name: 'Semba King', icon: 'music_note', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => alert('Foto de perfil atualizada no AngolaTour!')} />

      {/* Premium Header */}
      <div className="relative h-72 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 brightness-50 blur-[2px]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1600)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/40" />

        {/* Navigation Buttons */}
        <div className="absolute top-12 left-6 right-6 flex justify-between items-center z-20">
          <button
            onClick={() => navigate('/home')}
            className="size-11 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-white">home</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="size-11 rounded-2xl bg-surface-dark/80 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-white">settings</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 flex items-end gap-5">
          <div className="relative">
            <div className="size-24 rounded-3xl border-4 border-background-dark overflow-hidden shadow-2xl relative z-10">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                alt="Profile"
                className="w-full h-full bg-surface-light"
              />
            </div>
            {/* BOTÃO DE EDIÇÃO FLUTUANTE */}
            <button
              onClick={triggerImageUpdate}
              className="absolute -bottom-2 -right-2 size-10 rounded-2xl bg-primary border-4 border-background-dark flex items-center justify-center z-20 shadow-xl active:scale-90 transition-all group"
            >
              <span className="material-symbols-outlined text-white text-base group-hover:rotate-12 transition-transform">edit</span>
            </button>
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-black text-white">{user?.name || 'Viajante'}</h1>
            <p className="text-gray-400 text-xs font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-primary">verified</span>
              {isAdmin ? 'Administrador Geral' : 'Membro Elite'} • Luanda, AO
            </p>
          </div>
        </div>
      </div>

      {/* Access Panels Section */}
      <div className="px-6 mt-6 space-y-3">
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full bg-gradient-to-r from-primary to-red-900 p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-primary/20 group"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined text-white">admin_panel_settings</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-white uppercase tracking-tighter">Painel de Controlo</p>
                <p className="text-[10px] text-white/60 font-medium">Gestão de Utilizadores e Conteúdo</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        )}

        <button
          onClick={() => navigate('/provider')}
          className="w-full bg-surface-dark border border-white/5 p-4 rounded-2xl flex items-center justify-between shadow-xl group"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-accent">storefront</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-white uppercase tracking-tighter">Painel de Parceiro</p>
              <p className="text-[10px] text-gray-500 font-medium">Torne-se um fornecedor turístico</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-500 group-hover:text-accent transition-colors">chevron_right</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mt-6 grid grid-cols-3 gap-3 relative z-30">
        {[
          { label: 'Viagens', val: '12', icon: 'map', path: '/map' },
          { label: 'Fotos', val: '84', icon: 'photo_library', path: '/gallery' },
          { label: 'Reviews', val: '28', icon: 'star', path: '#' },
        ].map((s) => (
          <div
            key={s.label}
            onClick={() => s.path !== '#' && navigate(s.path)}
            className="bg-surface-dark/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex flex-col items-center shadow-xl cursor-pointer active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-primary text-xl mb-1">{s.icon}</span>
            <span className="text-lg font-black text-white">{s.val}</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Settings Central */}
      <section className="mt-8 px-6">
        <button
          onClick={() => navigate('/settings')}
          className="w-full bg-white/5 border border-white/10 p-5 rounded-[32px] flex items-center justify-between group active:bg-white/10 transition-all shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">settings_suggest</span>
            </div>
            <div className="text-left">
              <h3 className="text-sm font-black text-white italic uppercase tracking-widest">Configurações do App</h3>
              <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Idioma, Tema, Segurança e Legais</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary animate-pulse">tune</span>
        </button>
      </section>

      {/* Badges Section */}
      <section className="mt-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black text-white">Minhas Conquistas</h2>
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase">Ver Todas</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {badges.map((badge) => (
            <div key={badge.name} className="shrink-0 flex flex-col items-center gap-2">
              <div className={`size-16 rounded-2xl ${badge.bg} flex items-center justify-center border border-white/5 shadow-inner`}>
                <span className={`material-symbols-outlined text-3xl ${badge.color}`}>{badge.icon}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{badge.name}</span>
            </div>
          ))}
          <div className="shrink-0 flex flex-col items-center gap-2 opacity-30">
            <div className="size-16 rounded-2xl bg-surface-dark flex items-center justify-center border border-dashed border-white/20">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400">Bloqueado</span>
          </div>
        </div>
      </section>

      {/* Logout Button */}
      <section className="mt-10 px-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 mb-10"
        >
          <span className="material-symbols-outlined">logout</span>
          Terminar Sessão
        </button>
      </section>

      <div className="mt-4 mb-20 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Angola Tour v3.2.0</p>
      </div>
    </div>
  );
};

export default Profile;
