from django.db import models
from django.db.models import Q

from common.models import BaseModel
from listings.models import Listing


class Media(BaseModel):
    class MediaType(models.TextChoices):
        IMAGE = "image", "Image"
        VIDEO = "video", "Video"

    listing = models.ForeignKey(Listing,on_delete=models.CASCADE,related_name="media",)
    media_type = models.CharField(max_length=10,choices=MediaType.choices,)
    url = models.URLField()
    public_id = models.CharField(max_length=500,)
    thumbnail_url = models.URLField(blank=True,default="",)
    position = models.PositiveIntegerField(default=0,)
    is_cover = models.BooleanField(default=False,)

    class Meta:
        ordering = [
            "position",
            "created_at",
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "listing",
                    "position",
                ],
                name="unique_media_position_per_listing",
            ),

            models.UniqueConstraint(
                fields=[
                    "listing",
                ],
                condition=Q(is_cover=True),
                name="one_cover_media_per_listing",
            ),
        ]

    def __str__(self):
        return f"{self.media_type} - {self.listing.title}"