from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status, generics
from ..models import Address
from .serializers import AddressSerializer, AddressUpdateSerializer
from authentication.permissions import IsOwnerOrReadOnly, IsOwner
from rest_framework.response import Response

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly, IsOwner]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        address_type = serializer.validated_data['address_type']

        # Before creating a new address, set all existing addresses to default=False
        Address.objects.filter(user=user).update(default=False)

        # Save the new address from the POST data, ensuring it's set as the default
        new_address = serializer.save(user=user, default=True)

        # Determine the opposite address type to create
        opposite_address_type = 'S' if address_type == 'B' else 'B'

        # Prepare data for the opposite address type
        opposite_address_data = {
            'user': user,
            'mahalle': new_address.mahalle,
            'cadde': new_address.cadde,
            'sokak': new_address.sokak,
            'apartman': new_address.apartman,
            'daire': new_address.daire,
            'semt': new_address.semt,
            'sehir': new_address.sehir,
            'country': new_address.country,
            'post_code': new_address.post_code,
            'address_type': opposite_address_type,
            'default': True  # The opposite address should not be default
        }

        # Create and save the opposite address
        # Ensure the user is valid and not None
        if user and user.is_authenticated:
            Address.objects.create(**opposite_address_data)
        else:
            # Handle the case where the user is not authenticated or is None
            # You might want to log this or handle it according to your application's needs
            pass


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
    

    
class ListShippingAddressAPIView(generics.ListAPIView):
    serializer_class = AddressUpdateSerializer
    permission_classes =[permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Address.objects.filter(user=user, address_type='S')



class AddressUpdateAPIView(generics.UpdateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressUpdateSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        instance = serializer.instance

        address_fields = ['mahalle', 'sehir', 'cadde', 'sokak','apartman', 'daire', 'semt', 'post_code', ]
        instance_data = {field: getattr(instance, field) for field in address_fields}

        identical_addresses = Address.objects.filter(user=self.request.user, **instance_data).exclude(pk=instance.pk)

        for identical_address in identical_addresses:
            for field in address_fields:
                setattr(identical_address, field, serializer.validated_data.get(field, getattr(identical_address, field)))
            identical_address.save()

        serializer.save()
