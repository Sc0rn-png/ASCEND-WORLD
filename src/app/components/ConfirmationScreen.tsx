import React from 'react';

interface ConfirmationScreenProps {
  onGoToVoting: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onGoToVoting }) => {
  return (
    <div className="text-center py-12 space-y-4 bg-neutral-800 p-6 rounded-lg border border-neutral-700 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-emerald-400">Paiement validé !</h2>
      <p className="text-sm text-neutral-300">Votre réservation a bien été prise en compte.</p>
      <div className="p-3 bg-neutral-900 inline-block rounded border border-neutral-700 text-xs font-mono text-indigo-300">
        🎉 +100 Points de fidélité ajoutés à votre compte
      </div>
      <div>
        <button 
          onClick={onGoToVoting} 
          className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-sm font-bold transition text-white mt-2"
        >
          Découvrir la galerie et voter
        </button>
      </div>
    </div>
  );
};
