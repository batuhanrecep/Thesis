# Generated by Django 4.2.7 on 2023-12-17 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_remove_product_discount_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='discount_price',
            field=models.DecimalField(decimal_places=2, default=16, error_messages={'name': {'max_length': 'The price must be between 0 and 999.999.99.'}}, help_text='Maximum 999.99', max_digits=8),
            preserve_default=False,
        ),
    ]
