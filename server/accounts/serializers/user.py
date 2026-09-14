from rest_framework import serializers

from accounts.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "id",
            "email",
            "username",
            "phone_number",
            "auth_provider",
            "role",
            "is_verified",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "email",
            "auth_provider",
            "role",
            "is_verified",
            "is_active",
            "created_at",
            "updated_at",
        ]