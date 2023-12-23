# Generated by Django 4.2.7 on 2023-12-23 21:32

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('slug', models.SlugField(blank=True, editable=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Required', max_length=255, verbose_name='title')),
                ('image', models.ImageField(blank=True, null=True, upload_to='productpic')),
                ('stock', models.PositiveIntegerField(help_text='Required')),
                ('description', ckeditor.fields.RichTextField()),
                ('is_offer', models.BooleanField(default=False)),
                ('is_slide', models.BooleanField(default=False)),
                ('is_featured', models.BooleanField(default=False)),
                ('slug', models.SlugField(blank=True, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('regular_price', models.DecimalField(decimal_places=2, error_messages={'name': {'max_length': 'The price must be between 0 and 999.999.99.'}}, help_text='Required-Maximum 999.999,99', max_digits=8)),
                ('discount_percentage', models.PositiveIntegerField(default=0, error_messages={'name': {'max_length': 'The discount percentege must be between 0 and 99'}}, help_text='Required-Maximum 99.99')),
                ('categories', models.ManyToManyField(blank=True, help_text='Required', to='product.category')),
            ],
        ),
    ]
