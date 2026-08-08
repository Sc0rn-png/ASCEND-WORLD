import React, { useState, useEffect } from 'react';

interface HomeScreenProps {
  onExplore: () => void;
}

const ACTION_PHRASES = [
  "GET REWARDED.",
  "GET DISCOVERED.",
  "GET ELEVATED.",
  "GET INSPIRED."
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onExplore }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTION_PHRASES.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      
      {/* Background Anime en Pure CSS (Aura Lumineuse en Mouvement) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-cyan-500/15 blur-[120px] rounded-full animate-bounce duration-[10000ms]" />
      </div>

      {/* Contenu Flottant */}
      <div className="relative z-10 max-w-3xl space-y-8">
        
        {/* Badge Saisonnier */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-violet-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Season 01 // Creative Ecosystem
        </div>

        {/* Headline avec Titre Animé (Police & Couleur Exactes) */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          CREATE, SHARE & <br />
          <span 
            className={`text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 transition-all duration-300 block mt-3 h-[1.2em] ${
              fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {ACTION_PHRASES[index]}
          </span>
        </h1>

        {/* Description */}
        <p className="text-neutral-300 text-sm sm:text-base font-normal leading-relaxed max-w-xl mx-auto">
          Explore new ways to approach art, showcase your work to the world, and earn rewards as your creations resonate with the community.
        </p>

        {/* Bouton d'Action */}
        <button
          onClick={onExplore}
          className="bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-95"
        >
          Explore Gallery & Drops →
        </button>
      </div>

    </div>
  );
};
