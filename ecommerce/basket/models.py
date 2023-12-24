from django.db import models
#from ecommerce.authentication.api.serializers import User
from product.models import Product
from authentication.models import Customer, UserAccount
from django.core.validators import MinValueValidator
from django.conf import settings

class Basket(models.Model):
    customer = models.OneToOneField(UserAccount, on_delete=models.CASCADE)

    # def clear(self):
    #     # Implement the logic to clear the basket
    #     self.basketitem_set.all().delete()

class BasketItem(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['basket', 'product'], name='unique_product_in_basket')
        ]

    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    @property
    def total_price(self):
        return self.quantity * self.product.regular_price