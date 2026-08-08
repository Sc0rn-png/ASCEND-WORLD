import React from 'react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="bg-[#12141A] rounded-2xl border border-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
        
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Operator Profile</span>
            <h2 className="text-2xl font-black tracking-tight text-white uppercase mt-0.5">{user.name}</h2>
          </div>
          <button 
            onClick={onLogout} 
            className="text-xs font-mono text-red-400 hover:text-red-300 uppercase tracking-wider transition-colors"
          >
            Disconnect
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl">
            <span className="block text-[10px] font-mono text-neutral-500 uppercase">Points Balance</span>
            <span className="text-2xl font-black font-mono text-[#00FF87] mt-1 block">{user.points} PTS</span>
          </div>
          <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl">
            <span className="block text-[10px] font-mono text-neutral-500 uppercase">Data Status</span>
            <span className="text-sm font-mono font-bold text-white mt-2 block">Compliant ✓</span>
          </div>
        </div>

        <div className="p-4 bg-[#090A0C] border border-white/5 rounded-xl space-y-2">
          <span className="block text-[10px] font-mono text-neutral-500 uppercase">Order History</span>
          <p className="text-xs font-mono text-neutral-300">
            {user.orders.length > 0 ? user.orders.join(' • ') : 'No recorded orders in vault'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProfileScreen;
