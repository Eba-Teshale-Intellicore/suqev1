"""
URL configuration for suqev1_main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/",admin.site.urls,),
    path("api/accounts/",include("accounts.urls"),),
    path("api/profiles/",include("profiles.urls"),),
    path("api/v1/", include("categories.urls")),
    path("api/v1/", include("conditions.urls")),
    path("api/v1/", include("locations.urls")),
    path("api/v1/", include("currencies.urls")),
    path("api/v1/",include("listing_types.urls"),),
    path("api/v1/",include("listings.urls"),),
    path("api/v1/",include("media.urls"),),

]

# later use for this 
# /api/categories/
# /api/conditions/
# /api/locations/
# /api/currencies/
# /api/listings/
# /api/interactions/
# /api/feeds/
# /api/follows/
# /api/media/
# /api/notifications/
# /api/messaging/
# /api/reports/