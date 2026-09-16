// import { useQuery } from "@tanstack/react-query";

// import { getListings } from "@/constants/src/api/listings";

// export function useListings() {
//   return useQuery({
//     queryKey: ["listings"],
//     queryFn: getListings,
//   });
// }
// hooks/useListings.ts

import { useInfiniteQuery } from "@tanstack/react-query";

import { getListings, type ListingFilter } from "@/constants/src/api/listings";

export function useListings(filter: ListingFilter = "all") {
  return useInfiniteQuery({
    queryKey: ["listings", filter],
    queryFn: ({ pageParam }) => {
      return getListings(pageParam, filter);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
