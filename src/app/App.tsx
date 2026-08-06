import React, { useState, useEffect } from 'react';
import { Screen, User, Drop } from './types';
import { AuthScreen } from './components/AuthScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { VotingScreen } from './components/VotingScreen';

const SAMPLE_DROPS: Drop[] = [
  { id: '001', title: 'Drop #001 - Kit Physical Prototype', price: 35, description: 'Accès prioritaire au premier lot physique limité à 100 unités.', status: 'live' },
  { id: '002', title: 'Drop #002 - Exclusive Apparel', price: 50, description: 'Collection vestimentaire collaborative.', status: 'coming_soon' }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedDropId, setSelectedDropId] = useState<string>('001');
  const [votedIds, setVotedIds] = useState<string[]>([]);

  // 1. Chargement sécurisé de l'utilisateur depuis localStorage
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ascend_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. Sauvegarde automatique à chaque changement d'utilisateur
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
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <span onClick={() => setCurrentScreen('home')} className="font-bold tracking-wider text-sm cursor-pointer">
          ASCEND-WORLD
        </span>
        <div className="flex gap-4 text-xs font-medium items-center">
          <button onClick={() => setCurrentScreen('home')} className={currentScreen === 'home' ? 'text-indigo-400' : 'text-neutral-400 hover:text-white'}>Accueil</button>
          <button onClick={() => setCurrentScreen('catalog')} className={currentScreen === 'catalog' ? 'text-indigo-400' : 'text-neutral-400 hover:text-white'}>Catalogue</button>
          <button onClick={() => setCurrentScreen('voting')} className={currentScreen === 'voting' ? 'text-indigo-400' : 'text-neutral-400 hover:text-white'}>Votes</button>
          
          {user ? (
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentScreen('profile')} className="bg-neutral-800 px-3 py-1 rounded border border-neutral-700">
                {user.name} ({user.points} pts)
              </button>
              <button onClick={handleLogout} className="text-neutral-400 hover:text-red-400 text-xs">
                Déconnexion
              </button>
            </div>
          ) : (
            <button onClick={() => setCurrentScreen('auth')} className="bg-indigo-600 px-3 py-1 rounded text-white font-bold">
              Connexion
            </button>
          )}
        </div>
      </nav>

      {/* Écrans */}
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

      {currentScreen === 'catalog' && (
        <CatalogScreen 
          drops={SAMPLE_DROPS} 
          onSelectDrop={(id) => { setSelectedDropId(id); setCurrentScreen('detail'); }} 
        />
      )}

      {currentScreen === 'detail' && (
        <div className="space-y-4 bg-neutral-800 p-6 rounded-lg border border-neutral-700">
          <span className="text-xs text-indigo-400 font-mono">Détails Projet #{selectedDrop.id}</span>
          <h2 className="text-2xl font-bold">{selectedDrop.title}</h2>
          <p className="text-sm text-neutral-300">{selectedDrop.description}</p>
          <div className="pt-4 border-t border-neutral-700 flex justify-between items-center">
            <span className="text-lg font-bold">{selectedDrop.price} €</span>
            <button 
              onClick={() => setCurrentScreen(user ? 'checkout' : 'auth')} 
              className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-sm font-bold transition"
            >
              {user ? "S'inscrire au Drop" : "Se connecter pour s'inscrire"}
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'checkout' && (
        <CheckoutScreen drop={selectedDrop} onConfirmPayment={handleConfirmPayment} />
      )}

      {currentScreen === 'confirmation' && (
        <div className="text-center py-12 space-y-4 bg-neutral-800 p-6 rounded-lg border border-neutral-700">
          <h2 className="text-2xl font-bold text-emerald-400">Paiement validé !</h2>
          <p className="text-sm text-neutral-300">Votre réservation a bien été prise en compte.</p>
          <div className="p-3 bg-neutral-900 inline-block rounded border border-neutral-700 text-xs font-mono text-neutral-400">
            Crédit accordé : +100 Points de fidélité
          </div>
          <div>
            <button onClick={() => setCurrentScreen('voting')} className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-sm font-bold transition">
              Découvrir la galerie et voter
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'voting' && (
        <VotingScreen votedIds={votedIds} onVote={handleVote} />
      )}

      {currentScreen === 'profile' && user && (
        <div className="space-y-4 bg-neutral-800 p-6 rounded-lg border border-neutral-700">
          <h2 className="text-xl font-bold">Espace Membre</h2>
          <div className="space-y-2 text-sm text-neutral-300">
            <p><strong>Nom :</strong> {user.name}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Points de fidélité :</strong> <span className="text-indigo-400 font-bold">{user.points} pts</span></p>
            <p><strong>Consentement RGPD :</strong> <span className="text-emerald-400">Validé</span></p>
            <p><strong>Historique des commandes :</strong> {user.orders.length > 0 ? user.orders.join(', ') : 'Aucune commande enregistrée'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
