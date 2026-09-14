import { api } from "./client";
import type { Category } from "@/constants/src/types/sell";

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/api/v1/categories/");
  return response.data;
}
