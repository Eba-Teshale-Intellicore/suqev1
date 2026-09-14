# accounts/services/auth.py

from django.db import transaction

from accounts.models import User
from profiles.models import Profile

@transaction.atomic
def register_user(
    *,
    email,
    username,
    password,
    phone_number=None,
    display_name="",
):
    """
    Create a User and its Profile atomically.

    If either User or Profile creation fails,
    the entire registration is rolled back.
    """

    user = User.objects.create_user(
        email=email,
        username=username,
        password=password,
        phone_number=phone_number,
        auth_provider="email",
        role="user",
    )

    Profile.objects.create(
        user=user,
        display_name=display_name or username,
    )

    return user

@transaction.atomic
def change_password(
    *,
    user,
    new_password,
):
    user.set_password(new_password)

    user.save(
        update_fields=[
            "password",
            "updated_at",
        ]
    )

    return user


@transaction.atomic
def reset_password(
    *,
    user,
    new_password,
):
    user.set_password(new_password)

    user.save(
        update_fields=[
            "password",
            "updated_at",
        ]
    )

    return user