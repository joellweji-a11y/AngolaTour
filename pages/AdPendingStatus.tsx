
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdPendingStatus: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen flex flex-col">
            <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-black text-white italic">Estado do Anúncio</h1>
                    <p className="text-[10px] text-accent font-black uppercase tracking-widest mt-0.5">Em Revisão</p>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                {/* Success Animation */}
                <div className="relative mb-8">
                    <div className="size-32 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
                        <div className="size-24 rounded-full bg-accent/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-accent text-5xl">hourglass_top</span>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 size-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                        <span className="material-symbols-outlined text-white text-xl">check</span>
                    </div>
                </div>

                <h2 className="text-3xl font-black text-white italic mb-4">Anúncio Submetido!</h2>

                <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
                    O seu anúncio foi enviado para a equipa de moderação do AngolaTour.
                    Receberá uma notificação assim que for aprovado.
                </p>

                {/* Status Timeline */}
                <div className="w-full max-w-sm bg-surface-dark/50 border border-white/5 rounded-[32px] p-6 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-lg">check</span>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-bold text-white">Anúncio Criado</p>
                                <p className="text-[10px] text-gray-500">Agora mesmo</p>
                            </div>
                        </div>

                        <div className="ml-5 border-l-2 border-dashed border-accent/30 h-6" />

                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center animate-pulse">
                                <span className="material-symbols-outlined text-accent text-lg">pending</span>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-bold text-accent">Em Revisão</p>
                                <p className="text-[10px] text-gray-500">Aguardando moderador</p>
                            </div>
                        </div>

                        <div className="ml-5 border-l-2 border-dashed border-white/10 h-6" />

                        <div className="flex items-center gap-4 opacity-40">
                            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-500 text-lg">public</span>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-bold text-gray-500">Publicado</p>
                                <p className="text-[10px] text-gray-600">Visível para todos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="w-full max-w-sm bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-400 mt-0.5">info</span>
                        <p className="text-xs text-blue-300 text-left leading-relaxed">
                            O tempo médio de aprovação é de 24 a 48 horas úteis. Anúncios com conteúdo claro e imagens de qualidade são aprovados mais rapidamente.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full max-w-sm space-y-3">
                    <button
                        onClick={() => navigate('/ads/create')}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        Criar Outro Anúncio
                    </button>

                    <button
                        onClick={() => navigate('/home')}
                        className="w-full bg-surface-dark border border-white/10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-gray-400 active:scale-95 transition-all"
                    >
                        Voltar ao Início
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AdPendingStatus;
