from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import AddressViewSet, AddressUpdateAPIView, ListShippingAddressAPIView,DefaultAddressUpdateAPIView



#localhost/address/...
#http://127.0.0.1:8000/api/address/
#http://127.0.0.1:8000/api/address/
urlpatterns = [
    path('update/<int:pk>/', AddressUpdateAPIView.as_view(), name='address-update-profile'),
    path('get/', ListShippingAddressAPIView.as_view(), name='get-shipping-address'),
    path('default/<int:pk>/', DefaultAddressUpdateAPIView.as_view(), name='change-default-address'),
]

router = DefaultRouter()
router.register('all', AddressViewSet, basename='all address')

urlpatterns += router.urls