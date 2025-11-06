import { Tag, User } from "./spot";

export interface FullPhoto {
  id: number;
  title: string | null;
  description: string | null;
  originalUrl: string;
  likes: number;
  user: User;
  createdAt: string;
  bacthId: number | null;
}

export interface SpotComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  spotId: number;
  likes: number;
  comment: string;
  user: User;
}

interface spotDetailsInfo {
  metadata: JSON | null;
  id: number;
  spotId: number;
  idealTime: number[];
  idealWeather: string | null;
  friendlyIndice: number | null;
}

export interface SpotDetailsType {
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
  SpotDetails: spotDetailsInfo;
  SpotComment: SpotComment[];
  SpotSavesCount: number;
  isSaved: boolean;
}

// For API responses
export interface SpotDetailsResponse {
  data?: SpotDetailsType;
  error?: string;
}
