from rest_framework import serializers
from ..models import Order, OrderedItems
from address.api.serializers import AddressSerializer
from product.api.serializers import BasicProductSerializer



class OrderedItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedItems
        fields = ['id', 'order_id', 'product', 'regular_price', 'quantity', 'total_price',]

    product = BasicProductSerializer()


class OrderSerializer(serializers.ModelSerializer):
    shipping_address = AddressSerializer(read_only=True)
    billing_address = AddressSerializer(read_only=True)
    items = OrderedItemsSerializer(many=True)
    
    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ('customer','shipping_address','billing_address',)  

    def create(self, validated_data):
        customer = self.context['request'].user
        order = Order(customer=customer, **validated_data)
        order.save()
        return order
    
class SellerOrderSerializer(serializers.ModelSerializer):
    shipping_address = AddressSerializer(read_only=True)
    billing_address = AddressSerializer(read_only=True)
    items = OrderedItemsSerializer(many=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ('customer', 'shipping_address', 'billing_address',)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        seller = self.context['request'].user
        filtered_items = representation['items']

        # Filter items to include only those belonging to the seller
        filtered_items = [item for item in filtered_items if item['product']['seller'] == seller.id]

        representation['items'] = filtered_items
        return representation