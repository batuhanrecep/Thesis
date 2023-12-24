from rest_framework import serializers
from ..models import Order, OrderDetails
from authentication.api.serializers import GetUserSerializer
from address.api.serializers import AddressSerializer
from basket.api.serializers import BasketItemSerializer




class OrderDetailsSerializer(serializers.ModelSerializer):
    product_title = serializers.ReadOnlyField(source='product.title')
    class Meta:
        model = OrderDetails
        fields = "__all__"
    
class OrderSerializer(serializers.ModelSerializer):
    shipping_address = AddressSerializer(read_only=True)
    billing_address = AddressSerializer(read_only=True)
    basket_items = BasketItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ('customer','shipping_address','billing_address', 'order_items')  

    def create(self, validated_data):
        customer = self.context['request'].user
        order = Order(customer=customer, **validated_data)
        order.save()
        return order