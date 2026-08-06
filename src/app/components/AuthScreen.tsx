import React, { useState } from 'react';

interface AuthScreenProps {
  onRegister: (name: string, email: string, rgpd: boolean) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rgpd, setRgpd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rgpd) {
      alert("Vous devez accepter la politique RGPD pour créer un compte.");
      return;
    }
    onRegister(name, email, rgpd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-neutral-800 p-6 rounded-lg border border-neutral-700">
      <h2 className="text-xl font-bold">Inscription / Connexion</h2>
      <div>
        <label className="block text-xs mb-1 text-neutral-400">Nom / Pseudo</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white" 
          required 
        />
      </div>
      <div>
        <label className="block text-xs mb-1 text-neutral-400">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white" 
          required 
        />
      </div>
      <div className="p-3 bg-neutral-900 border border-neutral-700 rounded text-xs space-y-2">
        <p className="text-neutral-400">
          <strong>Conformité RGPD :</strong> Vos données sont utilisées exclusivement pour le traitement de vos réservations et le calcul de vos points de fidélité.
        </p>
        <label className="flex items-center gap-2 cursor-pointer text-white">
          <input 
            type="checkbox" 
            checked={rgpd} 
            onChange={(e) => setRgpd(e.target.checked)} 
            required 
          />
          J'accepte la collecte de mes données personnelles.
        </label>
      </div>
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-sm font-bold transition">
        Créer mon compte
      </button>
    </form>
  );
};
