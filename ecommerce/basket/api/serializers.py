from pyexpat import model
from rest_framework.serializers import ModelSerializer
from ..models import  BasketItem
from product.models import Product
from rest_framework.exceptions import APIException
from rest_framework import status
from rest_framework import serializers
from product.api.serializers import ProductSerializer, BasicProductSerializer

class QuantityError(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = "Quantity is more than the product's stock"


class BasketItemSerializer(ModelSerializer):
    class Meta:
        model = BasketItem
        fields = ['id', 'product', 'quantity', 'total_price']

    product = ProductSerializer(read_only=True)


class WriteBasketItemSerializer(ModelSerializer):
    class Meta:
        model = BasketItem
        fields = ['id', 'product_id', 'quantity']

    product_id = serializers.IntegerField()

    def validate_product_id(self, product_id):
        if not Product.objects.filter(pk=product_id).exists():
            raise serializers.ValidationError('No product with the given id was found')
        return product_id

    def update(self, basket_item, validated_data):
        if validated_data['quantity'] > basket_item.product.stock:
            raise QuantityError()
        return super().update(basket_item, validated_data)

    def save(self, **kwargs):
        basket = self.context['basket']

        # Update the quantity directly instead of adding the value
        if self.instance is not None:
            self.update(self.instance, self.validated_data)
            return self.instance

        product_id = self.validated_data['product_id']
        quantity = self.validated_data['quantity']
        try:
            basket_item = BasketItem.objects.get(basket=basket, product_id=product_id)
            basket_item.quantity += quantity
        except BasketItem.DoesNotExist:
            basket_item = BasketItem(basket=basket, **self.validated_data)

        if basket_item.quantity > basket_item.product.stock:
            raise QuantityError()

        basket_item.save()
        self.instance = basket_item
        return self.instance

class BasicBasketItemSerializer(ModelSerializer):
    class Meta:
        model = BasketItem
        fields = ['id', 'product', 'quantity', 'total_price']

    product = BasicProductSerializer(read_only=True)