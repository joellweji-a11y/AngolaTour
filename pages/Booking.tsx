
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import WhatsAppButton from '../components/WhatsAppButton';

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = DATA.find(d => d.id === id);

  // Estados funcionais
  const [checkIn, setCheckIn] = useState('2024-11-12');
  const [checkOut, setCheckOut] = useState('2024-11-15');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [isEditingDates, setIsEditingDates] = useState(false);

  if (!item) return <div className="p-10">Item não encontrado.</div>;

  // Cálculos dinâmicos
  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  const pricePerNight = parseInt(item.price.replace(/\D/g, '')) || 0;
  const serviceFee = 2000;
  const totalPrice = (nights * pricePerNight) + serviceFee;

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-AO', { day: '2-digit', month: 'short' });
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-AO', { weekday: 'long' });
  };

  // Handler para retorno inteligente do WhatsApp
  const handleWhatsAppReturn = () => {
    navigate('/bookings');
  };

  return (
    <div className="flex-1 pb-48 overflow-y-auto no-scrollbar bg-background-dark">
      <header className="p-6 pt-12 flex items-center justify-between bg-background-dark/80 backdrop-blur sticky top-0 z-20 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h2 className="text-lg font-black text-white italic uppercase tracking-widest">Reserva</h2>
        <div className="size-10" />
      </header>

      <div className="px-6 space-y-8 mt-4">
        {/* Summary Mini Card */}
        <div className="flex items-center gap-4 bg-surface-dark/50 p-4 rounded-[32px] border border-white/5 shadow-xl">
          <div className="size-20 rounded-2xl bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${item.image})` }} />
          <div>
            <h4 className="font-black text-white italic">{item.name}</h4>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{item.location}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-accent text-xs">star</span>
              <span className="text-xs font-black text-white">{item.rating}</span>
              <span className="text-[10px] text-gray-600 font-bold ml-1 uppercase">Verificado</span>
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Período de Estadia</h3>
            <button
              onClick={() => setIsEditingDates(!isEditingDates)}
              className="text-primary text-[10px] font-black uppercase tracking-widest border-b border-primary/20 pb-0.5"
            >
              {isEditingDates ? 'Confirmar' : 'Editar'}
            </button>
          </div>

          {isEditingDates ? (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
              <div className="space-y-2">
                <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-2">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-surface-dark border border-primary/30 rounded-2xl p-4 text-xs text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-2">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-surface-dark border border-primary/30 rounded-2xl p-4 text-xs text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-dark/40 p-5 rounded-[28px] border border-primary/30 shadow-lg">
                <p className="text-[9px] text-primary font-black uppercase tracking-widest mb-1">Entrada</p>
                <p className="text-xl font-black text-white italic">{formatDateDisplay(checkIn)}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{getDayName(checkIn)}</p>
              </div>
              <div className="bg-surface-dark/40 p-5 rounded-[28px] border border-white/5 shadow-lg">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Saída</p>
                <p className="text-xl font-black text-white italic">{formatDateDisplay(checkOut)}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{getDayName(checkOut)}</p>
              </div>
            </div>
          )}
        </section>

        {/* Guest Selector */}
        <section>
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 px-1">Número de Hóspedes</h3>
          <div className="space-y-3">
            {[
              { label: 'Adultos', sub: 'Maiores de 12 anos', count: adults, setter: setAdults, min: 1 },
              { label: 'Crianças', sub: '2 - 12 anos', count: children, setter: setChildren, min: 0 }
            ].map((guest) => (
              <div key={guest.label} className="flex items-center justify-between bg-surface-dark/40 p-4 rounded-[28px] border border-white/5 shadow-xl">
                <div>
                  <p className="font-black text-white text-sm italic">{guest.label}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{guest.sub}</p>
                </div>
                <div className="flex items-center gap-5 bg-background-dark p-2 rounded-2xl border border-white/5 shadow-inner">
                  <button
                    onClick={() => guest.setter(Math.max(guest.min, guest.count - 1))}
                    className="size-10 rounded-xl bg-surface-dark flex items-center justify-center text-white active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="font-black text-lg text-white w-4 text-center">{guest.count}</span>
                  <button
                    onClick={() => guest.setter(guest.count + 1)}
                    className="size-10 rounded-xl bg-primary flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary Table */}
        <section className="bg-surface-dark/60 rounded-[32px] p-6 border border-white/5 space-y-4 shadow-2xl">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-gray-500 uppercase tracking-widest">{nights} Noites x Kz {item.price.split(' ')[0]}</span>
            <span className="text-white">Kz {(nights * pricePerNight).toLocaleString('pt-AO')}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-gray-500 uppercase tracking-widest">Taxa de Serviço AngolaTour</span>
            <span className="text-green-500">Kz {serviceFee.toLocaleString('pt-AO')}</span>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex justify-between items-center pt-2">
            <div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total da Reserva</span>
              <p className="text-[8px] text-primary font-black uppercase mt-1">Preço final garantido</p>
            </div>
            <span className="text-accent text-3xl font-black italic">Kz {totalPrice.toLocaleString('pt-AO')}</span>
          </div>
        </section>
      </div>

      {/* Action Footer - Updated with WhatsApp */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark/95 border-t border-white/5 p-4 pb-8 z-50 backdrop-blur-xl">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Total a pagar</span>
              <p className="text-accent text-xl font-black italic leading-none mt-1">Kz {totalPrice.toLocaleString('pt-AO')}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/payment')}
              className="flex-1 bg-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              PAGAR AGORA
              <span className="material-symbols-outlined text-sm">lock</span>
            </button>

            <WhatsAppButton
              serviceName={item.name}
              onReturn={handleWhatsAppReturn}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
