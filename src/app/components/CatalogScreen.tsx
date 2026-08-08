import React from 'react';

// Interface flexible pour éviter tout plantage TypeScript/données
export interface Drop {
  id: string;
  title: string;
  price: number;
  description: string;
  status: 'live' | 'coming_soon' | string;
  category: string;
  currentParticipants?: number;
  maxParticipants?: number;
  imageUrl: string;
}

interface CatalogScreenProps {
  drops: Drop[];
  onSelectDrop: (id: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ drops = [], onSelectDrop }) => {
  if (!drops || drops.length === 0) {
    return (
      <div className="text-center py-20 font-mono text-neutral-500">
        NO ACTIVE DROPS FOUND.
      </div>
    );
  }

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
          
          // Sécurisation des valeurs numériques contre undefined / NaN
          const current = drop.currentParticipants ?? 0;
          const max = drop.maxParticipants ?? 100;
          const progressPercent = Math.min(100, Math.round((current / max) * 100));

          const currentPrize = current * 5;
          const maxPrize = max * 5;

          return (
            <div
              key={drop.id}
              onClick={() => onSelectDrop(drop.id)}
              className="group cursor-pointer bg-[#111319]/90 hover:bg-[#161922] border border-white/10 hover:border-violet-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={drop.imageUrl || 'https://via.placeholder.com/600x400'}
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

                  {/* Cash Prize Badge */}
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
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">
                      SLOTS CLAIMED: <strong className="text-white">{current} / {max}</strong>
                    </span>
                    <span className="text-cyan-400 font-bold">{progressPercent}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden border border-white/10 relative">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isLive 
                          ? 'bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]' 
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
