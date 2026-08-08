import React from 'react';
import { Drop } from '../types';

interface CheckoutScreenProps {
  drop: Drop;
  onConfirmPayment: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ drop, onConfirmPayment }) => {
  return (
    <div className="max-w-md mx-auto py-6">
      <div className="bg-[#12141A] rounded-2xl border border-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
        
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Secure Checkout // Encrypted</span>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase mt-1">Order Verification</h2>
        </div>

        <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs font-mono text-neutral-400">SELECTED DROP</p>
            <p className="text-sm font-bold text-white uppercase mt-0.5">{drop.title}</p>
          </div>
          <span className="text-lg font-black text-white">€{drop.price}</span>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase text-neutral-400">Card Number (Demo Mode)</label>
          <input 
            type="text" 
            value="4242 •••• •••• 4242" 
            disabled 
            className="w-full p-3.5 bg-[#090A0C] border border-white/10 rounded-xl font-mono text-sm text-neutral-400 cursor-not-allowed" 
          />
        </div>

        {/* Bonus Box */}
        <div className="p-4 bg-[#00FF87]/10 border border-[#00FF87]/20 rounded-xl text-xs space-y-1">
          <p className="font-bold text-[#00FF87] uppercase">🎉 Reward Upon Checkout:</p>
          <p className="text-neutral-300">Your profile will instantly receive <strong className="text-white">+500 PTS</strong> upon completion.</p>
        </div>

        <button 
          onClick={onConfirmPayment} 
          className="w-full bg-[#00FF87] hover:bg-[#00E077] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(0,255,135,0.25)]"
        >
          Pay €{drop.price} & Unlock Access
        </button>

      </div>
    </div>
  );
};
