
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Booking, Category } from '../types';

interface ExtendedBooking extends Booking {
  userResponse?: 'accepted' | 'rejected' | 'pending';
}

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Ativas' | 'Concluídas'>('Ativas');
  const [selectedBooking, setSelectedBooking] = useState<ExtendedBooking | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [bookings, setBookings] = useState<ExtendedBooking[]>([
    {
      id: 'B-001',
      serviceId: 's1',
      serviceName: 'Resort da Huíla',
      serviceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk91Rh_S_hGCpRAE6VmtuPCFqUY_G98ZDqWR9T5SRAhoouu_mEVJPXgmDQHr9pm634Jw9ex8hsVhu6gRET-1rv7gXwuxwYsav9Cargix_lUAufYKo3pCjR1EeLSW1isYkf_uYuLaGjbLbVAxRbjpm3-_TDqzjf3ZdEpFrk8cXqTBtaUmAQ1A2lNYMgc9FiFmmEqfcgTi6q3PFSg62aHbETN4lROCezwF33GwPlNocAIqkBbHRJ6q-CEfrcznXdwYMO92CUMUgxjPS2',
      category: Category.STAY,
      date: '12 - 15 Nov 2024',
      status: 'Ativa',
      totalPrice: '137.000 Kz',
      userResponse: 'pending'
    },
    {
      id: 'B-002',
      serviceId: 't1',
      serviceName: 'Táxi Luanda Express',
      serviceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1xEAa4tejN01fme01u-LcSbpx6MKfB-T6SLrgoJBdWg-OqV4HXnW7eqQDZXwU6V3TREWeC9DeBP__jtRmd0BBuIzW6WVHEvNWRony4dg1ZLa3iUuuEUG4M2KwqKVk5-H5JVhEqBlfKbNmrXELzsj2VYxL0wyBjGr1e5JBhrSDgsRD2eWTh5L_4Nbp-Mb8ab3pGtX2Xs3cNYLtrJsZh9MdLh7vXPckd_0LfNhFCMo_daDtSAcnCQS6hHETY4N4aw7CsmOMoAILQ2Xi',
      category: Category.TRANSPORT,
      date: 'Hoje, 14:30',
      status: 'Ativa',
      totalPrice: '2.000 Kz',
      userResponse: 'accepted'
    },
    {
      id: 'B-003',
      serviceId: 'f1',
      serviceName: 'O Quintal da Tia Maria',
      serviceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjZEE90ZwzkhJNO_RYnTudVVWGPhnRI6rafhaTNCD-89GwzFd3x95VpZHVLyZ-WoyTv5wJsgNH7aUUenq1QQIsWDdKU-sgGxkfBV8a9s2JyrVlMoJMCPnA_4rO7ccFrcmH5hakFxCEoq8jdGJIF3tc6kgyz62b_YPoDKGGNGMKp1ffVuc0eIxpWqYCcd8vj4GpX9qr3u55sjZXgBFb19cTuICyIQQc0pYZsKA3IOuGxQrsjaa-r7rhO1EIVN9wILEXbZZNoGeKrwxk',
      category: Category.FOOD,
      date: '05 Nov 2024',
      status: 'Concluída',
      totalPrice: '12.400 Kz',
      userResponse: 'accepted'
    }
  ]);

  const filtered = bookings.filter(b => {
    if (activeTab === 'Ativas') return b.status === 'Ativa';
    return b.status === 'Concluída' || b.status === 'Cancelada';
  });

  const handleAccept = (bookingId: string) => {
    setBookings(bookings.map(b =>
      b.id === bookingId ? { ...b, userResponse: 'accepted' as const } : b
    ));
  };

  const handleReject = (bookingId: string) => {
    setBookings(bookings.map(b =>
      b.id === bookingId ? { ...b, userResponse: 'rejected' as const } : b
    ));
  };

  const openSchedule = (booking: ExtendedBooking) => {
    setSelectedBooking(booking);
    setShowScheduleModal(true);
  };

  const getStatusBorderColor = (response?: string) => {
    if (response === 'accepted') return 'border-l-4 border-l-green-500';
    if (response === 'rejected') return 'border-l-4 border-l-red-500';
    return 'border-l-4 border-l-accent';
  };

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      <header className="p-6 pt-12 flex flex-col gap-6 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-40 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <h1 className="text-2xl font-black text-white italic tracking-tighter">Minhas Reservas</h1>
        </div>

        <div className="flex bg-surface-dark p-1 rounded-2xl border border-white/5 shadow-inner">
          <button
            onClick={() => setActiveTab('Ativas')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Ativas' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500'}`}
          >
            Ativas
          </button>
          <button
            onClick={() => setActiveTab('Concluídas')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Concluídas' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
          >
            Histórico
          </button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {filtered.map((b) => (
          <div key={b.id} className={`bg-surface-dark/50 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 ${getStatusBorderColor(b.userResponse)}`}>
            <div className="relative h-32 w-full">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${b.serviceImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-lg border border-primary/20">
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">{b.category}</span>
              </div>
              {/* Response Badge */}
              {b.userResponse && b.userResponse !== 'pending' && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg ${b.userResponse === 'accepted' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  <span className="text-[8px] font-black uppercase tracking-widest">
                    {b.userResponse === 'accepted' ? '✓ Aceite' : '✗ Rejeitada'}
                  </span>
                </div>
              )}
              <div className="absolute bottom-4 left-6">
                <h3 className="text-lg font-black text-white italic">{b.serviceName}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Data / Hora</span>
                  <p className="text-sm font-bold text-gray-200">{b.date}</p>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Pago</span>
                  <p className="text-sm font-black text-primary">{b.totalPrice}</p>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex gap-3">
                {b.status === 'Ativa' ? (
                  <>
                    <button
                      onClick={() => openSchedule(b)}
                      className="flex-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">calendar_month</span>
                      Ver Agenda
                    </button>

                    {b.userResponse === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAccept(b.id)}
                          className="flex-1 bg-green-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                        >
                          Aceitar
                        </button>
                        <button
                          onClick={() => handleReject(b.id)}
                          className="flex-1 bg-red-500/10 border border-red-500/30 text-red-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                        >
                          Rejeitar
                        </button>
                      </>
                    )}

                    {b.userResponse !== 'pending' && (
                      <button className="flex-1 bg-surface-dark border border-white/5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Ver Voucher
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigate(`/details/${b.serviceId}`)}
                    className="flex-1 bg-primary/10 border border-primary/20 text-primary py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    Reservar Novamente
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center opacity-30 text-center animate-in fade-in duration-500">
            <span className="material-symbols-outlined text-7xl mb-4">event_busy</span>
            <p className="font-black text-lg uppercase tracking-widest">Sem reservas</p>
            <p className="text-xs font-bold mt-1">Tuas aventuras em Angola aparecerão aqui.</p>
            <button onClick={() => navigate('/home')} className="mt-8 bg-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Explorar Destinos</button>
          </div>
        )}
      </div>

      {/* Modal Ver Agenda */}
      {showScheduleModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-surface-dark border border-white/10 rounded-[32px] p-6 w-full max-w-md animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white italic">Agenda da Reserva</h2>
              <button onClick={() => setShowScheduleModal(false)} className="size-10 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-400">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-background-dark rounded-2xl p-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Serviço</p>
                <p className="text-lg font-black text-white">{selectedBooking.serviceName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background-dark rounded-2xl p-4">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Data</p>
                  <p className="text-sm font-bold text-white">{selectedBooking.date}</p>
                </div>
                <div className="bg-background-dark rounded-2xl p-4">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Valor</p>
                  <p className="text-sm font-black text-accent">{selectedBooking.totalPrice}</p>
                </div>
              </div>

              {/* Mini Calendar Visual */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary">event</span>
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Calendário</p>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                    <span key={i} className="text-gray-500 font-bold">{d}</span>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                    <span
                      key={day}
                      className={`py-1 rounded ${[12, 13, 14, 15].includes(day) ? 'bg-primary text-white font-black' : 'text-gray-400'}`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-2xl ${selectedBooking.userResponse === 'accepted' ? 'bg-green-500/10 border border-green-500/20' : selectedBooking.userResponse === 'rejected' ? 'bg-red-500/10 border border-red-500/20' : 'bg-accent/10 border border-accent/20'}`}>
                <p className="text-xs font-bold text-center">
                  {selectedBooking.userResponse === 'accepted' && '✓ Reserva confirmada pelo utilizador'}
                  {selectedBooking.userResponse === 'rejected' && '✗ Reserva rejeitada pelo utilizador'}
                  {selectedBooking.userResponse === 'pending' && '⏳ Aguardando confirmação do utilizador'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowScheduleModal(false)}
              className="w-full mt-6 bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
