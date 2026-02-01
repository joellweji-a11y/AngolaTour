
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const GuideRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    birthDate: '',
    languages: [] as string[],
    specialties: [] as string[],
    bio: '',
    licenseNumber: '',
    experienceYears: '1',
    terrains: [] as string[],
    notableTours: [
      { id: '1', name: '', description: '' }
    ],
    baseRate: '15000',
    servicePackages: [] as string[],
    availability: 'Full-time'
  });

  const allLanguages = ['Português', 'Umbundu', 'Kimbundu', 'Cokwe', 'Inglês', 'Francês', 'Espanhol'];
  const allSpecialties = ['História', 'Natureza', 'Gastronomia', 'Cultura', 'Fotografia', 'Aventura'];
  const allTerrains = [
    { id: 'mount', label: 'Montanha', icon: 'landscape' },
    { id: 'beach', label: 'Praia/Costa', icon: 'waves' },
    { id: 'city', label: 'Urbano', icon: 'location_city' },
    { id: 'forest', label: 'Floresta', icon: 'forest' },
    { id: 'desert', label: 'Deserto', icon: 'wb_sunny' }
  ];

  const allPackages = [
    { id: 'half', label: 'Meio Dia (4h)', icon: 'schedule', desc: 'Tour rápido' },
    { id: 'full', label: 'Dia Inteiro (8h)', icon: 'today', desc: 'Experiência completa' },
    { id: 'night', label: 'Night Tour', icon: 'dark_mode', desc: 'Vida noturna' },
    { id: 'multi', label: 'Multi-dias', icon: 'date_range', desc: 'Expedições longas' }
  ];

  const handleAIImproveBio = async () => {
    if (!formData.bio || formData.bio.length < 20) {
      alert("Escreva um rascunho de pelo menos 20 caracteres para que a IA possa melhorar.");
      return;
    }
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Transforme o seguinte rascunho em uma biografia profissional de guia turístico em Angola, tornando-a cativante, confiável e destacando a paixão por mostrar o país. Rascunho: "${formData.bio}"`,
        config: {
          systemInstruction: "Você é um especialista em marketing turístico angolano. Escreva em tom profissional mas acolhedor."
        }
      });
      setFormData({ ...formData, bio: response.text || formData.bio });
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAIPricingAdvice = async () => {
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Sugira um valor justo de diária em Kwanzas (Kz) para um guia em Angola com ${formData.experienceYears} anos de experiência, especialista em ${formData.specialties.join(', ')}. Responda apenas com o número sugerido e uma frase curta de justificativa.`,
      });
      const advice = response.text || "";
      const suggestedPrice = advice.match(/\d+/g)?.[0] || formData.baseRate;
      setFormData({ ...formData, baseRate: suggestedPrice });
      alert(`Conselho da IA: ${advice}`);
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAISuggestTour = async (index: number) => {
    const tour = formData.notableTours[index];
    if (!tour.name) {
      alert("Dê um nome ao trilho/tour primeiro (ex: Fenda da Tundavala).");
      return;
    }
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie uma descrição de 2 linhas extremamente atrativa para um roteiro turístico chamado "${tour.name}" em Angola. Foque em sensações e no que o turista vai descobrir.`,
      });
      const newTours = [...formData.notableTours];
      newTours[index].description = response.text || tour.description;
      setFormData({ ...formData, notableTours: newTours });
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmitProfile = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2500);
  };

  const toggleSelection = (item: string, field: 'languages' | 'specialties' | 'terrains' | 'servicePackages') => {
    const current = formData[field];
    if (current.includes(item)) {
      setFormData({ ...formData, [field]: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...current, item] });
    }
  };

  const addTour = () => {
    setFormData({
      ...formData,
      notableTours: [...formData.notableTours, { id: Date.now().toString(), name: '', description: '' }]
    });
  };

  const updateTour = (index: number, field: 'name' | 'description', value: string) => {
    const newTours = [...formData.notableTours];
    newTours[index][field] = value;
    setFormData({ ...formData, notableTours: newTours });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (showSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background-dark text-center animate-in fade-in zoom-in duration-500">
         <div className="size-32 rounded-full bg-accent/20 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin opacity-30" />
            <span className="material-symbols-outlined text-accent text-6xl">verified</span>
         </div>
         <h1 className="text-3xl font-black text-white italic mb-4">Candidatura Enviada!</h1>
         <p className="text-gray-400 text-sm leading-relaxed mb-12">
            Obrigado, <span className="text-accent font-bold">{formData.nickname || formData.fullName}</span>! O seu perfil está agora em revisão pela equipa do <span className="text-white font-bold">Angola Tour</span>. Em breve estará disponível para milhares de turistas.
         </p>
         <button 
           onClick={() => navigate('/guide-dashboard')}
           className="w-full bg-accent text-black py-4 rounded-2xl font-black text-lg shadow-2xl shadow-accent/40 active:scale-95 transition-all"
         >
           IR PARA O MEU PAINEL
         </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background-dark min-h-screen">
      {/* ... (resto do componente GuideRegistration permanece igual) ... */}
      <header className="p-6 pt-12 bg-background-dark/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => step === 1 ? navigate(-1) : prevStep()} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black text-white italic">Perfil de Guia</h1>
            <p className="text-[10px] text-accent font-black uppercase tracking-widest">
              {step === 1 ? 'Informação Pessoal' : 
               step === 2 ? 'Competências' : 
               step === 3 ? 'Biografia' : 
               step === 4 ? 'Experiência & Trilhos' : 
               step === 5 ? 'Serviços & Tarifas' : 
               'Revisão Final'} • {step}/6
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-accent shadow-[0_0_10px_#FFD700]' : 'bg-white/10'}`} />
          ))}
        </div>
      </header>

      <main className="p-6 pb-40">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex flex-col items-center mb-8">
               <div className="size-24 rounded-[32px] bg-surface-dark border-2 border-dashed border-accent/30 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                  <span className="material-symbols-outlined text-accent text-3xl group-hover:scale-110 transition-transform">add_a_photo</span>
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-3">Foto de Perfil Profissional</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome Completo (como no ID)</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                  placeholder="Ex: Manuel dos Santos"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome de Guerra</label>
                  <input 
                    type="text" 
                    className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                    placeholder="Manny Guide"
                    value={formData.nickname}
                    onChange={e => setFormData({...formData, nickname: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Data de Nascimento</label>
                  <input 
                    type="date" 
                    className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold text-white focus:ring-2 focus:ring-accent outline-none uppercase"
                    value={formData.birthDate}
                    onChange={e => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nº Carteira Profissional (INFOTUR)</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                  placeholder="AG-XXXXX-2024"
                  value={formData.licenseNumber}
                  onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Idiomas que domina</label>
              <div className="flex flex-wrap gap-2">
                {allLanguages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => toggleSelection(lang, 'languages')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                      formData.languages.includes(lang) ? 'bg-accent text-black border-accent shadow-[0_0_15px_#FFD70030]' : 'bg-surface-dark border-white/5 text-gray-500'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Áreas de Especialidade</label>
              <div className="grid grid-cols-2 gap-3">
                {allSpecialties.map(spec => (
                  <button
                    key={spec}
                    onClick={() => toggleSelection(spec, 'specialties')}
                    className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                      formData.specialties.includes(spec) ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-dark border-white/5 text-gray-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {spec === 'História' ? 'history_edu' : spec === 'Natureza' ? 'forest' : spec === 'Gastronomia' ? 'restaurant' : spec === 'Cultura' ? 'festival' : spec === 'Fotografia' ? 'camera' : 'explore'}
                    </span>
                    <span className="text-[10px] font-bold uppercase">{spec}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-1.5">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Anos de Experiência</label>
               <input 
                 type="range" min="1" max="25" 
                 className="w-full accent-primary bg-surface-dark h-1.5 rounded-full outline-none"
                 value={formData.experienceYears}
                 onChange={e => setFormData({...formData, experienceYears: e.target.value})}
               />
               <div className="flex justify-between text-[10px] font-black text-primary mt-1">
                  <span>Iniciante</span>
                  <span>{formData.experienceYears} ANOS</span>
                  <span>Veterano</span>
               </div>
            </section>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <section className="relative">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Biografia Profissional</label>
                <button 
                  onClick={handleAIImproveBio}
                  disabled={aiLoading}
                  className="bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-lg flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                >
                   <span className={`material-symbols-outlined text-accent text-sm ${aiLoading ? 'animate-spin' : ''}`}>auto_awesome</span>
                   <span className="text-[8px] font-black text-accent uppercase">Ajustar com IA</span>
                </button>
              </div>
              <textarea 
                className="w-full bg-surface-dark/50 border border-white/10 rounded-[32px] p-6 text-sm text-white focus:ring-2 focus:ring-accent outline-none resize-none min-h-[200px]"
                placeholder="Ex: Sou natural da Huíla e guio turistas pela Serra da Leba há 5 anos. Adoro contar histórias sobre o Reino do Ndongo..."
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
              />
              {aiLoading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-[32px] flex flex-col items-center justify-center">
                   <div className="size-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-3" />
                   <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Otimizando Perfil...</p>
                </div>
              )}
            </section>

            <section className="bg-surface-dark/40 border border-white/5 p-6 rounded-[32px]">
               <h3 className="text-xs font-black text-white mb-2 italic">Dica de Sucesso:</h3>
               <p className="text-[11px] text-gray-400 leading-relaxed">
                 Guias que mencionam <span className="text-accent font-bold">línguas locais</span> e têm <span className="text-accent font-bold">fotos em locais turísticos</span> recebem 3x mais reservas.
               </p>
            </section>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            {/* Terrains of expertise */}
            <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Domínio de Terrenos</label>
              <div className="grid grid-cols-5 gap-2">
                {allTerrains.map(t => (
                  <button
                    key={t.id}
                    onClick={() => toggleSelection(t.label, 'terrains')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                      formData.terrains.includes(t.label) ? 'bg-accent/10 border-accent text-accent' : 'bg-surface-dark border-white/5 text-gray-500'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{t.icon}</span>
                    <span className="text-[7px] font-black uppercase text-center leading-none">{t.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Notable Experiences / Tours */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Trilhos e Tours Marcantes</label>
                <button onClick={addTour} className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add</span> Adicionar
                </button>
              </div>

              <div className="space-y-6">
                {formData.notableTours.map((tour, idx) => (
                  <div key={tour.id} className="bg-surface-dark/50 border border-white/5 p-6 rounded-[32px] space-y-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Nome do Roteiro (Ex: Rota das Quedas)"
                        className="w-full bg-background-dark/50 border border-white/10 rounded-2xl py-3 px-5 text-sm text-white focus:ring-1 focus:ring-accent outline-none"
                        value={tour.name}
                        onChange={e => updateTour(idx, 'name', e.target.value)}
                      />
                      <button 
                        onClick={() => handleAISuggestTour(idx)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent/20"
                      >
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      </button>
                    </div>
                    <textarea 
                      placeholder="Breve resumo da experiência para os clientes..."
                      className="w-full bg-background-dark/50 border border-white/10 rounded-2xl p-4 text-xs text-gray-400 focus:ring-1 focus:ring-accent outline-none resize-none"
                      rows={2}
                      value={tour.description}
                      onChange={e => updateTour(idx, 'description', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <section className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Tarifa Base por Dia (Kz)</label>
                <button 
                  onClick={handleAIPricingAdvice}
                  disabled={aiLoading}
                  className="bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-2 active:scale-95 transition-all"
                >
                   <span className={`material-symbols-outlined text-primary text-sm ${aiLoading ? 'animate-spin' : ''}`}>lightbulb</span>
                   <span className="text-[8px] font-black text-primary uppercase">Consultar IA</span>
                </button>
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  className="w-full bg-surface-dark border border-white/10 rounded-[32px] py-6 px-10 text-3xl font-black text-white focus:ring-2 focus:ring-accent outline-none"
                  value={formData.baseRate}
                  onChange={e => setFormData({...formData, baseRate: e.target.value})}
                />
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-accent font-black">Kz</span>
              </div>
              <p className="text-[9px] text-gray-500 italic ml-4 text-center">Este valor serve como referência para os turistas antes de pacotes personalizados.</p>
            </section>

            <section>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Pacotes de Serviço Ativos</label>
              <div className="grid grid-cols-2 gap-4">
                {allPackages.map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => toggleSelection(pkg.label, 'servicePackages')}
                    className={`p-4 rounded-[32px] border text-left transition-all relative overflow-hidden group ${
                      formData.servicePackages.includes(pkg.label) ? 'bg-accent/10 border-accent' : 'bg-surface-dark border-white/5'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-2xl mb-2 ${formData.servicePackages.includes(pkg.label) ? 'text-accent' : 'text-gray-600'}`}>
                      {pkg.icon}
                    </span>
                    <h4 className={`text-xs font-black uppercase ${formData.servicePackages.includes(pkg.label) ? 'text-white' : 'text-gray-500'}`}>{pkg.label}</h4>
                    <p className="text-[8px] text-gray-600 font-bold mt-1 uppercase">{pkg.desc}</p>
                    {formData.servicePackages.includes(pkg.label) && (
                      <div className="absolute top-3 right-3 size-4 rounded-full bg-accent flex items-center justify-center">
                         <span className="material-symbols-outlined text-[10px] text-black font-black">check</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <div className="bg-surface-dark/60 border border-white/10 rounded-[40px] p-8 text-center relative overflow-hidden">
                <div className="absolute -left-10 -top-10 size-40 bg-accent/5 blur-3xl rounded-full" />
                <div className="size-20 rounded-3xl bg-surface-dark border-2 border-accent/30 mx-auto mb-4 overflow-hidden shadow-2xl">
                   <img 
                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.fullName}`} 
                     alt="Preview" 
                     className="w-full h-full bg-surface-light"
                   />
                </div>
                <h3 className="text-xl font-black text-white">{formData.fullName}</h3>
                <p className="text-[10px] text-accent font-black uppercase tracking-widest mt-1">Guia Certificado em Potencial</p>
             </div>

             <section className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Resumo do Perfil</h4>
                
                <div className="bg-surface-dark border border-white/5 rounded-[32px] p-6 space-y-4 shadow-xl">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Experiência</span>
                      <span className="text-sm font-black text-white">{formData.experienceYears} Anos</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Idiomas</span>
                      <span className="text-sm font-black text-white truncate max-w-[150px]">{formData.languages.join(', ')}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Tarifa Base</span>
                      <span className="text-sm font-black text-accent">{formData.baseRate} Kz/dia</span>
                   </div>
                </div>

                <div className="bg-surface-dark border border-white/5 rounded-[32px] p-6 shadow-xl">
                   <h5 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Biografia</h5>
                   <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 italic">"{formData.bio}"</p>
                </div>

                <div className="bg-surface-dark border border-white/5 rounded-[32px] p-6 shadow-xl">
                   <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Especialidades</h5>
                   <div className="flex flex-wrap gap-2">
                      {formData.specialties.map(s => (
                        <span key={s} className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase">{s}</span>
                      ))}
                   </div>
                </div>
             </section>

             <section className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-6 rounded-[32px] flex gap-4 items-center">
                <div className="size-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
                   <span className="material-symbols-outlined text-xl">gavel</span>
                </div>
                <p className="text-[9px] text-gray-400 leading-tight">
                   Ao enviar, declara que todas as informações prestadas são verdadeiras e aceita os <span className="text-white font-bold">Termos de Conduta para Guias</span> do Angola Tour.
                </p>
             </section>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40">
        <button 
          onClick={step === 6 ? handleSubmitProfile : nextStep}
          disabled={isSubmitting}
          className={`w-full py-4 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all ${
            step === 6 ? 'bg-primary text-white shadow-primary/30' : 'bg-accent text-black shadow-accent/20'
          }`}
        >
          {isSubmitting ? (
             <div className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {step === 6 ? 'ENVIAR PARA REVISÃO' : 'PRÓXIMO PASSO'}
              <span className="material-symbols-outlined font-black">{step === 6 ? 'send' : 'arrow_forward'}</span>
            </>
          )}
        </button>
      </footer>
    </div>
  );
};

export default GuideRegistration;
