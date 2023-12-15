from pyexpat import model
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import Product, Category




class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','slug')   

class ProductSerializer(ModelSerializer):    
    category_name=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'title', 'image', 'stock', 'description', 'is_active', 'is_home', 'slug', 'categories','regular_price', 'discount_price','updated_at','created_at','category_name')
    
    def get_category_name(self, obj):
        try:
            return list(obj.categories.values_list('name', flat=True))
        except AttributeError:
            return None