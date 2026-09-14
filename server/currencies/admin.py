from django.contrib import admin
from currencies.models import Currency

# Register your models here.

@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "code",
        "symbol",
        "is_active",
    ]

    search_fields = [
        "name",
        "code",
    ]

    list_filter = [
        "is_active",
    ]