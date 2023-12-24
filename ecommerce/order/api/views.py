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

        with transaction.atomic():
            order = serializer.save()

            shipping_address = user.address_set.filter(address_type='S', default=True).first()
            billing_address = user.address_set.filter(address_type='B', default=True).first()

            if shipping_address:
                order.shipping_address = shipping_address
            if billing_address:
                order.billing_address = billing_address

            order.save()

            # Create OrderDetails instances for each BasketItem
            for basket_item in basket_items:
                OrderDetails.objects.create(order=order, product=basket_item.product, quantity=basket_item.quantity)

            # Clear the user's basket after order creation
            user.basket.clear()

        return order

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     # Include 'basket_items' in the response
    #     data['basket_items'] = BasketItemSerializer(instance.basket_items.all(), many=True).data
    #     return data



class OrderListAPIView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    #permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)


class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderDetailsSerializer
    #permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]



class OrderDetailsCreateAPIView(generics.CreateAPIView):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]



class OrderDetailsCreateAPIView(generics.CreateAPIView):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

