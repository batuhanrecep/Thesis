from ..models import Basket, BasketItem
from .serializers import WriteBasketItemSerializer, BasketItemSerializer
from authentication.models import  UserAccount
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

def get_basket_for_user(user):
    customer = get_object_or_404(UserAccount, email=user.email)
    basket, _ = Basket.objects.get_or_create(customer=customer)
    return basket

class BasketItemViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return BasketItem.objects.filter(basket=get_basket_for_user(self.request.user))

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['basket'] = get_basket_for_user(self.request.user)
        return context

    def get_serializer_class(self, *args, **kwargs):
        if self.action in ['create', 'partial_update']:
            return WriteBasketItemSerializer
        else:
            return BasketItemSerializer


