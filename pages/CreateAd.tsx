
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdFormData {
    title: string;
    price: string;
    description: string;
    province: string;
    municipality: string;
    contact: string;
    category: string;
    subcategory: string;
    mediaType: 'images' | 'video';
    mediaFiles: File[];
    mediaPreview: string[];
}

const AD_CATEGORIES: Record<string, string[]> = {
    'Venda de Veículos': ['Carros', 'Motas', 'Barcos', 'Camiões', 'Bicicletas'],
    'Aluguer de Quartos': ['Apartamento', 'Quarto Individual', 'Moradia', 'Estúdio', 'Suite'],
    'Serviços Turísticos': ['Guia Turístico', 'Excursões', 'Transfer', 'Passeios', 'Aluguer de Equipamento'],
    'Eventos': ['Casamentos', 'Festas', 'Conferências', 'Concertos', 'Feiras'],
    'Restauração': ['Catering', 'Buffet', 'Chef Privado', 'Entrega de Refeições'],
    'Artesanato & Arte': ['Escultura', 'Pintura', 'Tecelagem', 'Joalharia', 'Cerâmica'],
    'Emprego & Trabalho': ['Tempo Inteiro', 'Part-Time', 'Freelancer', 'Estágio'],
    'Electrónica': ['Telemóveis', 'Computadores', 'Televisões', 'Electrodomésticos'],
    'Moda & Beleza': ['Roupa', 'Calçado', 'Acessórios', 'Cosméticos', 'Cabeleireiro'],
    'Outros Serviços': ['Construção', 'Limpeza', 'Transporte', 'Reparações', 'Consultoria']
};

const PROVINCES = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'];

