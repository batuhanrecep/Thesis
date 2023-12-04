from pyexpat import model
from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from django_countries.fields import CountryField



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
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="productpic")
    price = models.PositiveIntegerField()
    stock = models.PositiveIntegerField()
    description = RichTextField()
    is_active = models.BooleanField(default=False)
    is_home = models.BooleanField(default=False)
    slug = models.SlugField(null=False, blank=True, unique=True, db_index=True, editable=False)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return f"{self.title}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

#! 
# """
# class OrderAddress(models.Model):
#     firstname = models.CharField(max_length=50) 
#     lastname = models.CharField(max_length=50)
#     phone_number = models.CharField(max_length=15)  
#     zip_code = models.CharField(max_length=10)
#     country = CountryField()
#     city = models.CharField(max_length=50)
#     street = models.CharField(max_length=255, blank=True, null=True)
#     state = models.CharField(max_length=50, blank=True, null=True)

#     def __str__(self):
#         return f"OrderAddress: {self.firstname} {self.lastname}, {self.city}, {self.country}"
# """

#! Order Üyeliksiz Satın Alım 

class OrderWithoutMembership(models.Model):
    firstname = models.CharField(max_length=50) 
    lastname = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)  
    zip_code = models.CharField(max_length=10)
    country = CountryField()
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return f"OrderWithoutMembership: {self.product.title}, {self.firstname} {self.lastname}, {self.city}, {self.country} "
