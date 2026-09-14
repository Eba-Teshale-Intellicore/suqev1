from django.contrib import admin

from listings.models import Listing, ListingType


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):

    list_display = [
        "title",
        "seller",
        "category",
        "price",
        "currency",
        "condition",
        "listing_type",
        "location",
        "status",
        "created_at",
    ]

    list_filter = [
        "status",
        "category",
        "condition",
        "listing_type",
        "currency",
    ]

    search_fields = [
        "title",
        "description",
        "seller__user__username",
    ]


# @admin.register(ListingType)
# class ListingTypeAdmin(admin.ModelAdmin):

#     list_display = [
#         "name",
#         "slug",
#         "is_active",
#         "created_at",
#     ]

#     list_filter = [
#         "is_active",
#     ]

#     search_fields = [
#         "name",
#     ]

#     prepopulated_fields = {
#         "slug": ("name",),
#     }