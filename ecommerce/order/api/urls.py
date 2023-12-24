from django.urls import path
from .views import OrderListAPIView, OrderDetailAPIView, OrderDetailsCreateAPIView, OrderCreateAPIView







#localhost/api/order/

urlpatterns = [
    path('list/', OrderListAPIView.as_view(), name='order-list'),
    path('list/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('create/', OrderCreateAPIView.as_view(), name='order-item-create'),
]