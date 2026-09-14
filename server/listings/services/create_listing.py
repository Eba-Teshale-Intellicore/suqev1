from django.db import transaction
from rest_framework.exceptions import ValidationError

from profiles.models.profile import Profile
from listings.models import Listing


@transaction.atomic
def create_listing(*, user, validated_data):

    if not user.is_authenticated:
        raise ValidationError(
            "Authentication is required to create a listing."
        )

    try:
        seller = user.profile
    except Profile.DoesNotExist:
        raise ValidationError(
            "User profile does not exist."
        )

    listing = Listing.objects.create(
        seller=seller,
        **validated_data,
    )

    return listing