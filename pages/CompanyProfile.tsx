import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, CompanySubcategory } from '../types';

const CompanyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'payments'>('info');

  const [companyData, setCompanyData] = useState({
    name: 'Restaurante Sabor da Ilha',
    email: 'contacto@sabordailha.ao',
    phone: '+244 923 000 111',
    nif: '5000987654',
    category: Category.FOOD,
    subcategory: 'Restaurante Típico' as CompanySubcategory,
    description: 'O melhor mufete da Ilha de Luanda, com peixe fresco todos os dias e vista para a baía.',
    province: 'Luanda',
    municipality: 'Ingombota',
    address: 'Av. Murtala Mohammed, Ilha de Luanda',
    payments: ['Multicaixa Express', 'Cash', 'Transferência BAI']
  });

  const provinces = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'];
  const paymentOptions = ['Multicaixa Express', 'Transferência BAI', 'Cash', 'Visa/Mastercard', 'PayPal'];

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Perfil da empresa atualizado com sucesso!');
    }, 1500);
  };

  const togglePayment = (method: string) => {
    setCompanyData(prev => ({
      ...prev,
      payments: prev.payments.includes(method) 
        ? prev.payments.filter(m => m !== method) 
        : [...prev.payments, method]
    }));
  };

  return (
    <div className="flex-1 bg-background-dark min-h-screen pb-32 overflow-y-auto no-scrollbar">
      {/* Cover & Logo Section */}
      <div className="relative h-60 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.3]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        
        <button 
          onClick={() => navigate('/provider')}
          className="absolute top-12 left-6 size-11 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white z-20"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="absolute -bottom-6 left-8 flex items-end gap-5 z-20">
          <div className="relative">
            <div className="size-28 rounded-3xl bg-surface-dark border-4 border-background-dark overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-2 -right-2 size-9 rounded-xl bg-accent border-4 border-background-dark flex items-center justify-center shadow-lg">
               <span className="material-symbols-outlined text-black text-sm">photo_camera</span>
            </button>
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white italic">{companyData.name}</h1>
            <p className="text-accent text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">verified</span> Entidade Verificada
            </p>
          </div>
        </div>
      </div>

      <main className="p-6 mt-10 space-y-10">
        {/* Navigation Tabs */}
        <div className="flex bg-surface-dark p-1.5 rounded-2xl border border-white/5 shadow-inner">
           {[
             { id: 'info', label: 'Dados', icon: 'business_center' },
             { id: 'location', label: 'Local', icon: 'location_on' },
             { id: 'payments', label: 'Pagamentos', icon: 'payments' }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
                 activeTab === tab.id ? 'bg-accent text-black font-black shadow-lg' : 'text-gray-500'
               }`}
             >
               <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
               <span className="text-[9px] uppercase tracking-widest">{tab.label}</span>
             </button>
           ))}
        </div>

        {/* Tab Content: Basic Info */}
        {activeTab === 'info' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome de Exibição (Touristas)</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                  value={companyData.name}
                  onChange={e => setCompanyData({...companyData, name: e.target.value})}
                />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">NIF</label>
                   <input 
                     readOnly
                     type="text" 
                     className="w-full bg-background-dark/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-gray-500 outline-none"
                     value={companyData.nif}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Contacto Público</label>
                   <input 
                     type="tel" 
                     className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                     value={companyData.phone}
                     onChange={e => setCompanyData({...companyData, phone: e.target.value})}
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Descrição do Estabelecimento</label>
                <textarea 
                  rows={4}
                  className="w-full bg-surface-dark border border-white/10 rounded-[24px] p-5 text-sm text-white focus:ring-2 focus:ring-accent outline-none resize-none"
                  value={companyData.description}
                  onChange={e => setCompanyData({...companyData, description: e.target.value})}
                />
             </div>
          </div>
        )}

        {/* Tab Content: Location */}
        {activeTab === 'location' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Província</label>
                   <select 
                     className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-accent"
                     value={companyData.province}
                     onChange={e => setCompanyData({...companyData, province: e.target.value})}
                   >
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Município</label>
                   <input 
                     type="text" 
                     className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                     value={companyData.municipality}
                     onChange={e => setCompanyData({...companyData, municipality: e.target.value})}
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Endereço Completo</label>
                <div className="relative">
                   <input 
                     type="text" 
                     className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                     value={companyData.address}
                     onChange={e => setCompanyData({...companyData, address: e.target.value})}
                   />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-accent">location_on</span>
                </div>
             </div>

             <div className="h-48 w-full rounded-[32px] bg-surface-dark border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBjJhDuyrw2simIK69pOUzoCvVRQoYgiaFXFQ_EAN21qKhHppsKslkYavOedl9b180vvGg5Mxbkn8BGhpHvmQhZUsJ2c4sk8x13det3tYOP_Pd1JiFGbYor2-eefzzE5SegE9squa4wzV9jLWZ1f_Xi6rgY3bII7DO_wt3ALPA--mBjkervziBxLeUOdXinJPM_-TRHu-eyQqpeHS349ftXXxZ48IWCCl7iuquikThkMM0-kjRyMkW7wBRYGvhPKbNPWqYz-6lXQN80)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <button className="bg-accent text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-95 transition-all">
                      Ajustar Pin no Mapa <span className="material-symbols-outlined text-sm">edit_location_alt</span>
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Tab Content: Payments */}
        {activeTab === 'payments' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-accent/10 border border-accent/20 p-6 rounded-[32px] flex gap-4">
                <span className="material-symbols-outlined text-accent">info</span>
                <p className="text-[10px] text-gray-300 font-medium leading-relaxed italic">
                   Os métodos selecionados abaixo aparecerão na sua página pública para informar os viajantes antes da reserva.
                </p>
             </div>

             <div className="space-y-3">
                {paymentOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => togglePayment(opt)}
                    className={`w-full p-5 rounded-[28px] border flex items-center justify-between transition-all ${
                      companyData.payments.includes(opt) 
                        ? 'bg-surface-dark border-accent ring-1 ring-accent' 
                        : 'bg-surface-dark/40 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <div className={`size-10 rounded-xl bg-background-dark flex items-center justify-center ${companyData.payments.includes(opt) ? 'text-accent' : 'text-gray-600'}`}>
                          <span className="material-symbols-outlined">
                             {opt === 'Multicaixa Express' ? 'smartphone' : opt === 'Cash' ? 'payments' : 'credit_card'}
                          </span>
                       </div>
                       <span className={`text-sm font-bold ${companyData.payments.includes(opt) ? 'text-white' : 'text-gray-500'}`}>{opt}</span>
                    </div>
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center ${companyData.payments.includes(opt) ? 'border-accent' : 'border-gray-700'}`}>
                       {companyData.payments.includes(opt) && <div className="size-3 rounded-full bg-accent" />}
                    </div>
                  </button>
                ))}
             </div>
          </div>
        )}

        {/* Global Save Button */}
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-accent text-black py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="size-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              GUARDAR ALTERAÇÕES
              <span className="material-symbols-outlined text-sm font-black">save</span>
            </>
          )}
        </button>

        <div className="text-center opacity-20 pt-10">
           <p className="text-[8px] font-black uppercase tracking-widest text-white italic italic">Portal do Parceiro • Angola Tour Global</p>
        </div>
      </main>
    </div>
  );
};

export default CompanyProfile;