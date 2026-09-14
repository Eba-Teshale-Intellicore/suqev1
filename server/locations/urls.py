from rest_framework.routers import DefaultRouter

from locations.views.location import LocationViewSet

router = DefaultRouter()
router.register("locations",LocationViewSet,basename="location",)

urlpatterns = router.urls