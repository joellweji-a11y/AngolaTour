
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAIRecommendation } from '../services/geminiService';

interface Landmark {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  facts: string[];
}

const LANDMARKS: Landmark[] = [
  {
    id: 'kalandula',
    name: 'Quedas de Kalandula',
    location: 'Malanje',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600',
    description: 'As segundas maiores quedas de água de África, um espetáculo de força bruta da natureza.',
    facts: ['Altura: 105 metros', 'Largura: 400 metros', 'Rio: Lucala']
  },
  {
    id: 'leba',
    name: 'Serra da Leba',
    location: 'Huíla / Namibe',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600',
    description: 'Uma estrada serpenteante que desafia a gravidade, ligando o planalto central ao deserto.',
    facts: ['Ziguezagues: 56 curvas', 'Altitude: 1.845m', 'Construção: Anos 70']
  },
  {
    id: 'fortaleza',
    name: 'Fortaleza de S. Miguel',
    location: 'Luanda',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqk7TDtheNmKkGhZHMKwogkZp9RdDMQrSYDhbkjzBJvICpawrQ0VGWRl2z5pBiVd6fV6RD-Onz2lPe1OY1iCI0Ll-nnbocf69UvZWki54be-3_xgv3-NLMeIyYcmq0-UBqgTdFn9d5Ea2M5z0loHZtsKV3ZNug5GYU1j2TFImI1vdTo--DHY3zbiPVKj1YpdRxgl1q7jWG-gxoW96SsPbeIZ34k_GtYAUbu8uyaCc82sMnzkdQhJH8X4AN0W1hvtKzafN754-GqlHf',
    description: 'A primeira estrutura defensiva construída em Luanda, hoje o Museu Nacional de História Militar.',
    facts: ['Fundação: 1576', 'Material: Pedra e Cal', 'Património Mundial']
  }
];

