from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet

category_router = DefaultRouter()
category_router.register(r'category', CategoryViewSet, basename='category')

product_router = DefaultRouter()
product_router.register(r'product', ProductViewSet, basename='product')

