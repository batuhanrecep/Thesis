from django.contrib import admin
from .models import BasketItem, Basket
# Register your models here.


@admin.register(BasketItem)
class BasketItemAdmin(admin.ModelAdmin):
    pass


@admin.register(Basket)
class BasketItemAdmin(admin.ModelAdmin):
    pass