const VirtualExperience: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'360' | 'AR'>('360');
  const [activeLandmark, setActiveLandmark] = useState(LANDMARKS[0]);
  const [panPosition, setPanPosition] = useState(50);
  const [showLandmarkMenu, setShowLandmarkMenu] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mode === 'AR') {
      startCamera();
    } else {
      stopCamera();
    }
  }, [mode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao aceder à câmara:", err);
      alert("Permissão de câmara necessária para o modo RA.");
      setMode('360');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handlePan = (e: React.TouchEvent | React.MouseEvent) => {
    if (mode !== '360') return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const percent = (clientX / window.innerWidth) * 100;
    setPanPosition(percent);
  };

  const handleAskAI = async (topic: string) => {
    setAiLoading(true);
    try {
      const response = await getAIRecommendation(`Dê-me uma curiosidade histórica fascinante e pouco conhecida sobre ${activeLandmark.name} em ${activeLandmark.location}.`);
      setAiInsight(response);
    } catch (e) {
      setAiInsight("O guia digital está com dificuldades técnicas. Tente novamente.");
    } finally {
      setAiLoading(false);
    }
  };

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleAskAI("RA Scan");
    }, 3000);
  };

  return (
    <div className="flex-1 h-screen bg-black overflow-hidden relative select-none" onMouseMove={handlePan} onTouchMove={handlePan}>
      {/* Viewport - Virtual 360 */}
      {mode === '360' && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-300 ease-out"
          style={{
            backgroundImage: `url(${activeLandmark.image})`,
            backgroundPosition: `${panPosition}% center`,
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Viewport - AR Camera */}
      {mode === 'AR' && (
        <div className="absolute inset-0">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale-[0.2]" />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

          {/* AR Overlay Grid */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-primary/40" />
            ))}
          </div>

          {/* Scanning Box */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="size-64 border-2 border-primary/40 rounded-[40px] relative">
              <div className="absolute inset-0 border-4 border-primary rounded-[40px] animate-pulse opacity-40" />
              <div className={`absolute top-0 left-0 w-full h-1 bg-primary/80 shadow-[0_0_20px_#f20d0d] transition-all duration-1000 ${isScanning ? 'animate-[scan_2s_infinite]' : 'hidden'}`} />
            </div>
          </div>
        </div>
      )}

      {/* Overlays / UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Top Header */}
      <header className="absolute top-12 left-6 right-6 flex items-center justify-between z-50 pointer-events-auto">
        <button onClick={() => navigate('/home')} className="size-12 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white">
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex gap-1">
          <button
            onClick={() => setMode('360')}
            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === '360' ? 'bg-primary text-white' : 'text-gray-400'}`}
          >
            Tour 360°
          </button>
          <button
            onClick={() => setMode('AR')}
            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'AR' ? 'bg-accent text-black font-black shadow-lg shadow-accent/20' : 'text-gray-400'}`}
          >
            Realidade Aumentada
          </button>
        </div>
      </header>

      {/* Content HUD */}
      <main className="absolute bottom-12 left-6 right-6 z-50 pointer-events-auto space-y-6">
        {/* Landmark Selector (Expands upward) */}
        {showLandmarkMenu && (
          <div className="bg-black/40 backdrop-blur-3xl border border-white/10 p-4 rounded-[32px] space-y-3 animate-in slide-in-from-bottom-4 duration-300">
            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-3">Teletransporte</p>
            {LANDMARKS.map(l => (
              <button
                key={l.id}
                onClick={() => { setActiveLandmark(l); setShowLandmarkMenu(false); setAiInsight(null); }}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${activeLandmark.id === l.id ? 'bg-primary/20 border border-primary/40' : 'bg-white/5 border border-transparent'}`}
              >
                <img src={l.image} className="size-10 rounded-lg object-cover" alt="" />
                <div className="text-left">
                  <h4 className="text-xs font-black text-white italic">{l.name}</h4>
                  <p className="text-[8px] text-gray-500 font-bold uppercase">{l.location}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* AI Insight Box */}
        {aiInsight && (
          <div className="bg-primary/90 backdrop-blur-2xl p-6 rounded-[32px] border border-white/20 animate-in zoom-in-95 duration-500 relative">
            <button onClick={() => setAiInsight(null)} className="absolute top-4 right-4 text-white/50"><span className="material-symbols-outlined text-sm">close</span></button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
              <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none">Angola Tour AI • Guia Imersivo</span>
            </div>
            <p className="text-xs text-white leading-relaxed font-medium italic">
              "{aiInsight}"
            </p>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowLandmarkMenu(!showLandmarkMenu)}
            className="flex-1 bg-surface-dark/80 backdrop-blur-xl border border-white/10 p-5 rounded-[32px] flex items-center justify-between group active:scale-95 transition-all"
          >
            <div className="text-left">
              <h3 className="text-sm font-black text-white italic leading-tight">{activeLandmark.name}</h3>
              <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">location_on</span>
                {activeLandmark.location}
              </p>
            </div>
            <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">expand_less</span>
            </div>
          </button>

          <button
            onClick={mode === 'AR' ? triggerScan : () => handleAskAI("Tour")}
            disabled={aiLoading}
            className={`size-20 shrink-0 rounded-[32px] flex flex-col items-center justify-center transition-all active:scale-90 shadow-2xl ${mode === 'AR' ? 'bg-accent text-black' : 'bg-primary text-white'}`}
          >
            {aiLoading ? (
              <div className="size-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-3xl mb-1">{mode === 'AR' ? 'center_focus_weak' : 'auto_awesome'}</span>
                <span className="text-[8px] font-black uppercase tracking-tighter">{mode === 'AR' ? 'SCAN' : 'DICA IA'}</span>
              </>
            )}
          </button>
        </div>

        {/* Interaction Info */}
        <div className="text-center">
          <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">
            {mode === '360' ? 'Deslize para girar a visualização' : 'Aponte a câmara para o monumento'}
          </p>
        </div>
      </main>

      {/* Style for Scan Animation */}
      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default VirtualExperience;
