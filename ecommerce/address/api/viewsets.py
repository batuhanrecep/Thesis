from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, generics
from ..models import Address
from .serializers import AddressSerializer
from authentication.permissions import IsOwnerOrReadOnly, IsAddressOwner

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly, IsAddressOwner]

    def get_queryset(self):
        # Retrieve addresses for the authenticated user
        return Address.objects.filter(user=self.request.user)



# class AddressListView(generics.ListAPIView):
#     serializer_class = AddressSerializer
#     permission_classes = [permissions.IsAuthenticated, IsAddressOwner]

#     def get_queryset(self):
#         # Retrieve addresses for the authenticated user
#         return Address.objects.filter(user=self.request.user)
    

# #! Destroy/Delete
# class AddressDestroyAPIView(generics.DestroyAPIView):
#     queryset = Address.objects.all()
#     serializer_class = AddressSerializer
#     lookup_field = 'pk'
    
#     def perform_destroy(self, instance):
        
#         super().perform_destroy(instance)
      
