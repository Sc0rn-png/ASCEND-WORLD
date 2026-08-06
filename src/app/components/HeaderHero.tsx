import React from 'react';

export default function HeaderHero() {
  return (
    <div className="w-full min-h-screen bg-[#F4F4F0] text-black font-sans pb-12">
      {/* HEADER FIXE : Logo Centré */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-black px-6 py-4 flex justify-between items-center">
        <span className="font-black text-xs uppercase tracking-widest bg-lime-400 px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
          Drop #001
        </span>
        
        {/* Logo ASCEND WORLD centré */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-black text-2xl md:text-3xl tracking-tighter leading-none uppercase">
            ASCEND
          </h1>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
            - WORLD -
          </span>
        </div>

        <button className="bg-black text-white font-black text-xs uppercase px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#CCFF00] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
          Connect
        </button>
      </header>

      {/* HERO SECTION : Cagnotte & Drop en cours */}
      <main className="max-w-xl mx-auto px-4 pt-8">
        <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          
          {/* Badge de Statut */}
          <div className="flex justify-between items-center mb-4">
            <span className="bg-[#FF4800] text-white font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] animate-pulse">
              ● Live — Places Limitées
            </span>
            <span className="font-black text-xs uppercase tracking-wider text-gray-500">
              Founder Edition
            </span>
          </div>

          {/* Titre Produit / Challenge */}
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2">
            Tote Bag <br />
            <span className="text-stroke text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800">
              Custom Kit
            </span>
          </h2>
          <p className="text-sm font-semibold text-gray-700 mb-6">
            Crée ton produit unique avec les éléments exclusifs du kit.
          </p>

          {/* Cagnotte / Jauge de progression */}
          <div className="bg-[#F4F4F0] border-3 border-black rounded-2xl p-4 mb-6 border-2 border-black">
            <div className="flex justify-between font-black text-sm mb-2">
              <span>73 RÉSERVÉS</span>
              <span className="text-[#FF4800]">27 RESTANTS</span>
            </div>
            {/* Barre de progression Néo-Brutaliste */}
            <div className="w-full h-6 bg-white border-2 border-black rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-lime-400 border-r-2 border-black rounded-full transition-all duration-500" 
                style={{ width: '73%' }}
              />
            </div>
          </div>

          {/* Statistiques Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-yellow-300 border-2 border-black rounded-xl p-3 text-center shadow-[3px_3px_0px_#000]">
              <span className="block font-black text-xl">73</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Rejoints</span>
            </div>
            <div className="bg-pink-300 border-2 border-black rounded-xl p-3 text-center shadow-[3px_3px_0px_#000]">
              <span className="block font-black text-xl">27</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Restants</span>
            </div>
            <div className="bg-cyan-300 border-2 border-black rounded-xl p-3 text-center shadow-[3px_3px_0px_#000]">
              <span className="block font-black text-xl">500€</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Prize Pool</span>
            </div>
          </div>

          {/* Timer Countdown Blocks */}
          <div className="grid grid-cols-4 gap-2 mb-6 text-center">
            {[['02', 'Jours'], ['07', 'Heures'], ['43', 'Min'], ['15', 'Sec']].map(([val, label]) => (
              <div key={label} className="bg-black text-white rounded-xl p-2 border-2 border-black">
                <span className="block font-black text-lg md:text-xl text-lime-400">{val}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>

          {/* Bouton d'Action Principal (CTA) */}
          <button className="w-full bg-lime-400 text-black font-black text-lg uppercase py-4 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] hover:bg-lime-300 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2">
            Rejoindre le Drop — 35€ ➔
          </button>

        </div>
      </main>
    </div>
  );
}
