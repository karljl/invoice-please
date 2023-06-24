from .models import Provider, Customer, Invoice, LineItem
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    line_items = serializers.PrimaryKeyRelatedField(
        read_only=True,
        many=True
    )

    class Meta:
        model = Invoice
        fields = '__all__'


class LineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineItem
        fields = '__all__'
