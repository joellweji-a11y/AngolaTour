
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<'AOA' | 'USD' | 'EUR'>('AOA');
  const [method, setMethod] = useState<string>('mcx');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Valores simulados de conversão
  const basePrice = 137000; // Kz
  const rates = {
    AOA: 1,
    USD: 0.0011, // ~900 Kz
    EUR: 0.0010, // ~1000 Kz
  };

  const getPrice = () => {
    const total = basePrice * rates[currency];
    return currency === 'AOA'
      ? total.toLocaleString('pt-AO')
      : total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const paymentMethods = [
    { id: 'mcx', name: 'Multicaixa Express', sub: 'Pagamento via Telemóvel', icon: 'smartphone', color: 'text-blue-400' },
    { id: 'bai', name: 'BAI Directo', sub: 'Transferência Instantânea', icon: 'account_balance', color: 'text-orange-400' },
    { id: 'card', name: 'Visa / Mastercard', sub: 'Crédito ou Débito', icon: 'credit_card', color: 'text-primary' },
    { id: 'paypal', name: 'PayPal', sub: 'Pagamento Internacional', icon: 'payments', color: 'text-indigo-400' },
  ];

  const handlePayment = () => {
    setIsLoading(true);

    // Simulação de processamento bancário seguro
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Simulação de adição ao histórico (idealmente via API/Context)
      // Após 3 segundos no ecrã de sucesso, redireciona para o histórico
      setTimeout(() => {
        navigate('/history');
      }, 3000);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background-dark animate-in fade-in duration-500">
        <div className="relative">
          <div className="size-32 rounded-full bg-green-500/20 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_60px_#22c55e20]">
            <span className="material-symbols-outlined text-green-500 text-6xl animate-in zoom-in duration-500">check_circle</span>
          </div>
          {/* Animação de ondas de sucesso */}
          <div className="absolute inset-0 size-32 rounded-full border border-green-500/30 animate-ping" />
        </div>

        <h2 className="text-3xl font-black text-white italic mb-2 text-center">Pagamento Concluído!</h2>
        <p className="text-gray-400 text-sm text-center mb-12 max-w-[280px]">
          A sua reserva no <span className="text-white font-bold">Resort da Huíla</span> foi confirmada. O seu voucher já está disponível no histórico.
        </p>

        <div className="w-full space-y-4">
          <div className="bg-surface-dark border border-white/5 p-6 rounded-[32px] flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">ID Transação</p>
              <p className="text-sm font-bold text-white mt-1">#AT-9901-XQ</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Total Pago</p>
              <p className="text-sm font-black text-primary mt-1">{currency} {getPrice()}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/history')}
            className="w-full bg-primary py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            VER MEUS VOUCHERS
            <span className="material-symbols-outlined text-sm">confirmation_number</span>
          </button>
        </div>

        <p className="mt-8 text-[10px] text-gray-600 font-black uppercase tracking-widest animate-pulse">Redirecionando automaticamente...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md z-30">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Checkout</h2>
        <div className="size-10" />
      </header>

      <div className="px-6 space-y-8 mt-4">
        {/* Resumo do Item */}
        <div className="bg-surface-dark p-4 rounded-2xl border border-white/5 flex gap-4">
          <div className="size-20 rounded-xl bg-cover bg-center shadow-lg" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCk91Rh_S_hGCpRAE6VmtuPCFqUY_G98ZDqWR9T5SRAhoouu_mEVJPXgmDQHr9pm634Jw9ex8hsVhu6gRET-1rv7gXwuxwYsav9Cargix_lUAufYKo3pCjR1EeLSW1isYkf_uYuLaGjbLbVAxRbjpm3-_TDqzjf3ZdEpFrk8cXqTBtaUmAQ1A2lNYMgc9FiFmmEqfcgTi6q3PFSg62aHbETN4lROCezwF33GwPlNocAIqkBbHRJ6q-CEfrcznXdwYMO92CUMUgxjPS2)' }} />
          <div className="flex-1">
            <h4 className="font-bold text-base">Resort da Huíla</h4>
            <p className="text-xs text-gray-500 mt-1">3 Noites • 2 Adultos, 1 Criança</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded border border-primary/20">CONFIRMAÇÃO IMEDIATA</span>
            </div>
          </div>
        </div>

        {/* Seletor de Moeda */}
        <div>
          <label className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest ml-1 mb-3 block">Escolha a Moeda</label>
          <div className="grid grid-cols-3 gap-2 bg-surface-dark p-1.5 rounded-2xl border border-white/5">
            {[
              { id: 'AOA', label: 'Kwanza', symbol: 'Kz' },
              { id: 'USD', label: 'Dólar', symbol: '$' },
              { id: 'EUR', label: 'Euro', symbol: '€' }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCurrency(c.id as any)}
                className={`py-3 rounded-xl flex flex-col items-center gap-0.5 transition-all ${currency === c.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-gray-500 hover:bg-white/5'
                  }`}
              >
                <span className="text-xs font-bold">{c.label}</span>
                <span className="text-[10px] opacity-70">{c.symbol}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Métodos de Pagamento */}
        <div>
          <label className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest ml-1 mb-3 block">Método de Pagamento</label>
          <div className="space-y-3">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${method === m.id
                    ? 'bg-surface-dark border-primary ring-1 ring-primary'
                    : 'bg-surface-dark border-white/5 opacity-70 grayscale-[0.5]'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-xl flex items-center justify-center bg-background-dark border border-white/5 ${m.color}`}>
                    <span className="material-symbols-outlined">{m.icon}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">{m.name}</p>
                    <p className="text-[10px] text-gray-500">{m.sub}</p>
                  </div>
                </div>
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${method === m.id ? 'border-primary' : 'border-gray-600'}`}>
                  {method === m.id && <div className="size-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Resumo Final */}
        <div className="bg-surface-dark/50 p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-300">{currency} {getPrice()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Taxas e Impostos</span>
            <span className="font-medium text-green-400">Incluído</span>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase">Total Final</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-accent text-sm">verified_user</span>
                <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Checkout Seguro</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-white">
                <span className="text-sm font-bold text-primary mr-1">{currency}</span>
                {getPrice()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de Ação Fixo */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark/95 border-t border-white/5 p-4 pb-8 z-50 backdrop-blur-xl">
        <div className="flex gap-3">
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="flex-1 bg-primary py-4 rounded-2xl font-bold text-sm shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-xs uppercase tracking-widest font-black">Processando...</span>
              </>
            ) : (
              <>
                Pagar Agora
                <span className="material-symbols-outlined text-sm">lock</span>
              </>
            )}
          </button>

          {/* WhatsApp Alternative */}
          <button
            onClick={() => {
              const message = encodeURIComponent('Olá, gostaria de confirmar a minha reserva para Resort da Huíla através do AngolaTour.');
              localStorage.setItem('at_whatsapp_redirect', 'true');
              window.open(`https://wa.me/244923456789?text=${message}`, '_blank');
              // Smart redirect on return
              const checkFocus = setInterval(() => {
                if (document.hasFocus()) {
                  clearInterval(checkFocus);
                  navigate('/bookings');
                }
              }, 1000);
              setTimeout(() => clearInterval(checkFocus), 30000);
            }}
            disabled={isLoading}
            className="bg-[#25D366] hover:bg-[#1da851] text-white py-4 px-5 rounded-2xl font-black shadow-lg shadow-[#25D366]/30 flex items-center justify-center active:scale-95 transition-all disabled:opacity-70"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
