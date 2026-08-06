import React from 'react';

interface VotingScreenProps {
  votedIds: string[];
  onVote: (creationId: string) => void;
}

const CREATIONS = [
  { id: 'A01', title: 'Prototype A - Concept Tactical', author: 'Alex' },
  { id: 'A02', title: 'Prototype B - Design Minimalist', author: 'Sarah' },
  { id: 'A03', title: 'Prototype C - Urban Edition', author: 'Lucas' },
];

export const VotingScreen: React.FC<VotingScreenProps> = ({ votedIds, onVote }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Galerie de Vote Community</h2>
        <p className="text-xs text-neutral-400">Chaque vote valide vous rapporte **+10 points de fidélité**.</p>
      </div>

      <div className="space-y-3">
        {CREATIONS.map((item) => {
          const hasVoted = votedIds.includes(item.id);
          return (
            <div key={item.id} className="border border-neutral-700 p-4 rounded-lg bg-neutral-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-neutral-400">Créé par {item.author}</p>
              </div>
              <button 
                onClick={() => onVote(item.id)}
                disabled={hasVoted}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  hasVoted ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {hasVoted ? 'Déjà voté' : 'Voter (+10 pts)'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
