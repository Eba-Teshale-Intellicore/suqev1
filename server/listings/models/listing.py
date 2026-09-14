from django.db import models

from common.models import BaseModel
from categories.models import Category
from conditions.models import Condition
from currencies.models import Currency
from listing_types.models import ListingType
from locations.models import Location
from profiles.models.profile import Profile


class Listing(BaseModel):

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        ACTIVE = "active", "Active"
        SOLD = "sold", "Sold"
        ARCHIVED = "archived", "Archived"

    seller = models.ForeignKey(Profile,on_delete=models.PROTECT,related_name="listings",)
    category = models.ForeignKey(Category,on_delete=models.PROTECT,related_name="listings",)
    title = models.CharField(max_length=255,)
    description = models.TextField()
    price = models.DecimalField(max_digits=14,decimal_places=2,)
    currency = models.ForeignKey(Currency,on_delete=models.PROTECT,related_name="listings",)
    condition = models.ForeignKey(Condition,on_delete=models.PROTECT,related_name="listings",)
    listing_type = models.ForeignKey(ListingType,on_delete=models.PROTECT,related_name="listings",)
    phone_number = models.CharField(max_length=20,blank=True,default="",)
    location = models.ForeignKey(Location,on_delete=models.PROTECT,related_name="listings",)
    status = models.CharField(max_length=20,choices=Status.choices,default=Status.ACTIVE,db_index=True,)
    view_count = models.PositiveIntegerField(
        default=0,
    )

    likes_count = models.PositiveIntegerField(default=0,)
    comments_count = models.PositiveIntegerField(default=0,)
    shares_count = models.PositiveIntegerField(default=0,)
    saves_count = models.PositiveIntegerField(default=0,)
    is_featured = models.BooleanField(default=False,)
    is_promoted = models.BooleanField(default=False,)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(
                fields=["status", "-created_at"],
            ),
            models.Index(
                fields=["seller", "-created_at"],
            ),
            models.Index(
                fields=["category", "-created_at"],
            ),
            models.Index(
                fields=["location", "-created_at"],
            ),
        ]

    def __str__(self):
        return self.title