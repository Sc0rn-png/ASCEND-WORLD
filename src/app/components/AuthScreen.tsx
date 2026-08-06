import React, { useState } from 'react';

interface AuthScreenProps {
  onRegister: (name: string, email: string, rgpd: boolean) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rgpd, setRgpd] = useState(false);
  
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('123456');
  const [inputCode, setInputCode] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rgpd) return alert("Vous devez accepter la politique RGPD.");
    setIsEmailSent(true);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === verificationCode) {
      onRegister(name, email, rgpd);
    } else {
      alert("Code de vérification incorrect.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="bg-[#12141A] rounded-2xl border border-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Ligne lumineuse haut de carte */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {!isEmailSent ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Accès Membre // Security</span>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mt-1">Créer un Compte</h2>
              <p className="text-xs text-neutral-400 mt-1">Rejoignez l'arène et débloquez +150 PTS dès l'inscription.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Pseudo / Nom</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full p-3.5 bg-[#090A0C] border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-white/40 transition-all" 
                  placeholder="EX: PLAYER_01"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Adresse Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full p-3.5 bg-[#090A0C] border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-white/40 transition-all" 
                  placeholder="nom@domaine.com"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Mot de passe</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full p-3.5 bg-[#090A0C] border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-white/40 transition-all" 
                  minLength={8}
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>

            {/* Consentement RGPD */}
            <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl space-y-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-300">
                <input 
                  type="checkbox" 
                  checked={rgpd} 
                  onChange={(e) => setRgpd(e.target.checked)} 
                  className="mt-0.5 rounded bg-black border-white/20 text-emerald-500 focus:ring-0"
                  required 
                />
                <span>J'accepte la collecte de mes données conformément au traitement RGPD.</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_5px_20px_rgba(255,255,255,0.15)]"
            >
              Envoyer le Code de Vérification
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6 text-center">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Vérification OTP</span>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mt-1">Code de Sécurité</h2>
              <p className="text-xs text-neutral-400 mt-2">
                Code à 6 chiffres envoyé à <span className="text-white font-bold">{email}</span>.
              </p>
            </div>

            <input 
              type="text" 
              placeholder="123456" 
              value={inputCode} 
              onChange={(e) => setInputCode(e.target.value)} 
              className="w-full p-4 bg-[#090A0C] border border-white/10 rounded-xl text-center font-mono font-black text-2xl tracking-[0.3em] text-white focus:outline-none focus:border-[#00FF87]/50" 
              maxLength={6}
              required 
            />

            <button 
              type="submit" 
              className="w-full bg-[#00FF87] hover:bg-[#00E077] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(0,255,135,0.25)]"
            >
              Activer mon Compte (+150 PTS)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
