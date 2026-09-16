export interface ListingSeller {
  id: string;
  username: string;
  display_name: string;
  avatar: string | null;
  is_verified: boolean;
}

export interface ListingCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ListingCurrency {
  id: string;
  name: string;
  code: string;
  symbol: string;
}

export interface ListingCondition {
  id: string;
  name: string;
  slug: string;
}

export interface ListingType {
  id: string;
  name: string;
  slug: string;
}

export interface ListingLocation {
  id: string;
  country: string;
  city: string;
  area: string;
  latitude: number | null;
  longitude: number | null;
}

export interface ListingMedia {
  id: string;
  listing: string;
  media_type: "image" | "video" | string;

  url: string | null;

  feed_url: string | null;

  thumbnail_url: string | null;

  position: number;
  is_cover: boolean;
  created_at: string;
  updated_at: string;
}
export interface Listing {
  id: string;
  seller: ListingSeller;
  category: ListingCategory;
  title: string;
  description: string;
  price: string;
  currency: ListingCurrency;
  condition: ListingCondition;
  listing_type: ListingType;
  phone_number: string;
  location: ListingLocation;
  status: string;
  view_count: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  saves_count: number;
  is_featured: boolean;
  is_promoted: boolean;
  media: ListingMedia[];
  created_at: string;
  updated_at: string;
}
