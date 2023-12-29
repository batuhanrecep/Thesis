from rest_framework import serializers
from ..models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ('user',)  # Make user field read-only during creation

    # def create(self, validated_data):
    #     user = self.context['request'].user
    #     address = Address(user=user, **validated_data)
    #     address.save()
    #     return address
    
