
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Recolha de Dados",
      content: "Recolhemos informações que nos fornece diretamente ao criar conta, tais como nome, email, número de telefone e dados de pagamento. Também recolhemos dados automaticamente sobre a sua utilização do App e localização GPS (apenas com sua permissão) para melhorar a experiência de viagem."
    },
    {
      title: "2. Utilização dos Dados",
      content: "Os seus dados são utilizados para: processar reservas, fornecer suporte ao cliente, enviar notificações sobre as suas viagens, personalizar recomendações com IA e garantir a segurança contra fraudes."
    },
    {
      title: "3. Partilha com Terceiros",
      content: "Partilhamos os seus dados estritamente necessários (nome, contacto) com os fornecedores de serviços que reservar (ex: Hotéis ou Guias). Não vendemos os seus dados pessoais a anunciantes de terceiros."
    },
    {
      title: "4. Direitos do Utilizador",
      content: "De acordo com a Lei de Proteção de Dados de Angola, você tem o direito de aceder, retificar, limitar ou solicitar a eliminação dos seus dados pessoais armazenados nos nossos sistemas a qualquer momento através das definições de conta."
    },
    {
      title: "5. Segurança",
      content: "Implementamos medidas técnicas e organizacionais rigorosas para proteger os seus dados, incluindo encriptação SSL e firewalls de nível empresarial. No entanto, nenhum sistema na Internet é 100% invulnerável."
    },
    {
      title: "6. Retenção de Dados",
      content: "Retemos os seus dados enquanto a sua conta estiver ativa ou conforme necessário para lhe prestar serviços. Se solicitar o encerramento da conta, procederemos à eliminação dos dados, exceto o que formos legalmente obrigados a manter por razões fiscais ou de auditoria."
    }
  ];

  return (
    <div className="flex-1 bg-background-dark min-h-screen">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Privacidade</h1>
      </header>

      <main className="p-6 space-y-8 pb-32">
        <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-[32px] mb-8">
           <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">Compromisso de Dados</p>
           <p className="text-xs text-white font-bold italic">Privacidade Total em Solo Angolano</p>
        </div>

        {sections.map((s, i) => (
          <section key={i} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <h2 className="text-sm font-black text-blue-400 uppercase tracking-widest">{s.title}</h2>
            <div className="bg-surface-dark/50 border border-white/5 p-6 rounded-[28px]">
               <p className="text-xs text-gray-400 leading-relaxed text-justify">
                  {s.content}
               </p>
            </div>
          </section>
        ))}

        <div className="bg-surface-dark border border-white/5 p-6 rounded-[32px] flex items-start gap-4">
           <span className="material-symbols-outlined text-blue-400">policy</span>
           <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
             Esta política está em conformidade com a Lei n.º 22/11 (Lei da Protecção de Dados Pessoais de Angola).
           </p>
        </div>

        <div className="text-center pt-8 opacity-20">
           <p className="text-[9px] font-black uppercase tracking-widest">© 2024 Angola Tour Privacy Team</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
