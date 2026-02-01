
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MapView: React.FC = () => {
   const navigate = useNavigate();

   return (
      <div className="flex-1 h-screen relative overflow-hidden bg-[#181111]">
         {/* Simulation of a map image */}
         <div
            className="absolute inset-0 bg-cover bg-center grayscale opacity-40 scale-125 rotate-6"
            style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAVo97SazDPFSShTqtyNED3OwKEEwbuZQq9LzQrDSRF_pRoQLi34SBSfZzNKqKIT-h_l7pyqo0v5dVkfZnZVXYAg1kYQQrIDGcTgwBWsGnt887ZD_4JK-IkZD8sjvliNamaVHQu4Ys2jmcpQmufUIvQ7nGbJqsBfjuwRMkVaIvFGWIcG7gBfkUHBI5f4h40yeH2jl_Kmm_GzB-zJ42o6sfmq8-AeSVJTlg55RBMFNHaB5I7VfEurArSP0cVR159B0WxwxIxeZKNXWiD)' }}
         />

         {/* Back Button */}
         <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 z-30 size-11 rounded-2xl bg-surface-dark/90 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl active:scale-95 transition-all"
         >
            <span className="material-symbols-outlined text-white">arrow_back</span>
         </button>

         {/* Map Controls */}
         <div className="absolute top-16 left-0 right-0 p-4 z-20 flex flex-col gap-4">
            <div className="bg-surface-dark/90 backdrop-blur-md rounded-xl flex items-center px-4 h-14 border border-white/10 shadow-2xl">
               <span className="material-symbols-outlined text-accent mr-3">search</span>
               <input className="bg-transparent border-none focus:ring-0 text-white w-full text-sm font-medium" placeholder="Onde você quer ir em Angola?" />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
               {['Tudo', 'Turismo', 'Comer', 'Dormir'].map((cat, i) => (
                  <button key={cat} className={`px-4 py-2 rounded-full text-xs font-bold border ${i === 0 ? 'bg-primary border-primary' : 'bg-surface-dark/80 backdrop-blur border-white/10'}`}>
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <button className="size-12 rounded-full bg-surface-dark/90 backdrop-blur border border-white/10 flex items-center justify-center shadow-2xl">
               <span className="material-symbols-outlined">my_location</span>
            </button>
            <div className="bg-surface-dark/90 backdrop-blur border border-white/10 rounded-full flex flex-col items-center overflow-hidden shadow-2xl">
               <button className="size-12 border-b border-white/10 hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">add</span></button>
               <button className="size-12 hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">remove</span></button>
            </div>
         </div>

         {/* Floating Marker (Selected) */}
         <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10 animate-bounce">
            <div className="size-12 rounded-full bg-primary border-4 border-white shadow-2xl flex items-center justify-center">
               <span className="material-symbols-outlined text-white">fort</span>
            </div>
            <div className="bg-black/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold">Fortaleza de S. Miguel</div>
         </div>

         {/* Location Details Float Card */}
         <div className="absolute bottom-28 left-4 right-4 z-20">
            <div className="bg-surface-dark/90 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl flex gap-4 animate-in slide-in-from-bottom duration-500">
               <div className="size-20 rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBqk7TDtheNmKkGhZHMKwogkZp9RdDMQrSYDhbkjzBJvICpawrQ0VGWRl2z5pBiVd6fV6RD-Onz2lPe1OY1iCI0Ll-nnbocf69UvZWki54be-3_xgv3-NLMeIyYcmq0-UBqgTdFn9d5Ea2M5z0loHZtsKV3ZNug5GYU1j2TFImI1vdTo--DHY3zbiPVKj1YpdRxgl1q7jWG-gxoW96SsPbeIZ34k_GtYAUbu8uyaCc82sMnzkdQhJH8X4AN0W1hvtKzafN754-GqlHf)' }} />
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                     <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Fortaleza de S. Miguel</h3>
                        <span className="text-[10px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded">4.8</span>
                     </div>
                     <p className="text-xs text-gray-400 mt-1">Luanda • Cultura & História</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="flex-1 bg-primary py-2 rounded-lg text-xs font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[16px]">directions</span> Ir</button>
                     <button className="size-8 rounded-lg bg-surface-light flex items-center justify-center border border-white/5"><span className="material-symbols-outlined text-[18px]">bookmark</span></button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MapView;
