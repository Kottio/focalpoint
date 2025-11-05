import { FullPhoto } from "./spot-details";
import { Tag } from "./spot";
import { User } from "./spot";

export interface UserData {
  id: String;
  email: String;
  username: String;
  bio: String;
  avatarUrl: String;
  spots: UserSpots[];
  photos: FullPhoto[];
  SavedSpots: UserSpots[];
}

export interface UserSpots {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  category: string;
  categoryId: number;
  tags: Tag[];
  user: User;
  createdAt: string;
  photos: FullPhoto[];
  SavedSpotCount: number;
}
