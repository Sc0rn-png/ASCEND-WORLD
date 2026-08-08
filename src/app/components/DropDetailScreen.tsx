import React from 'react';
import { Drop, User } from '../types';

interface DropDetailScreenProps {
  drop: Drop;
  user: User | null;
  onSubscribe: () => void;
}

export const DropDetailScreen: React.FC<DropDetailScreenProps> = ({
  drop,
  user,
  onSubscribe,
}) => {
  const isLive = drop.status === 'live';
  const progressPercent = Math.min(
    100,
    Math.round((drop.currentParticipants / drop.maxParticipants) * 100)
  );

  // Calcul du Cash Prize : 5€ par participation
  const entryFeeContribution = 5;
  const currentCashPrize = drop.currentParticipants * entryFeeContribution;
  const maxCashPrize = drop.maxParticipants * entryFeeContribution;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#111319] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        
        {/* Image & Badges */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900">
          <img
            src={drop.imageUrl}
            alt={drop.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-transparent to-black/40" />

          {/* Numéro de Fichier */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
            <span className="text-xs font-mono font-bold text-neutral-300">
              FILE #{drop.id}
            </span>
          </div>

          {/* Statut Live / Coming Soon */}
          <div className="absolute top-4 right-4">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl border backdrop-blur-md ${
                isLive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                  : 'bg-violet-500/20 text-violet-300 border-violet-500/30'
              }`}
            >
              {isLive ? '● Live' : '⏳ Coming Soon'}
            </span>
          </div>
        </div>

        {/* Détails du Drop */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Categorie & Titre */}
          <div className="space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              {drop.category}
            </p>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {drop.title}
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed pt-2">
              {drop.description}
            </p>
          </div>

          {/* Cartes d'informations (Cash Prize & Disponibilité) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Cash Prize Actuel & Max */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Cash Prize Pool
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-mono font-bold text-cyan-300">
                  €{currentCashPrize}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  / €{maxCashPrize} MAX
                </span>
              </div>
              <p className="text-[10px] text-neutral-400">
                Awarded to the most liked creation
              </p>
            </div>

            {/* Availability */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Availability
              </span>
              <p className="text-xl font-mono font-bold text-white">
                {drop.maxParticipants} slots
              </p>
              <p className="text-[10px] text-neutral-400">
                €5 per entry allocated to cash prize
              </p>
            </div>
          </div>

          {/* Barre de progression des réservations */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-mono text-neutral-400">
              <span>SLOTS CLAIMED</span>
              <span className="text-white font-bold">
                {drop.currentParticipants} / {drop.maxParticipants} ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Prix & Action */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Access Deposit
              </span>
              <span className="text-2xl font-black text-white">
                €{drop.price}
              </span>
            </div>

            <button
              onClick={onSubscribe}
              className="bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {user ? 'CLAIM SLOT' : 'SIGN IN TO UNLOCK'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
