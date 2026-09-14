import cloudinary
import cloudinary.uploader

from django.conf import settings


cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_media(*, file, media_type, folder):
    resource_type = (
        "video"
        if media_type == "video"
        else "image"
    )
    result = cloudinary.uploader.upload(
        file,
        resource_type=resource_type,
        folder=folder,
    )

    return {
        "url": result.get("secure_url"),
        "public_id": result.get("public_id"),
        "thumbnail_url": (
            result.get("secure_url")
            if media_type == "image"
            else ""
        ),
    }


def delete_media(*, public_id, media_type):
    resource_type = (
        "video"
        if media_type == "video"
        else "image"
    )

    return cloudinary.uploader.destroy(
        public_id,
        resource_type=resource_type,
        invalidate=True,
    )