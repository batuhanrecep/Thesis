from django.urls import path
from .views import OrderListAPIView, OrderCreateAPIView, SellerOrderListAPIView, OrderUpdateAPIView







#localhost/api/order/

urlpatterns = [
    path('list/', OrderListAPIView.as_view(), name='order-list-customer'),
    path('list/seller/', SellerOrderListAPIView.as_view(), name='order-list-seller'),
    path('create/', OrderCreateAPIView.as_view(), name='order-item-create'),
    path('update/<int:pk>/', OrderUpdateAPIView.as_view(), name='order-update'),
]