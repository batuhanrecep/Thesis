from django.db import models
from django_countries.fields import CountryField
from authentication.models import UserAccount

# Create your models here.

ADDRESS_CHOICES = (
    ('B', 'Billing'),
    ('S', 'Shipping'),
)


class Address(models.Model):
    user = models.ForeignKey(UserAccount,on_delete=models.CASCADE)

    mahalle = models.CharField(max_length=50)
    cadde = models.CharField(max_length=50)
    sokak = models.CharField(max_length=50)
    apartman = models.CharField(max_length=50)
    daire = models.CharField(max_length=50)
    semt = models.CharField(max_length=50)
    sehir = models.CharField(max_length=50)
    country = CountryField(multiple=False)
    post_code = models.CharField(max_length=10)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES)
    default = models.BooleanField(default=True)
    
    def __str__(self):
        return self.user.email


