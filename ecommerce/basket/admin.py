from django.contrib import admin
from .models import BasketItem
# Register your models here.


@admin.register(BasketItem)
class BasketItemAdmin(admin.ModelAdmin):
    pass