import React, { useState, useEffect } from 'react';

interface HomeScreenProps {
  onExplore: () => void;
}

const DYNAMIC_WORDS = ["PROTOTYPES", "THE ARCHIVE", "LIMITED BATCHES", "THE VAULT"];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onExplore }) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative py-16 sm:py-24 text-center space-y-8 max-w-3xl mx-auto overflow-hidden rounded-3xl border border-white/5 bg-[#0D0E12]/60 backdrop-blur-sm p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
      
      {/* Dynamic Background Video & Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 scale-105 filter grayscale contrast-125"
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-tech-loop-41551-large.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-[#090A0C]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#00FF87]/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-8">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/30 text-[10px] font-mono tracking-widest uppercase text-[#00FF87]">
          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
          Season 01 // Global Protocol
        </div>

        {/* Animated Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          CO-CREATE & SHAPE <br />
          <span className="text-[#00FF87] transition-all duration-500 block mt-2 h-[1.2em]">
            {DYNAMIC_WORDS[wordIndex]}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-neutral-400 text-xs sm:text-sm font-mono leading-relaxed max-w-lg mx-auto">
          Claim physical prototype allocations, influence production votes in the Gallery, and gain permanent vault status.
        </p>

        {/* Action Button */}
        <button
          onClick={onExplore}
          className="bg-[#00FF87] hover:bg-[#00E077] text-black font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(0,255,135,0.25)] active:scale-95"
        >
          Explore Live Drops →
        </button>
      </div>

    </div>
  );
};
