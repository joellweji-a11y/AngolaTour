
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PendingAd {
    id: string;
    title: string;
    category: string;
    subcategory: string;
    price: string;
    province: string;
    mediaType: 'images' | 'video';
    mediaPreview: string[];
    status: string;
    createdAt: string;
    userId: string;
}

const AdminAdsReview: React.FC = () => {
    const navigate = useNavigate();
    const [pendingAds, setPendingAds] = useState<PendingAd[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

    useEffect(() => {
        const ads = JSON.parse(localStorage.getItem('at_pending_ads') || '[]');
        setPendingAds(ads);
    }, []);

    const filteredAds = filter === 'all'
        ? pendingAds
        : pendingAds.filter(ad => ad.status === filter);

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Venda de Veículos': 'directions_car',
            'Aluguer de Quartos': 'apartment',
            'Serviços Turísticos': 'tour',
            'Eventos': 'celebration',
            'Restauração': 'restaurant',
            'Artesanato & Arte': 'palette',
            'Emprego & Trabalho': 'work',
            'Electrónica': 'devices',
            'Moda & Beleza': 'checkroom',
            'Outros Serviços': 'handyman'
        };
        return icons[category] || 'category';
    };

    return (
        <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen">
            <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </button>
                <div className="flex-1">
                    <h1 className="text-xl font-black text-white italic">Anúncios Pendentes</h1>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-0.5">Painel de Moderação</p>
                </div>
                <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative">
                    <span className="material-symbols-outlined text-lg">ads_click</span>
                    {pendingAds.filter(a => a.status === 'pending').length > 0 && (
                        <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[9px] flex items-center justify-center rounded-full font-black">
                            {pendingAds.filter(a => a.status === 'pending').length}
                        </span>
                    )}
                </div>
            </header>

            {/* Filter Tabs */}
            <div className="px-6 py-4">
                <div className="flex bg-surface-dark p-1 rounded-2xl border border-white/5 shadow-inner">
                    {[
                        { id: 'pending', label: 'Pendentes', count: pendingAds.filter(a => a.status === 'pending').length },
                        { id: 'approved', label: 'Aprovados', count: pendingAds.filter(a => a.status === 'approved').length },
                        { id: 'rejected', label: 'Rejeitados', count: pendingAds.filter(a => a.status === 'rejected').length },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id as any)}
                            className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === tab.id
                                    ? tab.id === 'pending' ? 'bg-accent text-black shadow-lg'
                                        : tab.id === 'approved' ? 'bg-green-500 text-white shadow-lg'
                                            : 'bg-red-500 text-white shadow-lg'
                                    : 'text-gray-500'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>
            </div>

            <main className="p-6 space-y-4">
                {filteredAds.length === 0 ? (
                    <div className="py-20 flex flex-col items-center opacity-30 text-center">
                        <span className="material-symbols-outlined text-7xl mb-4">inbox</span>
                        <p className="font-black text-lg uppercase tracking-widest">Sem anúncios</p>
                        <p className="text-xs font-bold mt-1">Nenhum anúncio {filter === 'pending' ? 'pendente' : filter === 'approved' ? 'aprovado' : 'rejeitado'} de momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredAds.map(ad => (
                            <div
                                key={ad.id}
                                className={`bg-surface-dark/50 border rounded-[28px] overflow-hidden shadow-xl ${ad.status === 'pending' ? 'border-accent/30'
                                        : ad.status === 'approved' ? 'border-green-500/30'
                                            : 'border-red-500/30'
                                    }`}
                            >
                                {/* Media Preview */}
                                <div className="relative h-40 w-full">
                                    {ad.mediaType === 'images' && ad.mediaPreview[0] ? (
                                        <img src={ad.mediaPreview[0]} alt={ad.title} className="w-full h-full object-cover" />
                                    ) : ad.mediaType === 'video' && ad.mediaPreview[0] ? (
                                        <video src={ad.mediaPreview[0]} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-surface-dark flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-600 text-4xl">image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Status Badge */}
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg ${ad.status === 'pending' ? 'bg-accent/20 text-accent'
                                            : ad.status === 'approved' ? 'bg-green-500/20 text-green-500'
                                                : 'bg-red-500/20 text-red-500'
                                        }`}>
                                        <span className="text-[9px] font-black uppercase tracking-widest">
                                            {ad.status === 'pending' ? 'Pendente' : ad.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                                        </span>
                                    </div>

                                    {/* Media Count */}
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                        <span className="material-symbols-outlined text-white text-sm">
                                            {ad.mediaType === 'images' ? 'photo_library' : 'videocam'}
                                        </span>
                                        <span className="text-[10px] font-bold text-white">{ad.mediaPreview.length}</span>
                                    </div>

                                    {/* Title */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-lg font-black text-white leading-tight truncate">{ad.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="material-symbols-outlined text-primary text-sm">{getCategoryIcon(ad.category)}</span>
                                            <span className="text-[10px] text-gray-300 font-bold">{ad.subcategory}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Preço</p>
                                            <p className="text-lg font-black text-accent">{ad.price ? `${ad.price} Kz` : 'A negociar'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Localização</p>
                                            <p className="text-sm font-bold text-white">{ad.province}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        <span>Submetido: {new Date(ad.createdAt).toLocaleDateString('pt-AO')}</span>
                                    </div>

                                    {ad.status === 'pending' && (
                                        <button
                                            onClick={() => navigate(`/admin/ads/review/${ad.id}`)}
                                            className="w-full bg-primary text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-lg">visibility</span>
                                            Ver Proposta
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminAdsReview;
