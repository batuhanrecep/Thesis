from django.contrib import admin
from .models import Product, Category, OrderWithoutMembership
from django.utils.safestring import mark_safe


class ProductAdmin(admin.ModelAdmin):
    list_display = ("title","is_active","is_home","slug","selected_categories",)
    list_editable = ("is_active","is_home",)
    search_fields = ("title","description")
    readonly_fields = ("slug",)
    list_filter = ("is_active","is_home","categories",)

    def selected_categories(self, obj):
        html = "<ul>"

        for category in obj.categories.all():
            html += "<li>" + category.name + "</li>"

        html += "</ul>"
        return mark_safe(html)
    

class OrderWithoutMembershipAdmin(admin.ModelAdmin):
    list_display = ("id","firstname","lastname","country","city","is_active",)
    
    search_fields = ("city","country","phone_number")
    
    

    
    

admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(OrderWithoutMembership, OrderWithoutMembershipAdmin)


