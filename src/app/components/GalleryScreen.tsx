import React from 'react';

export interface GalleryItem {
  id: string;
  dropNumber: string;
  category: string;
  title: string;
  submissionsCount: number;
  status: 'LIVE' | 'ENDED' | 'UPCOMING';
  imageUrl: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: '001',
    dropNumber: '#D01',
    category: 'FOOTWEAR / CUSTOM',
    title: 'CUSTOM SNEAKER KIT #01',
    submissionsCount: 14,
    status: 'LIVE',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '002',
    dropNumber: '#D02',
    category: 'STREETWEAR / APPAREL',
    title: 'TACTICAL BALACLAVA MASK',
    submissionsCount: 8,
    status: 'LIVE',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '003',
    dropNumber: '#D03',
    category: 'STREETWEAR / APPAREL',
    title: 'HEAVYWEIGHT 500 GSM HOODIE',
    submissionsCount: 22,
    status: 'LIVE',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '004',
    dropNumber: '#D04',
    category: 'COLLECTIBLES / ART',
    title: 'UNPAINTED RESIN FIGURE',
    submissionsCount: 0,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '005',
    dropNumber: '#D05',
    category: 'ACCESSORIES / GEAR',
    title: 'RAW CANVAS TOTE BAG',
    submissionsCount: 0,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '006',
    dropNumber: '#D06',
    category: 'HEADWEAR / ACCESSORIES',
    title: 'STRUCTURED CANVAS CAP',
    submissionsCount: 0,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '007',
    dropNumber: '#D07',
    category: 'GAMING / COLLECTIBLES',
    title: 'ACRYLIC DECK VAULT & CASE',
    submissionsCount: 0,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '008',
    dropNumber: '#D08',
    category: 'OUTERWEAR / CUSTOM',
    title: 'VINTAGE WASH DENIM JACKET',
    submissionsCount: 0,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
  },
];

interface GalleryScreenProps {
  onSelectSession?: (id: string) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({ onSelectSession }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
            Vault // Gallery Exhibition
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
            Creator Museum
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          Explore Submissions
        </span>
      </div>

      {/* Subheader Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
          Active Live Sessions
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {GALLERY_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectSession && onSelectSession(item.id)}
            className="group relative h-[420px] rounded-2xl overflow-hidden bg-[#12141C] border border-white/10 hover:border-violet-500/50 transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-between"
          >
            {/* Background Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/40 to-black/20" />

            {/* Top Status Badge */}
            <div className="relative z-10 p-4 flex justify-between items-center">
              <span
                className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider ${
                  item.status === 'LIVE'
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                    : 'bg-white/5 text-neutral-400 border-white/10'
                }`}
              >
                {item.status === 'LIVE' ? '• Live' : 'Upcoming'}
              </span>

              <span className="text-[10px] font-mono font-bold text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                {item.dropNumber}
              </span>
            </div>

            {/* Bottom Info Section */}
            <div className="relative z-10 p-5 space-y-2 bg-gradient-to-t from-[#090A0C] to-transparent pt-12">
              <span className="text-[10px] font-mono font-bold text-violet-400 tracking-widest uppercase block">
                {item.category}
              </span>
              <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>

              <div className="pt-2 flex justify-between items-center text-xs font-mono text-neutral-400 border-t border-white/10 mt-3">
                <span>{item.submissionsCount} Submissions</span>
                <span className="text-violet-400 group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryScreen;
