from django.db import models

from common.models import BaseModel


class Currency(BaseModel):
    name = models.CharField(max_length=100,unique=True,)
    code = models.CharField(max_length=3,unique=True,)
    symbol = models.CharField(max_length=10,blank=True,default="",)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["code"]
        verbose_name = "Currency"
        verbose_name_plural = "Currencies"

    def save(self, *args, **kwargs):
        self.code = self.code.upper().strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.code})"