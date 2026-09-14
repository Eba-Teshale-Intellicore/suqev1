from .base import *
import os


# ============================================================
# PRODUCTION
# ============================================================

DEBUG = False


# ============================================================
# HOSTS
# ============================================================

DJANGO_ALLOWED_HOSTS = os.getenv(
    "DJANGO_ALLOWED_HOSTS",
    "suqev1dev.onrender.com",
)

ALLOWED_HOSTS = [
    host.strip()
    for host in DJANGO_ALLOWED_HOSTS.split(",")
    if host.strip()
]


# ============================================================
# CSRF
# ============================================================

DJANGO_CSRF_TRUSTED_ORIGINS = os.getenv(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    "https://suqev1dev.onrender.com",
)

CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in DJANGO_CSRF_TRUSTED_ORIGINS.split(",")
    if origin.strip()
]


# ============================================================
# SECURITY
# ============================================================

SECURE_BROWSER_XSS_FILTER = True

SECURE_CONTENT_TYPE_NOSNIFF = True

SECURE_HSTS_SECONDS = 31536000

SECURE_HSTS_INCLUDE_SUBDOMAINS = True

SECURE_HSTS_PRELOAD = True

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https",
)

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_SSL_REDIRECT = True
# ============================================================
# DATABASE
# ============================================================

# Configure your production database here.
#
# Example:
#
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": os.getenv("POSTGRES_DB"),
#         "USER": os.getenv("POSTGRES_USER"),
#         "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
#         "HOST": os.getenv("POSTGRES_HOST"),
#         "PORT": os.getenv("POSTGRES_PORT", "5432"),
#     }
# }