import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    const hasSession = !!localStorage.getItem('at_user_session');
    if (hasSession) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">

      {/* 1. Fundo Dinâmico: Bandeira de Angola com Efeito Glassmorphism */}
      <div className="absolute inset-0 z-0 flex flex-col opacity-30 pointer-events-none">
        <div className="flex-1 bg-primary/40" />
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <div className="size-64 border-[15px] border-accent/20 rounded-full border-t-transparent -rotate-45 flex items-center justify-center animate-[spin_10s_linear_infinite]">
            <div className="size-20 bg-accent/20 rotate-45" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
        </div>
      </div>

      {/* 2. Centro: A Majestosa Palanca Negra Gigante */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="relative size-80 md:size-[450px] flex items-center justify-center group">
          {/* Aura de brilho atrás do animal */}
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/O_Pensador%2C_National_Museum_of_Anthropology%2C_Luanda.jpg/400px-O_Pensador%2C_National_Museum_of_Anthropology%2C_Luanda.jpg"
            alt="Símbolo Cultural de Angola - O Pensador"
            className="w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)] filter brightness-110 saturate-[1.1] animate-in fade-in zoom-in duration-1000"
          />

          {/* Nome da App: Angola Tour */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full text-center">
            <h1 className="text-display text-6xl md:text-8xl font-black tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,1)] select-none">
              <span className="text-primary uppercase">Angola</span>
              <span className="text-accent italic">Tour</span>
            </h1>
          </div>
        </div>

        <div className="text-center mt-12 space-y-2 animate-in fade-in duration-700 delay-500">
          <p className="text-body text-gray-400 text-lg font-bold tracking-[0.3em] uppercase opacity-70">
            A Nossa Terra, O Teu Destino
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">República de Angola</span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
        </div>
      </div>

      {/* 3. Botões de Ação Modernizados */}
      <div className="relative z-20 mt-16 space-y-4 w-full max-w-[320px] px-4 animate-in slide-in-from-bottom-10 duration-700 delay-700">
        <button
          onClick={handleStart}
          className="w-full bg-primary hover:bg-red-600 py-5 rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-all group"
        >
          INICIAR AVENTURA
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">explore</span>
        </button>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-white/5 backdrop-blur-xl py-5 rounded-[24px] font-black text-[10px] text-white/60 border border-white/10 flex items-center justify-center gap-3 active:bg-white/10 active:scale-95 transition-all uppercase tracking-[0.2em]"
        >
          ACEDER À MINHA CONTA
        </button>
      </div>

      {/* 4. Footer de Autenticidade */}
      <div className="absolute bottom-8 text-center z-10 opacity-30">
        <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.6em]">
          PLATAFORMA OFICIAL DE TURISMO
        </p>
      </div>

      {/* Glow flutuante no fundo */}
      <div className="absolute top-[-10%] right-[-10%] size-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] size-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Welcome;