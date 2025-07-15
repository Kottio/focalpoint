export interface Tag {
  id: number;
  name: string;
  color: string;
}
export interface User {
  id: number;
  username: string;
  1;
  fullName: string;
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
  primaryPhoto: string | null;
  user: User;
  upvotes: number;
  createdAt: string;
}
