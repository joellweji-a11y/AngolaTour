import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { getDailyTip } from '../services/geminiService';
import { Footer } from '../components/Footer';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Viajante');
  const [dailyTip, setDailyTip] = useState('Explore as belezas de Angola com segurança.');
  const [isTipLoading, setIsTipLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('at_user_session');
    if (session) {
      const user = JSON.parse(session);
      setUserName(user.name?.split(' ')[0] || 'Viajante');
    }

    const fetchTip = async () => {
      const tip = await getDailyTip();
      setDailyTip(tip);
      setIsTipLoading(false);
    };
    fetchTip();
  }, []);

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-[#0d0d0d]">
      {/* 1. Header Dinâmico com Status */}
      <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-[#0d0d0d]/80 backdrop-blur-xl z-40">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/profile')}>
          <div className="relative">
            <div className="size-14 rounded-2xl border-2 border-primary/50 p-0.5 bg-surface-dark overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt="Profile"
                className="w-full h-full object-cover rounded-xl bg-surface-light"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-4 border-[#0d0d0d]" />
          </div>
          <div>
            <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em]">Bem-vindo de volta,</p>
            <h1 className="text-2xl font-black text-white italic tracking-tighter">{userName} 🇦🇴</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/notifications')}
            className="size-12 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center relative active:scale-90 transition-all shadow-xl"
          >
            <span className="material-symbols-outlined text-gray-300">notifications</span>
            <span className="absolute top-3 right-3 size-2.5 bg-primary rounded-full border-2 border-surface-dark animate-pulse shadow-[0_0_10px_#f20d0d]"></span>
          </button>
        </div>
      </header>

      {/* 2. Mambo do Dia - AI Driven Spotlight */}
      <section className="px-6 mb-10">
        <div className="bg-gradient-to-br from-primary to-red-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform duration-700">
            <span className="material-symbols-outlined text-white text-6xl">auto_awesome</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-widest">Mambo do Dia</span>
            </div>
            <p className={`text-lg font-black text-white italic leading-tight transition-opacity ${isTipLoading ? 'opacity-50' : 'opacity-100'}`}>
              "{dailyTip}"
            </p>
            <button
              onClick={() => navigate('/search')}
              className="mt-6 bg-white text-primary px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              EXPLORAR AGORA
            </button>
          </div>
          <div className="absolute -bottom-10 -left-10 size-40 bg-white/5 blur-3xl rounded-full" />
        </div>
      </section>

      {/* 3. Busca Unificada / AI Assistant Bar */}
      <div className="px-6 mb-10">
        <div
          onClick={() => navigate('/search')}
          className="relative cursor-pointer bg-surface-dark/60 border border-white/10 rounded-[32px] p-6 text-gray-500 shadow-2xl flex items-center group hover:bg-surface-light transition-all"
        >
          <span className="material-symbols-outlined text-primary text-2xl mr-4 group-hover:scale-110 transition-transform">
            search
          </span>
          <span className="text-sm font-bold tracking-tight uppercase">Qual o seu próximo destino em Angola?</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[8px] font-black text-primary/60 uppercase">Gemini AI</span>
            <span className="material-symbols-outlined text-primary/40 text-lg animate-pulse">auto_awesome</span>
          </div>
        </div>
      </div>

      {/* 4. Quick Access - Categorias de Experiência */}
      <section className="px-6 mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Quick Access</h2>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Serviços Oficiais Angola Tour</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Dormir', icon: 'hotel', path: '/stay', accent: false },
            { label: 'Comer', icon: 'restaurant', path: '/food', accent: false },
            { label: 'Ir', icon: 'directions_car', path: '/transport', accent: false },
            { label: 'Cultura', icon: 'account_balance', path: '/mosaic', accent: false },
            { label: 'SOS', icon: 'emergency', path: '/sos', accent: true },
            { label: 'Mapa', icon: 'map', path: '/map', accent: false },
          ].map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(cat.path)}
              className="quick-access-btn bg-surface-dark/60 dark:bg-surface-dark/60 rounded-[28px] p-5 flex flex-col items-center gap-3 border border-white/5 hover:border-primary/30 transition-all shadow-xl active:scale-90 hover:shadow-primary/20 group"
            >
              <div className={`size-14 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3 ${cat.accent
                ? 'bg-red-500 shadow-red-500/30'
                : 'bg-primary shadow-primary/30'
                }`}>
                <span className="material-symbols-outlined text-white text-2xl">{cat.icon}</span>
              </div>
              <span className="font-black text-[10px] text-gray-300 dark:text-gray-300 uppercase tracking-widest">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Create Ad Button */}
        <button
          onClick={() => navigate('/ads/create')}
          className="w-full mt-6 bg-gradient-to-r from-accent to-yellow-500 text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-accent/20 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined text-xl">add_circle</span>
          Publicar Anúncio
        </button>
      </section>

      {/* 5. Destinos em Destaque */}
      <section className="mb-10">
        <div className="px-6 flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Top Destinos</h2>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Visitados por milhares</p>
          </div>
          <button onClick={() => navigate('/mosaic')} className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border-b border-primary/20 pb-0.5">
            VER TUDO <span className="material-symbols-outlined text-xs font-black">east</span>
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-6">
          {DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/details/${item.id}`)}
              className="shrink-0 w-72 rounded-[40px] overflow-hidden bg-surface-dark border border-white/5 relative group cursor-pointer shadow-2xl transition-all active:scale-[0.98]"
            >
              <div
                className="h-[400px] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-accent text-sm">star</span>
                  <span className="text-xs font-black text-white">{item.rating}</span>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/80 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-wider shadow-lg">DESTINO VIP</span>
                  <span className="text-[10px] font-bold text-gray-200 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                    {item.location.split(',')[0]}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white leading-tight mb-4 italic tracking-tighter">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-white">
                    <span className="text-xs font-bold text-primary mr-1">Kz</span>
                    {item.price}
                  </p>
                  <div className="size-12 rounded-full bg-white flex items-center justify-center text-black shadow-2xl group-hover:bg-accent transition-colors">
                    <span className="material-symbols-outlined text-xl font-black">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Banner de Experiência Imersiva */}
      <div className="px-6 pb-20">
        <button
          onClick={() => navigate('/experience')}
          className="w-full relative h-52 rounded-[48px] overflow-hidden group shadow-2xl transition-all active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 border-2 border-primary/20 rounded-[48px]" />

          <div className="absolute top-8 left-10 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-2 bg-accent rounded-full animate-ping" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Tour Virtual 360°</span>
            </div>
            <h2 className="text-3xl font-black text-white italic leading-none">Vê Angola<br />como nunca.</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-4 tracking-widest">Ligar Experiência RA</p>
          </div>

          <div className="absolute bottom-8 right-10 size-16 rounded-full bg-accent/20 backdrop-blur-md border border-accent/40 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shadow-[0_0_20px_#FFD70030]">
            <span className="material-symbols-outlined text-4xl">view_in_ar</span>
          </div>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;