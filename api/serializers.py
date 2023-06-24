from .models import Provider, Customer
from rest_framework.serializers import ModelSerializer


class ProviderSerializer(ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
