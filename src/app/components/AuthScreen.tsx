import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#111319] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        
        {/* En-tête de section (Cyan à la place du vert) */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            MEMBER ACCESS // SECURITY
          </span>
        </div>

        {/* Titre & Sous-titre */}
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
          CREATE ACCOUNT
        </h2>
        <p className="text-xs text-neutral-400 mb-6">
          Join the Gallery community and unlock <span className="text-cyan-300 font-mono font-bold">+150 PTS</span> upon signup.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* USERNAME */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
              USERNAME / HANDLE
            </label>
            <input
              type="text"
              placeholder="EX: CREATOR_01"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-400/80 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-400/80 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-400/80 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
              required
            />
          </div>

          {/* RGPD CHECKBOX */}
          <div className="pt-2">
            <label className="flex items-start gap-3 bg-black/30 border border-white/5 rounded-2xl p-3.5 cursor-pointer hover:border-white/10 transition-colors">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-white/20 bg-black/50 text-cyan-400 focus:ring-cyan-400/50 accent-cyan-400"
                required
              />
              <span className="text-[11px] text-neutral-400 leading-snug">
                I consent to the collection and processing of my personal data under the GDPR terms.
              </span>
            </label>
          </div>

          {/* BOUTON D'ACTION */}
          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            SEND VERIFICATION CODE
          </button>
        </form>

      </div>
    </div>
  );
};
