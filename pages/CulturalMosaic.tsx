
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Province } from '../types';

export const PROVINCES_DATA: Province[] = [
  {
    id: 'luanda',
    name: 'Luanda',
    capital: 'Luanda',
    ritmo: 'Semba',
    dish: 'Mufete',
    description: 'A capital vibrante, centro económico e cultural de Angola.',
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
    publicServices: [
      { id: 'ps1', name: 'Hospital Josina Machel', type: 'Público', category: 'Saúde', phone: '222 334 455', address: 'Maianga, Luanda' },
      { id: 'ps2', name: 'Comissariado da Ilha', type: 'Público', category: 'Segurança', phone: '113', address: 'Ilha de Luanda' }
    ],
    privateServices: [
      { id: 'pv1', name: 'Sede BAI Talatona', type: 'Privado', category: 'Finanças', phone: '924 100 100', address: 'Talatona' },
      { id: 'pv2', name: 'Unitel Kinaxixi', type: 'Privado', category: 'Comércio', phone: '19191', address: 'Kinaxixi' }
    ]
  },
  {
    id: 'huila',
    name: 'Huíla',
    capital: 'Lubango',
    ritmo: 'Mumuíla',
    dish: 'Muamba de Galinha',
    description: 'As terras altas de tirar o fôlego e a famosa Serra da Leba.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    publicServices: [
      { id: 'ps3', name: 'Hospital Central do Lubango', type: 'Público', category: 'Saúde', phone: '261 223 344', address: 'Centro, Lubango' }
    ],
    privateServices: [
      { id: 'pv3', name: 'Banco Sol Lubango', type: 'Privado', category: 'Finanças', phone: '923 000 000', address: 'Av. 4 de Fevereiro' }
    ]
  },
  {
    id: 'malanje',
    name: 'Malanje',
    capital: 'Malanje',
    ritmo: 'Kabetula',
    dish: 'Kizaca',
    description: 'Berço das Quedas de Kalandula e da Palanca Negra Gigante.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
    publicServices: [
      { id: 'ps4', name: 'Comando Regional Malanje', type: 'Público', category: 'Segurança', phone: '113', address: 'Centro de Malanje' }
    ],
    privateServices: [
      { id: 'pv4', name: 'Agência de Turismo Kalandula', type: 'Privado', category: 'Logística', phone: '912 345 678', address: 'Kalandula' }
    ]
  },
  { id: 'benguela', name: 'Benguela', capital: 'Benguela', ritmo: 'Kilapanga', dish: 'Peixe à Benguelense', description: 'As praias mais belas e o Porto de Lobito.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400', publicServices: [], privateServices: [] },
  { id: 'namibe', name: 'Namibe', capital: 'Moçâmedes', ritmo: 'Kuvale', dish: 'Marisco fresco', description: 'Onde o deserto encontra o mar.', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400', publicServices: [], privateServices: [] },
  { id: 'cabinda', name: 'Cabinda', capital: 'Cabinda', ritmo: 'Mayeye', dish: 'Saca-Folha', description: 'A riqueza da floresta de Maiombe.', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400', publicServices: [], privateServices: [] },
];

const CulturalMosaic: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = PROVINCES_DATA.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.capital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      <header className="p-6 pt-12 flex flex-col gap-6 sticky top-0 bg-background-dark/90 backdrop-blur-2xl z-40 border-b border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="size-10 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-white/10 flex items-center justify-center text-text-light dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter">Mosaico Cultural</h1>
              <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mt-1">Explora as 18 Províncias</p>
            </div>
          </div>
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
            <span className="material-symbols-outlined text-3xl">hub</span>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar por nome ou capital..."
            className="w-full bg-surface-dark/50 border border-white/10 rounded-2xl py-4 px-12 text-sm text-white focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
        </div>
      </header>

      <div className="p-6 grid grid-cols-1 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/province/${p.id}`)}
            className="group relative h-80 rounded-[40px] overflow-hidden cursor-pointer shadow-2xl border border-white/5 active:scale-[0.98] transition-all"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110 brightness-[0.7] group-hover:brightness-100"
              style={{ backgroundImage: `url(${p.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                {p.capital}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-4xl font-black text-white leading-none mb-3 italic transform group-hover:-translate-y-1 transition-transform">{p.name}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[14px]">music_note</span>
                  <span className="text-[10px] font-bold text-gray-200">{p.ritmo}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-accent text-[14px]">restaurant</span>
                  <span className="text-[10px] font-bold text-gray-200">{p.dish}</span>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white">arrow_forward</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center opacity-30 text-center">
            <span className="material-symbols-outlined text-7xl mb-4 text-gray-500">explore_off</span>
            <p className="font-black text-lg uppercase tracking-widest">Nenhuma província encontrada</p>
            <p className="text-xs font-bold mt-2">Tenta pesquisar por Benguela ou Huambo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalMosaic;
