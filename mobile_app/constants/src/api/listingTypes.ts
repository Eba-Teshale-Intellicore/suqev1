// constants/src/api/listingTypes.ts

import { api } from "./client";

export interface ListingType {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getListingTypes(): Promise<ListingType[]> {
  const response = await api.get<ListingType[]>("/api/v1/listing-types/");

  return response.data;
}
