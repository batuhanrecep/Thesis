# Generated by Django 4.2.7 on 2023-12-23 23:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
        ('product', '0004_rename_seller_product_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='user',
            field=models.ForeignKey(help_text='Owner Of the Product', on_delete=django.db.models.deletion.CASCADE, to='authentication.seller'),
        ),
    ]
