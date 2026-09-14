from django.db import models
from django.utils.text import slugify

# conditons like the New, Like New, Good, Fair, Repairable, Poor, etc. 
# These conditions will be used to describe the condition of the items listed on the platform.
from common.models import BaseModel

class Condition(BaseModel):
    name = models.CharField(max_length=100,unique=True,)
    slug = models.SlugField(max_length=100,unique=True,blank=True,)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Condition"
        verbose_name_plural = "Conditions"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

# For Example
# New         → new
# Like New    → like-new
# Good        → good
# Fair        → fair
# Repairable  → repairable
# Poor        → poor