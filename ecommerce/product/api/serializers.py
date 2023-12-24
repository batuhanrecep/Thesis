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
        
    
    def perform_update(self, serializer):
        seller = self.context['request'].user
        serializer.save(seller=seller)


class BasicProductSerializer(ModelSerializer):    
    store_name = serializers.ReadOnlyField(source='seller.store_name')
    class Meta:
        model = Product
        fields = ('title','stock','id','store_name','seller','regular_price') 
        read_only_fields = ('seller',)
