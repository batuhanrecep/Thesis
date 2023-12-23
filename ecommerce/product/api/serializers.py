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
    store_name = serializers.ReadOnlyField(source='user.store_name')
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('user',)

    def get_category_name(self, obj):
        try:
            return list(obj.categories.values_list('name', flat=True))
        except AttributeError:
            return None
    
    def create(self, validated_data):
        user = self.context['request'].user
        product = Product(user=user, **validated_data)
        product.save()
        return product
        
    
    def perform_update(self, serializer):
        user = self.context['request'].user
        serializer.save(user=user)
