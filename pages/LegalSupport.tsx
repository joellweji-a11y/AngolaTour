
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LegalSupport: React.FC = () => {
  const navigate = useNavigate();

  const documents = [
    { label: 'Termos de Serviço', icon: 'description', path: '/settings/legal/terms' },
    { label: 'Política de Privacidade', icon: 'privacy_tip', path: '/settings/legal/privacy' },
    { label: 'Regras da Comunidade', icon: 'groups', path: '#' },
    { label: 'Acordo do Fornecedor', icon: 'assignment_turned_in', path: '#' },
    { label: 'Política de Cookies', icon: 'cookie', path: '#' },
    { label: 'Livro de Reclamações Digital', icon: 'edit_square', path: '#' }
  ];

  return (
    <div className="flex-1 bg-background-dark min-h-screen">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate('/settings')} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Privacidade e Termos</h1>
      </header>

      <main className="p-6 space-y-10">
        <section className="space-y-6">
           <div className="bg-surface-dark/30 border border-white/5 p-8 rounded-[40px] text-center space-y-4">
              <div className="size-16 rounded-3xl bg-gray-500/10 flex items-center justify-center mx-auto text-gray-400">
                 <span className="material-symbols-outlined text-4xl">gavel</span>
              </div>
              <h2 className="text-xl font-black text-white italic">Conformidade Legal</h2>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                 O Angola Tour opera sob as leis da República de Angola, garantindo a transparência e segurança total dos seus dados.
              </p>
           </div>
        </section>

        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Documentação Oficial</h3>
           <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden">
              {documents.map((doc, index, arr) => (
                <button 
                  key={doc.label}
                  onClick={() => doc.path !== '#' && navigate(doc.path)}
                  className={`w-full p-5 flex items-center justify-between group active:bg-white/5 ${index !== arr.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                   <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-gray-600 text-xl">{doc.icon}</span>
                      <span className="text-sm font-bold text-gray-300">{doc.label}</span>
                   </div>
                   <span className="material-symbols-outlined text-gray-800 text-sm">open_in_new</span>
                </button>
              ))}
           </div>
        </section>

        <div className="text-center pb-20">
           <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">Certificado pelo Ministério do Turismo</span>
           </div>
           <p className="text-[8px] text-gray-800 uppercase">Angola Tour © 2024 • Todos os direitos reservados</p>
           <p className="text-[7px] text-gray-900 mt-2 uppercase">NIF: 5000123456</p>
        </div>
      </main>
    </div>
  );
};

export default LegalSupport;
