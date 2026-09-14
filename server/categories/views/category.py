from rest_framework.viewsets import ModelViewSet

from categories.models import Category
from categories.serializers.category import CategorySerializer
from common.permissions import IsAdminOrReadOnly


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Category.objects.select_related("parent")

        user = self.request.user

        if user.is_authenticated and user.is_staff:
            return queryset

        return queryset.filter(is_active=True)