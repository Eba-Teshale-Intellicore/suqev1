import { useMutation } from "@tanstack/react-query";

import { createListingMedia } from "@/constants/src/api/media";

export function useCreateListingMedia() {
  return useMutation({
    mutationFn: createListingMedia,
  });
}
