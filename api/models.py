from django.db import models


class BusinessEntity(models.Model):
    class Meta:
        abstract = True

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    address = models.CharField(max_length=30)
    postal_code = models.CharField(max_length=10)
    city = models.CharField(max_length=20)
    country = models.CharField(max_length=30)

    registry_code = models.CharField(max_length=20)
    vat_number = models.CharField(max_length=20, blank=True, null=True, verbose_name='VAT number')

    iban = models.CharField(max_length=40, verbose_name='IBAN')
    bic_swift = models.CharField(max_length=15, verbose_name='BIC/SWIFT')

    def save(self, *args, **kwargs):
        if self.vat_number == '':
            self.vat_number = None
        if self.registry_code == '':
            self.registry_code = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Provider(BusinessEntity):
    pass


class Customer(BusinessEntity):
    registry_code = models.CharField(max_length=20, blank=True, null=True)
