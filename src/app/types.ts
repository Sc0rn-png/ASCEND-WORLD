export type Screen = 'home' | 'auth' | 'catalog' | 'detail' | 'checkout' | 'confirmation' | 'gallery' | 'profile';

export interface User {
  name: string;
  email: string;
  points: number;
  rgpdAccepted: boolean;
  orders: string[];
}

export interface Drop {
  id: string;
  title: string;
  price: number;
  description: string;
  status: 'live' | 'coming_soon';
  imageUrl: string;
  category: string;
  currentParticipants: number;
  maxParticipants: number;
}
export interface GallerySubmission {
  id: string;
  imageUrl: string;
  author: string;
  votes: number;
}

export interface GalleryDropItem {
  id: string;
  title: string;
  boxImageUrl: string; // Image de la box / packaging
  status: 'active' | 'completed';
  endsAtSeconds: number; // Temps restant en secondes pour les drops actifs
  submissions: GallerySubmission[];
}
