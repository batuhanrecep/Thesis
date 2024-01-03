from decimal import Decimal
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import Product, Category, ProductImage


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','slug')   


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "product", "image"]



class ProductSerializer(ModelSerializer):    
    images = ProductImageSerializer(many=True, read_only=True)#
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)
    category_name=serializers.SerializerMethodField(read_only=True)
    store_name = serializers.ReadOnlyField(source='seller.store_name')
    class Meta:
        model = Product
        fields = ['seller','id','title','stock','description','is_offer','is_slide',
                  'is_featured','slug','categories','created_at','updated_at','regular_price',
                  'discount_percentage','store_name','images','uploaded_images','category_name']
        read_only_fields = ('seller',)

    def get_category_name(self, obj):
        try:
            return list(obj.categories.values_list('name', flat=True))
        except AttributeError:
            return None
    
    def create(self, validated_data):
        seller = self.context['request'].user  
        categories_data = validated_data.pop('categories', [])
        uploaded_images = validated_data.pop("uploaded_images")
  
        product = Product(seller=seller, **validated_data)
        product.save()
        product.categories.set(categories_data)

        for image in uploaded_images:
            newproduct_image = ProductImage.objects.create(product=product, image=image)
        return product

    #Product modeldeki save methodunu kullanmamak için 
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.description = validated_data.get('description', instance.description)
        instance.regular_price = validated_data.get('regular_price', instance.regular_price)
        instance.discount_percentage = validated_data.get('discount_percentage', instance.discount_percentage)
        instance.image = validated_data.get('image', instance.image)
        
        categories = validated_data.get('categories', instance.categories.all())
        instance.categories.set(categories)

        uploaded_images = validated_data.get("uploaded_images", [])
        instance.images.all().delete()  # Delete existing images
        for image in uploaded_images:
            ProductImage.objects.create(product=instance, image=image)


        discount_percentage_decimal = Decimal(instance.discount_percentage)
        instance.discount_price = instance.regular_price - (instance.regular_price * (discount_percentage_decimal / 100))
        if discount_percentage_decimal != 0:
            instance.regular_price = instance.discount_price
        instance.save()
        return instance        
    

    def perform_update(self, serializer):
        seller = self.context['request'].user
        serializer.save(seller=seller)


class BasicProductSerializer(ModelSerializer):    
    store_name = serializers.ReadOnlyField(source='seller.store_name')
    class Meta:
        model = Product
        fields = ('title','stock','id','store_name','seller','regular_price') 
        read_only_fields = ('seller',)
