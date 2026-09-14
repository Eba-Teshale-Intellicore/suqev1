from django.db.models import Q

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from media.models import Media
from media.permissions import (
    IsListingOwnerOrStaffOrReadOnly,
)
from media.serializers.listing_media import (
    MediaSerializer,
    MediaCreateSerializer,
    MediaUpdateSerializer,
)
from media.services.media import (
    create_media,
    delete_media_object,
)


class MediaViewSet(ModelViewSet):

    permission_classes = [
        IsListingOwnerOrStaffOrReadOnly
    ]

    def get_queryset(self):

        queryset = (
            Media.objects
            .select_related(
                "listing",
                "listing__seller",
                "listing__seller__user",
            )
        )

        user = self.request.user

        if (
            user.is_authenticated
            and user.is_staff
        ):
            return queryset

        if user.is_authenticated:
            return queryset.filter(
                Q(listing__status="active")
                | Q(listing__seller__user=user)
            )

        return queryset.filter(
            listing__status="active"
        )

    def get_serializer_class(self):

        if self.action == "create":
            return MediaCreateSerializer

        if self.action in [
            "update",
            "partial_update",
        ]:
            return MediaUpdateSerializer

        return MediaSerializer

    def perform_create(self, serializer):

        data = serializer.validated_data

        serializer.instance = create_media(
            user=self.request.user,
            listing=data["listing"],
            file=data["file"],
            media_type=data["media_type"],
            position=data.get("position", 0),
            is_cover=data.get("is_cover", False),
        )

    def perform_destroy(self, instance):

        delete_media_object(
            user=self.request.user,
            media=instance,
        )