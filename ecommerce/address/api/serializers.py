from rest_framework import serializers
from ..models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ('user',)  # Make user field read-only during creation

class AddressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'user', 'mahalle','cadde', 'sokak', 'apartman', 'daire', 'semt', 'sehir', 'country', 'post_code', ]
        read_only_fields = ('user',)  # Make user field read-only during creation

