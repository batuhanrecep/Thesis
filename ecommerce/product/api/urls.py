from django.urls import path, include
from . import views



#localhost/api
#http://127.0.0.1:8000/api/products/
#http://127.0.0.1:8000/api/products/x/
#http://127.0.0.1:8000/api/products/add/
#http://127.0.0.1:8000/api/products/update/x/
#http://127.0.0.1:8000/api/products/delete/x/

urlpatterns = [
    path('products/', views.product_list_view),
    path('products/add/', views.product_create_view),
    path('products/<int:pk>/', views.product_detail_view), 
    path('products/update/<int:pk>/', views.product_update_view),
    path('products/delete/<int:pk>/', views.product_destroy_view),
    path('products/seller/', views.seller_product_list_view),
] 