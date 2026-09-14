import django_filters

from listings.models import Listing


class ListingFilter(django_filters.FilterSet):

    category = django_filters.UUIDFilter(
        field_name="category_id",
    )

    condition = django_filters.UUIDFilter(
        field_name="condition_id",
    )

    listing_type = django_filters.UUIDFilter(
        field_name="listing_type_id",
    )

    location = django_filters.UUIDFilter(
        field_name="location_id",
    )

    currency = django_filters.UUIDFilter(
        field_name="currency_id",
    )

    seller = django_filters.UUIDFilter(
        field_name="seller_id",
    )

    min_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="gte",
    )

    max_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="lte",
    )

    class Meta:
        model = Listing

        fields = [
            "category",
            "condition",
            "listing_type",
            "location",
            "currency",
            "seller",
            "status",
            "min_price",
            "max_price",
        ]


# /listings/?category=UUID
# /listings/?condition=UUID
# /listings/?location=UUID
# /listings/?min_price=100
# /listings/?max_price=5000
# /listings/?category=UUID&max_price=5000