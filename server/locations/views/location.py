from rest_framework.viewsets import ModelViewSet

from locations.models import Location
from locations.serializers.location import LocationSerializer
from common.permissions import IsAdminOrReadOnly


class LocationViewSet(ModelViewSet):
    serializer_class = LocationSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Location.objects.all()
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return queryset
        return queryset.filter(is_active=True)