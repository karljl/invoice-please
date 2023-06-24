from .models import Provider, Customer, Invoice, LineItem
from rest_framework import serializers

BUSINESS_ENTITY_FIELDS = ['id',
                          'name', 'phone', 'email',
                          'address', 'postal_code', 'city', 'country',
                          'registry_code', 'vat_number',
                          'iban', 'bic_swift']


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = BUSINESS_ENTITY_FIELDS


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = BUSINESS_ENTITY_FIELDS


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
