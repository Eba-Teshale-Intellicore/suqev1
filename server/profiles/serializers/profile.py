from rest_framework import serializers

from profiles.models.profile import Profile


class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True,
    )

    is_verified = serializers.BooleanField(
        source="user.is_verified",
        read_only=True,
    )

    class Meta:
        model = Profile

        fields = [
            "id",
            "username",
            "display_name",
            "bio",
            "avatar",
            "is_verified",
            "followers_count",
            "following_count",
            "listings_count",
            "city",
            "preferred_language",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "username",
            "is_verified",
            "followers_count",
            "following_count",
            "listings_count",
            "created_at",
            "updated_at",
        ]