const CreateAd: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<AdFormData>({
        title: '',
        price: '',
        description: '',
        province: 'Luanda',
        municipality: '',
        contact: '',
        category: '',
        subcategory: '',
        mediaType: 'images',
        mediaFiles: [],
        mediaPreview: []
    });

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'video') => {
        const files = e.target.files;
        if (!files) return;

        if (type === 'images') {
            if (files.length > 6) {
                alert('Máximo de 6 imagens permitidas');
                return;
            }
            const fileArray = Array.from(files).slice(0, 6);
            const previews = fileArray.map(file => URL.createObjectURL(file));
            setFormData({ ...formData, mediaType: 'images', mediaFiles: fileArray, mediaPreview: previews });
        } else {
            const videoFile = files[0];
            if (videoFile.size > 100 * 1024 * 1024) { // 100MB limit
                alert('Vídeo deve ter no máximo 100MB');
                return;
            }
            setFormData({ ...formData, mediaType: 'video', mediaFiles: [videoFile], mediaPreview: [URL.createObjectURL(videoFile)] });
        }

        // Simulate upload progress
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const removeMedia = (index: number) => {
        const newFiles = formData.mediaFiles.filter((_, i) => i !== index);
        const newPreviews = formData.mediaPreview.filter((_, i) => i !== index);
        setFormData({ ...formData, mediaFiles: newFiles, mediaPreview: newPreviews });
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.category || !formData.contact || formData.mediaFiles.length === 0) {
            alert('Por favor, preencha todos os campos obrigatórios e adicione pelo menos uma mídia.');
            return;
        }

        const pendingAds = JSON.parse(localStorage.getItem('at_pending_ads') || '[]');
        const newAd = {
            id: 'AD-' + Date.now().toString(36).toUpperCase(),
            ...formData,
            mediaPreview: formData.mediaPreview, // Store preview URLs for demo
            status: 'pending',
            createdAt: new Date().toISOString(),
            userId: JSON.parse(localStorage.getItem('at_user_session') || '{}').email || 'anonymous'
        };

        pendingAds.push(newAd);
        localStorage.setItem('at_pending_ads', JSON.stringify(pendingAds));

        navigate('/ads/pending-status');
    };

    const nextStep = () => {
        if (step === 1 && formData.mediaFiles.length === 0) {
            alert('Adicione pelo menos uma imagem ou vídeo');
            return;
        }
        if (step === 2 && (!formData.category || !formData.subcategory)) {
            alert('Selecione uma categoria e subcategoria');
            return;
        }
        setStep(prev => Math.min(prev + 1, 3) as 1 | 2 | 3);
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as 1 | 2 | 3);

    return (
        <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen">
            <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-black text-white italic">Criar Anúncio</h1>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-0.5">Passo {step} de 3</p>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="px-6 py-4">
                <div className="flex gap-2">
                    {[1, 2, 3].map(s => (
                        <div
                            key={s}
                            className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-primary' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Mídia</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Categoria</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Detalhes</span>
                </div>
            </div>

            <main className="p-6 space-y-6">
                {/* STEP 1: Media Upload */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="text-center space-y-2 mb-8">
                            <h2 className="text-2xl font-black text-white italic">Adicione Mídia</h2>
                            <p className="text-sm text-gray-500">Até 6 imagens ou 1 vídeo (máx. 1 min)</p>
                        </div>

                        {/* Media Type Selector */}
                        <div className="flex bg-surface-dark p-1 rounded-2xl border border-white/5 shadow-inner">
                            <button
                                onClick={() => setFormData({ ...formData, mediaType: 'images', mediaFiles: [], mediaPreview: [] })}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${formData.mediaType === 'images' ? 'bg-primary text-white shadow-lg' : 'text-gray-500'}`}
                            >
                                <span className="material-symbols-outlined text-lg">photo_library</span>
                                Imagens
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, mediaType: 'video', mediaFiles: [], mediaPreview: [] })}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${formData.mediaType === 'video' ? 'bg-primary text-white shadow-lg' : 'text-gray-500'}`}
                            >
                                <span className="material-symbols-outlined text-lg">videocam</span>
                                Vídeo
                            </button>
                        </div>

                        {/* Upload Area */}
                        {formData.mediaPreview.length === 0 ? (
                            <button
                                onClick={() => formData.mediaType === 'images' ? fileInputRef.current?.click() : videoInputRef.current?.click()}
                                className="w-full h-64 border-2 border-dashed border-white/20 rounded-[32px] flex flex-col items-center justify-center gap-4 bg-surface-dark/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                            >
                                <div className="size-20 rounded-3xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-4xl">
                                        {formData.mediaType === 'images' ? 'add_photo_alternate' : 'video_call'}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white">Clique para adicionar</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formData.mediaType === 'images' ? 'PNG, JPG até 6 ficheiros' : 'MP4, MOV até 100MB'}
                                    </p>
                                </div>
                            </button>
                        ) : (
                            <div className="space-y-4">
                                {/* Preview Grid */}
                                {formData.mediaType === 'images' ? (
                                    <div className="grid grid-cols-3 gap-3">
                                        {formData.mediaPreview.map((preview, index) => (
                                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                                                <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => removeMedia(index)}
                                                    className="absolute top-2 right-2 size-7 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
                                                >
                                                    <span className="material-symbols-outlined text-white text-sm">close</span>
                                                </button>
                                            </div>
                                        ))}
                                        {formData.mediaPreview.length < 6 && (
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="aspect-square rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center bg-surface-dark/30 hover:border-primary/50 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-gray-500 text-2xl">add</span>
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10">
                                        <video
                                            src={formData.mediaPreview[0]}
                                            controls
                                            className="w-full aspect-video object-cover"
                                        />
                                        <button
                                            onClick={() => removeMedia(0)}
                                            className="absolute top-4 right-4 size-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
                                        >
                                            <span className="material-symbols-outlined text-white">close</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Upload Progress */}
                        {isUploading && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-gray-500">A carregar...</span>
                                    <span className="text-primary">{uploadProgress}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleMediaSelect(e, 'images')}
                        />
                        <input
                            type="file"
                            ref={videoInputRef}
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleMediaSelect(e, 'video')}
                        />
                    </div>
                )}

                {/* STEP 2: Category Selection */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="text-center space-y-2 mb-8">
                            <h2 className="text-2xl font-black text-white italic">Escolha a Categoria</h2>
                            <p className="text-sm text-gray-500">Selecione a categoria que melhor descreve o seu anúncio</p>
                        </div>

                        {/* Category Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {Object.keys(AD_CATEGORIES).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFormData({ ...formData, category: cat, subcategory: '' })}
                                    className={`p-4 rounded-2xl border text-left transition-all ${formData.category === cat
                                            ? 'bg-primary/10 border-primary text-white'
                                            : 'bg-surface-dark/50 border-white/5 text-gray-400 hover:border-white/20'
                                        }`}
                                >
                                    <p className="text-sm font-bold truncate">{cat}</p>
                                    <p className="text-[10px] text-gray-500 mt-1">{AD_CATEGORIES[cat].length} subcategorias</p>
                                </button>
                            ))}
                        </div>

                        {/* Subcategory Selection */}
                        {formData.category && (
                            <div className="mt-6 space-y-3 animate-in slide-in-from-bottom duration-300">
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Subcategoria</p>
                                <div className="flex flex-wrap gap-2">
                                    {AD_CATEGORIES[formData.category].map(sub => (
                                        <button
                                            key={sub}
                                            onClick={() => setFormData({ ...formData, subcategory: sub })}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${formData.subcategory === sub
                                                    ? 'bg-accent text-black'
                                                    : 'bg-surface-dark border border-white/10 text-gray-400'
                                                }`}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 3: Details Form */}
                {step === 3 && (
                    <div className="space-y-5 animate-in fade-in duration-500">
                        <div className="text-center space-y-2 mb-8">
                            <h2 className="text-2xl font-black text-white italic">Detalhes do Anúncio</h2>
                            <p className="text-sm text-gray-500">Preencha as informações do seu anúncio</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Título do Anúncio *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Ex: Toyota Corolla 2020 em excelente estado"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Preço (Kz)</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="5.000.000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Contacto *</label>
                                <input
                                    type="tel"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="+244 9XX XXX XXX"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Província</label>
                                <select
                                    value={formData.province}
                                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                >
                                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Município</label>
                                <input
                                    type="text"
                                    value={formData.municipality}
                                    onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Talatona"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Descrição Detalhada</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none resize-none"
                                placeholder="Descreva o seu produto ou serviço em detalhe..."
                            />
                        </div>

                        {/* Preview Summary */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-6">
                            <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">Resumo</p>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <span className="text-gray-500">Categoria:</span>
                                    <p className="font-bold text-white">{formData.category}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Subcategoria:</span>
                                    <p className="font-bold text-white">{formData.subcategory}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Mídia:</span>
                                    <p className="font-bold text-white">{formData.mediaFiles.length} {formData.mediaType === 'images' ? 'imagens' : 'vídeo'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Localização:</span>
                                    <p className="font-bold text-white">{formData.province}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-8">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="flex-1 bg-surface-dark border border-white/10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-gray-400 active:scale-95 transition-all"
                        >
                            Anterior
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            onClick={nextStep}
                            className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            Continuar
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">send</span>
                            Enviar para Aprovação
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CreateAd;
