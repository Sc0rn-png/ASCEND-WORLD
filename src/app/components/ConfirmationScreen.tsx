import React from 'react';

interface ConfirmationScreenProps {
  onGoToVoting: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onGoToVoting }) => {
  return (
    <div className="max-w-md mx-auto py-12 text-center">
      <div className="bg-[#12141A] rounded-2xl border border-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
        <div className="w-16 h-16 bg-[#00FF87]/10 border border-[#00FF87]/30 rounded-2xl flex items-center justify-center mx-auto text-[#00FF87] text-2xl font-black">
          ✓
        </div>

        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">System // Confirmed</span>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase mt-1">Access Granted</h2>
          <p className="text-xs text-neutral-400 mt-2">Your reservation has been recorded in the vault.</p>
        </div>

        <div className="p-4 bg-[#090A0C] border border-[#00FF87]/20 rounded-xl">
          <p className="text-xs font-mono text-[#00FF87] font-bold">+500 PTS CREDITED TO YOUR PROFILE</p>
        </div>

        <button 
          onClick={onGoToVoting} 
          className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_5px_20px_rgba(255,255,255,0.15)]"
        >
          Enter Voting Arena
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
