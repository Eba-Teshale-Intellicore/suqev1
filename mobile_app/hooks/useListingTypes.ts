import { useQuery } from "@tanstack/react-query";

import { getListingTypes } from "@/constants/src/api/listingTypes";

export function useListingTypes() {
  return useQuery({
    queryKey: ["listing-types"],
    queryFn: getListingTypes,
    staleTime: 5 * 60 * 1000,
  });
}
