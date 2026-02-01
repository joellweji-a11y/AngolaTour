
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface AdData {
    id: string;
    title: string;
    category: string;
    subcategory: string;
    price: string;
    description: string;
    province: string;
    municipality: string;
    contact: string;
    mediaType: 'images' | 'video';
    mediaPreview: string[];
    status: string;
    createdAt: string;
    userId: string;
    rejectionReason?: string;
}

const AdReviewDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ad, setAd] = useState<AdData | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const ads = JSON.parse(localStorage.getItem('at_pending_ads') || '[]');
        const foundAd = ads.find((a: AdData) => a.id === id);
        setAd(foundAd || null);
    }, [id]);

    const handleApprove = () => {
        if (!ad) return;
        setIsProcessing(true);

        setTimeout(() => {
            const ads = JSON.parse(localStorage.getItem('at_pending_ads') || '[]');
            const updated = ads.map((a: AdData) =>
                a.id === id ? { ...a, status: 'approved' } : a
            );
            localStorage.setItem('at_pending_ads', JSON.stringify(updated));

            // Add to public ads
            const publicAds = JSON.parse(localStorage.getItem('at_public_ads') || '[]');
            publicAds.push({ ...ad, status: 'approved', approvedAt: new Date().toISOString() });
            localStorage.setItem('at_public_ads', JSON.stringify(publicAds));

            setIsProcessing(false);
            alert('Anúncio aprovado e publicado com sucesso!');
            navigate('/admin/ads');
        }, 1000);
    };

    const handleReject = () => {
        if (!ad || !rejectionReason.trim()) {
            alert('Por favor, indique o motivo da rejeição.');
            return;
        }
        setIsProcessing(true);

        setTimeout(() => {
            const ads = JSON.parse(localStorage.getItem('at_pending_ads') || '[]');
            const updated = ads.map((a: AdData) =>
                a.id === id ? { ...a, status: 'rejected', rejectionReason: rejectionReason } : a
            );
            localStorage.setItem('at_pending_ads', JSON.stringify(updated));

            setIsProcessing(false);
            setShowRejectModal(false);
            alert('Anúncio rejeitado. O utilizador será notificado.');
            navigate('/admin/ads');
        }, 1000);
    };

    const nextImage = () => {
        if (ad && ad.mediaPreview.length > 1) {
            setCurrentImageIndex(prev => (prev + 1) % ad.mediaPreview.length);
        }
    };

    const prevImage = () => {
        if (ad && ad.mediaPreview.length > 1) {
            setCurrentImageIndex(prev => prev === 0 ? ad.mediaPreview.length - 1 : prev - 1);
        }
    };

    if (!ad) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-dark min-h-screen">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">search_off</span>
                    <p className="text-gray-500 font-bold">Anúncio não encontrado</p>
                    <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold underline">Voltar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen">
            {/* Header */}
            <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-white">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-white italic">Rever Proposta</h1>
                        <p className="text-[10px] text-accent font-black uppercase tracking-widest mt-0.5">ID: {ad.id}</p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-lg ${ad.status === 'pending' ? 'bg-accent/20 text-accent'
                    : ad.status === 'approved' ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                    <span className="text-[9px] font-black uppercase tracking-widest">
                        {ad.status === 'pending' ? 'Pendente' : ad.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                    </span>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Media Carousel/Player */}
                <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                    {ad.mediaType === 'images' ? (
                        <>
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={ad.mediaPreview[currentImageIndex]}
                                    alt={`${ad.title} - ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Carousel Arrows */}
                                {ad.mediaPreview.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white active:scale-95 transition-all"
                                        >
                                            <span className="material-symbols-outlined">chevron_left</span>
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white active:scale-95 transition-all"
                                        >
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span className="text-xs font-bold text-white">{currentImageIndex + 1} / {ad.mediaPreview.length}</span>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {ad.mediaPreview.length > 1 && (
                                <div className="flex gap-2 p-4 bg-surface-dark/50 overflow-x-auto no-scrollbar">
                                    {ad.mediaPreview.map((preview, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`shrink-0 size-16 rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === index ? 'border-primary' : 'border-transparent opacity-60'
                                                }`}
                                        >
                                            <img src={preview} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <video
                            src={ad.mediaPreview[0]}
                            controls
                            className="w-full aspect-video object-cover"
                        />
                    )}
                </div>

                {/* Ad Details - Public Preview Style */}
                <div className="bg-surface-dark/50 border border-white/5 rounded-[32px] p-6 space-y-6">
                    {/* Title & Price */}
                    <div>
                        <h2 className="text-2xl font-black text-white italic leading-tight">{ad.title}</h2>
                        <div className="flex items-center gap-3 mt-3">
                            <p className="text-2xl font-black text-accent">{ad.price ? `${ad.price} Kz` : 'A negociar'}</p>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase">{ad.subcategory}</span>
                        </div>
                    </div>

                    {/* Category & Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background-dark rounded-2xl p-4">
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Categoria</p>
                            <p className="text-sm font-bold text-white">{ad.category}</p>
                        </div>
                        <div className="bg-background-dark rounded-2xl p-4">
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Localização</p>
                            <p className="text-sm font-bold text-white">{ad.province}{ad.municipality ? `, ${ad.municipality}` : ''}</p>
                        </div>
                    </div>

                    {/* Description */}
                    {ad.description && (
                        <div>
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Descrição</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{ad.description}</p>
                        </div>
                    )}

                    {/* Contact */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Contacto</p>
                            <p className="text-lg font-black text-white">{ad.contact}</p>
                        </div>
                        <button className="size-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">call</span>
                        </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span>Submetido: {new Date(ad.createdAt).toLocaleDateString('pt-AO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">person</span>
                            <span>{ad.userId}</span>
                        </div>
                    </div>
                </div>

                {/* Decision Buttons */}
                {ad.status === 'pending' && (
                    <div className="space-y-3 pt-4">
                        <button
                            onClick={handleApprove}
                            disabled={isProcessing}
                            className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-xl">check_circle</span>
                                    Aceitar Anúncio
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => setShowRejectModal(true)}
                            disabled={isProcessing}
                            className="w-full bg-red-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-red-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-xl">cancel</span>
                            Negar Anúncio
                        </button>
                    </div>
                )}

                {/* If already decided */}
                {ad.status === 'approved' && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
                        <span className="material-symbols-outlined text-green-500 text-4xl mb-2">verified</span>
                        <p className="text-green-500 font-black uppercase tracking-widest">Anúncio Aprovado</p>
                        <p className="text-xs text-gray-500 mt-2">Este anúncio está agora visível para o público.</p>
                    </div>
                )}

                {ad.status === 'rejected' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="material-symbols-outlined text-red-500 text-2xl">block</span>
                            <p className="text-red-500 font-black uppercase tracking-widest">Anúncio Rejeitado</p>
                        </div>
                        {ad.rejectionReason && (
                            <div className="bg-red-500/5 rounded-xl p-4 mt-3">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Motivo</p>
                                <p className="text-sm text-gray-300">{ad.rejectionReason}</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-surface-dark border border-white/10 rounded-[32px] p-6 w-full max-w-md animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-500 text-xl">feedback</span>
                                </div>
                                <h2 className="text-xl font-black text-white italic">Rejeitar Anúncio</h2>
                            </div>
                            <button onClick={() => setShowRejectModal(false)} className="size-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-400">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-400">
                                Por favor, indique o motivo da rejeição. Esta informação será enviada ao utilizador.
                            </p>

                            {/* Quick Reasons */}
                            <div className="flex flex-wrap gap-2">
                                {['Conteúdo inadequado', 'Imagens de baixa qualidade', 'Informações incompletas', 'Categoria incorreta'].map(reason => (
                                    <button
                                        key={reason}
                                        onClick={() => setRejectionReason(reason)}
                                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${rejectionReason === reason
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/5 text-gray-400 border border-white/10'
                                            }`}
                                    >
                                        {reason}
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                rows={4}
                                className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-red-500 outline-none resize-none"
                                placeholder="Descreva o motivo em detalhe..."
                            />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={isProcessing || !rejectionReason.trim()}
                                className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    'Confirmar'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdReviewDetail;
