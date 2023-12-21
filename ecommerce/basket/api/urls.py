from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BasketItemViewSet
from . import views



#localhost/basket/...
#http://127.0.0.1:8000/api/basket/
#http://127.0.0.1:8000/api/basket/items/
urlpatterns = [

]

router = DefaultRouter()
router.register('items', BasketItemViewSet, basename='basket-items')
urlpatterns += router.urls