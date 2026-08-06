import React, { useState } from 'react';

interface AuthScreenProps {
  onRegister: (name: string, email: string, rgpd: boolean) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rgpd, setRgpd] = useState(false);
  
  // État Anti-Bot & Sécurité
  const [botVerified, setBotVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [inputCode, setInputCode] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rgpd) return alert("Vous devez accepter la politique RGPD.");
    
    // 1. Simuler l'envoi du code de vérification par email
    setIsEmailSent(true);
    setVerificationCode('123456'); // Simulation d'un code OTP
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === verificationCode) {
      // 2. Validation réussie -> Création finale du compte
      onRegister(name, email, rgpd);
    } else {
      alert("Code de vérification incorrect.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-800 p-6 rounded-lg border border-neutral-700 space-y-4">
      {!isEmailSent ? (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Créer un compte sécurisé</h2>
          
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

          <div>
            <label className="block text-xs mb-1 text-neutral-400">Mot de passe</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-sm text-white" 
              minLength={8}
              required 
            />
          </div>

          {/* RGPD */}
          <div className="p-3 bg-neutral-900 border border-neutral-700 rounded text-xs space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-white">
              <input 
                type="checkbox" 
                checked={rgpd} 
                onChange={(e) => setRgpd(e.target.checked)} 
                required 
              />
              J'accepte le traitement RGPD de mes données.
            </label>
          </div>

          {/* Bouton de validation */}
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-sm font-bold transition"
          >
            S'inscrire (Vérification Email)
          </button>
        </form>
      ) : (
        /* Écran de saisie du code OTP (Email envoyé) */
        <form onSubmit={handleVerifyCode} className="space-y-4 text-center">
          <h2 className="text-xl font-bold">Vérification de l'email</h2>
          <p className="text-xs text-neutral-400">
            Un code à 6 chiffres a été envoyé à <span className="text-white font-bold">{email}</span>.
          </p>
          <input 
            type="text" 
            placeholder="Code (ex: 123456)" 
            value={inputCode} 
            onChange={(e) => setInputCode(e.target.value)} 
            className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-center font-mono text-lg text-white" 
            maxLength={6}
            required 
          />
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded text-sm font-bold transition">
            Valider mon compte
          </button>
        </form>
      )}
    </div>
  );
};
