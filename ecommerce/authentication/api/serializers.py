from rest_framework import serializers
from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    re_password=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ('__all__')





