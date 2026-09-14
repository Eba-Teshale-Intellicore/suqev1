import { useQuery } from "@tanstack/react-query";

import { getLocations } from "@/constants/src/api/locations";

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });
}
