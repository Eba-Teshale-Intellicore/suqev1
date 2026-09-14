from django.db import models

from common.models import BaseModel
from accounts.models import User


class Profile(BaseModel):

    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile",)
    display_name = models.CharField(max_length=100,blank=True,)
    bio = models.TextField(blank=True,)
    avatar = models.URLField(blank=True,null=True,)
    city = models.CharField(max_length=100,blank=True,)
    preferred_language = models.CharField(max_length=50,default="English",)
    followers_count = models.PositiveIntegerField(default=0,)
    following_count = models.PositiveIntegerField(default=0,)
    listings_count = models.PositiveIntegerField(default=0,)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.display_name or self.user.username