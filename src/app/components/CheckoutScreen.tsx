import React from 'react';
import { Drop } from '../types';

interface CheckoutScreenProps {
  drop: Drop;
  onConfirmPayment: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ drop, onConfirmPayment }) => {
  return (
    <div className="max-w-md mx-auto bg-neutral-800 p-6 rounded-lg border border-neutral-700 space-y-4">
      <h2 className="text-xl font-bold">Validation de votre inscription</h2>
      <div className="p-3 bg-neutral-900 rounded border border-neutral-700 text-sm space-y-1">
        <p className="font-bold">{drop.title}</p>
        <p className="text-xs text-neutral-400">Total à régler : <span className="text-white font-bold">{drop.price} €</span></p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs text-neutral-400">Numéro de carte (Factice)</label>
        <input type="text" placeholder="4242 •••• •••• 4242" defaultValue="4242 4242 4242 4242" className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white" disabled />
      </div>

      <div className="p-3 bg-indigo-950 border border-indigo-800 rounded text-xs text-indigo-300">
        💡 **Gain membre :** En validant ce paiement, vous recevrez automatiquement **+100 points de fidélité**.
      </div>

      <button onClick={onConfirmPayment} className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded text-sm font-bold transition">
        Payer {drop.price} € et valider mon accès
      </button>
    </div>
  );
};
