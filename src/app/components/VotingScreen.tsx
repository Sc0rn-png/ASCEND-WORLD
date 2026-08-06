import React from 'react';

interface VotingScreenProps {
  votedIds: string[];
  onVote: (creationId: string) => void;
}

const CREATIONS = [
  { id: 'A01', title: 'PROTOTYPE A — CONCEPT TACTICAL', author: 'ALEX' },
  { id: 'A02', title: 'PROTOTYPE B — MINIMALIST EDITION', author: 'SARAH' },
  { id: 'A03', title: 'PROTOTYPE C — URBAN RUNNER', author: 'LUCAS' },
];

export const VotingScreen: React.FC<VotingScreenProps> = ({ votedIds, onVote }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Arène // Community Vote</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
            VOX POPULI
          </h2>
        </div>
        <div className="text-xs font-mono text-neutral-400">
          Chaque vote rapporte <span className="text-[#00FF87] font-bold">+50 PTS</span>
        </div>
      </div>

      <div className="space-y-4">
        {CREATIONS.map((item) => {
          const hasVoted = votedIds.includes(item.id);
          return (
            <div 
              key={item.id} 
              className="bg-[#12141A] rounded-2xl border border-white/10 hover:border-white/20 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Création #{item.id} — Par {item.author}</span>
                <h3 className="text-lg font-black text-white uppercase mt-0.5">{item.title}</h3>
              </div>

              <button 
                onClick={() => onVote(item.id)}
                disabled={hasVoted}
                className={`px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                  hasVoted 
                    ? 'bg-neutral-800 text-neutral-500 border border-white/5 cursor-not-allowed' 
                    : 'bg-[#00FF87] hover:bg-[#00E077] text-black shadow-[0_0_20px_rgba(0,255,135,0.2)]'
                }`}
              >
                {hasVoted ? 'Voté ✓' : 'Voter (+50 PTS)'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
