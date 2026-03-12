from rest_framework import serializers
from .models import Provider

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['id', 'name', 'email', 'phone', 'address', 'store_name', 'is_active', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
