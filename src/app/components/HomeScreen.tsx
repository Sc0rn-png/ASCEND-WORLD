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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden bg-[#090A0C]">
      
      {/* Dynamic Animated Paint & Smoke Background (Full Bleed) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Layer 1: Animated Fluid Paint Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/30 via-fuchsia-500/20 to-cyan-400/20 rounded-full blur-[120px] animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/25 via-purple-500/20 to-pink-500/15 rounded-full blur-[140px] animate-[pulse_8s_ease-in-out_infinite]" />
        
        {/* Layer 2: Animated Organic Smoke & Wave Texture (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen scale-110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="smoke-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.012;0.008;0.015;0.012"
                dur="15s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <g filter="url(#smoke-filter)">
            <ellipse cx="50%" cy="40%" rx="45%" ry="35%" fill="url(#paint-grad-1)" className="animate-[pulse_10s_ease-in-out_infinite]" />
            <ellipse cx="40%" cy="60%" rx="35%" ry="25%" fill="url(#paint-grad-2)" className="animate-[pulse_12s_ease-in-out_infinite]" />
          </g>

          <defs>
            <radialGradient id="paint-grad-1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#D946EF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="paint-grad-2">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Overlay Gradients for Smooth Screen Edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-[#090A0C] opacity-80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
      </div>

      {/* Floating Main Content */}
      <div className="relative z-10 max-w-3xl space-y-8">
        
        {/* Badge Saisonnier */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-violet-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Season 01 // Creative Ecosystem
        </div>

        {/* Headline Animé */}
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

        {/* Call to Action */}
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
