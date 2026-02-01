
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: 'guide' | 'service' | 'support';
  online?: boolean;
}

const MyMessages: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'guide' | 'service' | 'support'>('all');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const chats: ChatPreview[] = [
    { 
      id: 't1', 
      name: 'Guia Manuel', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel', 
      lastMessage: 'Vemo-nos amanhã às 08:00 no lobby?', 
      time: '12:45', 
      unread: 1, 
      type: 'guide',
      online: true 
    },
    { 
      id: 's1', 
      name: 'Resort da Huíla', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Huila', 
      lastMessage: 'A sua reserva foi confirmada com sucesso.', 
      time: 'Ontem', 
      unread: 0, 
      type: 'service' 
    },
    { 
      id: 'sup1', 
      name: 'Suporte Angola Tour', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support', 
      lastMessage: 'Como correu a sua viagem a Malanje?', 
      time: 'Seg', 
      unread: 0, 
      type: 'support' 
    },
    { 
      id: 't2', 
      name: 'Guia Ana', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', 
      lastMessage: 'O Trilho da Tundavala está incrível hoje!', 
      time: '10:20', 
      unread: 3, 
      type: 'guide',
      online: false 
    },
  ];

  const filteredChats = useMemo(() => {
    if (filter === 'all') return chats;
    return chats.filter(c => c.type === filter);
  }, [filter]);

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = chats.map(c => `${c.name}: ${c.lastMessage}`).join('. ');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Resuma estas conversas do app Angola Tour de forma executiva em 2 linhas: ${context}`,
      });
      setAiSummary(response.text || "Sem mensagens críticas no momento.");
    } catch (e) {
      setAiSummary("Não foi possível gerar o resumo agora.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32 overflow-y-auto no-scrollbar">
      <header className="p-6 pt-12 sticky top-0 bg-background-dark/90 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-white italic tracking-tighter">Mensagens</h1>
          <button 
            onClick={handleGenerateSummary}
            disabled={aiLoading}
            className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary active:scale-95 transition-all"
          >
            <span className={`material-symbols-outlined ${aiLoading ? 'animate-spin' : ''}`}>auto_awesome</span>
          </button>
        </div>

        {aiSummary && (
          <div className="mb-6 bg-primary/5 border border-primary/20 p-5 rounded-[28px] animate-in zoom-in-95 duration-500 relative">
            <button onClick={() => setAiSummary(null)} className="absolute top-4 right-4 text-white/30">
               <span className="material-symbols-outlined text-xs">close</span>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">robot_2</span>
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Resumo da IA</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-medium italic">"{aiSummary}"</p>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'Todas', icon: 'forum' },
            { id: 'guide', label: 'Guias', icon: 'hail' },
            { id: 'service', label: 'Serviços', icon: 'store' },
            { id: 'support', label: 'Suporte', icon: 'support_agent' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`shrink-0 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                filter === tab.id ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-dark border-white/5 text-gray-500'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 space-y-4">
        {filteredChats.map(chat => (
          <div 
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="bg-surface-dark/40 border border-white/5 p-5 rounded-[32px] flex items-center gap-4 group hover:bg-surface-dark/60 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="relative shrink-0">
               <div className="size-14 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
               </div>
               {chat.online && (
                 <div className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full border-4 border-background-dark" />
               )}
            </div>

            <div className="flex-1 min-w-0">
               <div className="flex justify-between items-start mb-1">
                  <h3 className="font-black text-white truncate italic">{chat.name}</h3>
                  <span className="text-[9px] font-bold text-gray-600 uppercase whitespace-nowrap">{chat.time}</span>
               </div>
               <div className="flex justify-between items-center gap-2">
                  <p className={`text-xs truncate ${chat.unread > 0 ? 'text-gray-200 font-bold' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <div className="size-5 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                       <span className="text-[9px] font-black text-white">{chat.unread}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>
        ))}

        {filteredChats.length === 0 && (
          <div className="py-20 flex flex-col items-center opacity-30 text-center animate-in fade-in duration-500">
             <span className="material-symbols-outlined text-7xl mb-4">chat_bubble_outline</span>
             <p className="font-black text-lg uppercase tracking-widest text-white">Sem conversas aqui</p>
             <p className="text-xs font-bold mt-1">As tuas mensagens com guias e hotéis aparecerão nesta secção.</p>
          </div>
        )}
      </main>
      
      <div className="px-10 text-center opacity-20 mt-10">
         <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white italic">Angola Tour Encrypted Messenger</p>
      </div>
    </div>
  );
};

export default MyMessages;
