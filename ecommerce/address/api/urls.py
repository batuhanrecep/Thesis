from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import AddressViewSet



#localhost/address/...
#http://127.0.0.1:8000/api/address/
#http://127.0.0.1:8000/api/address/all/
urlpatterns = [

]

router = DefaultRouter()
router.register(r'all', AddressViewSet, basename='all address')
urlpatterns += router.urls