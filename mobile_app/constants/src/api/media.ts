import { api } from "./client";

export interface CreateMediaPayload {
  listing_id: string;

  media_type: "image" | "video";

  file: {
    uri: string;
    name: string;
    type: string;
  };

  position?: number;
  is_cover?: boolean;
}

export async function createListingMedia(data: CreateMediaPayload) {
  const formData = new FormData();

  formData.append("listing_id", data.listing_id);
  formData.append("media_type", data.media_type);
  formData.append("position", String(data.position ?? 0));
  formData.append("is_cover", String(data.is_cover ?? false));

  formData.append("file", {
    uri: data.file.uri,
    name: data.file.name,
    type: data.file.type,
  } as any);

  try {
    const response = await api.post("/api/v1/media/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("MEDIA UPLOAD STATUS:", error?.response?.status);

    console.log("MEDIA UPLOAD ERROR:", error?.response?.data);

    console.log("MEDIA UPLOAD REQUEST:", {
      listing_id: data.listing_id,
      media_type: data.media_type,
      position: data.position,
      is_cover: data.is_cover,
      file: data.file,
    });

    throw error;
  }
}
