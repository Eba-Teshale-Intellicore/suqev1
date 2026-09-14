from django.db import models
from django.utils.text import slugify

from common.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=255,unique=True,)
    slug = models.SlugField(max_length=255,unique=True,blank=True,)
    description = models.TextField(blank=True,default="",)
    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="subcategories",
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name