from pyexpat import model
from rest_framework.serializers import ModelSerializer
from ..models import Product, Category

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title', 'image', 'stock', 'description', 'is_active', 'is_home', 'slug', 'categories','regular_price', 'discount_price','updated_at','created_at')


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','slug')        


