# Generated by Django 4.2.7 on 2023-12-15 00:05

from django.db import migrations, models
import product.models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_product_image_delete_productimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category_name',
            field=models.CharField(blank=True, max_length=50, verbose_name=product.models.Category),
        ),
    ]