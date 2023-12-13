from pyexpat import model
from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from django_countries.fields import CountryField
from decimal import Decimal
from django.conf import settings


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(null=False,blank=True,unique=True,db_index=True,editable=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Category: {self.name}" 


class Product(models.Model):
    title = models.CharField(verbose_name=("title"), help_text=("Required"), max_length=255)
    image = models.ImageField(upload_to="productpic")
    stock = models.PositiveIntegerField()
    description = RichTextField()
    is_active = models.BooleanField(default=False)
    is_home = models.BooleanField(default=False)
    slug = models.SlugField(null=False, blank=True, unique=True, db_index=True, editable=False)
    categories = models.ManyToManyField(Category, blank=True)
    created_at = models.DateTimeField(("Created at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(("Updated at"), auto_now=True)
    discount_price = models.DecimalField(verbose_name=("Discount price"),help_text=("Maximum 999.99"),max_digits=5,decimal_places=2,
        error_messages={
            "name": {
                "max_length": ("The price must be between 0 and 999.99."),
            },
        },
    )
    regular_price = models.DecimalField(verbose_name=("Regular price"),help_text=("Maximum 999.99"),max_digits=5,decimal_places=2,
        error_messages={
            "name": {
                "max_length":("The price must be between 0 and 999.99."),
            },
        },
    )

    def __str__(self):
        return f"{self.title}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

