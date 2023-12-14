from django.db import models
from product.models import Product
from authentication.models import Customer
from django.core.validators import MinValueValidator


class Basket(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)


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