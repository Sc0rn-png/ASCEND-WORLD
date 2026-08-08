import React from 'react';
import { Drop } from '../types';

interface CatalogScreenProps {
  drops: Drop[];
  onSelectDrop: (id: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ drops, onSelectDrop }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Catalog // Live Feed
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          Active Drops
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drops.map((drop) => {
          const isLive = drop.status === 'live';
          const progressPercent = Math.min(100, Math.round((drop.currentParticipants / drop.maxParticipants) * 100));
          
          // Calcul du Cash Prize (5€ / participant)
          const currentPrize = drop.currentParticipants * 5;
          const maxPrize = drop.maxParticipants * 5;

          return (
            <div
              key={drop.id}
              onClick={() => onSelectDrop(drop.id)}
              className="group cursor-pointer bg-[#111319]/80 hover:bg-[#161922] border border-white/10 hover:border-violet-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={drop.imageUrl}
                    alt={drop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-neutral-300 px-2.5 py-1 rounded-lg border border-white/10">
                      #{drop.id}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg border backdrop-blur-md ${
                      isLive 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.3)]' 
                        : 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                    }`}>
                      {isLive ? '● Live Drop' : '⏳ Coming Soon'}
                    </span>
                  </div>

                  {/* Cash Prize Badge sur l'image */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                    PRIZE: €{currentPrize} / €{maxPrize}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase font-bold">
                    {drop.category}
                  </span>
                  <h3 className="text-xl font-black tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                    {drop.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {drop.description}
                  </p>
                </div>
              </div>

              {/* Progress & Bottom Bar */}
              <div className="p-5 pt-0 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>SLOTS CLAIMED: <strong className="text-white">{drop.currentParticipants} / {drop.maxParticipants}</strong></span>
                    <span className="text-cyan-400 font-bold">{progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isLive 
                          ? 'bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
                          : 'bg-neutral-600'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="block text-[9px] font-mono text-neutral-400 uppercase">Access Deposit</span>
                    <span className="text-lg font-black text-white">€{drop.price}</span>
                  </div>
                  <button className="py-2.5 px-5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white text-black group-hover:bg-cyan-400 transition-all border border-white/10 shadow-md">
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
