from rest_framework import generics
from ..models import Product
from .serializers import ProductSerializer

#! GetByID
class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

product_detail_view = ProductDetailAPIView.as_view()
#//------------------------------------------------------------------------------------

#! GetAll
class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


product_list_view = ProductListAPIView.as_view()

#//------------------------------------------------------------------------------------
#! Post
class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        print(serializer.validated_data)
        title = serializer.validated_data.get('title')
        description = serializer.validated_data.get('description') or None
        if description is None:
            description = title
        serializer.save(description=description)
    
product_create_view = ProductCreateAPIView.as_view()

#//------------------------------------------------------------------------------------
#! Destroy/Delete
class ProductDestroyAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'
    
    def perform_destroy(self, instance):
        
        super().perform_destroy(instance)
      
product_destroy_view = ProductDestroyAPIView.as_view()

#//------------------------------------------------------------------------------------

#! Update
class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

product_update_view = ProductUpdateAPIView.as_view()

#//------------------------------------------------------------------------------------

