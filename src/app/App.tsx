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
import Navbar from './components/Navbar';

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
  },
  { 
    id: '003', 
    title: 'KEYCARD PASS v1.0', 
    price: 80, 
    description: 'Physical and digital access pass unlocking gallery voting rights and secret drop allocations.', 
    status: 'live',
    category: 'ACCESS / PASS',
    currentParticipants: 84,
    maxParticipants: 100,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '004', 
    title: 'NEON RESIN FIGURINE #00', 
    price: 120, 
    description: 'HD resin printed collectible figurine, hand-painted. Shipped with certificate of authenticity.', 
    status: 'coming_soon',
    category: 'ART / SCULPTURE',
    currentParticipants: 5,
    maxParticipants: 25,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '005', 
    title: 'TACTICAL SLING BAG', 
    price: 65, 
    description: 'Waterproof Cordura urban sling featuring Cobra magnetic buckles and modular storage compartments.', 
    status: 'live',
    category: 'HARDWARE / GEAR',
    currentParticipants: 41,
    maxParticipants: 60,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '006', 
    title: 'SEASON 01 SOUNDTRACK LP', 
    price: 40, 
    description: 'Limited vinyl edition on transparent violet vinyl. Screenprinted sleeve artwork by the community.', 
    status: 'coming_soon',
    category: 'MEDIA / AUDIO',
    currentParticipants: 18,
    maxParticipants: 150,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '007', 
    title: 'GICLÉE PRINT - "ASCENSION"', 
    price: 45, 
    description: 'Large format fine art giclée print on FineArt 310g paper, signed and stamped with UV ink.', 
    status: 'live',
    category: 'ART / PRINT',
    currentParticipants: 29,
    maxParticipants: 40,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '008', 
    title: 'MODULAR UTILITY JACKET', 
    price: 110, 
    description: 'Breathable technical jacket featuring interchangeable velcro patches and reflective details.', 
    status: 'coming_soon',
    category: 'STREETWEAR / APPAREL',
    currentParticipants: 44,
    maxParticipants: 80,
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000'
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

      {/* Barre de navigation responsive */}
      <Navbar 
        activeTab={currentScreen} 
        setActiveTab={(tab) => {
          setClaimParams(null);
          setCurrentScreen(tab as Screen);
        }}
        onConnect={() => {
          setClaimParams(null);
          setCurrentScreen(user ? 'profile' : 'auth');
        }}
      />

      {/* Contenu Principal */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
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
              <HomeScreen onExplore={() => setCurrentScreen('drops')} />
            )}

            {currentScreen === 'auth' && <AuthScreen onRegister={handleRegister} />}
            
            {/* Prise en compte de 'drops' et 'catalog' */}
            {(currentScreen === 'drops' || currentScreen === 'catalog') && (
              <CatalogScreen 
                drops={drops} 
                onSelectDrop={(id) => { setSelectedDropId(id); setCurrentScreen('detail'); }} 
              />
            )}
            
            {currentScreen === 'detail' && (
              <DropDetailScreen 
                drop={selectedDrop} 
                user={user} 
                onSubscribe={() => setCurrentScreen(user ? 'checkout' : 'auth')} 
              />
            )}
            {currentScreen === 'checkout' && (
              <CheckoutScreen 
                drop={selectedDrop} 
                onConfirmPayment={handleConfirmPayment} 
              />
            )}
            {currentScreen === 'confirmation' && (
              <ConfirmationScreen 
                onGoToVoting={() => setCurrentScreen('gallery')} 
              />
            )}
            {currentScreen === 'gallery' && (
              <GalleryScreen 
                votedIds={votedIds} 
                onVote={handleVote} 
              />
            )}
            {currentScreen === 'profile' && user && (
              <ProfileScreen 
                user={user} 
                onLogout={handleLogout} 
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
