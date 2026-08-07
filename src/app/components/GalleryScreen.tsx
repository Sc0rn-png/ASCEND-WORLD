import React, { useState, useEffect } from 'react';
import { GalleryDropItem, GallerySubmission } from '../types';

// Mock Data avec images de Box et de participations
const INITIAL_GALLERY_DROPS: GalleryDropItem[] = [
  {
    id: 'D01',
    title: 'EXTRACT PROTOCOL #01',
    boxImageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    status: 'active',
    endsAtSeconds: 14400, // 4 heures
    submissions: [
      { id: 'S01', imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800', author: '@KAI_99', votes: 142 },
      { id: 'S02', imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', author: '@NEO_TACTICAL', votes: 118 },
      { id: 'S03', imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800', author: '@DARK_VALLEY', votes: 95 },
      { id: 'S04', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', author: '@SHADOW_FRAME', votes: 64 },
      { id: 'S05', imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800', author: '@ZERO_CORP', votes: 41 },
    ]
  },
  {
    id: 'D00',
    title: 'LEGACY BATCH #00',
    boxImageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    status: 'completed',
    endsAtSeconds: 0,
    submissions: [
      { id: 'H01', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800', author: '@VORTEX_OG', votes: 380 },
      { id: 'H02', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800', author: '@BLAKE_PRO', votes: 290 },
      { id: 'H03', imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800', author: '@ALPHA_01', votes: 245 },
      { id: 'H04', imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800', author: '@STEALTH_GEAR', votes: 190 },
      { id: 'H05', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', author: '@RUNNER_X', votes: 155 },
    ]
  }
];

interface GalleryScreenProps {
  votedIds: string[];
  onVote: (creationId: string) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({ votedIds, onVote }) => {
  const [selectedDropId, setSelectedDropId] = useState<string | null>(null);
  const [drops, setDrops] = useState<GalleryDropItem[]>(INITIAL_GALLERY_DROPS);

  const selectedDrop = drops.find(d => d.id === selectedDropId);

  // Timer en direct pour le drop actif sélectionné
  const [timeLeft, setTimeLeft] = useState<number>(selectedDrop?.endsAtSeconds || 0);

  useEffect(() => {
    if (!selectedDrop || selectedDrop.status !== 'active') return;
    setTimeLeft(selectedDrop.endsAtSeconds);

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDropId]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleLocalVote = (submissionId: string) => {
    if (votedIds.includes(submissionId)) return;
    
    setDrops(prev => prev.map(d => {
      if (d.id === selectedDropId) {
        return {
          ...d,
          submissions: d.submissions.map(s => s.id === submissionId ? { ...s, votes: s.votes + 1 } : s)
        };
      }
      return d;
    }));

    onVote(submissionId);
  };

  // --- VUE 1 : VUE DÉTAILLÉE D'UN DROP (PHOTOS PARTICIPANTS) ---
  if (selectedDrop) {
    // Trier les participations par ordre décroissant de votes
    const sortedSubmissions = [...selectedDrop.submissions].sort((a, b) => b.votes - a.votes);
    // Si archivé : garder UNIQUEMENT le Top 5
    const displayedSubmissions = selectedDrop.status === 'completed' 
      ? sortedSubmissions.slice(0, 5) 
      : sortedSubmissions;

    return (
      <div className="space-y-6">
        
        {/* Navigation Retour & Timer */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button 
            onClick={() => setSelectedDropId(null)}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            ← Back to Gallery
          </button>
          
          <span className="text-[10px] font-mono tracking-widest text-[#00FF87] bg-[#00FF87]/10 px-3 py-1 rounded-full border border-[#00FF87]/20">
            {selectedDrop.status === 'active' ? 'LIVE SESSION' : 'HALL OF FAME'}
          </span>
        </div>

        {/* TIMER BANNER (Uniquement sur les Drops Actifs) */}
        {selectedDrop.status === 'active' && (
          <div className="bg-[#12141A] rounded-2xl border border-[#00FF87]/30 p-4 sm:p-6 text-center space-y-1 shadow-[0_0_30px_rgba(0,255,135,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF87] to-transparent" />
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              REWARD ALLOCATION COUNTDOWN
            </span>
            <div className="text-3xl sm:text-5xl font-black font-mono tracking-wider text-[#00FF87] animate-pulse">
              {formatTime(timeLeft)}
            </div>
            <p className="text-[11px] text-neutral-400">
              Top 3 submissions automatically claim physical drop packages when timer hits 00:00:00.
            </p>
          </div>
        )}

        {/* En-tête du Drop sélectionné */}
        <div>
          <h2 className="text-2xl font-black text-white uppercase">{selectedDrop.title}</h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {selectedDrop.status === 'active' ? 'Community Submissions' : 'Final Top 5 Ranked Submissions'}
          </p>
        </div>

        {/* MASONRY / PINTEREST GRID (2 Colonnes Quinconce) */}
        <div className="columns-2 gap-3 space-y-3">
          {displayedSubmissions.map((item, index) => {
            const rank = index + 1;
            const hasVoted = votedIds.includes(item.id);

            return (
              <div 
                key={item.id} 
                className="break-inside-avoid relative group rounded-xl overflow-hidden bg-[#12141A] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
              >
                {/* Image du participant */}
                <img 
                  src={item.imageUrl} 
                  alt={item.author} 
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlays / Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity" />

                {/* Rank Badge (Top 1, 2, 3 pour Active / Top 1 à 5 pour Completed) */}
                {((selectedDrop.status === 'active' && rank <= 3) || selectedDrop.status === 'completed') && (
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-md shadow-lg uppercase tracking-wider backdrop-blur-md border ${
                      rank === 1 ? 'bg-amber-400 text-black border-amber-300' :
                      rank === 2 ? 'bg-slate-300 text-black border-white' :
                      rank === 3 ? 'bg-amber-700 text-white border-amber-600' :
                      'bg-black/60 text-white border-white/20'
                    }`}>
                      #{rank} {rank === 1 ? 'GOLD' : rank === 2 ? 'SILVER' : rank === 3 ? 'BRONZE' : ''}
                    </span>
                  </div>
                )}

                {/* Pied d'image : Info & Vote Button */}
                <div className="absolute bottom-2 left-2 right-2 flex flex-col justify-end gap-1.5">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-bold text-white tracking-wide truncate">{item.author}</span>
                    <span className="text-xs font-mono font-black text-[#00FF87]">{item.votes} PTS</span>
                  </div>

                  {selectedDrop.status === 'active' && (
                    <button 
                      onClick={() => handleLocalVote(item.id)}
                      disabled={hasVoted}
                      className={`w-full py-2 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                        hasVoted 
                          ? 'bg-neutral-800 text-neutral-500 border border-white/5 cursor-not-allowed' 
                          : 'bg-[#00FF87] hover:bg-[#00E077] text-black shadow-[0_0_15px_rgba(0,255,135,0.2)]'
                      }`}
                    >
                      {hasVoted ? 'Endorsed ✓' : 'Vote (+50 PTS)'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  // --- VUE 2 : LISTE DES DROPS EN COURS & ARCHIVÉS (COVER BOX) ---
  const activeDrops = drops.filter(d => d.status === 'active');
  const pastDrops = drops.filter(d => d.status === 'completed');

  return (
    <div className="space-y-10">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">Vault // Gallery Exhibition</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
            CREATOR MUSEUM
          </h2>
        </div>
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Explore Submissions
        </div>
      </div>

      {/* SECTION 1 : DROPS EN COURS (Live Boxes) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
          <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">Active Live Sessions</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {activeDrops.map((drop) => (
            <div 
              key={drop.id}
              onClick={() => setSelectedDropId(drop.id)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#12141A] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg hover:-translate-y-1"
            >
              {/* Image de Couverture Box */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img 
                  src={drop.boxImageUrl} 
                  alt={drop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-black/30" />
                
                {/* Badge Status */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-[#00FF87] bg-black/60 px-2 py-0.5 rounded border border-[#00FF87]/30 backdrop-blur-md uppercase">
                    • LIVE
                  </span>
                </div>
              </div>

              {/* Detail Footer */}
              <div className="p-3 bg-[#12141A]">
                <span className="text-[9px] font-mono text-neutral-500 block uppercase">Box Entry #{drop.id}</span>
                <h4 className="text-xs font-black text-white uppercase tracking-wide truncate mt-0.5">{drop.title}</h4>
                <p className="text-[10px] text-neutral-400 font-mono mt-1">
                  {drop.submissions.length} Submissions →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 : DROPS ARCHIVÉS (5-10 Derniers Drops) */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">Archived Drops // Hall of Fame</h3>

        <div className="grid grid-cols-2 gap-3">
          {pastDrops.map((drop) => (
            <div 
              key={drop.id}
              onClick={() => setSelectedDropId(drop.id)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#12141A] border border-white/5 hover:border-white/20 transition-all duration-300 opacity-80 hover:opacity-100"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img 
                  src={drop.boxImageUrl} 
                  alt={drop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-transparent" />
                
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md uppercase">
                    ARCHIVED
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#12141A]">
                <span className="text-[9px] font-mono text-neutral-500 block uppercase">Final Top 5</span>
                <h4 className="text-xs font-black text-neutral-300 uppercase tracking-wide truncate mt-0.5">{drop.title}</h4>
                <p className="text-[10px] text-neutral-500 font-mono mt-1">
                  View Winners →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default GalleryScreen;
