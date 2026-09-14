from rest_framework.viewsets import ModelViewSet
from currencies.models import Currency
from currencies.serializers.currency import CurrencySerializer
from common.permissions import IsAdminOrReadOnly


class CurrencyViewSet(ModelViewSet):
    serializer_class = CurrencySerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Currency.objects.all()
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return queryset
        return queryset.filter(is_active=True)