from django.db import transaction
from rest_framework.exceptions import PermissionDenied


@transaction.atomic
def update_listing(
    *,
    user,
    listing,
    validated_data,
):
    if not user.is_staff:
        if listing.seller.user_id != user.id:
            raise PermissionDenied(
                "You do not have permission to update this listing."
            )

    for field, value in validated_data.items():
        setattr(listing, field, value)

    listing.save()

    return listing


@transaction.atomic
def publish_listing(*, user, listing):
    if not user.is_staff:
        if listing.seller.user_id != user.id:
            raise PermissionDenied(
                "You do not have permission to publish this listing."
            )

    listing.status = listing.Status.ACTIVE
    listing.save(update_fields=["status", "updated_at"])

    return listing


@transaction.atomic
def archive_listing(*, user, listing):
    if not user.is_staff:
        if listing.seller.user_id != user.id:
            raise PermissionDenied(
                "You do not have permission to archive this listing."
            )

    listing.status = listing.Status.ARCHIVED
    listing.save(update_fields=["status", "updated_at"])

    return listing