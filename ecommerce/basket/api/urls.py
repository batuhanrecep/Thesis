from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BasketItemViewSet




#localhost/basket/...
urlpatterns = [
 
]
router = DefaultRouter()
router.register('cart-items', BasketItemViewSet, basename='basket-items')
urlpatterns += router.urls