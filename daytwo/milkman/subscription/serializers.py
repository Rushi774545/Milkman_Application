from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    provider_store_name = serializers.CharField(source='product.provider.store_name', read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    customer_phone = serializers.CharField(source='customer.phone', read_only=True)
    customer_address = serializers.CharField(source='customer.address', read_only=True)

    class Meta:
        model = Subscription
        fields = "__all__"
        read_only_fields = ['customer']
