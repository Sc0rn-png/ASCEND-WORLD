import React, { useState, useEffect } from 'react';
import { Screen, User, Drop } from './types';
import { AuthScreen } from './components/AuthScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { DropDetailScreen } from './components/DropDetailScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ClaimScreen } from './components/ClaimScreen';
import { HomeScreen } from './components/HomeScreen';

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
  // Navigation & États généraux
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedDropId, setSelectedDropId] = useState<string>('001');
  const [votedIds, setVotedIds] = useState<string[]>([]);
  
  // Gestion du Token QR Code & Réclamation
  const [usedTokens, setUsedTokens] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ascend_used_tokens');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [claimParams, setClaimParams] = useState<{ dropId: string; token: string } | null>(null);

  // Persistence Drops & Utilisateur
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

  // Intercepter les paramètres de QR code au lancement (?dropId=...&token=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dropId = params.get('dropId');
    const token = params.get('token');

    if (dropId && token) {
      setClaimParams({ dropId, token });
    }
  }, []);

  // Sync LocalStorage
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

  // Handlers
  const handleClaimComplete = (photos: string[], author: string) => {
    if (!claimParams) return;

    const updatedTokens = [...usedTokens, claimParams.token];
    setUsedTokens(updatedTokens);
    localStorage.setItem('ascend_used_tokens', JSON.stringify(updatedTokens));

    window.history.replaceState({}, document.title, window.location.pathname);
    setClaimParams(null);
    setCurrentScreen('gallery');
  };

  const handleClaimCancel = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    setClaimParams(null);
    setCurrentScreen('gallery');
  };

  const handleRegister = (name: string, email: string, rgpdAccepted: boolean) => {
    setUser({ name, email, points: 150, rgpdAccepted, orders: [] });
    setCurrentScreen('checkout');
  };

  const handleConfirmPayment = () => {
    if (!user) return setCurrentScreen('auth');
    
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
          
          <div onClick={() => { setClaimParams(null); setCurrentScreen('home'); }} className="cursor-pointer group flex items-center gap-2">
            <span className="font-black text-xl tracking-[0.25em] text-white group-hover:text-neutral-300 transition-colors">
              ASCEND<span className="text-neutral-500 font-light">WORLD</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
          </div>

          <nav className="flex items-center gap-8 text-xs font-bold tracking-wider uppercase">
            <button 
              onClick={() => { setClaimParams(null); setCurrentScreen('home'); }} 
              className={`transition-colors ${currentScreen === 'home' && !claimParams ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setClaimParams(null); setCurrentScreen('catalog'); }} 
              className={`transition-colors ${(currentScreen === 'catalog' || currentScreen === 'detail') && !claimParams ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Drops
            </button>
            <button 
              onClick={() => { setClaimParams(null); setCurrentScreen('gallery'); }} 
              className={`transition-colors ${currentScreen === 'gallery' && !claimParams ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Gallery
            </button>
          </nav>

          <div>
            {user ? (
              <button 
                onClick={() => { setClaimParams(null); setCurrentScreen('profile'); }} 
                className="group flex items-center gap-3 bg-[#13151C] hover:bg-[#1A1D26] border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all"
              >
                <span className="text-xs font-black text-white">{user.name}</span>
                <span className="text-xs font-mono font-bold text-[#00FF87] bg-[#00FF87]/10 px-2.5 py-0.5 rounded-md border border-[#00FF87]/20">
                  +{user.points} PTS
                </span>
              </button>
            ) : (
              <button 
                onClick={() => { setClaimParams(null); setCurrentScreen('auth'); }} 
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
        {claimParams ? (
          <ClaimScreen
            dropId={claimParams.dropId}
            token={claimParams.token}
            isTokenUsed={usedTokens.includes(claimParams.token)}
            onComplete={handleClaimComplete}
            onCancel={handleClaimCancel}
          />
        ) : (
          <>
            {currentScreen === 'home' && (
              <HomeScreen onExplore={() => setCurrentScreen('catalog')} />
            )}

            {currentScreen === 'auth' && <AuthScreen onRegister={handleRegister} />}
            {currentScreen === 'catalog' && <CatalogScreen drops={drops} onSelectDrop={(id) => { setSelectedDropId(id); setCurrentScreen('detail'); }} />}
            {currentScreen === 'detail' && <DropDetailScreen drop={selectedDrop} user={user} onSubscribe={() => setCurrentScreen(user ? 'checkout' : 'auth')} />}
            {currentScreen === 'checkout' && <CheckoutScreen drop={selectedDrop} onConfirmPayment={handleConfirmPayment} />}
            {currentScreen === 'confirmation' && <ConfirmationScreen onGoToVoting={() => setCurrentScreen('gallery')} />}
            {currentScreen === 'gallery' && <GalleryScreen votedIds={votedIds} onVote={handleVote} />}
            {currentScreen === 'profile' && user && <ProfileScreen user={user} onLogout={handleLogout} />}
          </>
        )}
      </main>
    </div>
  );
}
