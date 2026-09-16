// import { api } from "./client";
// import type { Listing } from "@/constants/src/types/listing";

// export async function getListings(): Promise<Listing[]> {
//   const response = await api.get<Listing[]>("/api/v1/listings/");

//   return response.data;
// }
// constants/src/api/listings.ts

import { api } from "./client";
import type { Listing } from "@/constants/src/types/listing";

// =====================================================
// TYPES
// =====================================================

export type ListingFilter = "all" | "new" | "used";

export interface PaginatedListings {
  count: number;
  next: string | null;
  previous: string | null;
  results: Listing[];
}

// =====================================================
// GET LISTINGS
// =====================================================

export async function getListings(
  page: number = 1,
  filter: ListingFilter = "all",
): Promise<PaginatedListings> {
  try {
    const response = await api.get<PaginatedListings>("/api/v1/listings/", {
      params: {
        page,
        page_size: 10,
        ...(filter !== "all" && {
          condition: filter,
        }),
      },
    });

    console.log("================================");
    console.log("LISTINGS PAGE:", page);
    console.log("LISTINGS FILTER:", filter);
    console.log("API STATUS:", response.status);
    console.log("LISTINGS RECEIVED:", response.data.results.length);
    console.log("TOTAL LISTINGS:", response.data.count);
    console.log("HAS NEXT PAGE:", !!response.data.next);
    console.log("================================");

    return response.data;
  } catch (error) {
    console.log("================================");
    console.log("LISTINGS API ERROR:", error);
    console.log("================================");

    throw error;
  }
}

// =====================================================
// CREATE LISTING
// =====================================================

export interface CreateListingPayload {
  title: string;
  description: string;
  price: string;
  currency_id: string;
  category_id: string;
  condition_id: string;
  listing_type_id: string;
  location_id: string;
}

export async function createListing(
  data: CreateListingPayload,
): Promise<Listing> {
  const response = await api.post<Listing>("/api/v1/listings/", data);

  return response.data;
}
