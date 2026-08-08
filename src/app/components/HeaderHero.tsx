import React from 'react';

export default function HeaderHero() {
  return (
    <div className="w-full min-h-screen bg-[#090A0C] text-white font-sans pb-12 overflow-x-hidden">
      {/* FIXED HEADER: Header responsive avec alignement propre */}
      <header className="sticky top-0 z-50 bg-[#090A0C]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-2">
        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-cyan-500/30 shrink-0">
          Drop #001
        </span>

        {/* Centered ASCEND WORLD Logo */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-black text-base sm:text-2xl md:text-3xl tracking-tighter leading-none uppercase text-white">
            ASCEND
          </h1>
          <span className="text-[8px] sm:text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-violet-400">
            - WORLD -
          </span>
        </div>

        <button className="bg-white hover:bg-neutral-200 text-black font-black text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.2)] shrink-0">
          Connect
        </button>
      </header>

      {/* HERO SECTION: Carte centrale parfaitement adaptée aux mobiles */}
      <main className="max-w-xl mx-auto px-4 pt-6 sm:pt-8">
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-5 sm:space-y-6">

          {/* Status Badge */}
          <div className="flex justify-between items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-cyan-300 bg-cyan-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-cyan-500/30 uppercase flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Live — Limited Spots
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-400 uppercase truncate">
              Founder Edition
            </span>
          </div>

          {/* Product Title */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">
              Custom Kit
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1 leading-tight">
              Tote Bag <br />
              <span className="text-neutral-400">Custom Kit</span>
            </h2>
            <p className="text-xs text-neutral-300 font-normal leading-relaxed mt-2">
              Create your unique product with the exclusive elements included in the kit.
            </p>
          </div>

          {/* Progress / Inventory Gauge */}
          <div className="p-3.5 sm:p-4 bg-[#090A0C] border border-white/5 rounded-xl space-y-2">
            <div className="flex justify-between font-mono text-[11px] sm:text-xs font-bold">
              <span className="text-white">73 RESERVED</span>
              <span className="text-cyan-300">27 REMAINING</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 sm:h-3 bg-black border border-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                style={{ width: '73%' }}
              />
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-[#090A0C] border border-white/5 rounded-xl p-2.5 sm:p-3 text-center">
              <span className="block font-black text-lg sm:text-xl font-mono text-white">73</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Joined</span>
            </div>
            <div className="bg-[#090A0C] border border-white/5 rounded-xl p-2.5 sm:p-3 text-center">
              <span className="block font-black text-lg sm:text-xl font-mono text-cyan-300">27</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Remaining</span>
            </div>
            <div className="bg-[#090A0C] border border-white/5 rounded-xl p-2.5 sm:p-3 text-center">
              <span className="block font-black text-lg sm:text-xl font-mono text-white">500€</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Prize Pool</span>
            </div>
          </div>

          {/* Timer Countdown Blocks */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
            {[
              ['02', 'Days'],
              ['07', 'Hours'],
              ['43', 'Mins'],
              ['15', 'Secs']
            ].map(([val, label]) => (
              <div key={label} className="bg-[#090A0C] text-white rounded-xl p-2 sm:p-2.5 border border-white/5">
                <span className="block font-black text-base sm:text-xl font-mono text-violet-400">{val}</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400 uppercase tracking-wider sm:tracking-widest">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider py-3.5 sm:py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2">
            Join the Drop — 35€ →
          </button>

        </div>
      </main>
    </div>
  );
}
