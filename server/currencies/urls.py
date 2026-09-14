from rest_framework.routers import DefaultRouter
from currencies.views.currency import CurrencyViewSet

router = DefaultRouter()
router.register("currencies",CurrencyViewSet,basename="currency",)

urlpatterns = router.urls