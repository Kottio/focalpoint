import { Tag, User } from './spot';

export interface FullPhoto {
  id: number;
  title: string | null;
  description: string | null;
  originalUrl: string;
  likes: number;
  user: User;
  createdAt: string;
}

export interface SpotDetails {
  id: number;
  title: string;
  description: string | null;
  category: string;
  categoryId: number;
  tags: Tag[];
  fullPhotos: FullPhoto[];
  user: User;
  upvotes: number;
  createdAt: string;
}

// For API responses
export interface SpotDetailsResponse {
  data?: SpotDetails;
  error?: string;
}