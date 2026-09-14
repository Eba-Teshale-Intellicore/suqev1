import { useQuery } from "@tanstack/react-query";

import { getListings } from "@/constants/src/api/listings";

export function useListings() {
  return useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });
}
