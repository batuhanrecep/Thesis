from django.db import models
from authentication.models import Customer
from address.models import Address
from product.models import Product
from django.core.validators import MinValueValidator

class Order(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('H', 'Preparing'),
        ('S', 'Shipping'),
        ('D', 'Delivered'),
        ('C', 'Cancelled'),
    )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, help_text="Customer who is ordering")
    shipping_address = models.ForeignKey(Address, related_name='shipping_address', on_delete=models.SET_NULL, null=True)
    billing_address = models.ForeignKey(Address, related_name='billing_address', on_delete=models.SET_NULL, null=True)

    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    created_at = models.DateTimeField(auto_now_add=True)


    @property
    def total_price(self):
        items = OrderedItems.objects.filter(order=self)
        total = 0
        for item in items:
            total += item.total_price
        return total
    
    def __str__(self):
        return f"Order {self.id}"


    # paymentmethod =

class OrderedItems(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['order', 'product'], name='unique_product_in_order')
        ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    regular_price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        validators=[MinValueValidator(1)]
    )

    @property
    def total_price(self):
        return self.quantity * self.regular_price


