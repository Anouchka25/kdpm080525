export type PropertyType = 
  | 'house' 
  | 'apartment' 
  | 'studio' 
  | 'villa' 
  | 'room'
  | 'furnished_house'
  | 'furnished_apartment'
  | 'furnished_studio'
  | 'furnished_villa'
  | 'furnished_room'
  | 'land';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  neighborhood: string;
  city: 'Libreville' | 'Akanda' | 'Owendo';
  surface: number;
  rooms: number;
  bathrooms: number;
  images: string[];
  ownerName: string;
  ownerPhone: string;
  ownerWhatsapp?: string;
  verified: boolean;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  neighborhoods: string[];
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType[];
  minRooms?: number;
  minSurface?: number;
  city?: 'Libreville' | 'Akanda' | 'Owendo';
}