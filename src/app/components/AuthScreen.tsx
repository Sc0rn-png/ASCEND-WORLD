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
    if (!rgpd) return alert("You must accept the privacy policy to proceed.");
    setIsEmailSent(true);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === verificationCode) {
      onRegister(name, email, rgpd);
    } else {
      alert("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="bg-[#111319] rounded-3xl border border-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-xl">
        {/* Top glow line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {!isEmailSent ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  Member Access // Security
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mt-1">Create Account</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Join the Gallery community and unlock <span className="text-cyan-300 font-mono font-bold">+150 PTS</span> upon signup.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Username / Handle</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full p-3.5 bg-black/50 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono" 
                  placeholder="EX: CREATOR_01"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full p-3.5 bg-black/50 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono" 
                  placeholder="name@domain.com"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full p-3.5 bg-black/50 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono" 
                  minLength={8}
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>

            {/* GDPR Consent */}
            <div className="p-4 bg-black/30 border border-white/5 rounded-xl space-y-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-300">
                <input 
                  type="checkbox" 
                  checked={rgpd} 
                  onChange={(e) => setRgpd(e.target.checked)} 
                  className="mt-0.5 rounded bg-black/50 border-white/20 text-cyan-400 focus:ring-cyan-400/50 accent-cyan-400"
                  required 
                />
                <span>I consent to the collection and processing of my personal data under the GDPR terms.</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Send Verification Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  OTP Verification
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mt-1">Security Code</h2>
              <p className="text-xs text-neutral-400 mt-2">
                Enter the 6-digit code sent to <span className="text-cyan-300 font-bold font-mono">{email}</span>.
              </p>
            </div>

            <input 
              type="text" 
              placeholder="123456" 
              value={inputCode} 
              onChange={(e) => setInputCode(e.target.value)} 
              className="w-full p-4 bg-black/50 border border-white/10 rounded-xl text-center font-mono font-black text-2xl tracking-[0.3em] text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all" 
              maxLength={6}
              required 
            />

            <button 
              type="submit" 
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
            >
              Activate Account (+150 PTS)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
