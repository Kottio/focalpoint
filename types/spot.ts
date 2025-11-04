import { FullPhoto } from "./spot-details";
export interface Tag {
  id: number;
  name: string;
  color: string;
}
export interface User {
  id: number;
  username: string;
  fullName: string;
}
export interface mediumPhotos {
  id: number;
  url: string;
  title: string;
  likes: number;
}

export interface Spot {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  categoryId: number;
  tags: Tag[];
  // primaryPhoto: string | null;
  thumbnailPhoto: string;
  mediumPhotos: mediumPhotos[];
  user: User;
  upvotes: number;
  createdAt: string;
  photos: FullPhoto[];
}
