from rest_framework import serializers

from media.models import Media
from listings.models import Listing


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = [
            "id",
            "listing",
            "media_type",
            "url",
            "feed_url",
            "thumbnail_url",
            "position",
            "is_cover",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "url",
            "feed_url",
            "thumbnail_url",
            "created_at",
            "updated_at",
        ]

class MediaCreateSerializer(serializers.ModelSerializer):
    listing_id = serializers.PrimaryKeyRelatedField(
        source="listing",
        queryset=Listing.objects.all(),
        write_only=True,
    )
    file = serializers.FileField(
        write_only=True,
    )

    class Meta:
        model = Media

        fields = [
            "listing_id",
            "media_type",
            "file",
            "position",
            "is_cover",
        ]

    def validate_file(self, value):
        max_size = 50 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError(
                "File size cannot exceed 50MB."
            )
        return value

class MediaUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = [
            "position",
            "is_cover",
        ]