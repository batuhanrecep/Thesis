from pyexpat import model
from rest_framework.serializers import ModelSerializer
from ..models import Product, Category, OrderWithoutMembership

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title', 'image', 'price', 'stock', 'description', 'is_active', 'is_home', 'slug', 'categories')


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','slug')        


class OrderWithoutMembershipSerializer(ModelSerializer):
    class Meta:
        model = OrderWithoutMembership
        fields = ('firstname','lastname','phone_number','zip_code', 'city', 'country', 'street', 'state','is_active')


