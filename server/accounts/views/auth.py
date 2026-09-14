# accounts/views/auth.py

from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import (
    urlsafe_base64_encode,
    urlsafe_base64_decode,
)

from rest_framework import status
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User

from accounts.serializers.auth import (
    RegisterSerializer,
    LoginSerializer,
    LogoutSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)

from accounts.serializers.user import UserSerializer

from accounts.services.auth import (
    register_user,
    reset_password,
)


class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = register_user(
            email=serializer.validated_data["email"],
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
            phone_number=serializer.validated_data.get(
                "phone_number"
            ),
            display_name=serializer.validated_data.get(
                "display_name"
            ),
        )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": UserSerializer(user).data,
                "tokens": {
                    "access": str(
                        refresh.access_token
                    ),
                    "refresh": str(refresh),
                },
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={
                "request": request,
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": UserSerializer(user).data,
                "tokens": {
                    "access": str(
                        refresh.access_token
                    ),
                    "refresh": str(refresh),
                },
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            {
                "detail":
                    "Successfully logged out."
            },
            status=status.HTTP_200_OK,
        )


class ForgotPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        email = serializer.validated_data["email"]

        user = User.objects.filter(
            email__iexact=email,
            is_active=True,
        ).first()

        # Do not reveal whether an account exists.
        if not user:
            return Response(
                {
                    "detail":
                        "If an account exists for this email, "
                        "a password reset link has been generated."
                },
                status=status.HTTP_200_OK,
            )

        uid = urlsafe_base64_encode(
            force_bytes(user.pk)
        )

        token = default_token_generator.make_token(
            user
        )

        # DEVELOPMENT ONLY.
        # Replace this with email delivery in production.
        reset_link = (
            f"suqe://reset-password/"
            f"{uid}/{token}"
        )

        return Response(
            {
                "detail":
                    "Password reset instructions generated.",
                "reset": {
                    "uid": uid,
                    "token": token,
                    "reset_link": reset_link,
                },
            },
            status=status.HTTP_200_OK,
        )


class ResetPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        uid = serializer.validated_data["uid"]
        token = serializer.validated_data["token"]

        try:
            user_id = urlsafe_base64_decode(
                uid
            ).decode()

            user = User.objects.get(
                pk=user_id,
                is_active=True,
            )

        except (
            TypeError,
            ValueError,
            OverflowError,
            User.DoesNotExist,
        ):
            return Response(
                {
                    "detail":
                        "Invalid password reset link."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(
            user,
            token,
        ):
            return Response(
                {
                    "detail":
                        "This password reset link is invalid or expired."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        reset_password(
            user=user,
            new_password=serializer.validated_data[
                "new_password"
            ],
        )

        return Response(
            {
                "detail":
                    "Password reset successfully."
            },
            status=status.HTTP_200_OK,
        )