from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from common.models import BaseModel


class Location(BaseModel):
    country = models.CharField(max_length=100,db_index=True,)
    city = models.CharField(max_length=100,db_index=True,)
    area = models.CharField(max_length=150,blank=True,default="",db_index=True,)
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True,
        validators=[
            MinValueValidator(-90),
            MaxValueValidator(90),
        ],
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True,
        validators=[
            MinValueValidator(-180),
            MaxValueValidator(180),
        ],
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = [
            "country",
            "city",
            "area",
        ]

        verbose_name = "Location"
        verbose_name_plural = "Locations"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "country",
                    "city",
                    "area",
                ],
                name="unique_location_country_city_area",
            )
        ]

    def __str__(self):
        if self.area:
            return f"{self.area}, {self.city}, {self.country}"

        return f"{self.city}, {self.country}"