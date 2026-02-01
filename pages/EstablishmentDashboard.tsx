
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EstablishmentDashboard: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isOpen, setIsOpen] = useState(true);
   const [showScanner, setShowScanner] = useState(false);

   const quickStats = [
      { label: 'Hoje', val: '12', sub: '+2 novos', color: 'text-primary' },
      { label: 'Receita', val: '84k Kz', sub: 'Hoje', color: 'text-accent' },
      { label: 'Rating', val: '4.9', sub: 'Excelente', color: 'text-green-500' },
   ];

   const pendingBookings = [
      { id: 'R102', guest: 'Mauro Silva', time: 'Hoje, 19:30', people: 4, amount: '32.000 Kz' },
      { id: 'R103', guest: 'Ana Paula', time: 'Hoje, 21:00', people: 2, amount: '15.500 Kz' },
   ];

   return (
      <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => alert('Logomarca do estabelecimento atualizada!')} />

         {/* Dynamic Header */}
         <header className="p-6 pt-12 flex flex-col gap-6 bg-surface-dark/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
            <div className="flex justify-between items-center">
               <button onClick={() => navigate('/provider')} className="size-11 rounded-2xl bg-background-dark flex items-center justify-center border border-white/10 shadow-xl">
                  <span className="material-symbols-outlined text-white">arrow_back</span>
               </button>

               <div className="flex items-center gap-3 bg-background-dark/50 p-1 rounded-2xl border border-white/5">
                  <span className={`text-[8px] font-black uppercase tracking-widest ml-3 ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
                     {isOpen ? 'Operacional' : 'Fechado'}
                  </span>
                  <button
                     onClick={() => setIsOpen(!isOpen)}
                     className={`w-12 h-7 rounded-xl relative transition-all duration-500 shadow-inner ${isOpen ? 'bg-green-500' : 'bg-gray-800'}`}
                  >
                     <div className={`absolute top-1 size-5 bg-white rounded-lg transition-all shadow-md ${isOpen ? 'right-1' : 'left-1'}`} />
                  </button>
               </div>
            </div>

            <div className="flex justify-between items-end">
               <div className="flex gap-4 items-center">
                  {/* LOGO COM BOTÃO DE EDIÇÃO */}
                  <div className="relative">
                     <div className="size-16 rounded-2xl bg-background-dark border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200" alt="Logo" className="w-full h-full object-cover opacity-60" />
                     </div>
                     <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-1 -right-1 size-6 rounded-lg bg-primary border-2 border-background-dark flex items-center justify-center z-20 shadow-lg active:scale-90"
                     >
                        <span className="material-symbols-outlined text-white text-[12px]">edit</span>
                     </button>
                  </div>
                  <div>
                     <h1 className="text-2xl font-black text-white italic leading-tight">Tour Gastronómico</h1>
                     <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1">ID: #AT-LU-00{id}</p>
                  </div>
               </div>
               <button
                  onClick={() => setShowScanner(true)}
                  className="bg-primary px-5 py-3 rounded-2xl shadow-lg shadow-primary/30 flex items-center gap-2 active:scale-95 transition-all"
               >
                  <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Check-in</span>
               </button>
            </div>
         </header>

         <main className="p-6 space-y-10">
            {/* Performance Overview */}
            <section>
               <div className="grid grid-cols-3 gap-3">
                  {quickStats.map(s => (
                     <div key={s.label} className="bg-surface-dark/50 border border-white/5 p-5 rounded-[32px] shadow-2xl">
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{s.label}</p>
                        <p className={`text-xl font-black ${s.color} my-2`}>{s.val}</p>
                        <p className="text-[7px] text-white/30 font-bold uppercase">{s.sub}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* Real-time Flow Chart */}
            <section className="bg-surface-dark/40 border border-white/10 rounded-[40px] p-6 relative overflow-hidden">
               <div className="flex justify-between items-start mb-8">
                  <div>
                     <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">Fluxo de Clientes</h2>
                     <p className="text-[10px] text-gray-500 font-bold mt-1">Pico estimado: 20:30h</p>
                  </div>
                  <div className="flex gap-1">
                     <div className="size-1.5 rounded-full bg-primary animate-ping" />
                     <span className="text-[8px] font-black text-primary uppercase">Ao Vivo</span>
                  </div>
               </div>

               <div className="h-32 flex items-end gap-2.5 px-2">
                  {[30, 60, 40, 85, 55, 75, 45, 95, 80].map((h, i) => (
                     <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded-t-xl transition-all duration-1000 ${h > 80 ? 'bg-primary shadow-[0_0_15px_#f20d0d50]' : 'bg-white/10'} hover:bg-accent cursor-pointer group relative`}
                     >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[7px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           {h}% Cap.
                        </div>
                     </div>
                  ))}
               </div>
               <div className="flex justify-between mt-4 px-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                  <span>Almoço</span>
                  <span>Jantar</span>
                  <span>Encerramento</span>
               </div>
            </section>

            {/* Action Bookings */}
            <section>
               <div className="flex justify-between items-center mb-5">
                  <h2 className="text-sm font-black text-white uppercase tracking-widest">Próximas Reservas</h2>
                  <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-3 py-1 rounded-lg">Ver Agenda</span>
               </div>
               <div className="space-y-4">
                  {pendingBookings.map(res => (
                     <div key={res.id} className="bg-surface-dark border border-white/5 rounded-[28px] p-5 flex items-center justify-between shadow-xl">
                        <div className="flex items-center gap-4">
                           <div className="size-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                              <span className="material-symbols-outlined text-2xl">person_pin</span>
                           </div>
                           <div>
                              <h4 className="font-bold text-sm text-white">{res.guest}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                 <span className="text-[9px] text-gray-500 font-bold">{res.time}</span>
                                 <div className="size-1 bg-gray-700 rounded-full" />
                                 <span className="text-[9px] text-gray-500 font-bold">{res.people} Pax</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button className="size-10 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 flex items-center justify-center active:scale-90 transition-transform">
                              <span className="material-symbols-outlined text-lg">check</span>
                           </button>
                           <button className="size-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center active:scale-90 transition-transform">
                              <span className="material-symbols-outlined text-lg">close</span>
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            {/* Advanced Controls */}
            <section className="grid grid-cols-2 gap-4 pb-12">
               <button
                  onClick={() => navigate(`/promotions/${id}`)}
                  className="bg-surface-dark/60 border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 hover:border-orange-400/30 transition-all shadow-xl group"
               >
                  <div className="size-12 rounded-2xl bg-orange-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-orange-400">campaign</span>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Promoções</span>
               </button>
               <button
                  onClick={() => navigate(`/menu-management/${id}`)}
                  className="bg-surface-dark/60 border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 hover:border-accent/30 transition-all shadow-xl group">
                  <div className="size-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-accent">restaurant_menu</span>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Gerir Menu</span>
               </button>
               <button
                  onClick={() => navigate(`/staff-management/${id}`)}
                  className="bg-surface-dark/60 border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 hover:border-blue-400/30 transition-all shadow-xl group">
                  <div className="size-12 rounded-2xl bg-blue-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-blue-400">group</span>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Funcionários</span>
               </button>
               <button
                  onClick={() => navigate(`/establishment-settings/${id}`)}
                  className="bg-surface-dark/60 border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 hover:border-purple-400/30 transition-all shadow-xl group">
                  <div className="size-12 rounded-2xl bg-purple-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-purple-400">settings</span>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Definições</span>
               </button>
            </section>
         </main>

         {/* Scanner Overlay Simulation */}
         {showScanner && (
            <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
               <button
                  onClick={() => setShowScanner(false)}
                  className="absolute top-12 right-6 size-12 rounded-full bg-white/10 flex items-center justify-center text-white"
               >
                  <span className="material-symbols-outlined">close</span>
               </button>

               <div className="w-full aspect-square max-w-sm relative rounded-[40px] overflow-hidden border-2 border-primary shadow-[0_0_50px_#f20d0d30]">
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                     <span className="material-symbols-outlined text-gray-800 text-8xl animate-pulse">camera</span>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/80 shadow-[0_0_15px_#f20d0d] animate-[scan_3s_infinite]" />
                  <div className="absolute top-8 left-8 size-12 border-l-4 border-t-4 border-primary rounded-tl-2xl" />
                  <div className="absolute top-8 right-8 size-12 border-r-4 border-t-4 border-primary rounded-tr-2xl" />
                  <div className="absolute bottom-8 left-8 size-12 border-l-4 border-b-4 border-primary rounded-bl-2xl" />
                  <div className="absolute bottom-8 right-8 size-12 border-r-4 border-b-4 border-primary rounded-br-2xl" />
               </div>

               <div className="mt-12 text-center">
                  <h2 className="text-xl font-black text-white italic">Scan Ticket QR</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Aponte para o código do turista</p>
               </div>
            </div>
         )}

         <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
      </div>
   );
};

export default EstablishmentDashboard;
