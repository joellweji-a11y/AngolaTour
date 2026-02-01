
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EstablishmentData {
    name: string;
    phone: string;
    email: string;
    address: string;
    openTime: string;
    closeTime: string;
    workDays: string[];
}

const EstablishmentSettings: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [notifications, setNotifications] = useState(true);
    const [autoConfirm, setAutoConfirm] = useState(false);
    const [showEditModal, setShowEditModal] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    const [establishment, setEstablishment] = useState<EstablishmentData>({
        name: 'O Quintal da Tia Maria',
        phone: '+244 923 456 789',
        email: 'contato@quintaltia.ao',
        address: 'Rua da Samba, 123 - Maianga, Luanda',
        openTime: '08:00',
        closeTime: '22:00',
        workDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    });

    // Carregar dados do localStorage
    useEffect(() => {
        const storedData = localStorage.getItem(`at_establishment_${id}`);
        if (storedData) {
            setEstablishment(JSON.parse(storedData));
        }
    }, [id]);

    const saveData = () => {
        localStorage.setItem(`at_establishment_${id}`, JSON.stringify(establishment));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const toggleWorkDay = (day: string) => {
        if (establishment.workDays.includes(day)) {
            setEstablishment({
                ...establishment,
                workDays: establishment.workDays.filter(d => d !== day)
            });
        } else {
            setEstablishment({
                ...establishment,
                workDays: [...establishment.workDays, day]
            });
        }
    };

    const allDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

    return (
        <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen">
            <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-black text-white italic">Definições</h1>
                    <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mt-0.5">Estabelecimento #{id}</p>
                </div>
            </header>

            <main className="p-6 space-y-8">
                {/* Quick Toggles */}
                <section className="bg-surface-dark/50 border border-white/5 rounded-[32px] p-6 space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-orange-400">notifications</span>
                            <span className="text-sm font-bold text-gray-200">Notificações de Reserva</span>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${notifications ? 'bg-primary shadow-[0_0_10px_#f20d0d50]' : 'bg-gray-800'}`}
                        >
                            <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-green-400">check_circle</span>
                            <span className="text-sm font-bold text-gray-200">Confirmar Reservas Automático</span>
                        </div>
                        <button
                            onClick={() => setAutoConfirm(!autoConfirm)}
                            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${autoConfirm ? 'bg-primary shadow-[0_0_10px_#f20d0d50]' : 'bg-gray-800'}`}
                        >
                            <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${autoConfirm ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>
                </section>

                {/* Informações do Estabelecimento */}
                <section className="bg-surface-dark/50 border border-white/5 rounded-[32px] p-6 space-y-5">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-purple-400">store</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Informações do Estabelecimento</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome da Empresa</label>
                            <input
                                type="text"
                                value={establishment.name}
                                onChange={(e) => setEstablishment({ ...establishment, name: e.target.value })}
                                className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Telefone</label>
                                <input
                                    type="tel"
                                    value={establishment.phone}
                                    onChange={(e) => setEstablishment({ ...establishment, phone: e.target.value })}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email</label>
                                <input
                                    type="email"
                                    value={establishment.email}
                                    onChange={(e) => setEstablishment({ ...establishment, email: e.target.value })}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Endereço</label>
                            <input
                                type="text"
                                value={establishment.address}
                                onChange={(e) => setEstablishment({ ...establishment, address: e.target.value })}
                                className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Horário de Funcionamento */}
                <section className="bg-surface-dark/50 border border-white/5 rounded-[32px] p-6 space-y-5">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-blue-400">schedule</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Horário de Funcionamento</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Abertura</label>
                            <input
                                type="time"
                                value={establishment.openTime}
                                onChange={(e) => setEstablishment({ ...establishment, openTime: e.target.value })}
                                className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Fecho</label>
                            <input
                                type="time"
                                value={establishment.closeTime}
                                onChange={(e) => setEstablishment({ ...establishment, closeTime: e.target.value })}
                                className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Dias de Funcionamento</label>
                        <div className="flex gap-2">
                            {allDays.map(day => (
                                <button
                                    key={day}
                                    onClick={() => toggleWorkDay(day)}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${establishment.workDays.includes(day)
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'bg-background-dark border border-white/10 text-gray-500'
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Botão Salvar */}
                <button
                    onClick={saveData}
                    className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all ${saved
                            ? 'bg-green-500 shadow-green-500/20'
                            : 'bg-purple-500 shadow-purple-500/20'
                        }`}
                >
                    {saved ? '✓ ALTERAÇÕES SALVAS' : 'SALVAR DEFINIÇÕES'}
                </button>

                {/* Danger Zone */}
                <section className="bg-red-500/5 border border-red-500/20 rounded-[32px] p-6">
                    <h3 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4">Zona de Perigo</h3>
                    <button className="w-full bg-red-500/10 border border-red-500/30 p-4 rounded-2xl text-red-500 text-sm font-bold uppercase tracking-widest active:scale-95 transition-all">
                        Desativar Estabelecimento
                    </button>
                </section>
            </main>
        </div>
    );
};

export default EstablishmentSettings;
