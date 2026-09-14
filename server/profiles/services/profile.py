# profiles/services/profile.py

from django.db import transaction

from profiles.models import Profile


@transaction.atomic
def update_profile(
    *,
    user,
    display_name=None,
    bio=None,
    avatar=None,
    city=None,
    preferred_language=None,
):
    profile, _ = Profile.objects.get_or_create(
        user=user,
        defaults={
            "display_name": user.username,
        },
    )

    if display_name is not None:
        profile.display_name = display_name

    if bio is not None:
        profile.bio = bio

    if avatar is not None:
        profile.avatar = avatar

    if city is not None:
        profile.city = city

    if preferred_language is not None:
        profile.preferred_language = preferred_language

    profile.save()

    return profile