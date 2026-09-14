from rest_framework.viewsets import ModelViewSet

from conditions.models import Condition
from conditions.serializers.condition import ConditionSerializer
from common.permissions import IsAdminOrReadOnly

class ConditionViewSet(ModelViewSet):
    serializer_class = ConditionSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Condition.objects.all()
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return queryset
        return queryset.filter(is_active=True)