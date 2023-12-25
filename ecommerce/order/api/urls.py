from django.urls import path
from .views import OrderListAPIView, OrderCreateAPIView, SellerOrderListAPIView







#localhost/api/order/

urlpatterns = [
    path('list/', OrderListAPIView.as_view(), name='order-list'),
    path('list/seller/', SellerOrderListAPIView.as_view(), name='order-list'),
    path('create/', OrderCreateAPIView.as_view(), name='order-item-create'),
]