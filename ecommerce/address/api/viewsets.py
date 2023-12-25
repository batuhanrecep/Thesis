from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from ..models import Address
from .serializers import AddressSerializer
from authentication.permissions import IsOwnerOrReadOnly, IsOwner

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly, IsOwner]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


