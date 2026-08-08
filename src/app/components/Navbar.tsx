import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onConnect?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onConnect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'drops', label: 'Drops' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090A0C]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo + Point lumineux Cyan/Violet */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none" 
          onClick={() => setActiveTab('home')}
        >
          <span className="font-black text-lg sm:text-xl tracking-wider text-white uppercase">
            ASCEND<span className="text-violet-400">WORLD</span>
          </span>
          {/* Point néon cyan/violet clignotant */}
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        </div>

        {/* Liens Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                activeTab === item.id ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bouton d'action Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onConnect}
            className="bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-5 py-2 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Join
          </button>
        </div>

        {/* Bouton Hamburger Mobile (3 barres) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:text-violet-400 focus:outline-none rounded-lg border border-white/10 bg-white/5 active:scale-95 transition-all"
          aria-label="Toggle Menu"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.293 5.293a1 1 0 011.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 011.414-1.414L12 10.586l6.293-6.293z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Tiroir Menu Mobile */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col space-y-2 pb-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`text-left text-xs font-mono font-bold uppercase tracking-wider py-2.5 px-3 rounded-xl flex items-center justify-between ${
                activeTab === item.id
                  ? 'text-cyan-300 bg-violet-900/30 border border-violet-500/30'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          ))}
          <button
            onClick={() => {
              if (onConnect) onConnect();
              setIsOpen(false);
            }}
            className="w-full mt-2 bg-white text-black font-black text-xs uppercase tracking-wider py-3 rounded-xl active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            Join
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
