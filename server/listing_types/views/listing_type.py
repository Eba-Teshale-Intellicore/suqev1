from rest_framework import viewsets

from listing_types.models import ListingType
from listing_types.serializers.listing_type import ListingTypeSerializer
from common.permissions import IsAdminOrReadOnly


class ListingTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ListingTypeSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = ListingType.objects.all()
        user = self.request.user

        if user.is_authenticated and user.is_staff:
            return queryset
        return queryset.filter(is_active=True)