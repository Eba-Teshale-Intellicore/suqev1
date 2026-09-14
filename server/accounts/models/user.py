from django.contrib.auth.models import AbstractUser
from django.db import models

from common.models import BaseModel
from accounts.models.managers import UserManager


class User(BaseModel, AbstractUser):

    ROLE_CHOICES = (
        ("user", "User"),
        ("admin", "Admin"),
        ("moderator", "Moderator"),
    )

    AUTH_PROVIDER_CHOICES = (
        ("email", "Email"),
        ("google", "Google"),
    )

    email = models.EmailField(unique=True,db_index=True,)
    username = models.CharField(max_length=30,unique=True,db_index=True,)
    phone_number = models.CharField(max_length=20,blank=True,null=True,)
    google_sub = models.CharField(max_length=255,unique=True,null=True,blank=True,db_index=True,)
    auth_provider = models.CharField(max_length=20,choices=AUTH_PROVIDER_CHOICES,default="email",)
    role = models.CharField(max_length=20,choices=ROLE_CHOICES,default="user",)

    is_verified = models.BooleanField(default=False,)
    is_active = models.BooleanField(default=True,)
    is_staff = models.BooleanField(default=False,)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.email