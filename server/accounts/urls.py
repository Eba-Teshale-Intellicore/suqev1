# from django.urls import path

# from accounts.views.auth import (RegisterView,LoginView,LogoutView,)
# from accounts.views.user import (MeView,)
# from accounts.views.password import (ChangePasswordView,)
# from rest_framework_simplejwt.views import (TokenRefreshView,)
# urlpatterns = [

#     # Authentication
#     path("auth/register/",RegisterView.as_view(),name="register",),
#     path("auth/login/",LoginView.as_view(),name="login",),
#     path("auth/logout/",LogoutView.as_view(),name="logout",),

#     # Current user
#     path("me/",MeView.as_view(),name="me",),

#     # Password
#     path("password/change/",ChangePasswordView.as_view(),name="change-password",),
#     # JWT Token Refresh
#     path("auth/token/refresh/",TokenRefreshView.as_view(),name="token_refresh",),
# ]

# # the final result is 
# # POST /api/accounts/auth/register/
# # POST /api/accounts/auth/login/
# # POST /api/accounts/auth/logout/
# # POST /api/accounts/auth/token/refresh/

# # GET  /api/accounts/me/
# # PATCH /api/accounts/me/

# # POST /api/accounts/password/change/

# accounts/urls.py

from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from accounts.views.auth import (
    RegisterView,
    LoginView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView,
)

from accounts.views.user import (
    MeView,
)

from accounts.views.password import (
    ChangePasswordView,
)


urlpatterns = [

    # Authentication
    path(
        "auth/register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
        "auth/login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "auth/logout/",
        LogoutView.as_view(),
        name="logout",
    ),

    # JWT
    path(
        "auth/token/refresh/",
        TokenRefreshView.as_view(),
        name="token-refresh",
    ),

    # Current user
    path(
        "me/",
        MeView.as_view(),
        name="me",
    ),

    # Password
    path(
        "password/change/",
        ChangePasswordView.as_view(),
        name="change-password",
    ),

    path(
        "password/forgot/",
        ForgotPasswordView.as_view(),
        name="forgot-password",
    ),

    path(
        "password/reset/",
        ResetPasswordView.as_view(),
        name="reset-password",
    ),
]