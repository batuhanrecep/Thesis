from rest_framework import generics, permissions
from ..models import Product
from .serializers import ProductSerializer
from authentication.permissions import IsSellerOrAdmin,IsOwnerOrReadOnly2,IsOwner2

#! GetAll Products that belongs to Seller 
class SellerProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes =[IsSellerOrAdmin,permissions.IsAuthenticated,IsOwner2]

    def get_queryset(self):
        # Retrieve addresses for the authenticated user
        return Product.objects.filter(user=self.request.user)

seller_product_list_view = SellerProductListAPIView.as_view()

#! GetByID
class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes =[IsOwnerOrReadOnly2]
product_detail_view = ProductDetailAPIView.as_view()
#//------------------------------------------------------------------------------------

#! GetAll
class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes =[IsOwnerOrReadOnly2]

product_list_view = ProductListAPIView.as_view()

#//------------------------------------------------------------------------------------
#! Post
class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes =[permissions.IsAuthenticated, IsSellerOrAdmin]


product_create_view = ProductCreateAPIView.as_view()

#//------------------------------------------------------------------------------------
#! Destroy/Delete
class ProductDestroyAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'
    permission_classes =[permissions.IsAuthenticated,IsOwnerOrReadOnly2,IsOwner2]

    def perform_destroy(self, instance):
        
        super().perform_destroy(instance)
      
product_destroy_view = ProductDestroyAPIView.as_view()

#//------------------------------------------------------------------------------------

#! Update
class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'
    permission_classes =[permissions.IsAuthenticated,IsOwnerOrReadOnly2,IsOwner2]


product_update_view = ProductUpdateAPIView.as_view()

#//-------------------------------------------------------------------------------------