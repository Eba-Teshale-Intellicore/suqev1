// import { api } from "./client";
// import type { Listing } from "@/constants/src/types/listing";

// export async function getListings(): Promise<Listing[]> {
//   const response = await api.get<Listing[]>("/api/v1/listings/");

//   return response.data;
// }
import { api } from "./client";
import type { Listing } from "@/constants/src/types/listing";

export async function getListings(): Promise<Listing[]> {
  try {
    const response = await api.get("/api/v1/listings/");

    console.log("================================");
    console.log("API STATUS:", response.status);
    console.log("API DATA:", response.data);
    console.log("API DATA TYPE:", typeof response.data);
    console.log("API DATA IS ARRAY:", Array.isArray(response.data));
    console.log("================================");

    return response.data;
  } catch (error) {
    console.log("================================");
    console.log("LISTINGS API ERROR:", error);
    console.log("================================");

    throw error;
  }
}

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
