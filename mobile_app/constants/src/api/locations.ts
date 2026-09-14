import { api } from "./client";
import type { Location } from "@/constants/src/types/sell";

export async function getLocations(): Promise<Location[]> {
  const response = await api.get<Location[]>("/api/v1/locations/");
  return response.data;
}
