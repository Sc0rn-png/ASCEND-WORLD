import React, { useState, useEffect } from 'react';
import { Screen, User, Drop } from './types';
import { AuthScreen } from './components/AuthScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { DropDetailScreen } from './components/DropDetailScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { VotingScreen } from './components/VotingScreen';
import { ProfileScreen } from './components/ProfileScreen';

const SAMPLE_DROPS: Drop[] = [
  { 
    id: '001', 
    title: 'EXTRACT PROTOCOL #01', 
    price: 35, 
    description: 'Accès exclusif au lot physique zéro. Équipement tactique numéroté limité à 100 unités.', 
    status: 'live' 
  },
  { 
    id: '002', 
    title: 'CREATOR APPAREL KIT', 
    price: 50, 
    description: 'Drop vestimentaire premium en coton lourd 450 GSM avec marquage aluminium brossé.', 
    status: 'coming_soon' 
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedDropId, setSelectedDropId] = useState<string>('001');
  const [votedIds, setVotedIds] = useState<string[]>([]);

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
      if (user) {
        localStorage.setItem('ascend_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ascend_user');
      }
    } catch (e) {
      console.error("Erreur d'accès au localStorage:", e);
    }
  }, [user]);

  const selectedDrop = SAMPLE_DROPS.find(d => d.id === selectedDropId) || SAMPLE_DROPS[0];

  const handleRegister = (name: string, email: string, rgpdAccepted: boolean) => {
    setUser({ name, email, points: 150, rgpdAccepted, orders: [] });
    setCurrentScreen('catalog');
  };

  const handleConfirmPayment = () => {
    if (!user) return setCurrentScreen('auth');
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
      alert("Veuillez créer un compte pour débloquer votre vote.");
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
      
      {/* Halos de lumière ambiants et reflets métalliques */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.02] blur-[120px] pointer-events-none -z-10" />

      {/* Navigation Minimaliste & Glassmorphisme */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090A0C]/70 border-b border-white/[0.08] transition-all">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo ASCEND */}
          <div 
            onClick={() => setCurrentScreen('home')} 
            className="cursor-pointer group flex items-center gap-2"
          >
            <span className="font-black text-xl tracking-[0.25em] text-white group-hover:text-neutral-300 transition-colors">
              ASCEND<span className="text-neutral-500 font-light">WORLD</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
          </div>

          {/* Nav Items */}
          <nav className="flex items-center gap-8 text-xs font-bold tracking-wider uppercase">
            <button 
              onClick={() => setCurrentScreen('home')} 
              className={`transition-colors ${currentScreen === 'home' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Accueil
            </button>
            <button 
              onClick={() => setCurrentScreen('catalog')} 
              className={`transition-colors ${currentScreen === 'catalog' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Drops
            </button>
            <button 
              onClick={() => setCurrentScreen('voting')} 
              className={`transition-colors ${currentScreen === 'voting' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Arène
            </button>
          </nav>

          {/* User Status / Compteur Vert Vif */}
          <div>
            {user ? (
              <button 
                onClick={() => setCurrentScreen('profile')} 
                className="group relative flex items-center gap-3 bg-[#13151C] hover:bg-[#1A1D26] border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-black/50"
              >
                <span className="text-xs font-black tracking-wide text-white">{user.name}</span>
                <span className="text-xs font-mono font-bold text-[#00FF87] bg-[#00FF87]/10 px-2.5 py-0.5 rounded-md border border-[#00FF87]/20">
                  +{user.points} PTS
                </span>
              </button>
            ) : (
              <button 
                onClick={() => setCurrentScreen('auth')} 
                className="relative group overflow-hidden rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                Rejoindre
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
              Saison 01 — Phase de Qualification
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none">
              PROGRESSE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">
                DOMINE.
              </span>
            </h1>

            <p className="text-neutral-400 text-base font-normal leading-relaxed max-w-lg mx-auto">
              Accédez aux drops exclusifs, débloquez des récompenses physiques et votez pour façonner les projets de la communauté.
            </p>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button 
                onClick={() => setCurrentScreen('catalog')} 
                className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.3)]"
              >
                Explorer les Drops
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'auth' && <AuthScreen onRegister={handleRegister} />}
        {currentScreen === 'catalog' && <CatalogScreen drops={SAMPLE_DROPS} onSelectDrop={(id) => { setSelectedDropId(id); setCurrentScreen('detail'); }} />}
        {currentScreen === 'detail' && <DropDetailScreen drop={selectedDrop} user={user} onSubscribe={() => setCurrentScreen(user ? 'checkout' : 'auth')} />}
        {currentScreen === 'checkout' && <CheckoutScreen drop={selectedDrop} onConfirmPayment={handleConfirmPayment} />}
        {currentScreen === 'confirmation' && <ConfirmationScreen onGoToVoting={() => setCurrentScreen('voting')} />}
        {currentScreen === 'voting' && <VotingScreen votedIds={votedIds} onVote={handleVote} />}
        {currentScreen === 'profile' && user && <ProfileScreen user={user} onLogout={handleLogout} />}
      </main>
    </div>
  );
}
