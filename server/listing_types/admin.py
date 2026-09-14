from django.contrib import admin

from listing_types.models import ListingType

@admin.register(ListingType)
class ListingTypeAdmin(admin.ModelAdmin):

    list_display = [
        "name",
        "slug",
        "is_active",
        "created_at",
    ]

    list_filter = [
        "is_active",
    ]

    search_fields = [
        "name",
    ]

    prepopulated_fields = {
        "slug": ("name",),
    }