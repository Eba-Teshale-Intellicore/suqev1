from rest_framework import serializers

from categories.models import Category
from conditions.models import Condition
from currencies.models import Currency
from listing_types.models import ListingType
from locations.models import Location
from listings.models import Listing
from media.serializers.listing_media import MediaSerializer


class CategorySummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
        ]
class ConditionSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = [
            "id",
            "name",
            "slug",
        ]
class ListingTypeSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingType
        fields = [
            "id",
            "name",
            "slug",
        ]
class LocationSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            "id",
            "country",
            "city",
            "area",
            "latitude",
            "longitude",
        ]
class CurrencySummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = [
            "id",
            "name",
            "code",
            "symbol",
        ]
class SellerSummarySerializer(serializers.Serializer):
    id = serializers.UUIDField(source="user.id", read_only=True)
    username = serializers.CharField(source="user.username",read_only=True,)
    display_name = serializers.CharField(read_only=True,)
    avatar = serializers.URLField(read_only=True,allow_null=True,)
    is_verified = serializers.BooleanField(source="user.is_verified",read_only=True,)


class ListingSerializer(serializers.ModelSerializer):
    seller = SellerSummarySerializer(read_only=True,)
    category = CategorySummarySerializer(read_only=True,)
    condition = ConditionSummarySerializer(read_only=True,)
    listing_type = ListingTypeSummarySerializer(read_only=True,)
    location = LocationSummarySerializer(read_only=True,)
    currency = CurrencySummarySerializer(read_only=True,)
    media = MediaSerializer(many=True,read_only=True,)

    class Meta:
        model = Listing
        fields = [
            "id",
            "seller",
            "category",
            "title",
            "description",
            "price",
            "currency",
            "condition",
            "listing_type",
            "phone_number",
            "location",
            "status",
            "view_count",
            "likes_count",
            "comments_count",
            "shares_count",
            "saves_count",
            "is_featured",
            "is_promoted",
            "media",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "seller",
            "status",
            "view_count",
            "likes_count",
            "comments_count",
            "shares_count",
            "saves_count",
            "is_featured",
            "is_promoted",
            "created_at",
            "updated_at",
        ]