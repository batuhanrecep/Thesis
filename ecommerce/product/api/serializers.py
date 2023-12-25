from decimal import Decimal
from pyexpat import model
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import Product, Category
from rest_framework.response import Response



class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','slug')   

class ProductSerializer(ModelSerializer):    
    category_name=serializers.SerializerMethodField(read_only=True)
    store_name = serializers.ReadOnlyField(source='seller.store_name')
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('seller',)

    def get_category_name(self, obj):
        try:
            return list(obj.categories.values_list('name', flat=True))
        except AttributeError:
            return None
    
    def create(self, validated_data):
        seller = self.context['request'].user
        product = Product(seller=seller, **validated_data)
        product.save()
        return product

    def update(self, instance, validated_data):
        # Update fields based on validated_data
        instance.title = validated_data.get('title', instance.title)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.description = validated_data.get('description', instance.description)
        instance.regular_price = validated_data.get('regular_price', instance.regular_price)
        instance.discount_percentage = validated_data.get('discount_percentage', instance.discount_percentage)

        # Calculate discount_price and update regular_price if discount_percentage is not zero
        discount_percentage_decimal = Decimal(instance.discount_percentage)
        instance.discount_price = instance.regular_price - (instance.regular_price * (discount_percentage_decimal / 100))
        if discount_percentage_decimal != 0:
            instance.regular_price = instance.discount_price

        # Save the instance
        instance.save()
        return instance        
    

    def perform_update(self, serializer):
        seller = self.context['request'].user
        serializer.save(seller=seller)


class BasicProductSerializer(ModelSerializer):    
    store_name = serializers.ReadOnlyField(source='seller.store_name')
    class Meta:
        model = Product
        fields = ('title','stock','id','store_name','seller','regular_price') 
        read_only_fields = ('seller',)
