from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from listings.models import Listing
from listings.permissions import IsListingOwnerOrStaff
from listings.serializers.listing import ListingSerializer
from listings.services.update_listing import (
    publish_listing,
    archive_listing,
)


class PublishListingView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsListingOwnerOrStaff,
    ]

    def post(self, request, pk):

        listing = get_object_or_404(
            Listing,
            pk=pk,
        )

        self.check_object_permissions(
            request,
            listing,
        )

        listing = publish_listing(
            user=request.user,
            listing=listing,
        )

        return Response(
            ListingSerializer(
                listing,
                context={"request": request},
            ).data,
            status=status.HTTP_200_OK,
        )


class ArchiveListingView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsListingOwnerOrStaff,
    ]

    def post(self, request, pk):

        listing = get_object_or_404(
            Listing,
            pk=pk,
        )

        self.check_object_permissions(
            request,
            listing,
        )

        listing = archive_listing(
            user=request.user,
            listing=listing,
        )

        return Response(
            ListingSerializer(
                listing,
                context={"request": request},
            ).data,
            status=status.HTTP_200_OK,
        )