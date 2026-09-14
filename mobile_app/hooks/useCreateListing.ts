import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createListing,
  type CreateListingPayload,
} from "@/constants/src/api/listings";

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListingPayload) => createListing(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listings"],
      });
    },
  });
}
