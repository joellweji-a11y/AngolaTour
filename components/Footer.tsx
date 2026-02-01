import React from 'react';

interface Partner {
    name: string;
    logo: string;
}

// Lista de patrocinadores configurável
// Usando placeholders por enquanto, mas focados em "empresas angolanas" conceptualmente
const PARTNERS: Partner[] = [
    { name: 'Unitel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Unitel_Logotipo.svg/1200px-Unitel_Logotipo.svg.png' },
    { name: 'Sonangol', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Sonangol_logo.svg/1200px-Sonangol_logo.svg.png' },
    { name: 'BAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Banco_BAI_logo.png' },
    { name: 'TAAG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/TAAG_Angola_Airlines_logo.svg/2560px-TAAG_Angola_Airlines_logo.svg.png' },
    { name: 'Catoca', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4dGqjs7Q6y3Z5q8Zg5f6h_w' }, // Placeholder visual
    { name: 'Africell', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Africell_Logo.svg/1200px-Africell_Logo.svg.png' },
    { name: 'ZAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Zap_logo.png' },
];

export const Footer: React.FC = () => {
    return (
        <footer className="mt-12 overflow-hidden bg-[#1a1a1a] py-10 relative border-t border-white/5">
            <div className="max-w-md mx-auto px-6 mb-8 text-center text-white">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Nossos Parceiros</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">Juntos a construir o turismo</p>
            </div>

            {/* Infinite Slider Container */}
            <div className="relative w-full overflow-hidden">
                {/* Gradients to fade edges */}
                <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[#1a1a1a] to-transparent z-10" />
                <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent z-10" />

                {/* Moving Track */}
                <div className="flex gap-10 w-max animate-slider">
                    {/* Duplicate list to create seamless infinite effect */}
                    {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
                        <div
                            key={`${partner.name}-${idx}`}
                            className="group flex flex-col items-center justify-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        >
                            <div className="h-10 w-24 flex items-center justify-center">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-full max-w-full object-contain brightness-200 contrast-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-300"
                                    onError={(e) => {
                                        // Fallback if image fails
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.innerText = partner.name;
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 text-center px-6">
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-wider">
                    © 2024 Angola Tour. Feito com <span className="text-red-600">❤</span> em Luanda.
                </p>
            </div>

            {/* Inline styles for the specific keyframes since we might not have them in tailwind config */}
            <style>{`
        @keyframes slider {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Move 1/3 of the width (since we tripled the list) */
        }
        .animate-slider {
          animation: slider 20s linear infinite;
        }
        .animate-slider:hover {
          animation-play-state: paused;
        }
      `}</style>
        </footer>
    );
};
