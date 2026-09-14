import { api } from "./client";
import type { Currency } from "@/constants/src/types/sell";

export async function getCurrencies(): Promise<Currency[]> {
  const response = await api.get<Currency[]>("/api/v1/currencies/");
  return response.data;
}
