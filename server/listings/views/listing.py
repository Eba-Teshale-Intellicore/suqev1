from django.db.models import Q

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from listings.filters import ListingFilter
from listings.models import Listing
from listings.serializers.listing import ListingSerializer
from listings.serializers.listing_create import ListingCreateSerializer
from listings.serializers.listing_update import ListingUpdateSerializer
from listings.services.create_listing import create_listing
from listings.services.delete_listing import delete_listing
from listings.services.update_listing import update_listing


class ListingViewSet(ModelViewSet):

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_class = ListingFilter

    search_fields = [
        "title",
        "description",
        "category__name",
        "location__city",
        "location__area",
    ]

    ordering_fields = [
        "created_at",
        "price",
        "view_count",
        "likes_count",
    ]

    ordering = ["-created_at"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = (
            Listing.objects
            .select_related(
                "seller__user",
                "category",
                "condition",
                "listing_type",
                "location",
                "currency",
            )
            .prefetch_related("media")
        )

        user = self.request.user

        if user.is_authenticated and user.is_staff:
            return queryset

        if self.action in [
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            if user.is_authenticated:
                return queryset.filter(
                    Q(status=Listing.Status.ACTIVE)
                    | Q(seller__user=user)
                )

            return queryset.filter(
                status=Listing.Status.ACTIVE
            )

        return queryset.filter(
            status=Listing.Status.ACTIVE
        )

    def get_serializer_class(self):
        if self.action == "create":
            return ListingCreateSerializer

        if self.action in ["update", "partial_update"]:
            return ListingUpdateSerializer

        return ListingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        self.perform_create(serializer)

        listing = serializer.instance

        output_serializer = ListingSerializer(
            listing,
            context={
                "request": request,
            },
        )

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED,
        )

    def perform_create(self, serializer):
        serializer.instance = create_listing(
            user=self.request.user,
            validated_data=serializer.validated_data,
        )

    def perform_update(self, serializer):
        update_listing(
            user=self.request.user,
            listing=serializer.instance,
            validated_data=serializer.validated_data,
        )

    def destroy(self, request, *args, **kwargs):
        listing = self.get_object()

        delete_listing(
            user=request.user,
            listing=listing,
        )

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )