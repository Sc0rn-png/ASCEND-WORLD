import React from 'react';

export interface DropItem {
  id: string;
  tag: string;
  category: string;
  title: string;
  description: string;
  claimedSlots: number;
  totalSlots: number;
  depositPrice: number;
  status: 'LIVE' | 'UPCOMING' | 'SOLD OUT';
  imageUrl: string;
}

export const DROPS_DATA: DropItem[] = [
  {
    id: '001',
    tag: '#001',
    category: 'FOOTWEAR / CUSTOM',
    title: 'CUSTOM SNEAKER KIT #01',
    description: 'Raw white low-top sneaker canvas equipped with premium acrylic paint set, prep solution, and custom stencils.',
    claimedSlots: 38,
    totalSlots: 50,
    depositPrice: 35,
    status: 'LIVE',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '002',
    tag: '#002',
    category: 'STREETWEAR / APPAREL',
    title: 'TACTICAL BALACLAVA MASK',
    description: 'Heavyweight knit tactical balaclava designed for custom embroidery, patch attachments, and textile alterations.',
    claimedSlots: 12,
    totalSlots: 100,
    depositPrice: 25,
    status: 'LIVE',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '003',
    tag: '#003',
    category: 'STREETWEAR / APPAREL',
    title: 'HEAVYWEIGHT 500 GSM HOODIE',
    description: 'Ultra-dense organic cotton blank hoodie with dropped shoulders, primed for screen printing and distress work.',
    claimedSlots: 75,
    totalSlots: 80,
    depositPrice: 50,
    status: 'LIVE',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '004',
    tag: '#004',
    category: 'COLLECTIBLES / ART',
    title: 'UNPAINTED RESIN FIGURE',
    description: '10-inch high-detail unpainted prime resin figurine ready for airbrushing, hand painting, and panel lining.',
    claimedSlots: 0,
    totalSlots: 40,
    depositPrice: 45,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '005',
    tag: '#005',
    category: 'ACCESSORIES / GEAR',
    title: 'RAW CANVAS TOTE BAG',
    description: 'Extra-thick 16oz raw natural cotton tote bag with reinforced handles, designed for graphic print & paint customization.',
    claimedSlots: 0,
    totalSlots: 150,
    depositPrice: 20,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '006',
    tag: '#006',
    category: 'HEADWEAR / ACCESSORIES',
    title: 'STRUCTURED CANVAS CAP',
    description: 'Minimalist 6-panel strapback cap in matte finish, structured for custom pins, patches, and fabric dye.',
    claimedSlots: 0,
    totalSlots: 60,
    depositPrice: 22,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '007',
    tag: '#007',
    category: 'GAMING / COLLECTIBLES',
    title: 'ACRYLIC DECK VAULT & CASE',
    description: 'Crystal-clear magnetic UV acrylic display case and deck box designed for custom engraving and card showcases.',
    claimedSlots: 0,
    totalSlots: 50,
    depositPrice: 30,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '008',
    tag: '#008',
    category: 'OUTERWEAR / CUSTOM',
    title: 'VINTAGE WASH DENIM JACKET',
    description: 'Heavy 14oz washed indigo denim jacket with clean back panel for custom bleach work, backpatches, and paint.',
    claimedSlots: 0,
    totalSlots: 30,
    depositPrice: 65,
    status: 'UPCOMING',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
  },
];

interface CatalogScreenProps {
  onSelectDrop?: (dropId: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({ onSelectDrop }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">Catalog // Live Feed</span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">Active Drops</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Live Allocations</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DROPS_DATA.map((drop) => {
          const progressPercent = Math.round((drop.claimedSlots / drop.totalSlots) * 100);

          return (
            <div
              key={drop.id}
              className="bg-[#12141C] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-black/40">
                  <img
                    src={drop.imageUrl}
                    alt={drop.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-black/30" />

                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      {drop.tag}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider ${
                        drop.status === 'LIVE'
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                          : 'bg-white/5 text-neutral-400 border-white/10'
                      }`}
                    >
                      {drop.status === 'LIVE' ? '• Live Drop' : 'Coming Soon'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-violet-400 tracking-widest uppercase">
                      {drop.category}
                    </span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mt-1">{drop.title}</h3>
                  </div>

                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">{drop.description}</p>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-400">
                        SLOTS CLAIMED: <strong className="text-white">{drop.claimedSlots}</strong> / {drop.totalSlots}
                      </span>
                      <span className="font-bold text-cyan-300">{progressPercent}%</span>
                    </div>

                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex justify-between items-center border-t border-white/5 mt-2">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Access Deposit</span>
                  <span className="text-xl font-black text-white">€{drop.depositPrice}</span>
                </div>

                <button
                  onClick={() => onSelectDrop && onSelectDrop(drop.id)}
                  className="bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)] active:scale-95"
                >
                  View Drop
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogScreen;
