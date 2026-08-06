import React from 'react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  return (
    <div className="space-y-4 bg-neutral-800 p-6 rounded-lg border border-neutral-700 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Espace Membre</h2>
        <button onClick={onLogout} className="text-xs text-red-400 hover:underline">
          Déconnexion
        </button>
      </div>

      <div className="space-y-2 text-sm text-neutral-300 bg-neutral-900 p-4 rounded border border-neutral-700">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Solde de points :</strong> <span className="text-indigo-400 font-bold">{user.points} pts</span></p>
        <p><strong>Statut RGPD :</strong> <span className="text-emerald-400">Accepté</span></p>
        <p><strong>Commandes :</strong> {user.orders.length > 0 ? user.orders.join(', ') : 'Aucune commande'}</p>
      </div>
    </div>
  );
};
