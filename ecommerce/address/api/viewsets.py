from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from ..models import Address
from .serializers import AddressSerializer
from authentication.permissions import IsOwnerOrReadOnly

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]