from rest_framework.routers import DefaultRouter
from conditions.views.condition import ConditionViewSet

router = DefaultRouter()

router.register("conditions",ConditionViewSet,basename="condition",)

urlpatterns = router.urls

# Now creates
# GET      /conditions/
# GET      /conditions/<uuid>/

# Admin:
# POST     /conditions/
# PUT      /conditions/<uuid>/
# PATCH    /conditions/<uuid>/
# DELETE   /conditions/<uuid>/