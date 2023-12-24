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
    order_items = OrderDetailsSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ('user','shipping_address','billing_address', 'order_items', 'basket_items')  # Make user field read-only during creation

    def create(self, validated_data):
        user = self.context['request'].user
        order = Order(user=user, **validated_data)
        order.save()
        return order