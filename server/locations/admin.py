from django.contrib import admin
from locations.models import Location

# Register your models here.

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = [
        "country",
        "city",
        "area",
        "is_active",
    ]

    list_filter = [
        "country",
        "city",
        "is_active",
    ]

    search_fields = [
        "country",
        "city",
        "area",
    ]