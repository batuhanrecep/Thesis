from rest_framework import generics, permissions, status
from ..models import Order, OrderedItems
from .serializers import OrderSerializer, SellerOrderSerializer
from basket.api.views import get_basket_for_user
from rest_framework.response import Response
from django.db import transaction

class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = self.request.user
        shipping_address = user.address_set.filter(address_type='S', default=True).first()
        billing_address = user.address_set.filter(address_type='B', default=True).first()
        basket = get_basket_for_user(self.request.user)
        basket_items = basket.basketitem_set.all()

        if basket_items.count() == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            order = Order(customer=basket.customer)
            order.shipping_address = shipping_address
            order.billing_address = billing_address
            order.save()

            ordered_items = []
            for basket_item in basket_items:
                product = basket_item.product
                if basket_item.quantity > basket_item.product.stock:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                ordered_items.append(OrderedItems(
                    order=order,
                    product=basket_item.product,
                    regular_price=product.regular_price,
                    quantity=basket_item.quantity
                ))

                product.stock -= basket_item.quantity
                product.save()

            OrderedItems.objects.bulk_create(ordered_items, unique_fields=['order', 'product'])

            return Response(data={'order_id': order.id}, status=status.HTTP_201_CREATED)
        

class OrderListAPIView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user).order_by('-id')

class SellerOrderListAPIView(generics.ListAPIView):
    serializer_class = SellerOrderSerializer
    permission_classes = [permissions.IsAuthenticated ]

    def get_queryset(self):
        seller = self.request.user
        queryset = Order.objects.filter(items__product__seller=seller).distinct()
        return queryset



seller_order_list_view = SellerOrderListAPIView.as_view()


