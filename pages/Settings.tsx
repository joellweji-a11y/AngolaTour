
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Minha Conta',
      items: [
        { icon: 'person', label: 'Dados Pessoais', path: '/settings/personal-data', color: 'text-blue-400' },
        { icon: 'lock', label: 'Privacidade e Dados', path: '/settings/privacy', color: 'text-green-400' },
        { icon: 'link', label: 'Contas Conectadas', path: '/settings/connected-accounts', color: 'text-primary' },
        { icon: 'account_balance_wallet', label: 'Pagamentos e Comissões', path: '/settings/payments', color: 'text-accent' },
        { icon: 'security', label: 'Segurança e Senha', path: '/settings/security', color: 'text-primary' },
      ]
    },
    {
      title: 'Preferências do App',
      items: [
        { icon: 'notifications_active', label: 'Configuração de Notificação', path: '/settings/notifications', color: 'text-orange-400' },
        { icon: 'dark_mode', label: 'Modo Escuro / Tema', path: '/settings/preferences', color: 'text-purple-400' },
        { icon: 'language', label: 'Idioma', path: '/settings/preferences', color: 'text-green-400' },
      ]
    },
    {
      title: 'Suporte e Legal',
      items: [
        { icon: 'security', label: 'Dicas de Segurança', path: '/safety-tips', color: 'text-red-400' },
        { icon: 'bug_report', label: 'Relatar Problema / Feedback', path: '/feedback', color: 'text-yellow-500' },
        { icon: 'help_center', label: 'Ajuda e Suporte', path: '/settings/help', color: 'text-blue-200' },
        { icon: 'policy', label: 'Privacidade e Termos', path: '/settings/legal', color: 'text-gray-400' },
      ]
    }
  ];

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-20">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate('/profile')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Configuração</h1>
      </header>

      <div className="p-6 space-y-10">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">
              {section.title}
            </h2>
            <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full p-5 flex items-center justify-between group active:bg-white/5 transition-all ${
                    index !== section.items.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-10 rounded-xl bg-background-dark flex items-center justify-center border border-white/5 ${item.color}`}>
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-gray-700 group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 text-center">
           <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Angola Tour Premium v3.2</p>
           <p className="text-[8px] text-gray-800 mt-1 uppercase">ID do Dispositivo: #AO-882-XT</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
