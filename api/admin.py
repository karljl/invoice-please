from django.contrib import admin
from .models import Provider, Customer, Invoice, LineItem


class BusinessEntityAdmin(admin.ModelAdmin):
    fields = ['name', 'phone', 'email',
              'address', 'postal_code', 'city', 'country',
              'registry_code', 'vat_number',
              'iban', 'bic_swift']


@admin.register(Provider)
class ProviderAdmin(BusinessEntityAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(BusinessEntityAdmin):
    pass


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    readonly_fields = ['created']
    fields = ['document_number',
              'created', 'due_date',
              'provider', 'customer']


@admin.register(LineItem)
class LineItemAdmin(admin.ModelAdmin):
    readonly_fields = ['total']
    fields = ['invoice',
              'description',
              'amount', 'price', 'total']
