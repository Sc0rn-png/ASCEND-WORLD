import React from 'react';
import { Drop, User } from '../types';

interface DropDetailScreenProps {
  drop: Drop;
  user: User | null;
  onSubscribe: () => void;
}

export const DropDetailScreen: React.FC<DropDetailScreenProps> = ({ drop, user, onSubscribe }) => {
  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="bg-[#12141A] rounded-2xl border border-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-8">
        
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Drop Dossier // #{drop.id}</span>
            <h2 className="text-3xl font-black tracking-tight text-white uppercase mt-1">{drop.title}</h2>
          </div>
          <span className="text-xs font-mono font-bold text-[#00FF87] bg-[#00FF87]/10 px-3 py-1 rounded-full border border-[#00FF87]/20 uppercase">
            {drop.status}
          </span>
        </div>

        <p className="text-sm text-neutral-300 font-normal leading-relaxed">
          {drop.description}
        </p>

        {/* Specifications / Avantages */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl">
            <span className="block text-[10px] font-mono text-neutral-500 uppercase">Dotation Membre</span>
            <span className="text-sm font-bold text-[#00FF87] mt-0.5 block">+500 PTS Fidelité</span>
          </div>
          <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl">
            <span className="block text-[10px] font-mono text-neutral-500 uppercase">Disponibilité</span>
            <span className="text-sm font-bold text-white mt-0.5 block">Série Limitée 100 ex.</span>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-mono text-neutral-500 uppercase">Prix Final</span>
            <span className="text-3xl font-black text-white">{drop.price} €</span>
          </div>

          <button 
            onClick={onSubscribe} 
            className="bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_5px_20px_rgba(255,255,255,0.15)]"
          >
            {user ? "S'inscrire au Drop" : "Se Connecter pour Valider"}
          </button>
        </div>

      </div>
    </div>
  );
};
