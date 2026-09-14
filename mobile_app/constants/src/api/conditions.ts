import { api } from "./client";
import type { Condition } from "@/constants/src/types/sell";

export async function getConditions(): Promise<Condition[]> {
  const response = await api.get<Condition[]>("/api/v1/conditions/");
  return response.data;
}
