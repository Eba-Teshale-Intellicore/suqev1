from django.db import transaction
from rest_framework.exceptions import PermissionDenied

from media.models import Media
from media.services.cloudinary import (
    upload_media,
    delete_media,
)


@transaction.atomic
def create_media(
    *,
    user,
    listing,
    file,
    media_type,
    position=0,
    is_cover=False,
):
    if not user.is_staff:
        if listing.seller.user_id != user.id:
            raise PermissionDenied(
                "You can only add media to your own listing."
            )

    uploaded = None

    try:
        uploaded = upload_media(
            file=file,
            media_type=media_type,
            folder=f"suqe/listings/{listing.id}",
        )

        media = Media.objects.create(
            listing=listing,
            media_type=media_type,
            url=uploaded["url"],
            feed_url=uploaded["feed_url"],
            public_id=uploaded["public_id"],
            thumbnail_url=uploaded["thumbnail_url"],
            position=position,
            is_cover=is_cover,
        )

        return media

    except Exception:
        if uploaded and uploaded.get("public_id"):
            try:
                delete_media(
                    public_id=uploaded["public_id"],
                    media_type=media_type,
                )
            except Exception:
                pass

        raise

@transaction.atomic
def delete_media_object(*, user, media):

    if not user.is_staff:
        if media.listing.seller.user_id != user.id:
            raise PermissionDenied(
                "You can only delete media from your own listing."
            )

    delete_media(
        public_id=media.public_id,
        media_type=media.media_type,
    )

    media.delete()