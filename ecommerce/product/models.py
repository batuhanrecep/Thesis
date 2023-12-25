from pyexpat import model
from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from django_countries.fields import CountryField
from django.conf import settings
from django.core.exceptions import ValidationError
from decimal import Decimal
from authentication.models import Seller, UserAccount
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
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE,help_text=("Owner Of the Product"))

    title = models.CharField(verbose_name=("title"), help_text=("Required"), max_length=255)
    image = models.ImageField(upload_to="productpic", null=True, blank=True)
    stock = models.PositiveIntegerField(help_text=("Required"))
    description = RichTextField()
    is_offer = models.BooleanField(default=False)
    is_slide  = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    slug = models.SlugField(null=False, blank=True, unique=True, db_index=True, editable=False)
    categories = models.ManyToManyField(Category, blank=True,help_text=("Required"))
    created_at = models.DateTimeField(("Created at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(("Updated at"), auto_now=True)
    regular_price = models.DecimalField(help_text=("Required-Maximum 999.999,99"),max_digits=8,decimal_places=2,
        error_messages={
            "name": {
                "max_length":("The price must be between 0 and 999.999.99."),
            },
        },
    )
    discount_percentage = models.PositiveIntegerField(help_text=("Required-Maximum 99.99"),default=0,
        error_messages={
            "name": {
                "max_length":("The discount percentege must be between 0 and 99"),
            },
        },  
    )

    @property
    def store_name(self):
        return self.seller.store_name if self.seller else None

    def clean(self):
        # Validate that discount_percentage is not greater than 100
        if self.discount_percentage > 100:
            raise ValidationError({'discount_percentage': 'Discount percentage must be between 0 and 100.'})

    def __str__(self):
        return f"{self.title}"

    def save(self, *args, **kwargs):
        if not self.id:
            discount_percentage_decimal = Decimal(self.discount_percentage)  
            self.discount_price = self.regular_price - (self.regular_price * (discount_percentage_decimal / 100))
            self.regular_price = self.discount_price
            if discount_percentage_decimal != 0:
                self.regular_price = self.regular_price

        self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def category_name(self):
        try:
            return list(self.categories.values_list('name', flat=True))
        except AttributeError:
            return None
    
