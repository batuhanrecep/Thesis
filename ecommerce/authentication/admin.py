from django.contrib import admin
from .models import  Customer,  Seller, UserAccount
from django.contrib.admin.models import LogEntry


# Register your models here.


admin.site.register(UserAccount)
admin.site.register(Customer)
admin.site.register(Seller)

LogEntry._meta.get_field('user').remote_field.model = UserAccount
LogEntry._meta.get_field('user').remote_field.related_model = UserAccount










