export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent: string | null;
  subcategories_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Condition {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  country: string;
  city: string;
  area: string;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListingType {
  id: string;
  name: string;
  slug: string;
}
