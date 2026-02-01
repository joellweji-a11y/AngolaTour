
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  time: string;
}

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'guide', text: 'Olá! Sou o Manuel, seu guia para o roteiro das Quedas de Kalandula. Como posso ajudar hoje?', time: '10:00' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    generateAISuggestions();
  }, [messages]);

  const generateAISuggestions = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'guide') {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Baseado na mensagem do guia: "${lastMessage.text}", sugira 3 perguntas curtas que um turista faria para continuar a conversa. Retorne apenas as 3 perguntas separadas por ponto e vírgula.`,
        });
        const suggestions = response.text?.split(';') || [];
        setAiSuggestions(suggestions.slice(0, 3));
      } else {
        setAiSuggestions([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulação de resposta do guia com Gemini
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction: "Você é o Manuel, um guia turístico angolano experiente. Responda como se estivesse num chat de telemóvel, de forma curta, amigável e informativa sobre Angola."
        }
      });

      setTimeout(() => {
        const guideMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'guide',
          text: response.text || "Estou a verificar essa informação para si, mambo já sai!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, guideMsg]);
        setIsTyping(false);
      }, 2000);
    } catch (e) {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark overflow-hidden">
      {/* Chat Header */}
      <header className="p-6 pt-12 bg-surface-dark/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-10 rounded-2xl bg-background-dark flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-10 rounded-full bg-accent/20 border border-accent/30 overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel" alt="Guide" className="w-full h-full" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-surface-dark" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white italic leading-none">Guia Manuel</h1>
              <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest mt-1">Disponível Agora</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/5 text-gray-400">
              <span className="material-symbols-outlined">call</span>
           </button>
           <button className="size-10 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/5 text-gray-400">
              <span className="material-symbols-outlined">more_vert</span>
           </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-40">
        <div className="text-center mb-8">
           <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Segunda-feira, 12 de Nov</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-xl ${
              msg.sender === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-surface-dark text-gray-200 border border-white/5 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
            <span className="text-[8px] font-bold text-gray-600 mt-2 uppercase tracking-tighter px-1">{msg.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500 animate-pulse">
             <div className="size-8 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-xs">edit</span>
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest">Manuel está a escrever...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Interface */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40">
        {/* AI Suggestions */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {aiSuggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => handleSendMessage(s)}
              className="shrink-0 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[9px] font-bold text-gray-300 hover:bg-white/10 active:scale-95 transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-surface-dark border border-white/10 rounded-[32px] p-2 pl-6 shadow-2xl">
          <input 
            type="text" 
            placeholder="Mensagem para o guia..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-600"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="size-10 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors">
             <span className="material-symbols-outlined">attach_file</span>
          </button>
          <button 
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className={`size-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
              inputText.trim() ? 'bg-primary text-white shadow-primary/30' : 'bg-white/5 text-gray-700'
            }`}
          >
             <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
