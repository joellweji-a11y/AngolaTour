
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GalleryImage {
  id: string;
  url: string;
  location: string;
  province: string;
  date: string;
  likes: number;
}

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todas');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
      location: 'Quedas de Kalandula',
      province: 'Malanje',
      date: '12 Out 2024',
      likes: 124
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800',
      location: 'Serra da Leba',
      province: 'Huíla',
      date: '05 Nov 2024',
      likes: 89
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80&w=800',
      location: 'Ilha do Mussulo',
      province: 'Luanda',
      date: '02 Nov 2024',
      likes: 210
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=800',
      location: 'Miradouro da Lua',
      province: 'Luanda',
      date: '28 Out 2024',
      likes: 156
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=800',
      location: 'Fenda da Tundavala',
      province: 'Huíla',
      date: '15 Out 2024',
      likes: 92
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
      location: 'Baía de Luanda',
      province: 'Luanda',
      date: '10 Nov 2024',
      likes: 342
    },
  ];

  const filtered = filter === 'Todas' ? images : images.filter(img => img.province === filter);

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark">
      {/* Dynamic Header */}
      <header className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-xl z-30">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center">
            <h2 className="text-lg font-black text-white leading-none">Minha Galeria</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">84 Momentos Salvos</p>
        </div>
        <button className="size-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white">add_a_photo</span>
        </button>
      </header>

      {/* Album Filters */}
      <div className="px-6 flex gap-3 overflow-x-auto no-scrollbar py-6">
        {['Todas', 'Luanda', 'Huíla', 'Malanje', 'Namibe'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              filter === f ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30' : 'bg-surface-dark border-white/5 text-gray-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="px-6 columns-2 gap-4 space-y-4">
        {filtered.map((img) => (
          <div 
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className="relative rounded-[24px] overflow-hidden group cursor-pointer border border-white/5 shadow-2xl animate-in fade-in zoom-in duration-500"
          >
            <img 
              src={img.url} 
              alt={img.location} 
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
               <p className="text-[10px] font-black text-white truncate">{img.location}</p>
               <div className="flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-[12px] text-primary">favorite</span>
                  <span className="text-[8px] font-bold text-gray-300">{img.likes}</span>
               </div>
            </div>

            {/* Location Badge */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[8px] font-bold text-white uppercase">{img.province}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Expanded View */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background-dark/95 backdrop-blur-2xl animate-in fade-in duration-300">
           <button 
             onClick={() => setSelectedImage(null)}
             className="absolute top-12 right-6 size-12 rounded-full bg-white/10 flex items-center justify-center text-white"
           >
              <span className="material-symbols-outlined">close</span>
           </button>

           <div className="w-full max-w-md">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                 <img src={selectedImage.url} alt={selectedImage.location} className="w-full aspect-[3/4] object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                 
                 <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">{selectedImage.province}</span>
                       <span className="text-gray-400 text-xs font-bold">{selectedImage.date}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">{selectedImage.location}</h3>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">favorite</span>
                          <span className="text-sm font-bold text-white">{selectedImage.likes} Likes</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-gray-400">share</span>
                          <span className="text-sm font-bold text-white">Partilhar</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 flex gap-4">
                 <button className="flex-1 bg-surface-dark border border-white/5 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-primary">download</span> Baixar Original
                 </button>
                 <button className="size-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">delete</span>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
          <div className="py-32 flex flex-col items-center opacity-20 text-center">
             <span className="material-symbols-outlined text-8xl mb-4">image_not_supported</span>
             <p className="font-black text-xl">Sem memórias aqui ainda</p>
             <p className="text-sm">Comece a explorar {filter} e tire fotos!</p>
          </div>
      )}
    </div>
  );
};

export default Gallery;
