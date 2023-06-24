from django.db import models
from django.utils.translation import gettext_lazy as lazy


class BusinessEntity(models.Model):

    class Meta:
        verbose_name = 'Business Entity'
        verbose_name_plural = 'Business Entities'

    class EntityType(models.TextChoices):
        PRIVATE_LIMITED_COMPANY = 'P', lazy('Private Limited Company')  # OÜ
        SELF_EMPLOYED_PERSON = 'S', lazy('Self-Employed Person'),  # FIE
        NONPROFIT_ASSOCIATION = 'N', lazy('Nonprofit Association'),  # MTÜ
        OTHER = 'O', lazy('Other')

    class Role(models.TextChoices):
        PROVIDER = 'P', lazy('Provider'),
        CUSTOMER = 'C', lazy('Customer')

    entity_type = models.CharField(choices=EntityType.choices, max_length=1)
    role = models.CharField(choices=Role.choices, max_length=1)

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
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
