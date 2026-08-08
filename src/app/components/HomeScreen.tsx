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
    <div className="relative min-h-[calc(100vh-70px)] w-full flex flex-col items-center justify-start pt-6 sm:pt-16 text-center px-4 overflow-x-hidden">
      
      {/* Background Anime Plein Écran */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090A0C]">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[90vh] bg-gradient-to-r from-violet-900/30 via-fuchsia-900/25 to-cyan-900/20 blur-[120px] sm:blur-[160px] rounded-full animate-pulse" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[700px] h-[320px] sm:h-[700px] bg-violet-600/20 blur-[120px] sm:blur-[180px] rounded-full animate-bounce duration-[12000ms]" />
        
        <svg
          className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen scale-125"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="smoke-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.008;0.005;0.01;0.008"
                dur="20s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <g filter="url(#smoke-filter)">
            <ellipse cx="50%" cy="35%" rx="65%" ry="45%" fill="url(#paint-grad-1)" className="animate-[pulse_10s_ease-in-out_infinite]" />
          </g>

          <defs>
            <radialGradient id="paint-grad-1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#D946EF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Contenu Principal Responsif */}
      <div className="relative z-10 w-full max-w-4xl space-y-5 sm:space-y-8 mt-1 sm:mt-4 flex flex-col items-center">
        
        {/* Badge Saisonnier */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[9px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest uppercase text-violet-300 backdrop-blur-md max-w-full truncate">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-400 animate-pulse shrink-0" />
          <span className="truncate">Season 01 // Creative Ecosystem</span>
        </div>

        {/* Headline Animé (Résolution du texte coupé) */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-tight sm:leading-none w-full">
          CREATE, SHARE & <br />
          <span className="inline-flex items-center justify-center min-h-[1.3em] w-full mt-1 sm:mt-3">
            <span 
              className={`text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 transition-all duration-300 leading-normal ${
                fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              {ACTION_PHRASES[index]}
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-neutral-300 text-xs sm:text-base font-normal leading-relaxed max-w-xs sm:max-w-xl mx-auto px-2">
          Explore new ways to approach art, showcase your work to the world, and earn rewards as your creations resonate with the community.
        </p>

        {/* Bouton d'Action */}
        <div className="pt-2 w-full sm:w-auto px-4">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-95"
          >
            Explore Gallery & Drops →
          </button>
        </div>
      </div>

    </div>
  );
};
