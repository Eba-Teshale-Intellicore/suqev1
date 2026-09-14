from django.urls import path
from rest_framework.routers import DefaultRouter

from listings.views.listing import ListingViewSet
from listings.views.listing_actions import (
    PublishListingView,
    ArchiveListingView,
)


router = DefaultRouter()

router.register(
    "listings",
    ListingViewSet,
    basename="listing",
)


urlpatterns = router.urls

urlpatterns += [
    path(
        "listings/<uuid:pk>/publish/",
        PublishListingView.as_view(),
        name="listing-publish",
    ),

    path(
        "listings/<uuid:pk>/archive/",
        ArchiveListingView.as_view(),
        name="listing-archive",
    ),
]

# GET     /api/v1/listings/
# POST    /api/v1/listings/

# GET     /api/v1/listings/<uuid>/
# PUT     /api/v1/listings/<uuid>/
# PATCH   /api/v1/listings/<uuid>/
# DELETE  /api/v1/listings/<uuid>/

# POST    /api/v1/listings/<uuid>/publish/
# POST    /api/v1/listings/<uuid>/archive/