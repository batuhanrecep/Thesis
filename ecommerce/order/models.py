from django.db import models
from authentication.models import Customer, Seller
from address.models import Address
from basket.models import BasketItem
from product.models import Product


class Order(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('C', 'Confirmed'),
        ('S', 'Shipped'),
        ('D', 'Delivered'),
    )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, help_text="Customer who is ordering")
    shipping_address = models.ForeignKey(Address, related_name='shipping_address', on_delete=models.SET_NULL, null=True)
    billing_address = models.ForeignKey(Address, related_name='billing_address', on_delete=models.SET_NULL, null=True)
    basket_items = models.ManyToManyField(BasketItem)
    #total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    created_at = models.DateTimeField(auto_now_add=True)

    # paymentmethod =

    def __str__(self):
        return f"Order {self.id}"


class OrderDetails(models.Model):
    user2 = models.ForeignKey(Seller, on_delete=models.CASCADE, help_text="Seller's Order")
    #order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"OrderItem {self.id} - {self.product.title}"

    @property
    def quantity(self):
        return self.basketitem.quantity if self.basketitem else None