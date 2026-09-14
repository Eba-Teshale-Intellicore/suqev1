# accounts/serializers/password.py

from rest_framework import serializers


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    new_password_confirm = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):
        if (
            attrs["new_password"]
            != attrs["new_password_confirm"]
        ):
            raise serializers.ValidationError({
                "new_password_confirm":
                    "Passwords do not match."
            })

        return attrs