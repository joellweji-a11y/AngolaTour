
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    province: '',
    description: '',
    price: '',
    contact: '',
    location: ''
  });

  const categories = [
    { id: 'aloj', label: 'Alojamentos', icon: 'bed' },
    { id: 'rest', label: 'Restauração', icon: 'restaurant' },
    { id: 'guia', label: 'Guia Local', icon: 'hail' },
    { id: 'transp', label: 'Transportes', icon: 'commute' },
    { id: 'exp', label: 'Experiência', icon: 'festival' },
    { id: 'event', label: 'Eventos', icon: 'theater_comedy' },
  ];

  const provinces = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 
    'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 
    'Moxico', 'Namibe', 'Uíge', 'Zaire'
  ];

  const handleCategorySelect = (label: string) => {
    setFormData({...formData, category: label});
    if (label === 'Guia Local') {
      navigate('/register-guide');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="flex-1 flex flex-col bg-background-dark min-h-screen">
      <header className="p-6 pt-12 bg-background-dark/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => step === 1 ? navigate(-1) : prevStep()} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black text-white italic">Novo Registo</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Passo {step} de 3</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-primary' : 'bg-white/10'}`} />
          ))}
        </div>
      </header>

      <main className="p-6 pb-32">
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <section>
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 block">O que você oferece?</label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.label)}
                      className={`p-4 rounded-3xl border flex flex-col items-center gap-2 transition-all ${
                        formData.category === cat.label ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-dark border-white/5 text-gray-400'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">{cat.label}</span>
                    </button>
                  ))}
                </div>
             </section>

             <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Título da Oferta"
                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-primary outline-none"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">edit_note</span>
                </div>

                <div className="relative">
                  <select 
                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-primary outline-none appearance-none"
                    value={formData.province}
                    onChange={e => setFormData({...formData, province: e.target.value})}
                  >
                    <option value="">Selecione a Província</option>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">location_on</span>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                </div>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <section>
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 block">Mídia (Arraste ou clique)</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-28 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-primary/50 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">image</span>
                    <span className="text-[8px] font-bold uppercase mt-1">Imagens</span>
                  </div>
                  <div className="h-28 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400/50 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">music_note</span>
                    <span className="text-[8px] font-bold uppercase mt-1">Áudio</span>
                  </div>
                  <div className="h-28 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-accent/50 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">movie</span>
                    <span className="text-[8px] font-bold uppercase mt-1">Vídeo</span>
                  </div>
                </div>
             </section>

             <section>
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 block">Descrição da Experiência</label>
                <textarea 
                  rows={6}
                  placeholder="Conte-nos o que torna sua oferta única..."
                  className="w-full bg-surface-dark border border-white/10 rounded-3xl p-5 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
             </section>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Preço Sugerido (Kz)"
                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-primary outline-none"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">payments</span>
                </div>

                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="Telemóvel para contacto"
                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-primary outline-none"
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">call</span>
                </div>
             </div>

             <section>
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 block">Localização Exata</label>
                <div className="h-48 w-full rounded-3xl bg-surface-dark border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-cover bg-center grayscale opacity-30" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBjJhDuyrw2simIK69pOUzoCvVRQoYgiaFXFQ_EAN21qKhHppsKslkYavOedl9b180vvGg5Mxbkn8BGhpHvmQhZUsJ2c4sk8x13det3tYOP_Pd1JiFGbYor2-eefzzE5SegE9squa4wzV9jLWZ1f_Xi6rgY3bII7DO_wt3ALPA--mBjkervziBxLeUOdXinJPM_-TRHu-eyQqpeHS349ftXXxZ48IWCCl7iuquikThkMM0-kjRyMkW7wBRYGvhPKbNPWqYz-6lXQN80)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-white">add_location</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <span className="text-[9px] font-bold text-white uppercase tracking-widest">Pin no Mapa</span>
                  </div>
                </div>
             </section>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40">
        <button 
          onClick={step === 3 ? () => navigate('/provider') : nextStep}
          className="w-full bg-primary py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          {step === 3 ? 'FINALIZAR REGISTO' : 'PRÓXIMO PASSO'}
          <span className="material-symbols-outlined">{step === 3 ? 'check_circle' : 'arrow_forward'}</span>
        </button>
      </footer>
    </div>
  );
};

export default RegistrationForm;
