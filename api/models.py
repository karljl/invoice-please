from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone


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


class Invoice(models.Model):
    document_number = models.CharField(max_length=10)

    created = models.DateField(default=timezone.now)
    due_date = models.DateField()

    provider = models.ForeignKey(Provider, on_delete=models.RESTRICT, related_name='provider')
    customer = models.ForeignKey(Customer, on_delete=models.RESTRICT, related_name='customer')

    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f'Invoice {self.document_number} by {self.provider}'


class LineItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='line_items')

    description = models.CharField(max_length=100)

    amount = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price = models.PositiveIntegerField()
    total = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        self.total = self.amount * self.price
        super().save(*args, **kwargs)

    def __str__(self):
        return self.description
