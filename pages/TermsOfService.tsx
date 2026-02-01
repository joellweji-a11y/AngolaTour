
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content: "Ao aceder e utilizar a aplicação Angola Tour, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se não concordar com qualquer parte destes termos, não deverá utilizar os nossos serviços."
    },
    {
      title: "2. Elegibilidade e Conta",
      content: "Para utilizar certas funcionalidades do App, deverá criar uma conta. Você é responsável por manter a confidencialidade das suas credenciais e por todas as atividades que ocorram na sua conta. Deve ter pelo menos 18 anos ou possuir autorização legal dos responsáveis para utilizar o serviço."
    },
    {
      title: "3. Reservas e Pagamentos",
      content: "O Angola Tour atua como um facilitador entre viajantes e fornecedores de serviços (hotéis, guias, transportes). Todas as reservas estão sujeitas à disponibilidade. Os pagamentos são processados através de parceiros seguros em Angola e no estrangeiro. Os preços podem variar de acordo com a época e procura."
    },
    {
      title: "4. Política de Cancelamento",
      content: "As regras de cancelamento e reembolso são definidas individualmente por cada fornecedor de serviço. Geralmente, cancelamentos feitos com menos de 24 horas de antecedência podem não ser reembolsáveis. Recomendamos a leitura atenta da política específica de cada reserva."
    },
    {
      title: "5. Conduta do Utilizador",
      content: "Compromete-se a utilizar o App apenas para fins legítimos. É proibido publicar conteúdo ofensivo, fraudulento ou que viole os direitos de terceiros. Reservamo-nos o direito de suspender contas que violem estas diretrizes."
    },
    {
      title: "6. Limitação de Responsabilidade",
      content: "O Angola Tour não se responsabiliza por atrasos, danos ou má execução dos serviços prestados por terceiros independentes, embora trabalhemos apenas com parceiros verificados para garantir a melhor experiência."
    },
    {
      title: "7. Lei Aplicável",
      content: "Estes termos são regidos e interpretados de acordo com as leis da República de Angola. Qualquer litígio será submetido à jurisdição exclusiva dos tribunais angolanos."
    }
  ];

  return (
    <div className="flex-1 bg-background-dark min-h-screen">
      <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white italic">Termos de Serviço</h1>
      </header>

      <main className="p-6 space-y-8 pb-32">
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-[32px] mb-8">
           <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Última Atualização</p>
           <p className="text-xs text-white font-bold italic">20 de Novembro de 2024</p>
        </div>

        {sections.map((s, i) => (
          <section key={i} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <h2 className="text-sm font-black text-primary uppercase tracking-widest">{s.title}</h2>
            <div className="bg-surface-dark/50 border border-white/5 p-6 rounded-[28px]">
               <p className="text-xs text-gray-400 leading-relaxed text-justify">
                  {s.content}
               </p>
            </div>
          </section>
        ))}

        <div className="text-center pt-8 opacity-20">
           <p className="text-[9px] font-black uppercase tracking-widest">Angola Tour Compliance Office</p>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
