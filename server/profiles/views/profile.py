# # from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
# # from rest_framework.generics import RetrieveUpdateAPIView
# # from rest_framework.permissions import IsAuthenticated, AllowAny

# # from profiles.models.profile import Profile
# # from profiles.serializers.profile import ProfileSerializer

# # class ProfileViewSet(ModelViewSet):
# #     serializer_class = ProfileSerializer
# #     permission_classes = [IsAuthenticated]

# #     def get_queryset(self):
# #         if self.request.user.is_superuser:
# #             return Profile.objects.all()
# #         return Profile.objects.filter(user=self.request.user)

# # class UpdateProfileViewSet(RetrieveUpdateAPIView):
# #     serializer_class = ProfileSerializer
# #     permission_classes = [IsAuthenticated]

# #     def get_object(self):
# #         return self.request.user.profile

# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.response import Response
# from rest_framework.views import APIView

# from profiles.serializers import ProfileSerializer
# from profiles.services.profile import update_profile

# from rest_framework.generics import RetrieveAPIView
# from profiles.models import Profile


# class MyProfileView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         profile = request.user.profile
#         serializer = ProfileSerializer(profile)

#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK,
#         )

#     def patch(self, request):
#         serializer = ProfileSerializer(
#             request.user.profile,
#             data=request.data,
#             partial=True,
#         )
#         serializer.is_valid(raise_exception=True)
#         profile = update_profile(
#             user=request.user,
#             **serializer.validated_data,
#         )

#         return Response(
#             ProfileSerializer(profile).data,
#             status=status.HTTP_200_OK,
#         )



# class PublicProfileView(RetrieveAPIView):

#     queryset = Profile.objects.select_related("user")

#     serializer_class = ProfileSerializer

#     permission_classes = [AllowAny]

#     lookup_field = "id"

# profiles/views/profile.py

from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from profiles.models import Profile
from profiles.serializers import ProfileSerializer
from profiles.services.profile import update_profile


class MyProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = Profile.objects.get_or_create(
            user=request.user,
            defaults={
                "display_name":
                    request.user.username,
            },
        )

        serializer = ProfileSerializer(profile)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        profile, _ = Profile.objects.get_or_create(
            user=request.user,
            defaults={
                "display_name":
                    request.user.username,
            },
        )

        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True
        )

        profile = update_profile(
            user=request.user,
            **serializer.validated_data,
        )

        return Response(
            ProfileSerializer(profile).data,
            status=status.HTTP_200_OK,
        )


class PublicProfileView(RetrieveAPIView):

    queryset = Profile.objects.select_related(
        "user"
    )

    serializer_class = ProfileSerializer

    permission_classes = [AllowAny]

    lookup_field = "id"