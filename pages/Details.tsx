
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DATA } from '../constants';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = DATA.find(d => d.id === id);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);

  if (!item) return <div className="p-10">Item não encontrado.</div>;

  const isHistorical = item.category === 'Cultura' || item.id === 'c1';

  return (
    <div className="flex-1 bg-background-dark relative flex flex-col h-full overflow-hidden">
      {/* Hero Image */}
      <div className="h-[420px] w-full relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background-dark" />
        
        {/* Overlays */}
        <div className="absolute top-12 left-0 right-0 flex justify-between px-6">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="size-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="size-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">favorite</span>
            </button>
          </div>
        </div>

        {/* Immersive Badge */}
        {isHistorical && (
          <button 
            onClick={() => navigate('/experience')}
            className="absolute bottom-12 right-6 bg-accent/20 backdrop-blur-xl border border-accent/40 px-4 py-2 rounded-2xl flex items-center gap-2 animate-bounce shadow-2xl"
          >
             <span className="material-symbols-outlined text-accent text-lg">view_in_ar</span>
             <span className="text-[9px] font-black text-accent uppercase tracking-widest">Tour Virtual 360°</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 -mt-8 bg-background-dark rounded-t-[32px] relative z-10 px-6 pt-8 pb-40 overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold leading-tight">{item.name}</h1>
            <div className="flex items-center gap-1 text-gray-400 mt-2">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <span className="text-sm">{item.location}</span>
            </div>
          </div>
          {item.tags?.includes('Luxo') && (
            <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-lg uppercase border border-primary/20">
              Luxo
            </span>
          )}
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-accent text-[20px]">star</span>
            <span className="font-bold text-lg">{item.rating}</span>
            <span className="text-gray-500 text-sm ml-1">({item.reviews} avaliações)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-green-400 text-[18px]">verified</span>
            <span className="text-green-400 text-sm font-medium">Verificado</span>
          </div>
        </div>

        {/* Guia Responsável Row */}
        <div className="mt-8 p-4 bg-surface-dark/50 border border-white/5 rounded-3xl flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="size-12 rounded-2xl bg-accent/10 border border-accent/20 overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel" alt="Guide" />
              </div>
              <div>
                 <p className="text-[9px] text-accent font-black uppercase tracking-widest">Guia Especialista</p>
                 <h4 className="text-sm font-bold text-white">Manuel dos Santos</h4>
              </div>
           </div>
           <button 
             onClick={() => navigate(`/chat/${item.id}`)}
             className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all"
           >
              Chat
              <span className="material-symbols-outlined text-sm">chat_bubble</span>
           </button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3">Sobre</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Avaliações e Comentários Section */}
        <section className="mt-12 space-y-6">
           <div className="flex justify-between items-end">
              <div>
                 <h2 className="text-xl font-black text-white italic tracking-tighter">O que dizem os viajantes</h2>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Experiências reais em Angola</p>
              </div>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="text-[10px] font-black text-primary uppercase border-b-2 border-primary/20 pb-1"
              >
                 Escrever Avaliação
              </button>
           </div>

           {/* AI Summary Widget */}
           <div className="bg-primary/5 border border-primary/10 p-5 rounded-[28px] flex gap-4 items-center">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <div>
                 <p className="text-[9px] text-primary font-black uppercase tracking-widest">Resumo da Comunidade</p>
                 <p className="text-[11px] text-gray-400 font-medium leading-tight mt-1">
                    "Excelente destino para famílias. Os visitantes recomendam a reserva antecipada."
                 </p>
              </div>
           </div>

           <div className="space-y-4 pb-20">
              {item.comments && item.comments.length > 0 ? (
                item.comments.map(c => (
                  <div key={c.id} className="bg-surface-dark/40 border border-white/5 p-5 rounded-[28px] space-y-3">
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                           <img src={c.userAvatar} className="size-10 rounded-xl bg-surface-dark" alt={c.userName} />
                           <div>
                              <p className="text-xs font-bold text-white">{c.userName}</p>
                              <div className="flex text-accent text-[12px]">
                                 {[...Array(5)].map((_, i) => (
                                   <span key={i} className={`material-symbols-outlined ${i < c.rating ? 'fill-1' : 'outline'}`}>star</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <span className="text-[8px] font-bold text-gray-600 uppercase">{c.date}</span>
                     </div>
                     <p className="text-xs text-gray-400 leading-relaxed italic">"{c.comment}"</p>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center opacity-30">
                   <span className="material-symbols-outlined text-5xl mb-3">forum</span>
                   <p className="text-xs font-bold uppercase tracking-widest">Sê o primeiro a comentar!</p>
                </div>
              )}
           </div>
        </section>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col justify-end animate-in fade-in duration-300">
           <div className="bg-surface-dark p-8 rounded-t-[48px] space-y-8 animate-in slide-in-from-bottom-20 duration-500 border-t border-white/10">
              <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-black text-white italic">Sua Avaliação</h2>
                 <button onClick={() => setShowReviewForm(false)} className="size-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>

              <div className="flex flex-col items-center gap-4 py-6">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Como foi sua experiência?</p>
                 <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        onClick={() => setUserRating(star)}
                        className={`text-4xl transition-all ${userRating >= star ? 'text-accent scale-110' : 'text-gray-700'}`}
                      >
                         <span className={`material-symbols-outlined text-4xl ${userRating >= star ? 'fill-1' : 'outline'}`}>star</span>
                      </button>
                    ))}
                 </div>
              </div>

              <textarea 
                className="w-full bg-background-dark border border-white/10 rounded-3xl p-6 text-sm text-white focus:ring-2 focus:ring-primary outline-none resize-none"
                rows={4}
                placeholder="Escreve algo sobre o local, o serviço ou as pessoas..."
              />

              <button 
                onClick={() => setShowReviewForm(false)}
                className="w-full bg-primary py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 active:scale-95 transition-all"
              >
                 PUBLICAR COMENTÁRIO
              </button>
           </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark border-t border-white/5 p-4 pb-8 z-50">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Total</p>
            <div className="flex items-end gap-1">
              <p className="text-white text-2xl font-bold">Kz {item.price.split(' ')[0]}</p>
              <p className="text-gray-500 text-xs mb-1">/ noite</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(`/booking/${item.id}`)}
            className="flex-1 bg-primary py-3 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Reservar Agora
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
