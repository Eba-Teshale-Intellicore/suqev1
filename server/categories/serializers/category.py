from rest_framework import serializers
from categories.models import Category

class CategorySerializer(serializers.ModelSerializer):
    subcategories_count = serializers.IntegerField(
        source="subcategories.count",
        read_only=True,
    )

    class Meta:
        model = Category

        fields = [
            "id",
            "name",
            "slug",
            "description",
            "parent",
            "subcategories_count",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "slug",
            "subcategories_count",
            "created_at",
            "updated_at",
        ]