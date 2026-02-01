
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DATA } from '../constants';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = DATA.find(d => d.id === id);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);

  if (!item) return <div className="p-10 text-center">Restaurante não encontrado.</div>;

  const menuDestaques = [
    { name: 'Mufete de Cacucho', price: '7.500 Kz', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=200' },
    { name: 'Calulu de Peixe', price: '6.200 Kz', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200' },
    { name: 'Funge de Carne Seca', price: '5.800 Kz', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="flex-1 bg-background-dark relative flex flex-col h-full overflow-hidden">
      {/* Hero Header */}
      <div className="h-[50vh] w-full relative">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110" 
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-background-dark" />
        
        {/* Navigation Overlays */}
        <div className="absolute top-12 left-0 right-0 flex justify-between px-6 z-20">
          <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="size-11 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white">share</span>
            </button>
            <button className="size-11 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>

        {/* Floating Title Card */}
        <div className="absolute bottom-0 left-0 right-0 px-6 transform translate-y-1/2 z-30">
          <div className="bg-surface-dark/90 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-2">
               <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">{item.name}</h1>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                    {item.location}
                  </p>
               </div>
               <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-xl flex items-center gap-1">
                  <span className="text-primary font-black text-sm">{item.rating}</span>
                  <span className="material-symbols-outlined text-primary text-[14px]">star</span>
               </div>
            </div>
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
               <div className="flex items-center gap-2">
                  <span className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-[10px] font-black text-green-500 uppercase">Aberto Agora</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-gray-500">payments</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase">Preço: {item.price}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 mt-20 overflow-y-auto no-scrollbar pb-32">
        <div className="px-6 space-y-10">
          
          {/* Action Bar */}
          <div className="flex gap-3 pt-4">
             <button className="flex-1 bg-surface-dark border border-white/5 py-4 rounded-2xl flex flex-col items-center gap-1 transition-all hover:bg-surface-light">
                <span className="material-symbols-outlined text-primary">menu_book</span>
                <span className="text-[9px] font-black text-gray-400 uppercase">Ver Menu</span>
             </button>
             <button className="flex-1 bg-surface-dark border border-white/5 py-4 rounded-2xl flex flex-col items-center gap-1 transition-all hover:bg-surface-light">
                <span className="material-symbols-outlined text-blue-400">call</span>
                <span className="text-[9px] font-black text-gray-400 uppercase">Ligar</span>
             </button>
             <button className="flex-1 bg-surface-dark border border-white/5 py-4 rounded-2xl flex flex-col items-center gap-1 transition-all hover:bg-surface-light">
                <span className="material-symbols-outlined text-accent">map</span>
                <span className="text-[9px] font-black text-gray-400 uppercase">Direções</span>
             </button>
          </div>

          {/* Destaques do Menu */}
          <section>
             <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-black text-white">Destaques do Chef</h2>
                <span className="text-[10px] font-bold text-primary uppercase">Ver Tudo</span>
             </div>
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {menuDestaques.map((plate) => (
                  <div key={plate.name} className="shrink-0 w-44 bg-surface-dark border border-white/5 rounded-3xl p-4 group cursor-pointer hover:border-primary/20 transition-all">
                     <div className="size-32 rounded-2xl overflow-hidden mb-3 relative">
                        <img src={plate.img} alt={plate.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md size-8 rounded-full flex items-center justify-center border border-white/10">
                           <span className="material-symbols-outlined text-white text-sm">add</span>
                        </div>
                     </div>
                     <h3 className="text-[11px] font-bold text-white mb-1 truncate">{plate.name}</h3>
                     <p className="text-[10px] font-black text-primary">{plate.price}</p>
                  </div>
                ))}
             </div>
          </section>

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
                   Avaliar
                </button>
             </div>

             <div className="space-y-4">
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
                     <span className="material-symbols-outlined text-5xl mb-3">restaurant</span>
                     <p className="text-xs font-bold uppercase tracking-widest">Sê o primeiro a avaliar!</p>
                  </div>
                )}
             </div>
          </section>
        </div>
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
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Qual a sua nota?</p>
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
                placeholder="Como estava a comida e o atendimento?"
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

      {/* Footer Booking Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark/80 backdrop-blur-xl border-t border-white/5 p-4 pb-10 z-50">
         <button 
           onClick={() => navigate(`/booking/${item.id}`)}
           className="w-full bg-primary py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-all"
         >
            RESERVAR UMA MESA
            <span className="material-symbols-outlined">restaurant</span>
         </button>
      </div>
    </div>
  );
};

export default RestaurantDetails;
