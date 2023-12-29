from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status
from ..models import Address
from .serializers import AddressSerializer
from authentication.permissions import IsOwnerOrReadOnly, IsOwner
from rest_framework.response import Response

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly, IsOwner]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        address_type = serializer.validated_data['address_type']
        is_default = serializer.validated_data.get('default', False)
        if is_default:
            existing_default_addresses = Address.objects.filter(user=self.request.user, address_type=address_type, default=True)
            for existing_address in existing_default_addresses:
                existing_address.default = False
                existing_address.save()

        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        address_type = serializer.validated_data.get('address_type', serializer.instance.address_type)
        existing_default_addresses = Address.objects.filter(user=self.request.user, address_type=address_type, default=True).exclude(pk=serializer.instance.pk)
        for existing_address in existing_default_addresses:
            existing_address.default = False
            existing_address.save()
        serializer.save()

    def perform_destroy(self, instance):
        is_default = instance.default
        address_type = instance.address_type
        instance.delete()
        if is_default:
            other_addresses = Address.objects.filter(user=self.request.user, address_type=address_type).exclude(pk=instance.pk)
            if other_addresses.exists():
                new_default_address = other_addresses.first()
                new_default_address.default = True
                new_default_address.save()
        return Response(status=status.HTTP_204_NO_CONTENT)