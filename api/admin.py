from django.contrib import admin
from .models import BusinessEntity


@admin.register(BusinessEntity)
class BusinessEntityAdmin(admin.ModelAdmin):
    pass
