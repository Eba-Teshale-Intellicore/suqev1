# # from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
# # from rest_framework.generics import RetrieveUpdateAPIView
# # from rest_framework.permissions import IsAuthenticated, AllowAny

# # from accounts.models.user import User
# # from accounts.serializers.user import UserSerializer

# # class UserViewSet(ModelViewSet):
# #     serializer_class = UserSerializer
# #     permission_classes = [IsAuthenticated]

# #     def get_queryset(self):
# #         if self.request.user.is_superuser:
# #             return User.objects.all()
# #         return User.objects.filter(id=self.request.user.id)

# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView

# from accounts.serializers.user import UserSerializer


# class MeView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request):

#         serializer = UserSerializer(
#             request.user
#         )

#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK,
#         )

#     def patch(self, request):

#         serializer = UserSerializer(
#             request.user,
#             data=request.data,
#             partial=True,
#         )

#         serializer.is_valid(
#             raise_exception=True
#         )

#         serializer.save()

#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK,
#         )

# accounts/views/user.py

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.serializers.user import UserSerializer


class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(
            request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )