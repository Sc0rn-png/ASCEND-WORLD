import React from 'react';
import { Drop } from '../types';

interface CatalogScreenProps {
  drops: Drop[];
  onSelectDrop: (id: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ drops, onSelectDrop }) => {
  return (
    <div className="space-y-10">
      
      {/* En-tête de section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Catalog // Live Feed</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
            DROPS EN COURS
          </h2>
        </div>
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Mise à jour en temps réel
        </div>
      </div>
      
      {/* Grille de cartes de Drops */}
      <div className="grid gap-8 md:grid-cols-2">
        {drops.map((drop) => (
          <div 
            key={drop.id} 
            className="group relative bg-[#12141A] rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:-translate-y-1 overflow-hidden"
          >
            {/* Ligne lumineuse au survol */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              {/* Badge de statut et ID */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs font-mono text-neutral-500 tracking-wider">#{drop.id}</span>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
                  drop.status === 'live' 
                    ? 'bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/30 shadow-[0_0_15px_rgba(0,255,135,0.15)]' 
                    : 'bg-white/5 text-neutral-400 border-white/10'
                }`}>
                  {drop.status === 'live' ? '• LIVE' : 'SOON'}
                </span>
              </div>

              {/* Titre du projet */}
              <h3 className="text-2xl font-black tracking-tight text-white uppercase group-hover:text-neutral-100 transition-colors">
                {drop.title}
              </h3>
              
              <p className="text-sm text-neutral-400 mt-2 font-normal leading-relaxed">
                {drop.description}
              </p>

              {/* Barre de progression métallique avec gain vert */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-500 uppercase tracking-wider">Progression de l'objectif</span>
                  <span className="text-[#00FF87] font-bold">78%</span>
                </div>
                
                {/* Progress bar active */}
                <div className="relative w-full h-2.5 bg-[#090A0C] rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00FF87]/80 to-[#00FF87] rounded-full transition-all duration-1000 relative overflow-hidden"
                    style={{ width: '78%' }}
                  >
                    {/* Effet de brillance mouvante sur la jauge */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pied de carte : Prix & Bouton Physique */}
            <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Accès Prioritaire</span>
                <span className="text-2xl font-black text-white tracking-tight">{drop.price} €</span>
              </div>

              <button 
                onClick={() => onSelectDrop(drop.id)}
                className="relative bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_5px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.25)]"
              >
                Débloquer
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
