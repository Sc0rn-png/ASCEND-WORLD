import React, { useState, useEffect } from 'react';

const DYNAMIC_WORDS = ["PROTOTYPES", "THE ARCHIVE", "LIMITED BATCHES", "THE FUTURE"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Animation de défilement des mots du slogan
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#090A0C] text-white py-20 px-4">
      
      {/* 1. ARRIÈRE-PLAN VIDÉO & NUAGE D'OMBRE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 scale-105 filter grayscale contrast-125"
          src="https://assets.mixkit.co/videos/preview/mixkit-[#00FF87]-abstract-tech-loop-41551-large.mp4" // Remplace par ton fichier .mp4
        />
        {/* Gradients pour fondre la vidéo dans le design sombre */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/60 to-[#090A0C]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FF87]/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* 2. CONTENU PRINCIPAL */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        
        {/* Badge Saisonnier */}
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#00FF87] bg-[#00FF87]/10 px-4 py-1.5 rounded-full border border-[#00FF87]/30 uppercase">
          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
          SEASON 01 // GLOBAL PROTOCOL
        </div>

        {/* SLOGAN ANIMÉ (ANGLAIS) */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            CO-CREATE & SHAPE <br />
            <span className="text-[#00FF87] transition-all duration-500 block h-[1.2em]">
              {DYNAMIC_WORDS[index]}
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-mono text-neutral-400 leading-relaxed pt-2">
            Claim physical prototype allocations, influence production votes in the Gallery, and gain permanent gallery status.
          </p>
        </div>

        {/* CALL TO ACTION */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="w-full sm:w-auto bg-[#00FF87] hover:bg-[#00E077] text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(0,255,135,0.25)]">
            Explore Live Drops
          </button>
          <button className="w-full sm:w-auto bg-[#12141A] hover:bg-[#1a1d26] text-white font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-xl border border-white/10 transition-all duration-200">
            Enter Gallery
          </button>
        </div>

      </div>
    </section>
  );
}
