import React, { useState } from 'react';

interface ClaimScreenProps {
  dropId: string;
  token: string;
  onComplete: (photos: string[], author: string) => void;
  onCancel: () => void;
  isTokenUsed: boolean;
}

export const ClaimScreen: React.FC<ClaimScreenProps> = ({ 
  dropId, 
  token, 
  onComplete, 
  onCancel,
  isTokenUsed 
}) => {
  const [step, setStep] = useState<1 | 2>(1); // 1 = Selection, 2 = Confirmation
  const [author, setAuthor] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>(['']);

  // Ajouter un champ de photo (3 max)
  const handleAddPhotoField = () => {
    if (photoUrls.length < 3) {
      setPhotoUrls([...photoUrls, '']);
    }
  };

  const handlePhotoUrlChange = (index: number, value: string) => {
    const updated = [...photoUrls];
    updated[index] = value;
    setPhotoUrls(updated);
  };

  const handleRemovePhoto = (index: number) => {
    if (photoUrls.length > 1) {
      setPhotoUrls(photoUrls.filter((_, i) => i !== index));
    }
  };

  const validPhotos = photoUrls.filter(p => p.trim() !== '');

  // Jeton déjà consommé
  if (isTokenUsed) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6">
        <div className="bg-[#12141A] rounded-2xl border border-red-500/30 p-8 shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-500 text-2xl font-black">
            ✕
          </div>
          <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase block">Token Expired</span>
          <h2 className="text-2xl font-black text-white uppercase">QR Code Already Claimed</h2>
          <p className="text-xs text-neutral-400">
            This physical pass (<span className="font-mono text-white">{token}</span>) has already been used to publish entries to the Museum.
          </p>
          <button 
            onClick={onCancel}
            className="w-full bg-white text-black font-black text-xs uppercase py-3.5 rounded-xl"
          >
            Go to Museum
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-6">
      <div className="bg-[#12141A] rounded-2xl border border-[#00FF87]/30 p-6 sm:p-8 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
        
        {/* Header Pass */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#00FF87] uppercase tracking-widest block">Physical Pass Validated</span>
            <h2 className="text-lg font-black text-white uppercase">BOX #{dropId} ACCESS</h2>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
            {token}
          </span>
        </div>

        {/* ÉTAPE 1 : SELECTION 1 À 3 PHOTOS */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Creator Handle</label>
              <input 
                type="text" 
                placeholder="@YOURNAME"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-3.5 bg-[#090A0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono text-neutral-400 uppercase">
                  Photos ({validPhotos.length} / 3 Max)
                </label>
                {photoUrls.length < 3 && (
                  <button 
                    type="button"
                    onClick={handleAddPhotoField}
                    className="text-[10px] font-mono text-[#00FF87] hover:underline uppercase"
                  >
                    + Add Photo Slot
                  </button>
                )}
              </div>

              {photoUrls.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    type="url" 
                    placeholder={`Photo URL #${idx + 1}`}
                    value={url}
                    onChange={(e) => handlePhotoUrlChange(idx, e.target.value)}
                    className="flex-1 p-3 bg-[#090A0C] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF87]"
                  />
                  {photoUrls.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="px-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
              disabled={validPhotos.length === 0 || !author}
              onClick={() => setStep(2)}
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                validPhotos.length > 0 && author
                  ? 'bg-[#00FF87] hover:bg-[#00E077] text-black shadow-[0_0_20px_rgba(0,255,135,0.2)]'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              Next Step: Review & Confirm →
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : DOUBLE VALIDATION (WARNING & LOCK) */}
        {step === 2 && (
          <div className="space-y-6 text-center">
            
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                ⚠️ FINAL VERIFICATION REQUIRED
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Once confirmed, this QR Code will become permanently invalid. Your photos will be published directly to the Live Museum as-is.
              </p>
            </div>

            {/* Aperçu des photos sélectionnées */}
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Submitting as {author}:</span>
              <div className="grid grid-cols-3 gap-2">
                {validPhotos.map((pUrl, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/20 bg-black">
                    <img src={pUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                onClick={() => onComplete(validPhotos, author)}
                className="w-full bg-[#00FF87] hover:bg-[#00E077] text-black font-black text-xs uppercase py-4 rounded-xl tracking-wider shadow-[0_0_25px_rgba(0,255,135,0.3)] transition-all active:scale-95"
              >
                Confirm & Burn Pass ✓
              </button>

              <button 
                onClick={() => setStep(1)}
                className="w-full bg-transparent hover:bg-white/5 text-neutral-400 font-mono text-xs uppercase py-2.5 rounded-xl transition-all"
              >
                ← Back to Edit
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ClaimScreen;
