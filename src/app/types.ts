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
