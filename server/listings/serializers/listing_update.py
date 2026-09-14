from rest_framework import serializers

from categories.models import Category
from conditions.models import Condition
from currencies.models import Currency
from listing_types.models import ListingType
from locations.models import Location
from listings.models import Listing


class ListingUpdateSerializer(serializers.ModelSerializer):

    category_id = serializers.PrimaryKeyRelatedField(
        source="category",
        queryset=Category.objects.filter(is_active=True),
        write_only=True,
        required=False,
    )

    condition_id = serializers.PrimaryKeyRelatedField(
        source="condition",
        queryset=Condition.objects.filter(is_active=True),
        write_only=True,
        required=False,
    )

    listing_type_id = serializers.PrimaryKeyRelatedField(
        source="listing_type",
        queryset=ListingType.objects.filter(is_active=True),
        write_only=True,
        required=False,
    )

    location_id = serializers.PrimaryKeyRelatedField(
        source="location",
        queryset=Location.objects.filter(is_active=True),
        write_only=True,
        required=False,
    )

    currency_id = serializers.PrimaryKeyRelatedField(
        source="currency",
        queryset=Currency.objects.filter(is_active=True),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Listing

        fields = [
            "category_id",
            "title",
            "description",
            "price",
            "currency_id",
            "condition_id",
            "listing_type_id",
            "phone_number",
            "location_id",
        ]

        extra_kwargs = {
            "title": {
                "required": False,
            },
            "description": {
                "required": False,
            },
            "price": {
                "required": False,
            },
            "phone_number": {
                "required": False,
            },
        }

    def validate_title(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError(
                "Title cannot be empty."
            )
        return value

    def validate_description(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError(
                "Description cannot be empty."
            )
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Price cannot be negative."
            )
        return value
    def validate_phone_number(self, value):
        value = value.strip()

        if not value:
            return ""

        if len(value) > 20:
            raise serializers.ValidationError(
                "Phone number is too long."
            )

        return value