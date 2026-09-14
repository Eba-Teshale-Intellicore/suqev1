# accounts/views/password.py

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.serializers.password import (
    ChangePasswordSerializer,
)

from accounts.services.auth import change_password


class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        if not request.user.check_password(
            serializer.validated_data[
                "current_password"
            ]
        ):
            return Response(
                {
                    "current_password":
                        "Current password is incorrect."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        change_password(
            user=request.user,
            new_password=serializer.validated_data[
                "new_password"
            ],
        )

        return Response(
            {
                "detail":
                    "Password changed successfully."
            },
            status=status.HTTP_200_OK,
        )