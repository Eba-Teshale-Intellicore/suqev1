

from rest_framework.routers import DefaultRouter

from listing_types.views.listing_type import ListingTypeViewSet


router = DefaultRouter()

router.register(r"listing-types",ListingTypeViewSet,basename="listing-type",)

urlpatterns = router.urls