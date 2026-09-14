from rest_framework.routers import DefaultRouter
from categories.views.category import CategoryViewSet


router = DefaultRouter()
router.register("categories",CategoryViewSet,basename="category",)

urlpatterns = router.urls

# # this Automatically gives:
# GET     /categories/
# POST    /categories/

# GET     /categories/<uuid>/
# PUT     /categories/<uuid>/
# PATCH   /categories/<uuid>/
# DELETE  /categories/<uuid>/