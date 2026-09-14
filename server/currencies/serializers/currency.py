from rest_framework import serializers
from currencies.models import Currency

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = [
            "id",
            "name",
            "code",
            "symbol",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
    def validate_code(self, value):
        return value.upper().strip()