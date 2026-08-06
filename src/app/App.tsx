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
  { id: '001', title: 'Drop #001 - Kit Physical Prototype', price: 35, description: 'Accès prioritaire au premier lot physique limité à 100 unités.', status: 'live' },
  { id: '002', title: 'Drop #002 - Exclusive Apparel', price: 50, description: 'Collection vestimentaire collaborative.', status: 'coming_soon' }
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
    setUser({ name, email, points: 50, rgpdAccepted, orders: [] });
    setCurrentScreen('catalog');
  };

  const handleConfirmPayment = () => {
    if (!user) return setCurrentScreen('auth');
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setUser({
      ...user,
      points: user.points + 100,
      orders: [...user.orders, newOrderId]
    });
    setCurrentScreen('confirmation');
  };

  const handleVote = (creationId: string) => {
    if (!user) {
      alert("Veuillez créer un compte pour voter et cumuler des points.");
      return setCurrentScreen('auth');
    }
    setVotedIds([...votedIds, creationId]);
    setUser({ ...user, points: user.points + 10 });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans p-4 max-w-3xl mx-auto">
      <nav className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <span onClick={() => setCurrentScreen('home')} className="font-bold tracking-wider text-sm cursor-pointer">
          ASCEND-WORLD
        </span>
        <div className="flex gap-4 text-xs font-medium items-center">
          <button onClick={() => setCurrentScreen('home')} className={currentScreen === 'home' ? 'text-indigo-400' : 'text-neutral-400 hover:text-white'}>Accueil</button>
          <button onClick={() => setCurrentScreen('catalog')} className={currentScreen === 'catalog' ? 'text-indigo-400' : 'text-neutral-400 hover:text-white'}>Catalogue</button>
          <button onClick={() => setCurrentScreen('voting')} className={currentScreen === 'voting' ? 'text-indigo-400' : 'text-neutral-400 hover:text-white'}>Votes</button>
          
          {user ? (
            <button onClick={() => setCurrentScreen('profile')} className="bg-neutral-800 px-3 py-1 rounded border border-neutral-700 hover:bg-neutral-700">
              {user.name} ({user.points} pts)
            </button>
          ) : (
            <button onClick={() => setCurrentScreen('auth')} className="bg-indigo-600 px-3 py-1 rounded text-white font-bold hover:bg-indigo-500">
              Connexion
            </button>
          )}
        </div>
      </nav>

      {currentScreen === 'home' && (
        <div className="space-y-6 py-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Bienvenue sur la plateforme ASCEND</h1>
          <p className="text-neutral-400 max-w-md mx-auto text-sm">
            Participez aux drops exclusifs, votez pour les projets de la communauté et cumulez des points de fidélité.
          </p>
          <button onClick={() => setCurrentScreen('catalog')} className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-neutral-200 transition">
            Explorer le catalogue
          </button>
        </div>
      )}

      {currentScreen === 'auth' && <AuthScreen onRegister={handleRegister} />}
      {currentScreen === 'catalog' && <CatalogScreen drops={SAMPLE_DROPS} onSelectDrop={(id) => { setSelectedDropId(id); setCurrentScreen('detail'); }} />}
      {currentScreen === 'detail' && <DropDetailScreen drop={selectedDrop} user={user} onSubscribe={() => setCurrentScreen(user ? 'checkout' : 'auth')} />}
      {currentScreen === 'checkout' && <CheckoutScreen drop={selectedDrop} onConfirmPayment={handleConfirmPayment} />}
      {currentScreen === 'confirmation' && <ConfirmationScreen onGoToVoting={() => setCurrentScreen('voting')} />}
      {currentScreen === 'voting' && <VotingScreen votedIds={votedIds} onVote={handleVote} />}
      {currentScreen === 'profile' && user && <ProfileScreen user={user} onLogout={handleLogout} />}
    </div>
  );
}
