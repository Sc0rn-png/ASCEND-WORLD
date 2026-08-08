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
      <div className="bg-[#12141A] rounded-2xl border border-white/10 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative space-y-6">
        
        {/* Banner Image */}
        <div className="relative w-full h-72 bg-[#090A0C]">
          <img 
            src={drop.imageUrl} 
            alt={drop.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-black/40" />
          
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
            <span className="text-xs font-mono text-white/80 backdrop-blur-md bg-black/50 px-3 py-1 rounded-md border border-white/10">
              FILE #{drop.id}
            </span>
            <span className="text-xs font-mono font-bold text-[#00FF87] bg-black/60 px-3 py-1 rounded-full border border-[#00FF87]/30 uppercase backdrop-blur-md">
              {drop.status}
            </span>
          </div>
        </div>

        <div className="p-8 pt-0 space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">{drop.category}</span>
            <h2 className="text-3xl font-black tracking-tight text-white uppercase mt-1">{drop.title}</h2>
          </div>

          <p className="text-sm text-neutral-300 font-normal leading-relaxed">
            {drop.description}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase">Member Reward</span>
              <span className="text-sm font-bold text-[#00FF87] mt-0.5 block">+500 PTS Unlocked</span>
            </div>
            <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase">Availability</span>
              <span className="text-sm font-bold text-white mt-0.5 block">Limited Batch (100 units)</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase">Access Deposit</span>
              <span className="text-3xl font-black text-white">€{drop.price}</span>
            </div>

            <button 
              onClick={onSubscribe} 
              className="bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_5px_20px_rgba(255,255,255,0.15)]"
            >
              {user ? "Claim Access" : "Sign In to Unlock"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DropDetailScreen;
