from django.urls import path, include
from . import views

#localhost/api
urlpatterns = [
    path('products/', views.product_list_view),
    path('products/add/', views.product_create_view),
    path('products/<int:pk>/', views.product_detail_view), 
    path('products/update/<int:pk>/', views.product_update_view),
    path('products/delete/<int:pk>/', views.product_destroy_view)
] 