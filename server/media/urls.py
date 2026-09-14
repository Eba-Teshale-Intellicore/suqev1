from rest_framework.routers import DefaultRouter

from media.views.listing_media import MediaViewSet


router = DefaultRouter()

router.register(
    "media",
    MediaViewSet,
    basename="media",
)

urlpatterns = router.urls

# Now:
# GET     /api/v1/media/
# POST    /api/v1/media/

# GET     /api/v1/media/<uuid>/
# PUT     /api/v1/media/<uuid>/
# PATCH   /api/v1/media/<uuid>/
# DELETE  /api/v1/media/<uuid>/