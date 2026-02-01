import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<'user' | 'company' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação robusta de autenticação
    setTimeout(() => {
      const userData = { 
        email, 
        name: loginType === 'user' ? 'Viajante' : loginType === 'company' ? 'Gestor de Unidade' : 'Super Admin',
        role: loginType === 'admin' ? 'admin' : loginType === 'company' ? 'provider' : 'user'
      };
      
      localStorage.setItem('at_user_session', JSON.stringify(userData));
      setIsLoading(false);
      
      if (loginType === 'admin') {
        navigate('/admin');
      } else if (loginType === 'company') {
        navigate('/provider');
      } else {
        navigate('/home');
      }
    }, 1500);
  };

  const getTextColor = () => {
    if (loginType === 'user') return 'text-primary';
    if (loginType === 'company') return 'text-accent';
    return 'text-white';
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] relative overflow-hidden px-8">
      {/* 1. Background Effects */}
      <div className={`absolute top-0 right-0 size-96 blur-[150px] rounded-full -mr-32 -mt-32 transition-colors duration-1000 ${
        loginType === 'user' ? 'bg-primary/20' : loginType === 'company' ? 'bg-accent/15' : 'bg-white/10'
      }`} />
      
      {/* 2. Brand Identity - Palanca Negra Gigante Hero */}
      <div className="mt-16 mb-10 flex flex-col items-center animate-in zoom-in duration-1000">
        <div className="relative group">
           <div className="size-44 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1549480017-d76466a4b7e8?auto=format&fit=crop&q=80&w=600" 
                alt="Palanca Negra Gigante" 
                className="w-full h-full object-contain filter saturate-[1.2] drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-transform group-hover:scale-105 duration-700"
              />
           </div>
           
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 blur-3xl opacity-30 rounded-full transition-colors duration-1000 ${
              loginType === 'user' ? 'bg-primary' : loginType === 'company' ? 'bg-accent' : 'bg-white'
           }`} />
           
           {loginType === 'admin' && (
             <div className="absolute -top-2 -right-2 bg-primary text-white p-2 rounded-2xl animate-bounce shadow-2xl z-20 border-2 border-[#0a0a0a]">
                <span className="material-symbols-outlined text-xs font-black">security</span>
             </div>
           )}
        </div>

        <div className="text-center mt-6">
          <h1 className="text-5xl font-black italic tracking-tighter leading-none select-none">
            <span className="text-white">Angola</span><span className={loginType === 'user' ? 'text-primary' : loginType === 'company' ? 'text-accent' : 'text-gray-400'}>Tour</span>
          </h1>
          <p className="text-gray-500 mt-4 text-[10px] font-black uppercase tracking-[0.5em] opacity-60">
            {loginType === 'user' ? 'O teu portal oficial' : loginType === 'company' ? 'Eixo de Negócios' : 'Acesso Privilegiado'}
          </p>
        </div>
      </div>

      {/* 3. Role Switcher */}
      <div className="flex bg-surface-dark/60 backdrop-blur-xl p-1.5 rounded-[28px] border border-white/5 mb-10 shadow-2xl relative z-10">
        {[
          { id: 'user', label: 'Viajante', color: 'bg-primary text-white' },
          { id: 'company', label: 'Empresa', color: 'bg-accent text-black' },
          { id: 'admin', label: 'Admin', color: 'bg-white/10 text-white' }
        ].map((type) => (
          <button 
            key={type.id}
            onClick={() => setLoginType(type.id as any)}
            className={`flex-1 py-3.5 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
              loginType === type.id ? `${type.color} shadow-2xl scale-105` : 'text-gray-600 hover:text-gray-400'
            }`}
          >
             {type.label}
          </button>
        ))}
      </div>

      {/* 4. Login Form */}
      <form onSubmit={handleLogin} className="space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-300">
        <div className="space-y-2.5">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">
            {loginType === 'admin' ? 'Identificador Root' : 'Email de Acesso'}
          </label>
          <div className="relative group">
            <input 
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={loginType === 'admin' ? "root@angolatour.ao" : loginType === 'user' ? "exemplo@tour.ao" : "unidade@business.ao"}
              // Fix: replaced invalid focusRingColor property from style object with dynamic Tailwind focus ring color classes
              className={`w-full bg-surface-dark/80 border border-white/5 rounded-[24px] py-5 pl-14 pr-4 text-white focus:ring-2 focus:ring-opacity-40 outline-none transition-all ${
                loginType === 'user' ? 'focus:ring-primary' : loginType === 'company' ? 'focus:ring-accent' : 'focus:ring-white'
              }`}
            />
            <span className={`material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 opacity-40 transition-colors group-focus-within:opacity-100 ${getTextColor()}`}>
              {loginType === 'admin' ? 'shield_person' : loginType === 'user' ? 'alternate_email' : 'business_center'}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Palavra-passe</label>
            {loginType !== 'admin' && <button type="button" className={`text-[9px] font-black uppercase ${getTextColor()} hover:underline underline-offset-4`}>Esqueceu?</button>}
          </div>
          <div className="relative group">
            <input 
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              // Fix: Added dynamic focus ring color for consistency with the email field and removed invalid style property
              className={`w-full bg-surface-dark/80 border border-white/5 rounded-[24px] py-5 pl-14 pr-4 text-white focus:ring-2 focus:ring-opacity-40 outline-none transition-all ${
                loginType === 'user' ? 'focus:ring-primary' : loginType === 'company' ? 'focus:ring-accent' : 'focus:ring-white'
              }`}
            />
            <span className={`material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-colors ${getTextColor()}`}>lock</span>
          </div>
        </div>

        <button 
          disabled={isLoading}
          type="submit"
          className={`w-full py-5 rounded-[24px] font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all mt-8 disabled:opacity-50 ${
            loginType === 'user' ? 'bg-primary text-white shadow-primary/30' : 
            loginType === 'company' ? 'bg-accent text-black shadow-accent/40' : 
            'bg-white text-black shadow-2xl'
          }`}
        >
          {isLoading ? (
            <div className={`size-6 border-4 border-t-transparent rounded-full animate-spin ${loginType === 'company' ? 'border-black' : 'border-white'}`} />
          ) : (
            <>
              {loginType === 'user' ? 'ENTRAR NO APP' : loginType === 'company' ? 'PAINEL DE GESTÃO' : 'AUTENTICAR ROOT'}
              <span className="material-symbols-outlined text-sm font-black">{loginType === 'admin' ? 'verified_user' : 'arrow_forward'}</span>
            </>
          )}
        </button>
      </form>

      {/* 5. Registration Link */}
      <div className="mt-auto mb-12 text-center relative z-10">
        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">
          {loginType === 'user' ? 'Ainda não viaja connosco?' : loginType === 'company' ? 'Queres ser nosso parceiro?' : 'Novo na equipa de segurança?'}
          <br/>
          <Link to="/register" className={`mt-2 inline-block font-black border-b-2 border-transparent hover:border-current transition-all ${getTextColor()}`}>
            Cria a tua conta agora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;