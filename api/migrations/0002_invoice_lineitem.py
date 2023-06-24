# Generated by Django 4.2.2 on 2023-06-24 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document_number', models.CharField(max_length=10)),
                ('created', models.DateField(auto_now_add=True)),
                ('due_date', models.DateField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='customer', to='api.customer')),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='provider', to='api.provider')),
            ],
        ),
        migrations.CreateModel(
            name='LineItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100)),
                ('amount', models.PositiveIntegerField()),
                ('price', models.PositiveIntegerField()),
                ('total', models.PositiveIntegerField(default=0)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='line_items', to='api.invoice')),
            ],
        ),
    ]
