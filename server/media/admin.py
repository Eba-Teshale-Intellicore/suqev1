from django.contrib import admin
from media.models import Media

# Register your models here.


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):

    list_display = [
        "listing",
        "media_type",
        "position",
        "is_cover",
        "created_at",
    ]

    list_filter = [
        "media_type",
        "is_cover",
    ]

    search_fields = [
        "listing__title",
        "public_id",
    ]