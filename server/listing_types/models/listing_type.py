from django.db import models
from django.utils.text import slugify

from common.models import BaseModel

# Listing types like Sale, Rent, Exchange, Auction, Free etc.
class ListingType(BaseModel):
    name = models.CharField(max_length=100,unique=True,)
    slug = models.SlugField(max_length=100,unique=True,blank=True,)
    is_active = models.BooleanField(default=True,)

    class Meta:
        ordering = ["name"]
        verbose_name = "Listing Type"
        verbose_name_plural = "Listing Types"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name