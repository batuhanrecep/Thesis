from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import  CategoryViewSet

category_router = DefaultRouter()
category_router.register(r'', CategoryViewSet, basename='category')