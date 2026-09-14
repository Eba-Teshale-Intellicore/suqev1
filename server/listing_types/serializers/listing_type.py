from rest_framework import serializers
from listing_types.models import ListingType

class ListingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingType
        fields = [
            "id",
            "name",
            "slug",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "created_at",
            "updated_at",
        ]