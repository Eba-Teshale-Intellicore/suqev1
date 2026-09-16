# import cloudinary
# import cloudinary.uploader

# from django.conf import settings


# cloudinary.config(
#     cloud_name=settings.CLOUDINARY_CLOUD_NAME,
#     api_key=settings.CLOUDINARY_API_KEY,
#     api_secret=settings.CLOUDINARY_API_SECRET,
#     secure=True,
# )


# def upload_media(*, file, media_type, folder):
#     resource_type = (
#         "video"
#         if media_type == "video"
#         else "image"
#     )
#     result = cloudinary.uploader.upload(
#         file,
#         resource_type=resource_type,
#         folder=folder,
#     )

#     return {
#         "url": result.get("secure_url"),
#         "public_id": result.get("public_id"),
#         "thumbnail_url": (
#             result.get("secure_url")
#             if media_type == "image"
#             else ""
#         ),
#     }


# def delete_media(*, public_id, media_type):
#     resource_type = (
#         "video"
#         if media_type == "video"
#         else "image"
#     )

#     return cloudinary.uploader.destroy(
#         public_id,
#         resource_type=resource_type,
#         invalidate=True,
#     )
import cloudinary
import cloudinary.uploader
import cloudinary.utils

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

    public_id = result.get("public_id")

    if media_type == "image":
        feed_url = cloudinary.utils.cloudinary_url(
            public_id,
            resource_type="image",
            secure=True,
            transformation=[
                {
                    "width": 1080,
                    "crop": "limit",
                },
                {
                    "quality": "auto",
                    "fetch_format": "auto",
                },
            ],
        )[0]

        thumbnail_url = cloudinary.utils.cloudinary_url(
            public_id,
            resource_type="image",
            secure=True,
            transformation=[
                {
                    "width": 400,
                    "height": 400,
                    "crop": "fill",
                    "gravity": "auto",
                },
                {
                    "quality": "auto",
                    "fetch_format": "auto",
                },
            ],
        )[0]

    else:
        feed_url = cloudinary.utils.cloudinary_url(
            public_id,
            resource_type="video",
            secure=True,
            transformation=[
                {
                    "quality": "auto",
                    "fetch_format": "auto",
                },
            ],
        )[0]

        thumbnail_url = cloudinary.utils.cloudinary_url(
            public_id,
            resource_type="video",
            format="jpg",
            secure=True,
            transformation=[
                {
                    "start_offset": "0",
                    "width": 720,
                    "crop": "limit",
                },
                {
                    "quality": "auto",
                },
            ],
        )[0]

    return {
        "url": result.get("secure_url"),
        "feed_url": feed_url,
        "public_id": public_id,
        "thumbnail_url": thumbnail_url,
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