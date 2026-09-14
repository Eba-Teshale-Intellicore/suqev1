from django.urls import path

from profiles.views.profile import (MyProfileView, PublicProfileView,)


urlpatterns = [
  path("me/", MyProfileView.as_view(), name="my-profile"),
  path("<uuid:id>/", PublicProfileView.as_view(), name="public-profile"),
]

# the resultt
# GET /api/profiles/me/
# PATCH /api/profiles/me/

# GET /api/profiles/<uuid>/