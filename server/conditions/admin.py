from django.contrib import admin
from conditions.models import Condition

# Register your models here.

@admin.register(Condition)
class ConditionAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "slug",
        "is_active",
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