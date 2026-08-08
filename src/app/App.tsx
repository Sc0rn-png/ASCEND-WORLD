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
    title: 'CUSTOM SNEAKER KIT', 
    price: 35, 
    description: 'Raw white low-top sneaker canvas equipped with premium acrylic paint set, prep solution, and custom stencils.', 
    status: 'live',
    category: 'FOOTWEAR / CUSTOM',
    currentParticipants: 38,
    maxParticipants: 50,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '002', 
    title: 'TACTICAL BALACLAVA MASK', 
    price: 25, 
    description: 'Heavyweight knit tactical balaclava designed for custom embroidery, patch attachments, and textile alterations.', 
    status: 'live',
    category: 'STREETWEAR / APPAREL',
    currentParticipants: 12,
    maxParticipants: 100,
    imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '003', 
    title: 'HEAVYWEIGHT 500 GSM HOODIE', 
    price: 50, 
    description: 'Ultra-dense organic cotton blank hoodie with dropped shoulders, primed for screen printing and distress work.', 
    status: 'live',
    category: 'STREETWEAR / APPAREL',
    currentParticipants: 75,
    maxParticipants: 80,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '004', 
    title: 'UNPAINTED RESIN FIGURE', 
    price: 45, 
    description: '10-inch high-detail unpainted prime resin figurine ready for airbrushing, hand painting, and panel lining.', 
    status: 'coming_soon',
    category: 'COLLECTIBLES / ART',
    currentParticipants: 0,
    maxParticipants: 40,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '005', 
    title: 'RAW CANVAS TOTE BAG', 
    price: 20, 
    description: 'Extra-thick 16oz raw natural cotton tote bag with reinforced handles, designed for graphic print & paint customization.', 
    status: 'coming_soon',
    category: 'ACCESSORIES / GEAR',
    currentParticipants: 0,
    maxParticipants: 150,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '006', 
    title: 'STRUCTURED CANVAS CAP', 
    price: 22, 
    description: 'Minimalist 6-panel strapback cap in matte finish, structured for custom pins, patches, and fabric dye.', 
    status: 'coming_soon',
    category: 'HEADWEAR / ACCESSORIES',
    currentParticipants: 0,
    maxParticipants: 60,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '007', 
    title: 'ACRYLIC DECK VAULT & CASE', 
    price: 30, 
    description: 'Crystal-clear magnetic UV acrylic display case and deck box designed for custom engraving and card showcases.', 
    status: 'coming_soon',
    category: 'GAMING / COLLECTIBLES',
    currentParticipants: 0,
    maxParticipants: 50,
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f749f7041?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: '008', 
    title: 'VINTAGE WASH DENIM JACKET', 
    price: 65, 
    description: 'Heavy 14oz washed indigo denim jacket with clean back panel for custom bleach work, backpatches, and paint.', 
    status: 'coming_soon',
    category: 'OUTERWEAR / CUSTOM',
    currentParticipants: 0,
    maxParticipants: 30,
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1000'
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
