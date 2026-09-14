# accounts/serializers/auth.py

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    password_confirm = serializers.CharField(
        write_only=True,
    )

    display_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
        max_length=100,
    )

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "display_name",
            "phone_number",
            "password",
            "password_confirm",
        ]

    def validate_email(self, value):
        email = value.lower().strip()

        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return email

    def validate_username(self, value):
        username = value.strip()

        if User.objects.filter(
            username__iexact=username
        ).exists():
            raise serializers.ValidationError(
                "This username is already taken."
            )

        return username

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({
                "password_confirm": "Passwords do not match."
            })

        return attrs


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs["email"].lower().strip()

        user = authenticate(
            request=self.context.get("request"),
            username=email,
            password=attrs["password"],
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "This account is inactive."
            )

        attrs["user"] = user

        return attrs


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def save(self, **kwargs):
        token = RefreshToken(
            self.validated_data["refresh"]
        )

        token.blacklist()


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        return value.lower().strip()


class ResetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()

    new_password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    new_password_confirm = serializers.CharField(
        write_only=True,
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