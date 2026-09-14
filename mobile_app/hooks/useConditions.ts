import { useQuery } from "@tanstack/react-query";

import { getConditions } from "@/constants/src/api/conditions";

export function useConditions() {
  return useQuery({
    queryKey: ["conditions"],
    queryFn: getConditions,
  });
}
