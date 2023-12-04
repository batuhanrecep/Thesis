from rest_framework.viewsets import ModelViewSet
from ..models import Product, Category, OrderWithoutMembership
from .serializers import OrderWithoutMembershipSerializer, ProductSerializer, CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class OrderWithoutMembershipViewSet(ModelViewSet):
    queryset = OrderWithoutMembership.objects.all()
    serializer_class = OrderWithoutMembershipSerializer


