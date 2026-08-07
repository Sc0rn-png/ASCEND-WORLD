import React, { useState, useEffect } from 'react';
import { Screen, User, Drop } from './types';
import { AuthScreen } from './components/AuthScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { DropDetailScreen } from './components/DropDetailScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { ProfileScreen } from './components/ProfileScreen';

const INITIAL_DROPS: Drop[] = [
  { 
    id: '001', 
    title: 'EXTRACT PROTOCOL #01', 
    price: 35, 
    description: 'Priority access to physical prototype batch zero. Numbered tactical gear limited to 50 units worldwide.', 
    status: 'live',
    category: 'HARDWARE / GEAR',
    currentParticipants: 38,
    maxParticipants: 50,
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '002', 
    title: 'CREATOR APPAREL KIT', 
    price: 50, 
    description: 'Heavyweight 450 GSM organic cotton streetwear bundle featuring brushed aluminum emblems.', 
    status: 'coming_soon',
    category: 'STREETWEAR / APPAREL',
    currentParticipants: 12,
    maxParticipants: 100,
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000'
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedDropId, setSelectedDropId] = useState<string>('001');
  const [votedIds, setVotedIds] = useState<string[]>([]);
  
  const [drops, setDrops] = useState<Drop[]>(() => {
    try {
      const saved = localStorage.getItem('ascend_drops');
      return saved ? JSON.parse(saved) : INITIAL_DROPS;
    } catch {
      return INITIAL_DROPS;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ascend_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ascend_drops', JSON.stringify(drops));
    } catch (e) {
      console.error(e);
    }
  }, [drops]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('ascend_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ascend_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const selectedDrop = drops.find(d => d.id === selectedDropId) || drops[0];

  const handleRegister = (name: string, email: string, rgpdAccepted: boolean) => {
    setUser({ name, email, points: 150, rgpdAccepted, orders: [] });
    setCurrentScreen('checkout');
  };

  const handleConfirmPayment = () => {
    if (!user) return setCurrentScreen('auth');
    
    // Incrémentation directe du nombre de participants sur le drop actif
    setDrops(prevDrops => prevDrops.map(d => {
      if (d.id === selectedDropId) {
        return {
          ...d,
          currentParticipants: Math.min(d.maxParticipants, d.currentParticipants + 1)
        };
      }
      return d;
    }));

    const newOrderId = `ASC-${Math.floor(10000 + Math.random() * 90000)}`;
    setUser({
      ...user,
      points: user.points + 500,
      orders: [...user.orders, newOrderId]
    });
    
    setCurrentScreen('confirmation');
  };

  const handleVote = (creationId: string) => {
    if (!user) {
      alert("Please create an account to unlock gallery rights.");
      return setCurrentScreen('auth');
    }
    setVotedIds([...votedIds, creationId]);
    setUser({ ...user, points: user.points + 50 });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-white font-sans antialiased selection:bg-white selection:text-black relative overflow-x-hidden">
      
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090A0C]/70 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div onClick={() => setCurrentScreen('home')} className="cursor-pointer group flex items-center gap-2">
            <span className="font-black text-xl tracking-[0.25em] text-white group-hover:text-neutral-300 transition-colors">
              ASCEND<span className="text-neutral-500 font-light">WORLD</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
          </div>

          <nav className="flex items-center gap-8 text-xs font-bold tracking-wider uppercase">
            <button 
              onClick={() => setCurrentScreen('home')} 
              className={`transition-colors ${currentScreen === 'home' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentScreen('catalog')} 
              className={`transition-colors ${currentScreen === 'catalog' || currentScreen === 'detail' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Drops
            </button>
            <button 
              onClick={() => setCurrentScreen('gallery')} 
              className={`transition-colors ${currentScreen === 'gallery' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Gallery
            </button>
          </nav>

          <div>
            {user ? (
              <button 
                onClick={() => setCurrentScreen('profile')} 
                className="group flex items-center gap-3 bg-[#13151C] hover:bg-[#1A1D26] border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all"
              >
                <span className="text-xs font-black text-white">{user.name}</span>
                <span className="text-xs font-mono font-bold text-[#00FF87] bg-[#00FF87]/10 px-2.5 py-0.5 rounded-md border border-[#00FF87]/20">
                  +{user.points} PTS
                </span>
              </button>
            ) : (
              <button 
                onClick={() => setCurrentScreen('auth')} 
                className="rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-5 py-2.5 transition-all"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {currentScreen === 'home' && (
          <div className="py-16 text-center space-y-8 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#00FF87]" />
              Season 01 // Batch Access
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none">
              PROGRESS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">
                DOMINATE.
              </span>
            </h1>

            <p className="text-neutral-400 text-base font-normal leading-relaxed max-w-lg mx-auto">
              Secure physical prototype allocations, track live batch progression, and shape upcoming developments in the Gallery.
            </p>

            <button 
              onClick={() => setCurrentScreen('catalog')} 
              className="bg-white hover:bg-neutral-200 text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all"
            >
              Explore Live Drops
            </button>
          </div>
        )}

        {currentScreen === 'auth' && <AuthScreen onRegister={handleRegister} />}
        {currentScreen === 'catalog' && <CatalogScreen drops={drops} onSelectDrop={(id) => { setSelectedDropId(id); setCurrentScreen('detail'); }} />}
        {currentScreen === 'detail' && <DropDetailScreen drop={selectedDrop} user={user} onSubscribe={() => setCurrentScreen(user ? 'checkout' : 'auth')} />}
        {currentScreen === 'checkout' && <CheckoutScreen drop={selectedDrop} onConfirmPayment={handleConfirmPayment} />}
        {currentScreen === 'confirmation' && <ConfirmationScreen onGoToVoting={() => setCurrentScreen('gallery')} />}
        {currentScreen === 'gallery' && <GalleryScreen votedIds={votedIds} onVote={handleVote} />}
        {currentScreen === 'profile' && user && <ProfileScreen user={user} onLogout={handleLogout} />}
      </main>
    </div>
  );
}
