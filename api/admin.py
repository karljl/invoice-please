from django.contrib import admin
from .models import Provider, Customer


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass
