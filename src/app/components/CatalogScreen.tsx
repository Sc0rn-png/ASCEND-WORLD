import React from 'react';
import { Drop } from '../types';

interface CatalogScreenProps {
  drops: Drop[];
  onSelectDrop: (id: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ drops, onSelectDrop }) => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Catalog // Live Feed</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
            ACTIVE DROPS
          </h2>
        </div>
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Live Allocations
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {drops.map((drop) => {
          const progressPercent = Math.min(100, Math.round((drop.currentParticipants / drop.maxParticipants) * 100));

          return (
            <div 
              key={drop.id} 
              className="group relative bg-[#12141A] rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative w-full h-52 overflow-hidden bg-[#090A0C]">
                <img 
                  src={drop.imageUrl} 
                  alt={drop.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/40 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="text-xs font-mono text-white/80 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                    #{drop.id}
                  </span>
                  <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
                    drop.status === 'live' 
                      ? 'bg-[#00FF87]/20 text-[#00FF87] border-[#00FF87]/40 backdrop-blur-md' 
                      : 'bg-black/60 text-neutral-400 border-white/10 backdrop-blur-md'
                  }`}>
                    {drop.status === 'live' ? '• LIVE DROP' : 'COMING SOON'}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
                    {drop.category}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-white uppercase group-hover:text-neutral-100 transition-colors">
                    {drop.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-2 font-normal leading-relaxed line-clamp-2">
                    {drop.description}
                  </p>

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400 uppercase tracking-wider">
                        Slots Claimed: <strong className="text-white">{drop.currentParticipants}</strong> / {drop.maxParticipants}
                      </span>
                      <span className="text-[#00FF87] font-bold">{progressPercent}%</span>
                    </div>
                    <div className="relative w-full h-2.5 bg-[#090A0C] rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00FF87]/80 to-[#00FF87] rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Entry Deposit</span>
                    <span className="text-2xl font-black text-white tracking-tight">€{drop.price}</span>
                  </div>

                  <button 
                    onClick={() => onSelectDrop(drop.id)}
                    className="bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_5px_20px_rgba(255,255,255,0.15)]"
                  >
                    View Drop
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogScreen;
