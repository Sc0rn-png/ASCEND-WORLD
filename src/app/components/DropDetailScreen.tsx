import React from 'react';
import { Drop, User } from '../types';

interface DropDetailScreenProps {
  drop: Drop;
  user: User | null;
  onSubscribe: () => void;
}

export const DropDetailScreen: React.FC<DropDetailScreenProps> = ({ drop, user, onSubscribe }) => {
  return (
    <div className="space-y-4 bg-neutral-800 p-6 rounded-lg border border-neutral-700 max-w-xl mx-auto">
      <span className="text-xs text-indigo-400 font-mono">Détails Projet #{drop.id}</span>
      <h2 className="text-2xl font-bold">{drop.title}</h2>
      <p className="text-sm text-neutral-300">{drop.description}</p>
      
      <div className="pt-4 border-t border-neutral-700 flex justify-between items-center">
        <span className="text-lg font-bold">{drop.price} €</span>
        <button 
          onClick={onSubscribe} 
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded text-sm font-bold transition"
        >
          {user ? "S'inscrire au Drop" : "Se connecter pour s'inscrire"}
        </button>
      </div>
    </div>
  );
};
