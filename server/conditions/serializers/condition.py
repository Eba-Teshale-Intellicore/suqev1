from rest_framework import serializers
from conditions.models import Condition

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = [
            "id",
            "name",
            "slug",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "created_at",
            "updated_at",
        ]