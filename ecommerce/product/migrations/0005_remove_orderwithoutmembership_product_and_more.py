# Generated by Django 4.2.7 on 2023-12-05 18:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_alter_orderwithoutmembership_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderwithoutmembership',
            name='product',
        ),
        migrations.RemoveField(
            model_name='orderwithoutmembership',
            name='quantity',
        ),
    ]