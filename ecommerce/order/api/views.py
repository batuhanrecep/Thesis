from rest_framework import generics, permissions
from ..models import Order, OrderDetails
from .serializers import OrderSerializer, OrderDetailsSerializer
from authentication.permissions import IsOwnerOrReadOnly
from basket.models import BasketItem
from rest_framework.response import Response
from basket.api.serializers import BasketItemSerializer
from django.db import transaction

class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        basket_items = BasketItem.objects.filter(basket__customer=user)
        
        order = serializer.save()

        order.basket_items.set(basket_items)

        shipping_address = user.address_set.filter(address_type='S', default=True).first()
        billing_address = user.address_set.filter(address_type='B', default=True).first()
        
        if shipping_address:
            order.shipping_address = shipping_address
        if billing_address:
            order.billing_address = billing_address

        order.save()

        # Clear the user's basket after order creation


        return order


        #user.basket.clear()

class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderDetailsSerializer
    #permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]



class OrderListAPIView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    #permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)



class OrderDetailsCreateAPIView(generics.CreateAPIView):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]




