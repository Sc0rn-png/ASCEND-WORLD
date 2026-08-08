import React, { useState, useEffect } from 'react';

interface HomeScreenProps {
  onExplore: () => void;
}

const DYNAMIC_WORDS = [
  "NEW PERSPECTIVES",
  "UNEXPLORED ART",
  "YOUR VISIONS",
  "RAW CREATIVITY"
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onExplore }) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      
      {/* Background Vidéo & Halo Lumineux Violet Flottant (Plein Écran) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-tech-loop-41551-large.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090A0C] via-transparent to-[#090A0C]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/15 blur-[150px] rounded-full pointer-events-none" />
      </div>

      {/* Contenu Flottant */}
      <div className="relative z-10 max-w-3xl space-y-8">
        
        {/* Badge Saisonnier */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-violet-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Season 01 // Creative Ecosystem
        </div>

        {/* Headline Centré sur l'Art */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          CREATE, SHARE & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 transition-all duration-500 block mt-3 h-[1.2em]">
            GET REWARDED.
          </span>
        </h1>

        {/* Description Exacte du Projet */}
        <p className="text-neutral-300 text-sm sm:text-base font-normal leading-relaxed max-w-xl mx-auto">
          Explore new ways to approach art, showcase your work to the world, and earn rewards as your creations resonate with the community.
        </p>

        {/* CTA Violet & Blanc Premium */}
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
