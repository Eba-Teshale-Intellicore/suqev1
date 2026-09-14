from django.db import transaction
from rest_framework.exceptions import PermissionDenied


@transaction.atomic
def delete_listing(*, user, listing):

    if not user.is_staff:
        if listing.seller.user_id != user.id:
            raise PermissionDenied(
                "You do not have permission to delete this listing."
            )

    listing.status = listing.Status.ARCHIVED

    listing.save(
        update_fields=[
            "status",
            "updated_at",
        ]
    )

    return listing