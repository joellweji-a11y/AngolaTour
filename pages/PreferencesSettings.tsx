
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const PreferencesSettings: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [lang, setLang] = useState('PT');

  const languages = [
    { id: 'PT', label: 'Português', flag: '🇦🇴' },
    { id: 'EN', label: 'English', flag: '🇺🇸' },
    { id: 'FR', label: 'Français', flag: '🇫🇷' },
    { id: 'RU', label: 'Русский', flag: '🇷🇺' },
    { id: 'ZH', label: 'Mandarin', flag: '🇨🇳' },
    { id: 'ES', label: 'Español', flag: '🇪🇸' },
    { id: 'AR', label: 'العربية', flag: '🇦🇪' }
  ];

  return (
    <div className="flex-1 bg-background-dark dark:bg-background-dark min-h-screen pb-32 overflow-y-auto no-scrollbar">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 dark:bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5 dark:border-white/5">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark dark:bg-surface-dark flex items-center justify-center border border-white/10 dark:border-white/10">
          <span className="material-symbols-outlined text-white dark:text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white dark:text-white italic">Preferências</h1>
      </header>

      <main className="p-6 space-y-10">
        <section className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest ml-1">Experiência Visual</label>
          <div className="bg-surface-dark/50 dark:bg-surface-dark/50 border border-white/5 dark:border-white/5 rounded-[32px] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Ícone dinâmico: Sol (light_mode) quando escuro, Lua (dark_mode) quando claro */}
                <span className="material-symbols-outlined text-purple-400">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
                <span className="text-sm font-bold text-gray-200 dark:text-gray-200">
                  {isDark ? 'Modo Escuro' : 'Modo Claro'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isDark ? 'bg-primary shadow-[0_0_10px_#f20d0d50]' : 'bg-gray-400'}`}
              >
                <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${isDark ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-orange-400">notifications_active</span>
                <span className="text-sm font-bold text-gray-200">Notificações Push</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative transition-all duration-300 ${notifications ? 'bg-primary shadow-[0_0_10px_#f20d0d50]' : 'bg-gray-800'}`}
              >
                <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Idioma do Sistema</label>
          <div className="grid grid-cols-2 gap-3">
            {languages.map(item => (
              <button
                key={item.id}
                onClick={() => setLang(item.id)}
                className={`p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all duration-300 ${lang === item.id
                    ? 'bg-primary/20 border-primary text-white shadow-xl shadow-primary/10 scale-[1.02]'
                    : 'bg-surface-dark/50 border-white/5 text-gray-500 hover:bg-white/5'
                  }`}
              >
                <span className="text-3xl filter saturate-[0.8]">{item.flag}</span>
                <div className="text-center">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${lang === item.id ? 'text-white' : 'text-gray-400'}`}>
                    {item.label}
                  </p>
                  <p className="text-[8px] font-bold opacity-40 uppercase">{item.id}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-surface-dark/30 border border-white/5 rounded-[40px] p-8 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 size-32 bg-primary/5 blur-3xl rounded-full" />
          <span className="material-symbols-outlined text-primary text-3xl mb-4">language</span>
          <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2">Angola Tour Global</h4>
          <p className="text-[10px] text-gray-500 leading-relaxed italic max-w-[200px] mx-auto">
            Trabalhamos para tornar Angola acessível a todos os cantos do mundo. Novas traduções são adicionadas mensalmente.
          </p>
        </section>

        <div className="text-center opacity-20 pb-10">
          <p className="text-[8px] font-black uppercase tracking-widest">Localization Engine v2.4</p>
        </div>
      </main>
    </div>
  );
};

export default PreferencesSettings;
