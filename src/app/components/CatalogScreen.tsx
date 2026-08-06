import React from 'react';
import { Drop } from '../types';

interface CatalogScreenProps {
  drops: Drop[];
  onSelectDrop: (id: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ drops, onSelectDrop }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Drops & Projets en cours</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {drops.map((drop) => (
          <div key={drop.id} className="border border-neutral-700 p-4 rounded-lg bg-neutral-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded font-mono">#{drop.id}</span>
              <span className="text-xs text-emerald-400 font-bold">{drop.status.toUpperCase()}</span>
            </div>
            <h3 className="font-bold text-lg">{drop.title}</h3>
            <p className="text-xs text-neutral-400">{drop.description}</p>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-sm">{drop.price} €</span>
              <button 
                onClick={() => onSelectDrop(drop.id)} 
                className="bg-white text-black px-3 py-1.5 rounded text-xs font-bold hover:bg-neutral-200 transition"
              >
                Voir le projet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
