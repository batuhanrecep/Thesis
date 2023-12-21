from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import UserAccount

User = get_user_model()
class UserAccountSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=200)
    password = serializers.CharField(max_length=16, write_only=True)
    type = serializers.ChoiceField(choices=UserAccount.Types.choices, default=UserAccount.Types.CUSTOMER)

    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'firstname', 'lastname', 'password', 'type')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserAccount(**validated_data)
        user.set_password(password)
        user.save()
        return user

class CustomerSerializer(UserAccountSerializer):
    class Meta(UserAccountSerializer.Meta):
        model = UserAccount
        fields = UserAccountSerializer.Meta.fields + ('is_customer',)

    def create(self, validated_data):
        validated_data['type'] = UserAccount.Types.CUSTOMER
        validated_data['is_customer'] = True
        return super().create(validated_data)

class SellerSerializer(UserAccountSerializer):
    class Meta(UserAccountSerializer.Meta):
        model = UserAccount
        fields = UserAccountSerializer.Meta.fields + ('is_seller',)

    def create(self, validated_data):
        validated_data['type'] = UserAccount.Types.SELLER
        validated_data['is_seller'] = True
        return super().create(validated_data)