
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EmergencyService {
    id: string;
    name: string;
    number: string;
    description: string;
    icon: string;
    color: string;
    bgColor: string;
}

const emergencyServices: EmergencyService[] = [
    {
        id: 'police',
        name: 'Polícia Nacional',
        number: '113',
        description: 'Para situações de crime ou ordem pública.',
        icon: 'shield',
        color: 'text-blue-400',
        bgColor: 'from-blue-500/20 to-blue-600/5'
    },
    {
        id: 'medical',
        name: 'Emergência Médica / INEMA',
        number: '112',
        description: 'Assistência médica urgente e ambulâncias.',
        icon: 'emergency',
        color: 'text-red-400',
        bgColor: 'from-red-500/20 to-red-600/5'
    },
    {
        id: 'ambulance',
        name: 'Linha de Saúde',
        number: '116',
        description: 'Atendimento médico e orientação em saúde.',
        icon: 'local_hospital',
        color: 'text-green-400',
        bgColor: 'from-green-500/20 to-green-600/5'
    },
    {
        id: 'fire',
        name: 'Proteção Civil e Bombeiros',
        number: '115',
        description: 'Incêndios, inundações e resgates.',
        icon: 'local_fire_department',
        color: 'text-orange-400',
        bgColor: 'from-orange-500/20 to-orange-600/5'
    },
    {
        id: 'sic',
        name: 'SIC - Serviço de Investigação Criminal',
        number: '116',
        description: 'Denúncias e apoio investigativo.',
        icon: 'policy',
        color: 'text-purple-400',
        bgColor: 'from-purple-500/20 to-purple-600/5'
    }
];

const SOSPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const handleCall = (number: string) => {
        window.location.href = `tel:${number}`;
    };

    // Obter contacto de emergência do perfil do utilizador
    const getEmergencyContact = (): string | null => {
        const session = localStorage.getItem('at_user_session');
        if (session) {
            const user = JSON.parse(session);
            return user.emergencyContact || null;
        }
        return null;
    };

    // Handler para botão de pânico com geolocalização
    const handlePanicButton = async () => {
        setIsLoadingLocation(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError('Geolocalização não suportada neste dispositivo.');
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

                // Construir mensagem de emergência
                const message = encodeURIComponent(
                    `EMERGÊNCIA: Estou no AngolaTour e preciso de ajuda. Minha localização atual: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}. Link: ${mapsLink}`
                );

                // Obter contacto de emergência
                const emergencyContact = getEmergencyContact();

                // Criar link SMS
                const smsLink = emergencyContact
                    ? `sms:${emergencyContact}?body=${message}`
                    : `sms:?body=${message}`;

                setIsLoadingLocation(false);

                // Abrir app de SMS
                window.location.href = smsLink;
            },
            (error) => {
                setIsLoadingLocation(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError('Permissão de localização negada. Ative nas configurações.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError('Localização indisponível. Tente novamente.');
                        break;
                    case error.TIMEOUT:
                        setLocationError('Tempo esgotado. Tente novamente.');
                        break;
                    default:
                        setLocationError('Erro ao obter localização.');
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className="flex-1 pb-48 overflow-y-auto no-scrollbar bg-background-dark dark:bg-background-dark min-h-screen">
            {/* Header com Urgência Visual */}
            <header className="p-6 pt-12 sticky top-0 z-50 bg-background-dark/90 dark:bg-background-dark/90 backdrop-blur-xl border-b border-red-500/20">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="size-11 rounded-2xl bg-surface-dark dark:bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined text-white">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-white dark:text-white italic flex items-center gap-2">
                            <span className="text-red-500">SOS</span> Emergência
                        </h1>
                        <p className="text-[10px] text-red-400 dark:text-red-400 font-black uppercase tracking-widest mt-0.5">
                            Serviços de Emergência Angola
                        </p>
                    </div>
                </div>

                {/* Alert Banner */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-red-500/20 flex items-center justify-center animate-pulse">
                        <span className="material-symbols-outlined text-red-500">warning</span>
                    </div>
                    <p className="text-xs text-red-200 dark:text-red-200 font-bold flex-1">
                        Toca no número para ligar diretamente. Use apenas em situações de emergência real.
                    </p>
                </div>
            </header>

            {/* Emergency Services Grid */}
            <main className="p-6 space-y-4">
                {emergencyServices.map((service) => (
                    <div
                        key={service.id}
                        className={`bg-gradient-to-br ${service.bgColor} rounded-[32px] p-6 border border-red-500/10 dark:border-red-500/10 shadow-2xl relative overflow-hidden group`}
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute -right-10 -top-10 size-32 bg-red-500/5 rounded-full blur-3xl" />

                        <div className="flex items-start gap-4 relative z-10">
                            {/* Icon */}
                            <div className={`size-16 rounded-2xl bg-surface-dark dark:bg-surface-dark border border-white/10 flex items-center justify-center shadow-xl ${service.color}`}>
                                <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                            </div>

                            {/* Service Info */}
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-white dark:text-white italic leading-tight">
                                    {service.name}
                                </h3>
                                <p className="text-xs text-gray-400 dark:text-gray-400 font-medium mt-1 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Phone Number - Large & Clickable */}
                                <button
                                    onClick={() => handleCall(service.number)}
                                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-2xl font-black text-xl flex items-center gap-3 shadow-xl shadow-red-500/30 active:scale-95 transition-all group"
                                >
                                    <span className="material-symbols-outlined text-2xl group-active:animate-ping">call</span>
                                    <span className="tracking-wider">{service.number}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Additional Info Card */}
                <div className="mt-8 bg-surface-dark/50 dark:bg-surface-dark/50 border border-white/5 rounded-[32px] p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-accent">info</span>
                        <h4 className="text-sm font-black text-white dark:text-white uppercase tracking-widest">Informação Importante</h4>
                    </div>
                    <ul className="space-y-3 text-xs text-gray-400 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm text-green-500 mt-0.5">check_circle</span>
                            <span>Mantenha a calma e forneça informações claras.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm text-green-500 mt-0.5">check_circle</span>
                            <span>Informe a sua localização exata e o tipo de emergência.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm text-green-500 mt-0.5">check_circle</span>
                            <span>Não desligue a chamada até receber instruções.</span>
                        </li>
                    </ul>
                </div>

                {/* Embassy Contact Hint */}
                <div className="mt-4 text-center opacity-40">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        Para turistas: Contacte também a sua embaixada
                    </p>
                </div>
            </main>

            {/* Floating Panic Button */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 pb-10 z-50 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent">
                {locationError && (
                    <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 mb-4 flex items-center gap-2 animate-in fade-in">
                        <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                        <p className="text-xs text-red-300 font-bold">{locationError}</p>
                    </div>
                )}

                <button
                    onClick={handlePanicButton}
                    disabled={isLoadingLocation}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-red-500/40 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-80 disabled:cursor-wait border-2 border-red-400/30"
                >
                    {isLoadingLocation ? (
                        <>
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>A carregar localização...</span>
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-2xl animate-pulse">sos</span>
                            <span>Enviar Localização de Emergência</span>
                        </>
                    )}
                </button>

                <p className="text-[9px] text-gray-500 text-center mt-3 font-bold uppercase tracking-widest">
                    {getEmergencyContact()
                        ? `Enviará SMS para: ${getEmergencyContact()}`
                        : 'Configure o contacto de emergência no seu perfil'
                    }
                </p>
            </div>
        </div>
    );
};

export default SOSPage;

