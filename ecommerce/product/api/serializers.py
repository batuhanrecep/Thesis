from pyexpat import model
from rest_framework.serializers import ModelSerializer
from ..models import Product, Category




class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','slug')   

class ProductSerializer(ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ('id', 'title', 'image', 'stock', 'description', 'is_active', 'is_home', 'slug', 'categories','regular_price', 'discount_price','updated_at','created_at')